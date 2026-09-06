import { useEffect, useRef } from 'react';

export type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => void;

interface PixelArtCanvasProps {
  draw: DrawFn;
  className?: string;
  scale?: number;
  animated?: boolean;
}

export default function PixelArtCanvas({
  draw,
  className = '',
  scale = 3,
  animated = true,
}: PixelArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(w * dpr / scale);
      canvas.height = Math.floor(h * dpr / scale);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.imageSmoothingEnabled = false;
      drawRef.current(ctx, canvas.width, canvas.height, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    let startTime = performance.now();
    const render = () => {
      const time = (performance.now() - startTime) / 1000;
      drawRef.current(ctx, canvas.width, canvas.height, time);
      animRef.current = requestAnimationFrame(render);
    };

    if (animated) {
      render();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [scale, animated]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  );
}

// ── Drawing helpers ──

export function px(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(w), Math.ceil(h));
}

export function circle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string
) {
  ctx.fillStyle = color;
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      if (x * x + y * y <= r * r) {
        ctx.fillRect(Math.floor(cx + x), Math.floor(cy + y), 1, 1);
      }
    }
  }
}

export function glowCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string,
  intensity: number = 0.15
) {
  for (let i = r * 3; i >= r; i--) {
    const alpha = intensity * (1 - (i - r) / (r * 2));
    const c = color.replace('ALPHA', alpha.toFixed(3));
    circle(ctx, cx, cy, i, c);
  }
  circle(ctx, cx, cy, r, color.replace('ALPHA', '1'));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function smoothNoise(x: number, seed: number = 0) {
  const i = Math.floor(x);
  const f = x - i;
  const a = Math.sin((i + seed) * 12.9898) * 43758.5453;
  const b = Math.sin((i + 1 + seed) * 12.9898) * 43758.5453;
  const fa = a - Math.floor(a);
  const fb = b - Math.floor(b);
  const t = f * f * (3 - 2 * f);
  return fa * (1 - t) + fb * t;
}

export function stars(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  count: number,
  seed: number,
  time: number,
  yStart: number = 0,
  yEnd: number = Infinity
) {
  for (let i = 0; i < count; i++) {
    const sx = Math.abs(Math.sin(i * 78.233 + seed) * 43758.5453) % 1;
    const sy = Math.abs(Math.sin(i * 43.123 + seed * 2) * 43758.5453) % 1;
    const x = Math.floor(sx * w);
    const y = Math.floor(sy * h);
    if (y < yStart || y > yEnd) continue;
    const tw = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.5 + i * 1.7));
    const s = i % 7 === 0 ? 1.5 : i % 3 === 0 ? 1 : 0.7;
    px(ctx, x, y, s, s, `rgba(250, 246, 238, ${tw * 0.7})`);
  }
}
