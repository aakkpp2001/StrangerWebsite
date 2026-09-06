import { px, circle, glowCircle, smoothNoise } from '@/components/PixelArtCanvas';

export function drawCharacterPortrait(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  variant: number
) {
  // Dark background with subtle color shift per character
  const bgColors = [
    { r: 15, g: 12, b: 25 },
    { r: 10, g: 14, b: 22 },
    { r: 18, g: 10, b: 20 },
  ];
  const bg = bgColors[variant % 3];
  for (let y = 0; y < h; y++) {
    const t = y / h;
    px(ctx, 0, y, w, 1, `rgb(${Math.floor(bg.r + t * 8)},${Math.floor(bg.g + t * 4)},${Math.floor(bg.b + t * 6)})`);
  }

  // Atmospheric particles
  for (let i = 0; i < 20; i++) {
    const px_ = Math.floor(((i * 53) % 100) / 100 * w);
    const py = Math.floor(((i * 89) % 100) / 100 * h);
    const drift = Math.sin(time * 0.3 + i) * 2;
    const a = 0.15 + 0.15 * Math.sin(time + i);
    const colors = ['rgba(232, 185, 122,', 'rgba(123, 168, 176,', 'rgba(138, 114, 168,'];
    px(ctx, px_ + drift, py, 1, 1, `${colors[variant % 3]} ${a})`);
  }

  // Figure — centered, portrait composition
  const cx = Math.floor(w / 2);
  const baseY = h - 4;

  if (variant === 0) {
    // THE TRAVELER — hooded, looking away
    // Hood
    px(ctx, cx - 5, baseY - 28, 11, 4, '#1B1428');
    px(ctx, cx - 5, baseY - 24, 11, 10, '#2A1F3D');
    px(ctx, cx - 4, baseY - 22, 9, 2, '#1B1428'); // hood opening shadow
    // Face hint
    px(ctx, cx - 1, baseY - 20, 2, 2, '#3D2E54');
    // Body/cloak
    px(ctx, cx - 5, baseY - 14, 11, 14, '#2A1F3D');
    px(ctx, cx - 6, baseY - 12, 1, 10, '#1B1428');
    px(ctx, cx + 6, baseY - 12, 1, 10, '#1B1428');
    // Lantern
    const flicker = 0.7 + 0.3 * Math.sin(time * 3);
    px(ctx, cx + 7, baseY - 10, 2, 2, `rgba(232, 185, 122, ${flicker})`);
    glowCircle(ctx, cx + 8, baseY - 10, 4, `rgba(232, 185, 122, ${flicker * 0.08})`, 0.1);
  } else if (variant === 1) {
    // THE STRANGER — masked, mysterious
    // Head
    px(ctx, cx - 3, baseY - 26, 7, 6, '#111726');
    // Mask
    px(ctx, cx - 2, baseY - 24, 5, 3, '#1A2133');
    // Eyes — glowing
    const flicker = 0.6 + 0.4 * Math.sin(time * 1.5);
    px(ctx, cx - 2, baseY - 23, 1, 1, `rgba(123, 168, 176, ${flicker})`);
    px(ctx, cx + 2, baseY - 23, 1, 1, `rgba(123, 168, 176, ${flicker})`);
    glowCircle(ctx, cx - 2, baseY - 23, 2, `rgba(123, 168, 176, ${flicker * 0.1})`, 0.08);
    glowCircle(ctx, cx + 2, baseY - 23, 2, `rgba(123, 168, 176, ${flicker * 0.1})`, 0.08);
    // Body
    px(ctx, cx - 4, baseY - 20, 9, 18, '#111726');
    px(ctx, cx - 5, baseY - 18, 1, 14, '#0B0F18');
    px(ctx, cx + 5, baseY - 18, 1, 14, '#0B0F18');
    // Collar
    px(ctx, cx - 4, baseY - 20, 9, 1, '#1A2133');
  } else {
    // THE ONE WHO REMEMBERS — face partially visible, melancholic
    // Hair
    px(ctx, cx - 4, baseY - 28, 9, 3, '#2A1F3D');
    px(ctx, cx - 4, baseY - 25, 9, 2, '#3D2E54');
    // Face
    px(ctx, cx - 3, baseY - 24, 7, 6, '#4A3858');
    // Eyes — sad, dim
    px(ctx, cx - 2, baseY - 22, 1, 1, '#E6DCC8');
    px(ctx, cx + 2, baseY - 22, 1, 1, '#E6DCC8');
    // Mouth — slight frown
    px(ctx, cx - 1, baseY - 19, 3, 1, '#3D2E54');
    // Tear light
    const tearA = 0.3 + 0.3 * Math.sin(time * 0.5);
    px(ctx, cx + 2, baseY - 21, 1, 1, `rgba(123, 168, 176, ${tearA * 0.4})`);
    // Body
    px(ctx, cx - 4, baseY - 18, 9, 16, '#2A1F3D');
    px(ctx, cx - 5, baseY - 16, 1, 12, '#1B1428');
    px(ctx, cx + 5, baseY - 16, 1, 12, '#1B1428');
    // Hands — clasped
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
