'use client';

import { useEffect, useRef } from 'react';
import { ParticleConfig } from '@/types/content.types';

interface ParticleBackgroundProps {
  config?: Partial<ParticleConfig>;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function ParticleBackground({ 
  config = {}, 
  className = "absolute inset-0 overflow-hidden pointer-events-none" 
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  const defaultConfig: ParticleConfig = {
    count: 50,
    size: { min: 1, max: 3 },
    speed: { min: 0.5, max: 2 },
    opacity: { min: 0.1, max: 0.6 },
    colors: ['#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24']
  };

  const finalConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (finalConfig.speed.max - finalConfig.speed.min) + finalConfig.speed.min,
      vy: (Math.random() - 0.5) * (finalConfig.speed.max - finalConfig.speed.min) + finalConfig.speed.min,
      size: Math.random() * (finalConfig.size.max - finalConfig.size.min) + finalConfig.size.min,
      opacity: Math.random() * (finalConfig.opacity.max - finalConfig.opacity.min) + finalConfig.opacity.min,
      color: finalConfig.colors[Math.floor(Math.random() * finalConfig.colors.length)]
    });

    const initParticles = () => {
      particlesRef.current = Array.from({ length: finalConfig.count }, createParticle);
    };

    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Subtle opacity pulsing
      particle.opacity += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.01;
      particle.opacity = Math.max(finalConfig.opacity.min, Math.min(finalConfig.opacity.max, particle.opacity));
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add subtle glow effect
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size * 2;
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [finalConfig]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}