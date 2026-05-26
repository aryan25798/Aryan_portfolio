"use client";

import { useEffect, useRef } from "react";

const COLORS = ["rgba(124,58,237,", "rgba(6,182,212,", "rgba(59,130,246,", "rgba(168,85,247,"];

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -1000, y: -1000 };
    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; a: number; speed: number; up: boolean; baseA: number;
      color: string;
    }> = [];

    let shootingStars: Array<{
      x: number; y: number; length: number; speed: number;
      opacity: number; angle: number; life: number; maxLife: number;
      color: string;
    }> = [];

    const getCount = () => {
      const w = window.innerWidth;
      if (w < 768) return 0;
      if (w < 1280) return 110;
      return 160;
    };

    const CONN_DIST = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      const count = getCount();
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4,
        a: Math.random() * 0.5 + 0.15,
        speed: Math.random() * 0.015 + 0.003,
        up: Math.random() > 0.5,
        baseA: Math.random() * 0.3 + 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      shootingStars = [];
    };

    const spawnShootingStar = () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8 + canvas.width * 0.2,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 8 + 5,
        opacity: Math.random() * 0.7 + 0.3,
        angle: Math.PI * 0.2 + Math.random() * Math.PI * 0.15,
        life: 0,
        maxLife: 50 + Math.random() * 50,
        color,
      });
    };

    let starSpawnTimer = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const connDist = window.innerWidth < 640 ? CONN_DIST * 0.5 : CONN_DIST;

      starSpawnTimer++;
      if (starSpawnTimer > 80 + Math.random() * 120) {
        spawnShootingStar();
        starSpawnTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x -= Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        const lifeRatio = 1 - s.life / s.maxLife;
        s.opacity = lifeRatio * 0.9;

        const grad = ctx.createLinearGradient(s.x, s.y, s.x + Math.cos(s.angle) * s.length * lifeRatio, s.y - Math.sin(s.angle) * s.length * lifeRatio);
        grad.addColorStop(0, s.color + s.opacity + ")");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x + Math.cos(s.angle) * s.length * lifeRatio,
          s.y - Math.sin(s.angle) * s.length * lifeRatio
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = s.color + (s.opacity * 0.3) + ")";
        ctx.fill();

        if (s.life >= s.maxLife || s.x < -100 || s.y > canvas.height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.5;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }
        
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (p.up) { p.a += p.speed; if (p.a >= p.baseA + 0.35) p.up = false; }
        else { p.a -= p.speed; if (p.a <= p.baseA - 0.1) p.up = true; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.a + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.a * 0.15) + ")";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const distSq = dx2 * dx2 + dy2 * dy2;
          const connDistSq = connDist * connDist;
          if (distSq < connDistSq) {
            const dist2 = Math.sqrt(distSq);
            const alpha = 0.06 * (1 - dist2 / connDist);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: Array<{ x: number; y: number; r: number; a: number; speed: number; phase: number }> = [];

    const initStars = () => {
      stars.length = 0;
      const count = window.innerWidth < 640 ? 50 : 100;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
          a: Math.random() * 0.6 + 0.15,
          speed: Math.random() * 0.03 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;

      for (const s of stars) {
        const twinkle = 0.4 + 0.6 * Math.sin(t * s.speed * 10 + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.a * twinkle})`;
        ctx.fill();

        if (s.r > 0.8) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 180, 255, ${s.a * twinkle * 0.08})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050816 0%, #080b22 50%, #050816 100%)" }} />

      <div className="absolute top-[15%] left-[10%] w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full animate-aurora" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(59,130,246,0.02) 40%, transparent 80%)" }} />
      <div className="absolute top-[40%] right-[5%] w-[350px] sm:w-[500px] lg:w-[700px] h-[350px] sm:h-[500px] lg:h-[700px] rounded-full animate-aurora-reverse" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.02) 40%, transparent 80%)" }} />
      <div className="absolute bottom-[10%] left-[30%] w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-full animate-aurora" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, rgba(124,58,237,0.02) 40%, transparent 80%)", animationDelay: "-4s" }} />

      <canvas ref={starCanvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 2, willChange: "transform" }} />

      <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: "200px", background: "linear-gradient(0deg, rgba(124,58,237,0.03) 0%, transparent 100%)", zIndex: 3 }} />

      <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{
        height: "120px", zIndex: 3,
        backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px", backgroundPosition: "center bottom",
        transform: "perspective(200px) rotateX(60deg)", transformOrigin: "bottom center", opacity: 0.6,
      }} />

      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" style={{ opacity: 0.06, zIndex: 2 }} xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="15%" x2="22%" y2="25%" stroke="#a78bfa" strokeWidth="1" />
        <line x1="22%" y1="25%" x2="20%" y2="38%" stroke="#a78bfa" strokeWidth="0.8" />
        <line x1="20%" y1="38%" x2="38%" y2="35%" stroke="#a78bfa" strokeWidth="0.5" />
        <line x1="38%" y1="35%" x2="55%" y2="42%" stroke="#3b82f6" strokeWidth="1" />
        <line x1="55%" y1="42%" x2="68%" y2="30%" stroke="#3b82f6" strokeWidth="0.7" />
        <line x1="68%" y1="30%" x2="85%" y2="20%" stroke="#a78bfa" strokeWidth="0.9" />
        <circle cx="10%" cy="15%" r="2" fill="#a78bfa" />
        <circle cx="22%" cy="25%" r="2.5" fill="#a78bfa" />
        <circle cx="20%" cy="38%" r="1.8" fill="#3b82f6" />
        <circle cx="38%" cy="35%" r="2.2" fill="#3b82f6" />
        <circle cx="55%" cy="42%" r="2.5" fill="#3b82f6" />
        <circle cx="68%" cy="30%" r="1.8" fill="#a78bfa" />
        <circle cx="85%" cy="20%" r="2" fill="#a78bfa" />
      </svg>

      <svg className="absolute bottom-0 left-0 w-full pointer-events-none hidden sm:block" style={{ height: "120px", opacity: 0.08, zIndex: 4 }} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 120L55 80L130 100L230 65L325 95L400 55L515 80L620 65L715 95L830 45L930 75L1030 55L1125 85L1200 65L1280 85L1350 60L1440 90V120H0Z" fill="url(#mg)" />
        <defs>
          <linearGradient id="mg" x1="720" y1="0" x2="720" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
