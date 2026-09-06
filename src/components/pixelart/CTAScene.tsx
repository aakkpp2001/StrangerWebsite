import { px, circle, glowCircle, stars, smoothNoise } from '@/components/PixelArtCanvas';

export function drawCTAScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Deep space
  for (let y = 0; y < h; y++) {
    px(ctx, 0, y, w, 1, '#070A0F');
  }

  // Nebula glow — subtle warm/cool
  const nebX = w * 0.3;
  const nebY = h * 0.4;
  for (let r = 40; r > 0; r -= 2) {
    const a = 0.015 * (1 - r / 40);
    circle(ctx, nebX, nebY, r, `rgba(107, 86, 137, ${a})`);
  }
  const neb2X = w * 0.7;
  const neb2Y = h * 0.3;
  for (let r = 30; r > 0; r -= 2) {
    const a = 0.012 * (1 - r / 30);
    circle(ctx, neb2X, neb2Y, r, `rgba(68, 112, 122, ${a})`);
  }

  // Stars — lots
  stars(ctx, w, h, 100, 1.0, time);

  // Distant planet — large, beautiful
  const pX = w * 0.75;
  const pY = h * 0.65;
  const pR = Math.floor(h * 0.15);
  glowCircle(ctx, pX, pY, pR, 'rgba(91, 138, 148, ALPHA)', 0.04);
  circle(ctx, pX, pY, pR, '#33585F');
  // Bands
  for (let i = -pR; i <= pR; i += 3) {
    const bandW = Math.sqrt(pR * pR - i * i) * 2;
    const a = 0.15 + 0.1 * Math.sin(i * 0.5);
    px(ctx, pX - bandW / 2, pY + i, bandW, 1, `rgba(52, 88, 95, ${a})`);
  }
  // Highlight
  circle(ctx, pX - pR * 0.3, pY - pR * 0.3, pR * 0.4, 'rgba(91, 138, 148, 0.15)');

  // Small moon
  circle(ctx, w * 0.2, h * 0.25, 4, '#E6DCC8');
  glowCircle(ctx, w * 0.2, h * 0.25, 4, 'rgba(230, 220, 200, ALPHA)', 0.03);

  // Horizon — tiny silhouette of ground
  const horizon = h - 6;
  px(ctx, 0, horizon, w, 6, '#0B0F18');
  // Small hills
  for (let x = 0; x < w; x++) {
    const ny = smoothNoise(x * 0.03, 0);
    px(ctx, x, horizon - Math.floor(ny * 4), 1, 6, '#0B0F18');
  }

  // Tiny character looking up
  const cx = Math.floor(w * 0.4);
  const cy = horizon;
  px(ctx, cx, cy - 5, 2, 2, '#2A1F3D');
  px(ctx, cx, cy - 3, 2, 3, '#1B1428');

  // Vignette
  for (let i = 0; i < 12; i++) {
    const a = 0.06 * (1 - i / 12);
    px(ctx, 0, i, w, 1, `rgba(7, 10, 15, ${a})`);
    px(ctx, 0, h - 1 - i, w, 1, `rgba(7, 10, 15, ${a})`);
    px(ctx, i, 0, 1, h, `rgba(7, 10, 15, ${a})`);
    px(ctx, w - 1 - i, 0, 1, h, `rgba(7, 10, 15, ${a})`);
  }
}
