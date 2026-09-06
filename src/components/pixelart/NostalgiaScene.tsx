import { px, circle, glowCircle, smoothNoise } from '@/components/PixelArtCanvas';

export function drawNostalgiaScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Warm dark room
  for (let y = 0; y < h; y++) {
    const t = y / h;
    px(ctx, 0, y, w, 1, `rgb(${Math.floor(20 + t * 5)},${Math.floor(14 + t * 3)},${Math.floor(12 + t * 2)})`);
  }

  // Old CRT TV — center
  const tvX = Math.floor(w * 0.3);
  const tvY = Math.floor(h * 0.2);
  const tvW = Math.floor(w * 0.4);
  const tvH = Math.floor(h * 0.45);

  // TV body
  px(ctx, tvX - 3, tvY - 3, tvW + 6, tvH + 6, '#2A1F3D');
  px(ctx, tvX - 4, tvY - 4, tvW + 8, 1, '#3D2E54');
  px(ctx, tvX - 4, tvY - 4, 1, tvH + 8, '#3D2E54');
  px(ctx, tvX + tvW + 3, tvY - 4, 1, tvH + 8, '#1B1428');

  // Screen — showing a pixel landscape
  px(ctx, tvX, tvY, tvW, tvH, '#0B0F18');
  // Sky on screen
  for (let y = tvY; y < tvY + Math.floor(tvH * 0.6); y++) {
    const t = (y - tvY) / (tvH * 0.6);
    px(ctx, tvX, y, tvW, 1, `rgb(${Math.floor(10 + t * 15)},${Math.floor(10 + t * 8)},${Math.floor(20 + t * 15)})`);
  }
  // Screen stars
  for (let i = 0; i < 15; i++) {
    const sx = tvX + 2 + Math.floor(((i * 43) % 100) / 100 * (tvW - 4));
    const sy = tvY + 2 + Math.floor(((i * 71) % 100) / 100 * Math.floor(tvH * 0.5));
    const tw = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.8 + i));
    px(ctx, sx, sy, 1, 1, `rgba(250, 246, 238, ${tw * 0.7})`);
  }
  // Screen moon
  circle(ctx, tvX + tvW * 0.7, tvY + tvH * 0.2, 3, '#E8B97A');
  // Screen ground
  px(ctx, tvX, tvY + Math.floor(tvH * 0.6), tvW, Math.floor(tvH * 0.4), '#111726');
  // Screen — tiny character
  const scX = tvX + Math.floor(tvW * 0.4);
  const scY = tvY + Math.floor(tvH * 0.7);
  px(ctx, scX, scY - 4, 2, 2, '#3D2E54');
  px(ctx, scX, scY - 2, 2, 2, '#2A1F3D');

  // Screen glow
  const screenGlow = 0.6 + 0.4 * Math.sin(time * 2);
  glowCircle(ctx, tvX + tvW / 2, tvY + tvH / 2, Math.floor(tvW * 0.6), `rgba(232, 185, 122, ${screenGlow * 0.04})`, 0.06);

  // CRT scanlines
  for (let y = tvY; y < tvY + tvH; y += 2) {
    px(ctx, tvX, y, tvW, 1, 'rgba(7, 10, 15, 0.15)');
  }

  // TV buttons
  for (let i = 0; i < 3; i++) {
    px(ctx, tvX + tvW - 8, tvY + tvH + 2 + i * 2, 2, 1, i === 0 ? '#E8B97A' : '#3D2E54');
  }

  // Warm light from screen illuminating room
  for (let i = 0; i < 30; i++) {
    const a = 0.03 * (1 - i / 30) * screenGlow;
    px(ctx, tvX - 10 - i, tvY + 5, 10, tvH - 10, `rgba(232, 185, 122, ${a})`);
    px(ctx, tvX + tvW + i, tvY + 5, 10, tvH - 10, `rgba(232, 185, 122, ${a})`);
  }

  // Floor
  px(ctx, 0, h - 4, w, 4, '#1B1428');

  // Dust particles in light
  for (let i = 0; i < 12; i++) {
    const dx = tvX - 5 + Math.floor(((i * 37) % 100) / 100 * (tvW + 10));
    const dy = tvY + Math.floor(((i * 53) % 100) / 100 * tvH);
    const drift = Math.sin(time * 0.3 + i) * 1;
    px(ctx, dx + drift, dy, 1, 1, `rgba(232, 185, 122, ${0.2 + 0.2 * Math.sin(time + i)})`);
  }
}
