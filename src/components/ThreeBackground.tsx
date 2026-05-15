import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Intracellular drift background.
 *
 * Evokes small molecules / vesicles slowly diffusing inside a cell.
 * Motion is gentle and continuous (Brownian-like drift), never spinning.
 *
 * Palette (strict — only these three):
 *   #907ad6  — light violet   (bright molecules, highlights)
 *   #1e3a8a  — deep indigo    (primary molecule bodies, bonds)
 *   #2c2a4a  — dark plum      (vesicles, depth, cytoplasm haze)
 */

const COLOR_LIGHT = '#907ad6';
const COLOR_DEEP  = '#1e3a8a';
const COLOR_DARK  = '#2c2a4a';

// ─── Circular soft glow texture (shared by all sprites) ───────────────────
function makeGlowTexture(): THREE.CanvasTexture {
  const s = 128;
  const c = document.createElement('canvas');
  c.width = s; c.height = s;
  const ctx = c.getContext('2d')!;
  const r = s / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  g.addColorStop(0,    'rgba(255,255,255,1.0)');
  g.addColorStop(0.3,  'rgba(255,255,255,0.55)');
  g.addColorStop(0.6,  'rgba(255,255,255,0.18)');
  g.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// ─── Ring texture for vesicle (hollow cell-like bubble) ───────────────────
function makeRingTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = s; c.height = s;
  const ctx = c.getContext('2d')!;
  const r = s / 2;
  const g = ctx.createRadialGradient(r, r, r * 0.55, r, r, r);
  g.addColorStop(0,    'rgba(255,255,255,0)');
  g.addColorStop(0.75, 'rgba(255,255,255,0.35)');
  g.addColorStop(0.92, 'rgba(255,255,255,0.15)');
  g.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// ─── One small molecule: a cluster of 2–4 atoms held by bonds ─────────────
type Atom = { offset: THREE.Vector3; color: string; size: number };
type Molecule = {
  center: THREE.Vector3;     // starting position
  drift: THREE.Vector3;      // slow base velocity (unit-ish vector)
  // Two independent wander layers per axis → erratic, uncoordinated paths
  amp1: THREE.Vector3;       // primary amplitude
  amp2: THREE.Vector3;       // secondary amplitude (different freq/phase)
  phase1: THREE.Vector3;
  phase2: THREE.Vector3;
  freq1: THREE.Vector3;
  freq2: THREE.Vector3;
  atoms: Atom[];
  spin: number;              // slow self-rotation speed (rad/s)
  axis: THREE.Vector3;       // rotation axis
};

function buildMolecules(count: number, spread: number): Molecule[] {
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  // BorA main color (#1e3a8a) dominates — it's the brand identity.
  const pickColor = () => {
    const p = Math.random();
    if (p < 0.70) return COLOR_DEEP;   // main brand color
    if (p < 0.92) return COLOR_LIGHT;
    return COLOR_DARK;
  };

  const out: Molecule[] = [];
  for (let i = 0; i < count; i++) {
    const atomCount = 2 + Math.floor(Math.random() * 3); // 2..4
    const atoms: Atom[] = [];
    // first atom at origin of cluster — always brand color
    atoms.push({
      offset: new THREE.Vector3(0, 0, 0),
      color: COLOR_DEEP,
      size: rand(0.09, 0.15),
    });
    // remaining atoms offset within small radius
    for (let a = 1; a < atomCount; a++) {
      const dir = new THREE.Vector3(
        rand(-1, 1), rand(-1, 1), rand(-1, 1)
      ).normalize().multiplyScalar(rand(0.18, 0.32));
      atoms.push({
        offset: dir,
        color: pickColor(),
        size: rand(0.07, 0.13),
      });
    }

    const driftDir = new THREE.Vector3(
      rand(-1, 1), rand(-1, 1), rand(-0.4, 0.4)
    ).normalize();

    // Wide per-molecule randomization = each one wanders on its own rhythm.
    out.push({
      center: new THREE.Vector3(
        rand(-spread, spread),
        rand(-spread * 0.65, spread * 0.65),
        rand(-spread * 0.4, spread * 0.4)
      ),
      drift: driftDir.multiplyScalar(rand(0.003, 0.014)),
      amp1:   new THREE.Vector3(rand(0.25, 0.75), rand(0.25, 0.75), rand(0.15, 0.4)),
      amp2:   new THREE.Vector3(rand(0.12, 0.4),  rand(0.12, 0.4),  rand(0.08, 0.25)),
      phase1: new THREE.Vector3(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2)),
      phase2: new THREE.Vector3(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2)),
      freq1:  new THREE.Vector3(rand(0.02, 0.09),  rand(0.02, 0.09),  rand(0.02, 0.07)),
      freq2:  new THREE.Vector3(rand(0.08, 0.22),  rand(0.08, 0.22),  rand(0.06, 0.18)),
      atoms,
      spin: rand(0.01, 0.06) * (Math.random() < 0.5 ? -1 : 1),
      axis: new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize(),
    });
  }
  return out;
}

