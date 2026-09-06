import { px, circle, glowCircle } from '@/components/PixelArtCanvas';

export function drawStoryScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Interior — warm dark room, gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgb(20, 14, 18)');
  grad.addColorStop(1, 'rgb(12, 8, 14)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Window — looking out at stars
  const winX = Math.floor(w * 0.6);
  const winY = Math.floor(h * 0.1);
  const winW = Math.floor(w * 0.25);
  const winH = Math.floor(h * 0.35);
  px(ctx, winX, winY, winW, winH, '#070A0F');

  // Stars in window
  for (let i = 0; i < 20; i++) {
    const sx = winX + 2 + Math.floor(((i * 37) % 100) / 100 * (winW - 4));
    const sy = winY + 2 + Math.floor(((i * 71) % 100) / 100 * (winH - 4));
    const tw = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.5 + i));
    px(ctx, sx, sy, 1, 1, `rgba(250, 246, 238, ${tw * 0.7})`);
  }

  // Distant planet in window
  circle(ctx, winX + winW * 0.4, winY + winH * 0.3, 4, '#5B8A94');

  // Window frame
  px(ctx, winX - 1, winY, 1, winH, '#3D2E54');
  px(ctx, winX + winW, winY, 1, winH, '#3D2E54');
  px(ctx, winX, winY - 1, winW, 1, '#3D2E54');
  px(ctx, winX, winY + winH, winW, 1, '#3D2E54');
  px(ctx, winX + Math.floor(winW / 2), winY, 1, winH, '#3D2E54');
  px(ctx, winX, winY + Math.floor(winH / 2), winW, 1, '#3D2E54');

  // Moonlight from window — gradient
  const moonGrad = ctx.createLinearGradient(0, winY + winH, 0, h);
  moonGrad.addColorStop(0, 'rgba(123, 168, 176, 0.04)');
  moonGrad.addColorStop(1, 'rgba(123, 168, 176, 0)');
  ctx.fillStyle = moonGrad;
  ctx.fillRect(winX, winY + winH, winW, h - (winY + winH));

  // Two characters
  const baseY = h - 8;
  const c1x = Math.floor(w * 0.22);
  drawSeatedCharacter(ctx, c1x, baseY, '#2A1F3D', '#1B1428');
  const c2x = Math.floor(w * 0.35);
  drawSeatedCharacter(ctx, c2x, baseY, '#3D2E54', '#2A1F3D');

  // Warm light between them
  const lightX = Math.floor((c1x + c2x) / 2);
  const lightY = baseY - 10;
  const flicker = 0.7 + 0.3 * Math.sin(time * 4);
  glowCircle(ctx, lightX, lightY, 3, `rgba(232, 185, 122, ${flicker * 0.12})`, 0.15);
  px(ctx, lightX, lightY, 2, 2, `rgba(232, 185, 122, ${flicker})`);
  px(ctx, lightX, lightY - 1, 1, 1, `rgba(232, 185, 122, ${flicker * 0.6})`);

  // Warm light pooling on floor
  for (let dy = 0; dy < 8; dy++) {
    const a = 0.05 * (1 - dy / 8) * flicker;
    px(ctx, lightX - 4 - dy, baseY + dy, 10 + dy * 2, 1, `rgba(232, 185, 122, ${a})`);
  }

  // Floor
  px(ctx, 0, baseY, w, 8, '#0B0F18');
}

function drawSeatedCharacter(
  ctx: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  bodyColor: string,
  shadowColor: string
) {
  px(ctx, x, baseY - 16, 3, 3, bodyColor);
  px(ctx, x - 1, baseY - 13, 5, 7, bodyColor);
  px(ctx, x - 2, baseY - 11, 1, 4, shadowColor);
  px(ctx, x + 3, baseY - 11, 1, 4, shadowColor);
  px(ctx, x - 1, baseY - 6, 2, 6, shadowColor);
  px(ctx, x + 2, baseY - 6, 2, 6, shadowColor);
}
