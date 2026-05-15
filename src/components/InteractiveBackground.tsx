import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: any[] = [];
    let mouse = { x: null as number | null, y: null as number | null };
    let animationFrameId: number;

    const starCount = 80; 
    const connectionDistance = 180;

    const init = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const drawStars = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${s.opacity})`;
        ctx.fill();

        s.x += s.speedX;
        s.y += s.speedY;

        if (s.x < -20) s.x = canvas.width + 10;
        else if (s.x > canvas.width + 20) s.x = -10;
        
        if (s.y < -20) s.y = canvas.height + 10;
        else if (s.y > canvas.height + 20) s.y = -10;

        for (let j = i + 1; j < stars.length; j++) {
          let s2 = stars[j];
          let dx = s.x - s2.x;
          let dy = s.y - s2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.15 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          let mdx = s.x - mouse.x;
          let mdy = s.y - mouse.y;
          let mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150) {
            s.x += mdx * 0.01; 
            s.y += mdy * 0.01;
          }
        }
      }
      animationFrameId = requestAnimationFrame(drawStars);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    init();
    drawStars();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
      style={{ background: 'transparent' }}
    />
  );
};

export default InteractiveBackground;