// ─── Single molecule renderer (atoms only, self-animating) ────────────────
const MoleculeMesh: React.FC<{ mol: Molecule; tex: THREE.Texture }> = ({ mol, tex }) => {
  const group = useRef<THREE.Group>(null!);

  const qTmp = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Two superimposed sine layers per axis → non-repeating, erratic drift
    const wanderX =
      Math.sin(t * mol.freq1.x + mol.phase1.x) * mol.amp1.x +
      Math.sin(t * mol.freq2.x + mol.phase2.x) * mol.amp2.x;
    const wanderY =
      Math.sin(t * mol.freq1.y + mol.phase1.y) * mol.amp1.y +
      Math.cos(t * mol.freq2.y + mol.phase2.y) * mol.amp2.y;
    const wanderZ =
      Math.sin(t * mol.freq1.z + mol.phase1.z) * mol.amp1.z +
      Math.sin(t * mol.freq2.z + mol.phase2.z) * mol.amp2.z;

    const dx = mol.center.x + mol.drift.x * t + wanderX;
    const dy = mol.center.y + mol.drift.y * t + wanderY;
    const dz = mol.center.z + mol.drift.z * t + wanderZ;

    if (group.current) {
      group.current.position.set(dx, dy, dz);
      // Slow self-rotation for the cluster
      qTmp.setFromAxisAngle(mol.axis, t * mol.spin);
      group.current.quaternion.copy(qTmp);
    }
  });

  return (
    <group ref={group}>
      {/* Atoms as glowing sprites */}
      {mol.atoms.map((a, i) => (
        <sprite
          key={i}
          position={[a.offset.x, a.offset.y, a.offset.z]}
          scale={[a.size * 2.2, a.size * 2.2, 1]}
        >
          <spriteMaterial
            map={tex}
            color={a.color}
            transparent
            opacity={a.color === COLOR_DARK ? 0.5 : 0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
};

// ─── Cytoplasm dust (many tiny specks drifting) ───────────────────────────
const CytoplasmDust: React.FC<{ count?: number }> = ({ count = 600 }) => {
  const ref = useRef<THREE.Points>(null!);

  const { positions, seeds } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count * 2); // phase, freq
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      p[i * 3 + 2] = r * Math.cos(ph) * 0.5; // flatten along Z
      s[i * 2]     = Math.random() * Math.PI * 2;
      s[i * 2 + 1] = 0.025 + Math.random() * 0.06;
    }
    return { positions: p, seeds: s };
  }, [count]);

  const tex = useMemo(() => makeGlowTexture(), []);

  const basePositions = useMemo(() => positions.slice(), [positions]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    const geom = ref.current.geometry as THREE.BufferGeometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const phase = seeds[i * 2];
      const freq = seeds[i * 2 + 1];
      // Small wander around base position
      arr[i * 3]     = basePositions[i * 3]     + Math.sin(t * freq + phase) * 0.25;
      arr[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * freq * 0.8 + phase * 1.3) * 0.25;
      arr[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * freq * 0.6 + phase * 0.7) * 0.15;
    }
    pos.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  return (
    <points ref={ref} frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial
        map={tex}
        color={COLOR_LIGHT}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ─── Vesicle (hollow cell-organelle bubble drifting slowly) ───────────────
const Vesicle: React.FC<{
  start: [number, number, number];
  size: number;
  color: string;
  drift: [number, number, number];
  phase?: number;
}> = ({ start, size, color, drift, phase = 0 }) => {
  const ref = useRef<THREE.Sprite>(null!);
  const tex = useMemo(() => makeRingTexture(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + phase;
    if (!ref.current) return;
    ref.current.position.set(
      start[0] + Math.sin(t * 0.025) * 0.4 + drift[0] * t * 0.006,
      start[1] + Math.cos(t * 0.02)  * 0.3 + drift[1] * t * 0.006,
      start[2] + Math.sin(t * 0.015) * 0.3 + drift[2] * t * 0.006
    );
  });

  return (
    <sprite ref={ref} scale={[size, size, 1]}>
      <spriteMaterial
        map={tex}
        color={color}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
};

// ─── Scene ────────────────────────────────────────────────────────────────
const Scene: React.FC = () => {
  const molecules = useMemo(() => buildMolecules(12, 5), []);
  const tex = useMemo(() => makeGlowTexture(), []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={0.7} color={COLOR_LIGHT} />
      <pointLight position={[-6, -4, 4]} intensity={0.5} color={COLOR_DEEP} />

      {/* Vesicles — large drifting organelle-like rings */}
      <Vesicle start={[-2.6,  1.4, -2]} size={3.2} color={COLOR_DARK} drift={[ 0.3,  0.2, 0]} phase={0} />
      <Vesicle start={[ 3.0, -0.6, -3]} size={4.0} color={COLOR_DEEP} drift={[-0.2,  0.3, 0]} phase={1.7} />
      <Vesicle start={[ 0.4,  2.6, -4]} size={2.4} color={COLOR_LIGHT} drift={[ 0.1, -0.3, 0]} phase={3.2} />
      <Vesicle start={[-1.8, -2.4, -3.5]} size={2.8} color={COLOR_DARK} drift={[-0.3, -0.1, 0]} phase={4.8} />

      {/* Cytoplasm dust */}
      <CytoplasmDust count={650} />

      {/* Small molecules drifting through the cell */}
      {molecules.map((m, i) => (
        <MoleculeMesh key={i} mol={m} tex={tex} />
      ))}
    </>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
