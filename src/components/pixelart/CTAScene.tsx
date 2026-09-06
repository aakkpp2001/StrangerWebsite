import { px, fillRow, circle, glowCircle, stars, smoothNoise } from '@/components/PixelArtCanvas';

export function drawCTAScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Deep space — single fill instead of per-row
  ctx.fillStyle = '#070A0F';
  ctx.fillRect(0, 0, w, h);

  // Nebula glow — pre-rendered static (no per-frame circle spam)
  drawNebula(ctx, w * 0.3, h * 0.4, 40, 107, 86, 137, 0.015);
  drawNebula(ctx, w * 0.7, h * 0.3, 30, 68, 112, 122, 0.012);

  // Stars
  stars(ctx, w, h, 80, 1.0, time);

  // Distant planet
  const pX = w * 0.75;
  const pY = h * 0.65;
  const pR = Math.floor(h * 0.15);
  glowCircle(ctx, pX, pY, pR, 'rgba(91, 138, 148, ALPHA)', 0.04);
  circle(ctx, pX, pY, pR, '#33585F');
  for (let i = -pR; i <= pR; i += 3) {
    const bandW = Math.sqrt(pR * pR - i * i) * 2;
    const a = 0.15 + 0.1 * Math.sin(i * 0.5);
    px(ctx, pX - bandW / 2, pY + i, bandW, 1, `rgba(52, 88, 95, ${a})`);
  }
  circle(ctx, pX - pR * 0.3, pY - pR * 0.3, pR * 0.4, 'rgba(91, 138, 148, 0.15)');

  // Small moon
  circle(ctx, w * 0.2, h * 0.25, 4, '#E6DCC8');
  glowCircle(ctx, w * 0.2, h * 0.25, 4, 'rgba(230, 220, 200, ALPHA)', 0.03);

  // Horizon
  const horizon = h - 6;
  px(ctx, 0, horizon, w, 6, '#0B0F18');
  for (let x = 0; x < w; x++) {
    const ny = smoothNoise(x * 0.03, 0);
    px(ctx, x, horizon - Math.floor(ny * 4), 1, 6, '#0B0F18');
  }

  // Tiny character looking up
  const cx = Math.floor(w * 0.4);
  px(ctx, cx, horizon - 5, 2, 2, '#2A1F3D');
  px(ctx, cx, horizon - 3, 2, 3, '#1B1428');

  // Vignette
  for (let i = 0; i < 12; i++) {
    const a = 0.06 * (1 - i / 12);
    fillRow(ctx, i, w, `rgba(7, 10, 15, ${a})`);
    fillRow(ctx, h - 1 - i, w, `rgba(7, 10, 15, ${a})`);
    px(ctx, i, 0, 1, h, `rgba(7, 10, 15, ${a})`);
    px(ctx, w - 1 - i, 0, 1, h, `rgba(7, 10, 15, ${a})`);
  }
}

// Lightweight nebula — uses gradient fill instead of dozens of circles
function drawNebula(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  cr: number,
  cg: number,
  cb: number,
  intensity: number
) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${intensity})`);
  grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}
