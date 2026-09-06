import { px, fillRow, circle, glowCircle, stars, smoothNoise } from '@/components/PixelArtCanvas';

export function drawWorldScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Alien sky — gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, 'rgb(15, 12, 25)');
  skyGrad.addColorStop(1, 'rgb(25, 17, 40)');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Distant planet
  const pX = w * 0.78;
  const pY = h * 0.28;
  const pR = Math.floor(h * 0.1);
  glowCircle(ctx, pX, pY, pR, 'rgba(91, 138, 148, ALPHA)', 0.05);
  circle(ctx, pX, pY, pR, '#44707A');
  circle(ctx, pX - pR * 0.3, pY - pR * 0.2, pR * 0.25, '#33585F');
  circle(ctx, pX + pR * 0.2, pY + pR * 0.3, pR * 0.15, '#33585F');

  // Stars
  stars(ctx, w, h, 40, 3.0, time, 0, h * 0.55);

  // Alien landscape — rolling hills
  const horizon = Math.floor(h * 0.58);
  for (let layer = 0; layer < 4; layer++) {
    const baseY = horizon + layer * Math.floor(h * 0.06);
    const amp = 8 + layer * 6;
    const colors = ['#1B1428', '#2A1F3D', '#111726', '#0B0F18'];
    for (let x = 0; x < w; x++) {
      const ny = smoothNoise(x * 0.02 + layer * 7, layer * 3);
      const hillY = baseY + Math.floor(ny * amp);
      px(ctx, x, hillY, 1, h - hillY, colors[layer]);
    }
  }

  // Strange alien plants — glowing stalks
  for (let i = 0; i < 6; i++) {
    const sx = Math.floor((i + 0.5) * w / 6 + Math.sin(i) * 10);
    const sy = horizon + Math.floor(h * 0.08) + Math.floor(smoothNoise(sx * 0.02, 7) * 8);
    const stalkH = 6 + (i % 3) * 3;
    const glow = 0.5 + 0.5 * Math.sin(time * 0.6 + i * 1.3);
    px(ctx, sx, sy - stalkH, 1, stalkH, '#2A1F3D');
    px(ctx, sx, sy - stalkH, 2, 2, `rgba(123, 168, 176, ${glow * 0.8})`);
    glowCircle(ctx, sx, sy - stalkH, 2, `rgba(123, 168, 176, ${glow * 0.06})`, 0.1);
  }

  // Small settlement
  const setX = w * 0.3;
  const setY = horizon + Math.floor(h * 0.02);
  for (let b = 0; b < 4; b++) {
    const bx = setX + b * 8;
    const bh = 5 + (b % 2) * 3;
    px(ctx, bx, setY - bh, 4, bh, '#111726');
    if (b % 3 !== 0) {
      px(ctx, bx + 1, setY - bh + 2, 1, 1, `rgba(232, 185, 122, ${0.6 + 0.4 * Math.sin(time + b)})`);
    }
    px(ctx, bx - 1, setY - bh, 6, 1, '#1B1428');
  }

  // Ground
  px(ctx, 0, h - 4, w, 4, '#070A0F');

  // Atmospheric haze
  for (let y = horizon - 4; y < horizon + 6; y++) {
    const a = 0.06 * (1 - Math.abs(y - horizon) / 5);
    fillRow(ctx, y, w, `rgba(82, 64, 107, ${a})`);
  }
}
