'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  colors?: string[];
  className?: string;
}

export function AuroraBackground({ 
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#a55eea'],
  className = "absolute inset-0 overflow-hidden"
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      time += 0.005;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create multiple aurora layers
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        
        const color1 = colors[i % colors.length];
        const color2 = colors[(i + 1) % colors.length];
        
        gradient.addColorStop(0, `${color1}10`);
        gradient.addColorStop(0.5, `${color2}20`);
        gradient.addColorStop(1, `${color1}05`);

        ctx.fillStyle = gradient;

        // Create flowing aurora shapes
        ctx.beginPath();
        
        const waveHeight = 100 + Math.sin(time + i) * 50;
        const waveOffset = Math.sin(time * 0.7 + i * 2) * 200;
        
        ctx.moveTo(0, canvas.height / 2 + waveOffset);
        
        for (let x = 0; x <= canvas.width; x += 20) {
          const y = canvas.height / 2 + 
                   Math.sin((x + time * 100) * 0.01 + i) * waveHeight +
                   Math.sin((x + time * 50) * 0.005 + i * 2) * 30 +
                   waveOffset;
          
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
        style={{ background: 'transparent' }}
      />
      
      {/* Additional animated elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${colors[i % colors.length]}40 0%, transparent 70%)`,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
            animate={{
              x: ['-20%', '120%'],
              y: ['-20%', '120%'],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}