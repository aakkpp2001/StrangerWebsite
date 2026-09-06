import { px, fillRow, circle, glowCircle, stars, smoothNoise } from '@/components/PixelArtCanvas';

// Scene 1: Quiet alien town at night
export function drawTownScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Sky — gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgb(8, 10, 20)');
  grad.addColorStop(1, 'rgb(23, 18, 40)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  stars(ctx, w, h * 0.6, 30, 1.0, time, 0, h * 0.5);

  // Moon
  circle(ctx, w * 0.8, h * 0.2, 5, '#D9A45C');
  glowCircle(ctx, w * 0.8, h * 0.2, 5, 'rgba(232, 185, 122, ALPHA)', 0.05);

  // Ground
  const horizon = Math.floor(h * 0.55);
  px(ctx, 0, horizon, w, h - horizon, '#0B0F18');

  // Buildings
  const buildings = [
    { x: 0.1, bw: 0.08, bh: 0.2 },
    { x: 0.2, bw: 0.06, bh: 0.15 },
    { x: 0.28, bw: 0.1, bh: 0.25 },
    { x: 0.42, bw: 0.07, bh: 0.18 },
    { x: 0.52, bw: 0.09, bh: 0.22 },
    { x: 0.65, bw: 0.06, bh: 0.12 },
    { x: 0.74, bw: 0.08, bh: 0.19 },
  ];
  for (const b of buildings) {
    const bx = Math.floor(b.x * w);
    const bw = Math.floor(b.bw * w);
    const bh = Math.floor(b.bh * h);
    px(ctx, bx, horizon - bh, bw, bh, '#111726');
    px(ctx, bx - 1, horizon - bh, bw + 2, 1, '#1B1428');
    for (let wy = 0; wy < bh - 2; wy += 4) {
      for (let wx = 0; wx < bw - 2; wx += 4) {
        if ((wx + wy) % 8 === 0) {
          const lit = 0.5 + 0.5 * Math.sin(time + wx + wy);
          px(ctx, bx + 1 + wx, horizon - bh + 2 + wy, 1, 1, `rgba(232, 185, 122, ${lit * 0.7})`);
        }
      }
    }
  }

  // Fog
  for (let y = horizon - 3; y < horizon + 5; y++) {
    const a = 0.06 * (1 - Math.abs(y - horizon) / 4);
    fillRow(ctx, y, w, `rgba(82, 64, 107, ${a})`);
  }
}

