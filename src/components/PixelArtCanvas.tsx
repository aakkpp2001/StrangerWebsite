import { useEffect, useRef } from 'react';

export type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => void;

interface PixelArtCanvasProps {
  draw: DrawFn;
  className?: string;
  scale?: number;
  animated?: boolean;
  fps?: number;
}

export default function PixelArtCanvas({
  draw,
  className = '',
  scale = 3,
  animated = true,
  fps = 12,
}: PixelArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      width = Math.floor((w * dpr) / scale);
      height = Math.floor((h * dpr) / scale);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.imageSmoothingEnabled = false;
      drawRef.current(ctx, width, height, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Visibility — only animate when on-screen
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { rootMargin: '100px' }
    );
    io.observe(canvas);

    // Throttled render loop
    const frameInterval = 1000 / fps;
    let lastFrame = 0;
    let animId = 0;
    const startTime = performance.now();

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (!visible) return;
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;
      const time = (now - startTime) / 1000;
      drawRef.current(ctx, width, height, time);
    };

    if (animated) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', resize);
      io.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [scale, animated, fps]);

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

export function fillRow(
  ctx: CanvasRenderingContext2D,
  y: number,
  w: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(0, y, w, 1);
}

export function circle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string
) {
  ctx.fillStyle = color;
  const fcx = Math.floor(cx);
  const fcy = Math.floor(cy);
  for (let y = -r; y <= r; y++) {
    const xMax = Math.floor(Math.sqrt(r * r - y * y));
    ctx.fillRect(fcx - xMax, fcy + y, xMax * 2 + 1, 1);
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
  const maxR = r * 3;
  for (let i = maxR; i >= r; i--) {
    const alpha = intensity * (1 - (i - r) / (maxR - r));
    const c = color.replace('ALPHA', alpha.toFixed(3));
    circle(ctx, cx, cy, i, c);
  }
  circle(ctx, cx, cy, r, color.replace('ALPHA', '1'));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Pre-computed noise lookup
const NOISE_TABLE = new Float32Array(256);
for (let i = 0; i < 256; i++) {
  const v = Math.sin(i * 12.9898) * 43758.5453;
  NOISE_TABLE[i] = v - Math.floor(v);
}

export function smoothNoise(x: number, seed: number = 0) {
  const i = Math.floor(x) & 255;
  const next = (i + 1) & 255;
  const f = x - Math.floor(x);
  const fa = NOISE_TABLE[(i + seed) & 255];
  const fb = NOISE_TABLE[(next + seed) & 255];
  const t = f * f * (3 - 2 * f);
  return fa * (1 - t) + fb * t;
}

// Pre-computed star positions
interface StarPos { x: number; y: number; size: number; phase: number; }
const starCache = new Map<string, StarPos[]>();

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
  const key = `${w}x${h}_${count}_${seed}`;
  let positions = starCache.get(key);
  if (!positions) {
    positions = [];
    for (let i = 0; i < count; i++) {
      const sx = Math.abs(Math.sin(i * 78.233 + seed) * 43758.5453) % 1;
      const sy = Math.abs(Math.sin(i * 43.123 + seed * 2) * 43758.5453) % 1;
      positions.push({
        x: Math.floor(sx * w),
        y: Math.floor(sy * h),
        size: i % 7 === 0 ? 1.5 : i % 3 === 0 ? 1 : 0.7,
        phase: i * 1.7,
      });
    }
    starCache.set(key, positions);
  }

  for (let i = 0; i < positions.length; i++) {
    const s = positions[i];
    if (s.y < yStart || s.y > yEnd) continue;
    const tw = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.5 + s.phase));
    px(ctx, s.x, s.y, s.size, s.size, `rgba(250, 246, 238, ${tw * 0.7})`);
  }
}
