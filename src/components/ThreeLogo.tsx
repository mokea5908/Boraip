import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Create a soft radial-gradient circle texture for glowing dot sprites
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const r = size / 2;
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0,   'rgba(255,255,255,1.0)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
  grad.addColorStop(0.7, 'rgba(255,255,255,0.2)');
  grad.addColorStop(1,   'rgba(255,255,255,0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// ─── Build "B" letterform as ExtrudeGeometry ────────────────────────────────
// Outer contour: spine (left bar) + upper bump + lower bump
// Inner holes  : two D-shaped cutouts inside the bumps
function createBShape(): THREE.Shape {
  const S = 1.4; // uniform scale factor

  const L   = -0.32 * S;   // spine left edge
  const R   = -0.04 * S;   // spine right edge / bump anchor x
  const T   =  0.50 * S;   // top
  const Bot = -0.50 * S;   // bottom
  const MID =  0.03 * S;   // junction between the two bumps

  const r2  = (MID - Bot) / 2;    // lower outer radius
  const cy2 = (MID + Bot) / 2;    // lower centre y

  const r1  = (T   - MID) / 2;    // upper outer radius (slightly smaller)
  const cy1 = (T   + MID) / 2;    // upper centre y

  const shape = new THREE.Shape();

  // — Outer path (CCW) ——————————————————————————
  shape.moveTo(L, Bot);
  shape.lineTo(R, Bot);
  // lower D-bump, sweeping right
  shape.absarc(R, cy2, r2, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(R, MID);
  // upper D-bump, sweeping right
  shape.absarc(R, cy1, r1, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(R, T);
  shape.lineTo(L, T);
  shape.closePath();

  // — Lower inner hole (CW = cutout) ————————————
  const ri2  = r2 * 0.60;
  const hL   = new THREE.Path();
  hL.moveTo(R, cy2 - ri2);
  hL.absarc(R, cy2, ri2, -Math.PI / 2, Math.PI / 2, true);
  hL.closePath();
  shape.holes.push(hL);

  // — Upper inner hole (CW = cutout) ————————————
  const ri1  = r1 * 0.60;
  const hU   = new THREE.Path();
  hU.moveTo(R, cy1 - ri1);
  hU.absarc(R, cy1, ri1, -Math.PI / 2, Math.PI / 2, true);
  hU.closePath();
  shape.holes.push(hU);

  return shape;
}

// ─── Orbit dot configurations ────────────────────────────────────────────────
// Sprites (billboard) are used for dots so they're always visible regardless of angle.
// Radii kept tight (0.55-0.78) so dots stay inside the 72-px canvas.
const DOT_CONFIGS = [
  { radius: 0.72, speed:  1.10, offset: 0.0, size: 0.13, color: '#00b7bd', tiltX:  0.0,  tiltZ: 0.0   },
  { radius: 0.60, speed: -0.82, offset: 2.1, size: 0.10, color: '#818cf8', tiltX:  0.6,  tiltZ: 0.3   },
  { radius: 0.78, speed:  0.68, offset: 1.2, size: 0.15, color: '#1e3a8a', tiltX:  0.9,  tiltZ: -0.4  },
  { radius: 0.65, speed:  1.38, offset: 3.5, size: 0.09, color: '#00b7bd', tiltX: -0.5,  tiltZ: 0.7   },
  { radius: 0.74, speed: -1.02, offset: 5.0, size: 0.11, color: '#4f46e5', tiltX:  0.3,  tiltZ: -0.8  },
  { radius: 0.55, speed:  0.88, offset: 0.7, size: 0.09, color: '#4f46e5', tiltX: -0.8,  tiltZ: 0.2   },
  { radius: 0.68, speed: -0.72, offset: 4.2, size: 0.10, color: '#00b7bd', tiltX:  1.0,  tiltZ: 0.5   },
];

function getDotPos(cfg: (typeof DOT_CONFIGS)[0], time: number, out: THREE.Vector3) {
  const a = time * cfg.speed + cfg.offset;
  const bx = Math.cos(a) * cfg.radius;
  const bz = Math.sin(a) * cfg.radius;
  // Tilt: rotate in XZ around X-axis, then around Z-axis
  const cy = -bz * Math.sin(cfg.tiltX);
  const cz =  bz * Math.cos(cfg.tiltX);
  out.set(
    bx * Math.cos(cfg.tiltZ) - cy * Math.sin(cfg.tiltZ),
    bx * Math.sin(cfg.tiltZ) + cy * Math.cos(cfg.tiltZ),
    cz,
  );
}

// ─── Orbiting dots + connecting lines ────────────────────────────────────────
const DotsAndLines: React.FC = () => {
  const dotRefs   = useRef<(THREE.Object3D | null)[]>([]);
  const tmp       = useMemo(() => new THREE.Vector3(), []);
  const glowTex   = useMemo(() => makeGlowTexture(), []);

  const { lineMeshes, lineGeos } = useMemo(() => {
    const lineGeos = DOT_CONFIGS.map(() => {
      const arr = new Float32Array(6);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
      return geo;
    });
    const lineMeshes = lineGeos.map((geo) =>
      new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: '#818cf8', transparent: true, opacity: 0.45 }),
      ),
    );
    return { lineMeshes, lineGeos };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    DOT_CONFIGS.forEach((cfg, i) => {
      getDotPos(cfg, t, tmp);
      dotRefs.current[i]?.position.copy(tmp);

      const attr = lineGeos[i].attributes.position as THREE.BufferAttribute;
      attr.setXYZ(0, 0, 0, 0);
      attr.setXYZ(1, tmp.x, tmp.y, tmp.z);
      attr.needsUpdate = true;
    });
  });

  return (
    <>
      {DOT_CONFIGS.map((cfg, i) => (
        <sprite
          key={i}
          ref={(el: THREE.Sprite | null) => { dotRefs.current[i] = el; }}
          scale={[cfg.size * 2, cfg.size * 2, 1]}
        >
          <spriteMaterial map={glowTex} color={cfg.color} sizeAttenuation transparent depthWrite={false} />
        </sprite>
      ))}
      {lineMeshes.map((line, i) => (
        <primitive key={`ln-${i}`} object={line} />
      ))}
    </>
  );
};

