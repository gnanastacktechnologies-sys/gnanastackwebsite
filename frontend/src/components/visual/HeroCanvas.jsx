import React, { useEffect, useRef } from 'react';

export const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Particle / Node structure (Optimized node count)
    const numNodes = Math.min(Math.floor(width / 45), 25);
    const nodes = [];
    const colors = ['#0066FF', '#00C8FF', '#00D6B4', '#39E75F'];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Interactive mouse tracking
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background stack rings
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      const stackSize = Math.min(width, height) * 0.25;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.strokeStyle = 'rgba(0, 200, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10]);

      for (let ring = 2; ring >= 1; ring--) {
        const size = stackSize * (ring * 0.4);
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 0.5, Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Update & render particles and lines in lightweight single pass
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Subtle mouse interaction
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 10000) {
          const dist = Math.sqrt(distSq);
          node.x += (dx / dist) * 1.2;
          node.y += (dy / dist) * 1.2;
        }

        // Connecting lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distanceSq = (node.x - other.x) ** 2 + (node.y - other.y) ** 2;

          if (distanceSq < 14400) {
            const alpha = (1 - Math.sqrt(distanceSq) / 120) * 0.18;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw particle dot
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto transform-gpu">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
