import { px, fillRow, circle, glowCircle, smoothNoise } from '@/components/PixelArtCanvas';

export function drawNostalgiaScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Warm dark room — single fill then gradient overlay
  ctx.fillStyle = '#140E0C';
  ctx.fillRect(0, 0, w, h);
  // Subtle gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(25, 17, 14, 0.6)');
  grad.addColorStop(1, 'rgba(20, 14, 12, 0.3)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

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
  // Sky on screen — gradient via fillRect rows
  const skyGrad = ctx.createLinearGradient(0, tvY, 0, tvY + Math.floor(tvH * 0.6));
  skyGrad.addColorStop(0, 'rgb(10, 10, 20)');
  skyGrad.addColorStop(1, 'rgb(25, 18, 35)');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(tvX, tvY, tvW, Math.floor(tvH * 0.6));

  // Screen stars
  for (let i = 0; i < 12; i++) {
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
  const glowGrad = ctx.createRadialGradient(
    tvX + tvW / 2, tvY + tvH / 2, 0,
    tvX + tvW / 2, tvY + tvH / 2, Math.floor(tvW * 0.8)
  );
  glowGrad.addColorStop(0, `rgba(232, 185, 122, ${screenGlow * 0.06})`);
  glowGrad.addColorStop(1, 'rgba(232, 185, 122, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(tvX - 20, tvY - 10, tvW + 40, tvH + 20);

  // CRT scanlines
  ctx.fillStyle = 'rgba(7, 10, 15, 0.15)';
  for (let y = tvY; y < tvY + tvH; y += 2) {
    ctx.fillRect(tvX, y, tvW, 1);
  }

  // TV buttons
  for (let i = 0; i < 3; i++) {
    px(ctx, tvX + tvW - 8, tvY + tvH + 2 + i * 2, 2, 1, i === 0 ? '#E8B97A' : '#3D2E54');
  }

  // Warm light from screen — gradient instead of 60 fillRects
  const leftGrad = ctx.createLinearGradient(tvX - 10, 0, tvX, 0);
  leftGrad.addColorStop(0, 'rgba(232, 185, 122, 0)');
  leftGrad.addColorStop(1, `rgba(232, 185, 122, ${0.03 * screenGlow})`);
  ctx.fillStyle = leftGrad;
  ctx.fillRect(0, tvY + 5, tvX, tvH - 10);

  const rightGrad = ctx.createLinearGradient(tvX + tvW, 0, tvX + tvW + 10, 0);
  rightGrad.addColorStop(0, `rgba(232, 185, 122, ${0.03 * screenGlow})`);
  rightGrad.addColorStop(1, 'rgba(232, 185, 122, 0)');
  ctx.fillStyle = rightGrad;
  ctx.fillRect(tvX + tvW, tvY + 5, w - tvX - tvW, tvH - 10);

  // Floor
  px(ctx, 0, h - 4, w, 4, '#1B1428');

  // Dust particles
  for (let i = 0; i < 8; i++) {
    const dx = tvX - 5 + Math.floor(((i * 37) % 100) / 100 * (tvW + 10));
    const dy = tvY + Math.floor(((i * 53) % 100) / 100 * tvH);
    const drift = Math.sin(time * 0.3 + i) * 1;
    px(ctx, dx + drift, dy, 1, 1, `rgba(232, 185, 122, ${0.2 + 0.2 * Math.sin(time + i)})`);
  }
}