// Scene 2: Spaceship interior
export function drawShipInterior(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Dark interior — gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgb(10, 12, 18)');
  grad.addColorStop(1, 'rgb(15, 12, 23)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Wall panels
  ctx.fillStyle = '#1A2133';
  for (let x = 0; x < w; x += 12) {
    ctx.fillRect(x, 0, 1, h);
  }
  for (let y = 0; y < h; y += 12) {
    ctx.fillRect(0, y, w, 1);
  }

  // Window — viewing port
  const vx = Math.floor(w * 0.55);
  const vy = Math.floor(h * 0.15);
  const vw = Math.floor(w * 0.3);
  const vh = Math.floor(h * 0.4);
  px(ctx, vx, vy, vw, vh, '#070A0F');
  for (let i = 0; i < 20; i++) {
    const sx = vx + 2 + Math.floor(((i * 43) % 100) / 100 * (vw - 4));
    const sy = vy + 2 + Math.floor(((i * 79) % 100) / 100 * (vh - 4));
    const tw = 0.3 + 0.7 * Math.abs(Math.sin(time * 0.4 + i));
    px(ctx, sx, sy, 1, 1, `rgba(250, 246, 238, ${tw * 0.6})`);
  }
  px(ctx, vx - 1, vy, 1, vh, '#252E44');
  px(ctx, vx + vw, vy, 1, vh, '#252E44');
  px(ctx, vx, vy - 1, vw, 1, '#252E44');
  px(ctx, vx, vy + vh, vw, 1, '#252E44');

  // Control panel — blinking lights
  const cpY = h - 8;
  px(ctx, 0, cpY, w, 8, '#111726');
  px(ctx, 0, cpY, w, 1, '#1A2133');
  for (let i = 0; i < 12; i++) {
    const lx = 4 + i * (w / 14);
    const on = Math.sin(time * 2 + i * 0.7) > 0;
    const colors = ['232, 185, 122', '123, 168, 176', '232, 185, 122'];
    px(ctx, lx, cpY + 3, 1, 1, on ? `rgba(${colors[i % 3]}, 0.8)` : 'rgba(27, 20, 40, 0.5)');
  }

  // Ambient glow from window — gradient
  const glowGrad = ctx.createLinearGradient(0, vy + vh, 0, h);
  glowGrad.addColorStop(0, 'rgba(91, 138, 148, 0.03)');
  glowGrad.addColorStop(1, 'rgba(91, 138, 148, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(vx, vy + vh, vw, h - vy - vh);

  // Seat silhouette
  const chX = Math.floor(w * 0.2);
  px(ctx, chX, h - 20, 8, 12, '#1B1428');
  px(ctx, chX - 1, h - 20, 10, 1, '#2A1F3D');
  px(ctx, chX, h - 22, 8, 2, '#1B1428');
}

// Scene 3: Nighttime conversation
export function drawConversationScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Dark warm room
  ctx.fillStyle = '#0E0A10';
  ctx.fillRect(0, 0, w, h);

  // Window with starry sky
  const wx = Math.floor(w * 0.5);
  const wy = Math.floor(h * 0.08);
  const ww = Math.floor(w * 0.35);
  const wh = Math.floor(h * 0.3);
  px(ctx, wx, wy, ww, wh, '#070A0F');
  for (let i = 0; i < 15; i++) {
    const sx = wx + 2 + Math.floor(((i * 53) % 100) / 100 * (ww - 4));
    const sy = wy + 2 + Math.floor(((i * 67) % 100) / 100 * (wh - 4));
    px(ctx, sx, sy, 1, 1, `rgba(250, 246, 238, ${0.3 + 0.4 * Math.sin(time + i)})`);
  }
  px(ctx, wx - 1, wy, 1, wh, '#3D2E54');
  px(ctx, wx + ww, wy, 1, wh, '#3D2E54');
  px(ctx, wx, wy - 1, ww, 1, '#3D2E54');
  px(ctx, wx, wy + wh, ww, 1, '#3D2E54');

  // Two figures facing each other
  const baseY = h - 6;
  px(ctx, Math.floor(w * 0.15), baseY - 14, 4, 3, '#2A1F3D');
  px(ctx, Math.floor(w * 0.14), baseY - 11, 6, 8, '#2A1F3D');
  px(ctx, Math.floor(w * 0.12), baseY - 10, 2, 4, '#1B1428');
  px(ctx, Math.floor(w * 0.72), baseY - 14, 4, 3, '#3D2E54');
  px(ctx, Math.floor(w * 0.71), baseY - 11, 6, 8, '#3D2E54');
  px(ctx, Math.floor(w * 0.76), baseY - 10, 2, 4, '#2A1F3D');

  // Warm light between them
  const lx = Math.floor(w * 0.44);
  const ly = baseY - 8;
  const flicker = 0.7 + 0.3 * Math.sin(time * 4);
  glowCircle(ctx, lx, ly, 3, `rgba(232, 185, 122, ${flicker * 0.1})`, 0.12);
  px(ctx, lx, ly, 2, 2, `rgba(232, 185, 122, ${flicker})`);

  // Floor
  px(ctx, 0, baseY, w, 6, '#0B0F18');
}

// Scene 4: Mysterious planet landscape
export function drawPlanetScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Alien sky — gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgb(8, 10, 18)');
  grad.addColorStop(1, 'rgb(20, 16, 30)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  stars(ctx, w, h * 0.5, 40, 2.0, time, 0, h * 0.45);

  // Two moons
  circle(ctx, w * 0.7, h * 0.18, 6, '#E6DCC8');
  glowCircle(ctx, w * 0.7, h * 0.18, 6, 'rgba(230, 220, 200, ALPHA)', 0.03);
  circle(ctx, w * 0.85, h * 0.3, 3, '#D4C7AC');

  // Alien terrain
  const horizon = Math.floor(h * 0.5);
  for (let layer = 0; layer < 3; layer++) {
    const baseY = horizon + layer * Math.floor(h * 0.08);
    const amp = 10 + layer * 8;
    const colors = ['#1B1428', '#111726', '#070A0F'];
    for (let x = 0; x < w; x++) {
      const ny = smoothNoise(x * 0.03 + layer * 5, layer * 8);
      const hillY = baseY + Math.floor(ny * amp);
      px(ctx, x, hillY, 1, h - hillY, colors[layer]);
    }
  }

  // Rock formations
  for (let i = 0; i < 4; i++) {
    const rx = Math.floor((i + 0.3) * w / 4);
    const ry = horizon + Math.floor(h * 0.1);
    const rh = 8 + (i % 3) * 5;
    px(ctx, rx, ry - rh, 3, rh, '#1B1428');
    px(ctx, rx - 1, ry - rh, 5, 1, '#2A1F3D');
  }

  // Ground glow
  const gA = 0.1 + 0.05 * Math.sin(time * 0.5);
  fillRow(ctx, h - 3, w, `rgba(123, 168, 176, ${gA})`);
}

// Scene 5: Unexplained structure
export function drawStructureScene(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Dark sky — single fill
  ctx.fillStyle = '#070A0F';
  ctx.fillRect(0, 0, w, h);

  stars(ctx, w, h * 0.6, 40, 4.0, time, 0, h * 0.55);

  // Ground
  const horizon = Math.floor(h * 0.55);
  px(ctx, 0, horizon, w, h - horizon, '#0B0F18');

  // Ancient structure
  const sx = Math.floor(w * 0.35);
  const sw = Math.floor(w * 0.25);
  const sh = Math.floor(h * 0.35);

  px(ctx, sx, horizon - sh, 5, sh, '#1A2133');
  px(ctx, sx + sw - 5, horizon - sh, 5, sh, '#1A2133');
  px(ctx, sx, horizon - sh, sw, 4, '#1A2133');
  px(ctx, sx + 2, horizon - sh - 3, sw - 4, 3, '#252E44');
  px(ctx, sx + 5, horizon - sh + 4, sw - 10, sh - 4, '#070A0F');

  // Glowing runes
  const runeGlow = 0.6 + 0.4 * Math.sin(time * 1.2);
  for (let i = 0; i < 4; i++) {
    const ry = horizon - sh + 8 + i * 6;
    px(ctx, sx + 1, ry, 1, 2, `rgba(232, 185, 122, ${runeGlow * 0.6})`);
    px(ctx, sx + sw - 2, ry, 1, 2, `rgba(232, 185, 122, ${runeGlow * 0.6})`);
  }
  glowCircle(ctx, sx + sw / 2, horizon - sh / 2, 6, `rgba(232, 185, 122, ${runeGlow * 0.06})`, 0.08);

  // Tiny figure approaching
  const fx = Math.floor(w * 0.15);
  const fy = horizon + 4;
  px(ctx, fx, fy - 6, 2, 3, '#2A1F3D');
  px(ctx, fx, fy - 8, 2, 2, '#3D2E54');
  px(ctx, fx, fy - 3, 2, 3, '#1B1428');

  // Mist
  for (let y = horizon - 2; y < horizon + 6; y++) {
    const a = 0.06 * (1 - Math.abs(y - horizon) / 4);
    fillRow(ctx, y, w, `rgba(82, 64, 107, ${a})`);
  }
}
