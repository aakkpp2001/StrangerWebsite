import { px, circle, glowCircle } from '@/components/PixelArtCanvas';

const BG_COLORS = [
  { r: 15, g: 12, b: 25 },
  { r: 10, g: 14, b: 22 },
  { r: 18, g: 10, b: 20 },
];

const PARTICLE_COLORS = [
  'rgba(232, 185, 122,',
  'rgba(123, 168, 176,',
  'rgba(138, 114, 168,',
];

// Pre-computed particle positions
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  x: ((i * 53) % 100) / 100,
  y: ((i * 89) % 100) / 100,
  phase: i,
}));

export function drawCharacterPortrait(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  variant: number
) {
  // Background — gradient fill
  const bg = BG_COLORS[variant % 3];
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, `rgb(${bg.r}, ${bg.g}, ${bg.b})`);
  grad.addColorStop(1, `rgb(${bg.r + 8}, ${bg.g + 4}, ${bg.b + 6})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Atmospheric particles
  const particleColor = PARTICLE_COLORS[variant % 3];
  for (let i = 0; i < PARTICLES.length; i++) {
    const p = PARTICLES[i];
    const drift = Math.sin(time * 0.3 + p.phase) * 2;
    const a = 0.15 + 0.15 * Math.sin(time + p.phase);
    px(ctx, Math.floor(p.x * w) + drift, Math.floor(p.y * h), 1, 1, `${particleColor} ${a})`);
  }

  // Figure
  const cx = Math.floor(w / 2);
  const baseY = h - 4;

  if (variant === 0) {
    // THE TRAVELER
    px(ctx, cx - 5, baseY - 28, 11, 4, '#1B1428');
    px(ctx, cx - 5, baseY - 24, 11, 10, '#2A1F3D');
    px(ctx, cx - 4, baseY - 22, 9, 2, '#1B1428');
    px(ctx, cx - 1, baseY - 20, 2, 2, '#3D2E54');
    px(ctx, cx - 5, baseY - 14, 11, 14, '#2A1F3D');
    px(ctx, cx - 6, baseY - 12, 1, 10, '#1B1428');
    px(ctx, cx + 6, baseY - 12, 1, 10, '#1B1428');
    const flicker = 0.7 + 0.3 * Math.sin(time * 3);
    px(ctx, cx + 7, baseY - 10, 2, 2, `rgba(232, 185, 122, ${flicker})`);
    glowCircle(ctx, cx + 8, baseY - 10, 4, `rgba(232, 185, 122, ${flicker * 0.08})`, 0.1);
  } else if (variant === 1) {
    // THE STRANGER
    px(ctx, cx - 3, baseY - 26, 7, 6, '#111726');
    px(ctx, cx - 2, baseY - 24, 5, 3, '#1A2133');
    const flicker = 0.6 + 0.4 * Math.sin(time * 1.5);
    px(ctx, cx - 2, baseY - 23, 1, 1, `rgba(123, 168, 176, ${flicker})`);
    px(ctx, cx + 2, baseY - 23, 1, 1, `rgba(123, 168, 176, ${flicker})`);
    glowCircle(ctx, cx - 2, baseY - 23, 2, `rgba(123, 168, 176, ${flicker * 0.1})`, 0.08);
    glowCircle(ctx, cx + 2, baseY - 23, 2, `rgba(123, 168, 176, ${flicker * 0.1})`, 0.08);
    px(ctx, cx - 4, baseY - 20, 9, 18, '#111726');
    px(ctx, cx - 5, baseY - 18, 1, 14, '#0B0F18');
    px(ctx, cx + 5, baseY - 18, 1, 14, '#0B0F18');
    px(ctx, cx - 4, baseY - 20, 9, 1, '#1A2133');
  } else {
    // THE ONE WHO REMEMBERS
    px(ctx, cx - 4, baseY - 28, 9, 3, '#2A1F3D');
    px(ctx, cx - 4, baseY - 25, 9, 2, '#3D2E54');
    px(ctx, cx - 3, baseY - 24, 7, 6, '#4A3858');
    px(ctx, cx - 2, baseY - 22, 1, 1, '#E6DCC8');
    px(ctx, cx + 2, baseY - 22, 1, 1, '#E6DCC8');
    px(ctx, cx - 1, baseY - 19, 3, 1, '#3D2E54');
    const tearA = 0.3 + 0.3 * Math.sin(time * 0.5);
    px(ctx, cx + 2, baseY - 21, 1, 1, `rgba(123, 168, 176, ${tearA * 0.4})`);
    px(ctx, cx - 4, baseY - 18, 9, 16, '#2A1F3D');
    px(ctx, cx - 5, baseY - 16, 1, 12, '#1B1428');
    px(ctx, cx + 5, baseY - 16, 1, 12, '#1B1428');
    px(ctx, cx - 2, baseY - 8, 5, 2, '#4A3858');
  }

  // Vignette
  for (let i = 0; i < 8; i++) {
    const a = 0.08 * (1 - i / 8);
    px(ctx, 0, i, w, 1, `rgba(7, 10, 15, ${a})`);
    px(ctx, 0, h - 1 - i, w, 1, `rgba(7, 10, 15, ${a})`);
    px(ctx, i, 0, 1, h, `rgba(7, 10, 15, ${a})`);
    px(ctx, w - 1 - i, 0, 1, h, `rgba(7, 10, 15, ${a})`);
  }
}
