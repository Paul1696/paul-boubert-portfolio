"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/paul-portfolio.module.css";

type Bird = { x: number; y: number; vx: number; vy: number };

export default function BirdFlock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    const birds: Bird[] = [];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seed = () => {
      birds.length = 0;
      const count = width < 600 ? 16 : 28;
      for (let index = 0; index < count; index += 1) {
        birds.push({
          x: width * (0.48 + Math.random() * 0.45),
          y: height * (0.12 + Math.random() * 0.35),
          vx: -0.35 + Math.random() * 0.7,
          vy: -0.15 + Math.random() * 0.3,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(230, 249, 255, 0.82)";
      context.lineWidth = 1.35;
      context.lineCap = "round";

      birds.forEach((bird, index) => {
        if (!reducedMotion) {
          let centerX = 0;
          let centerY = 0;
          let averageVx = 0;
          let averageVy = 0;
          let neighbors = 0;

          birds.forEach((other, otherIndex) => {
            if (index === otherIndex) return;
            const distance = Math.hypot(bird.x - other.x, bird.y - other.y);
            if (distance < 150) {
              centerX += other.x;
              centerY += other.y;
              averageVx += other.vx;
              averageVy += other.vy;
              neighbors += 1;
              if (distance < 24) {
                bird.vx += (bird.x - other.x) * 0.0015;
                bird.vy += (bird.y - other.y) * 0.0015;
              }
            }
          });

          if (neighbors) {
            bird.vx += (centerX / neighbors - bird.x) * 0.00018 + (averageVx / neighbors - bird.vx) * 0.014;
            bird.vy += (centerY / neighbors - bird.y) * 0.00018 + (averageVy / neighbors - bird.vy) * 0.014;
          }
          bird.vx += 0.002;
          bird.vy += Math.sin((frame + index * 13) * 0.025) * 0.002;
          bird.vx = Math.max(-1.15, Math.min(1.15, bird.vx));
          bird.vy = Math.max(-0.75, Math.min(0.75, bird.vy));
          bird.x += bird.vx;
          bird.y += bird.vy;
          if (bird.x > width + 20) bird.x = -20;
          if (bird.y < height * 0.05 || bird.y > height * 0.52) bird.vy *= -1;
        }

        const angle = Math.atan2(bird.vy, bird.vx);
        context.save();
        context.translate(bird.x, bird.y);
        context.rotate(angle);
        const wing = 3.5 + Math.sin((frame + index * 9) * 0.08) * 1.1;
        context.beginPath();
        context.moveTo(-5, 0);
        context.quadraticCurveTo(-2, -wing, 0, 0);
        context.quadraticCurveTo(2, -wing, 5, 0);
        context.stroke();
        context.restore();
      });
      frame += 1;
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    seed();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.heroBirdFlock} aria-hidden="true" />;
}
