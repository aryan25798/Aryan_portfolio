"use client";
 
import { useEffect, useRef, useState } from "react";
 
export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
 
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    setIsSlow(window.innerWidth < 1280);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSlow(window.innerWidth < 1280);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  useEffect(() => {
    if (!mounted || isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let lastFrameTime = 0;
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let frameSkip = 0;

    const mouse = { x: -1000, y: -1000 };

    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; a: number; speed: number; up: boolean; baseA: number;
    }> = [];

    const count = isSlow ? 40 : 60;
    const connDist = isSlow ? 100 : 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random() * 0.5 + 0.15,
        speed: Math.random() * 0.012 + 0.003,
        up: Math.random() > 0.5,
        baseA: Math.random() * 0.3 + 0.15,
      }));
    };

    let starTimer = 0;
    const shootingStars: Array<{
      x: number; y: number; length: number; speed: number;
      opacity: number; angle: number; life: number; maxLife: number;
    }> = [];

    const spawnStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        opacity: Math.random() * 0.6 + 0.2,
        angle: Math.PI * 0.2 + Math.random() * Math.PI * 0.15,
        life: 0,
        maxLife: 40 + Math.random() * 40,
      });
    };

    const draw = (timestamp: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < FRAME_INTERVAL) {
        animId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp - (elapsed % FRAME_INTERVAL);
      frameSkip++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (frameSkip % 2 === 0) {
        starTimer++;
        if (starTimer > 100 + Math.random() * 200) {
          spawnStar();
          starTimer = 0;
        }
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x -= Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        const lifeRatio = 1 - s.life / s.maxLife;
        s.opacity = lifeRatio * 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + Math.cos(s.angle) * s.length * lifeRatio, s.y - Math.sin(s.angle) * s.length * lifeRatio);
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();
        if (s.life >= s.maxLife || s.x < -100 || s.y > canvas.height + 100) shootingStars.splice(i, 1);
      }

      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          p.vx -= (dx / dist) * 0.005;
          p.vy -= (dy / dist) * 0.005;
        }
        p.vx += (Math.random() - 0.5) * 0.008;
        p.vy += (Math.random() - 0.5) * 0.008;
        p.vx *= 0.97;
        p.vy *= 0.97;
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
        ctx.fillStyle = `rgba(124,58,237,${p.a})`;
        ctx.fill();

        if (!isSlow && frameSkip % 3 === 0) {
          const maxJ = Math.min(i + 30, len);
          for (let j = i + 1; j < maxJ; j++) {
            const p2 = particles[j];
            const dx2 = p.x - p2.x;
            const dy2 = p.y - p2.y;
            const distSq = dx2 * dx2 + dy2 * dy2;
            if (distSq < connDist * connDist) {
              const d = Math.sqrt(distSq);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(124,58,237,${0.04 * (1 - d / connDist)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    resize();
    lastFrameTime = performance.now();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [mounted, isMobile, isSlow]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050816 0%, #080b22 50%, #050816 100%)" }} />

      <div className="absolute top-[15%] left-[10%] w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full animate-aurora" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(59,130,246,0.02) 40%, transparent 80%)" }} />
      <div className="absolute top-[40%] right-[5%] w-[350px] sm:w-[500px] lg:w-[700px] h-[350px] sm:h-[500px] lg:h-[700px] rounded-full animate-aurora-reverse" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.02) 40%, transparent 80%)" }} />
      <div className="absolute bottom-[10%] left-[30%] w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-full animate-aurora" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, rgba(124,58,237,0.02) 40%, transparent 80%)", animationDelay: "-4s" }} />

      {mounted && !isMobile && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />}

      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ zIndex: 2, backgroundImage: "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <svg className="absolute bottom-0 left-0 w-full pointer-events-none hidden sm:block" style={{ height: "120px", opacity: 0.08, zIndex: 3 }} viewBox="0 0 1440 120" preserveAspectRatio="none">
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