// ─── Letter B mesh ────────────────────────────────────────────────────────────
const BLetterMesh: React.FC = () => {
  const geo = useMemo(() => {
    const shape = createBShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth:          0.30,
      bevelEnabled:   true,
      bevelThickness: 0.045,
      bevelSize:      0.025,
      bevelSegments:  6,
    });
  }, []);

  // Center the geometry on its bounding box
  useMemo(() => {
    geo.computeBoundingBox();
    const center = new THREE.Vector3();
    geo.boundingBox!.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);
  }, [geo]);

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial
        color="#1e3a8a"
        metalness={0.90}
        roughness={0.06}
        emissive="#3730a3"
        emissiveIntensity={0.22}
      />
    </mesh>
  );
};

// ─── Root scene group ─────────────────────────────────────────────────────────
const LogoScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.28) * 0.42;
    groupRef.current.rotation.x = Math.sin(t * 0.17) * 0.10;
  });

  return (
    <group ref={groupRef}>
      <BLetterMesh />
      <DotsAndLines />
    </group>
  );
};

// ─── Exported component ───────────────────────────────────────────────────────
const ThreeLogo: React.FC = () => (
  <div style={{ width: 72, height: 72 }} className="inline-block align-middle mr-1 flex-shrink-0">
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 2.6]} fov={58} />
      <ambientLight intensity={0.65} />
      <spotLight position={[4, 5, 4]} angle={0.25} penumbra={1} intensity={2.4} />
      <pointLight position={[-3, -3, -3]} intensity={0.55} color="#4f46e5" />
      <pointLight position={[0, 0, 2]}   intensity={0.50} color="#00b7bd" />
      <LogoScene />
    </Canvas>
  </div>
);

export default ThreeLogo;
