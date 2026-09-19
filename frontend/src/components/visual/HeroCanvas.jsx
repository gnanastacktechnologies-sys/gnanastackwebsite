import React, { useEffect, useRef } from 'react';

export const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle / Node structure
    const numNodes = Math.min(Math.floor(width / 25), 45);
    const nodes = [];
    const colors = ['#0066FF', '#00C8FF', '#00D6B4', '#39E75F'];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.5,
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
    canvas.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background stack layers
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      const stackSize = Math.min(width, height) * 0.28;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Layered stack rings inspired by logo
      for (let ring = 3; ring >= 1; ring--) {
        const size = stackSize * (ring * 0.35);
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 0.5, Math.PI / 6, 0, Math.PI * 2);
        ctx.strokeStyle = ring === 1 ? 'rgba(0, 200, 255, 0.15)' : ring === 2 ? 'rgba(0, 214, 180, 0.1)' : 'rgba(0, 102, 255, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Update and draw nodes & connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        // Bounce boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse subtle repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          node.x += (dx / dist) * 1.5;
          node.y += (dy / dist) * 1.5;
        }

        // Draw connecting energy lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);

          if (distance < 130) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - distance / 130) * 0.25;
            const grad = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            grad.addColorStop(0, node.color);
            grad.addColorStop(1, other.color);
            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        // Draw node particle
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
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
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
