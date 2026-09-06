import PixelArtCanvas, { px, circle, glowCircle, lerp, stars, smoothNoise } from '@/components/PixelArtCanvas';

export function drawHeroScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  const horizon = Math.floor(h * 0.62);

  // Sky gradient — deep void to dusk
  for (let y = 0; y < horizon; y++) {
    const t = y / horizon;
    const r = Math.floor(lerp(7, 27, t));
    const g = Math.floor(lerp(10, 20, t));
    const b = Math.floor(lerp(15, 40, t));
    px(ctx, 0, y, w, 1, `rgb(${r},${g},${b})`);
  }

  // Stars
  stars(ctx, w, horizon, 120, 1.0, time, 0, horizon - 20);

  // Large moon/planet — distant
  const moonX = w * 0.72;
  const moonY = h * 0.22;
  const moonR = Math.floor(h * 0.08);
  // Glow
  glowCircle(ctx, moonX, moonY, moonR, 'rgba(232, 185, 122, ALPHA)', 0.04);
  // Body
  circle(ctx, moonX, moonY, moonR, '#D9A45C');
  // Craters
  circle(ctx, moonX - moonR * 0.3, moonY - moonR * 0.2, moonR * 0.18, '#C48A42');
  circle(ctx, moonX + moonR * 0.25, moonY + moonR * 0.15, moonR * 0.12, '#C48A42');
  circle(ctx, moonX - moonR * 0.1, moonY + moonR * 0.35, moonR * 0.1, '#C48A42');

  // Distant mysterious structure — far on horizon
  const structX = w * 0.25;
  const structBaseY = horizon;
  const structH = h * 0.12;
  // Spire
  px(ctx, structX - 2, structBaseY - structH, 4, structH, '#1B1428');
  px(ctx, structX - 1, structBaseY - structH * 1.3, 2, structH * 0.3, '#1B1428');
  // Glowing top
  px(ctx, structX - 1, structBaseY - structH * 1.3, 2, 2, '#E8B97A');
  // Soft glow
  glowCircle(ctx, structX, structBaseY - structH * 1.3, 3, 'rgba(232, 185, 122, ALPHA)', 0.06);

  // Mid-ground hills — layered
  for (let layer = 0; layer < 3; layer++) {
    const baseY = horizon + layer * Math.floor(h * 0.04);
    const amp = 12 + layer * 8;
    const color = layer === 0 ? '#111726' : layer === 1 ? '#0B0F18' : '#070A0F';
    for (let x = 0; x < w; x++) {
      const ny = smoothNoise(x * 0.015 + layer * 10, layer * 5);
      const hillY = baseY + Math.floor(ny * amp);
      px(ctx, x, hillY, 1, h - hillY, color);
    }
  }

  // Ground
  px(ctx, 0, horizon, w, h - horizon, '#070A0F');

  // Character — small, centered-ish, standing on a slight rise
  const charX = Math.floor(w * 0.38);
  const charBaseY = horizon + Math.floor(h * 0.04);
  drawCharacter(ctx, charX, charBaseY, time);

  // Subtle ground reflection near character
  for (let i = 0; i < 30; i++) {
    const rx = charX - 15 + i;
    if (rx >= 0 && rx < w) {
      const a = 0.02 * (1 - Math.abs(i - 15) / 15);
      px(ctx, rx, charBaseY + 2, 1, 1, `rgba(232, 185, 122, ${a})`);
    }
  }

  // Atmospheric fog at horizon
  for (let y = horizon - 8; y < horizon + 12; y++) {
    const a = 0.08 * (1 - Math.abs(y - horizon) / 10);
    px(ctx, 0, y, w, 1, `rgba(107, 86, 137, ${a})`);
  }
}

function drawCharacter(ctx: CanvasRenderingContext2D, x: number, baseY: number, time: number) {
  const breathe = Math.sin(time * 0.8) * 0.5;
  // Body
  px(ctx, x - 2, baseY - 14, 5, 10, '#2A1F3D'); // torso
  px(ctx, x - 1, baseY - 15, 3, 2, '#2A1F3D'); // shoulders
  // Head
  px(ctx, x - 1, baseY - 18 + breathe, 3, 3, '#3D2E54');
  // Hood/cloak
  px(ctx, x - 2, baseY - 17, 1, 3, '#1B1428');
  px(ctx, x + 2, baseY - 17, 1, 3, '#1B1428');
  px(ctx, x - 2, baseY - 16, 6, 1, '#1B1428');
  // Legs
  px(ctx, x - 2, baseY - 4, 2, 4, '#1B1428');
  px(ctx, x + 1, baseY - 4, 2, 4, '#1B1428');
  // Tiny glow — lantern
  const flicker = 0.7 + 0.3 * Math.sin(time * 3);
  px(ctx, x + 3, baseY - 10, 1, 1, `rgba(232, 185, 122, ${flicker})`);
  glowCircle(ctx, x + 3, baseY - 10, 2, `rgba(232, 185, 122, ${flicker * 0.1})`, 0.1);
}
