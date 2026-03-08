import { useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════
const GRAVITY = 0.55;
const JUMP_V = -13;
const BASE_SPEED = 5;
const BOOST_SPEED = 9.5;
const BOOST_FRAMES = 90;
const BOOST_CD = 270;
const GROUND_RATIO = 0.78;
const CHASER_START = -300;
const CHASER_GAIN = 0.5;   // px per frame chaser gains
const BOOST_REPEL = 1.6;

// ═══════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════
type ObsKind = 'bush' | 'tree' | 'stone' | 'barrier' | 'hydrant';
interface Obs { x: number; w: number; h: number; kind: ObsKind; }
interface Bldg { x: number; w: number; h: number; col: string; label?: string; }
interface NPC { frac: number; speed: number; col: string; }

interface GS {
    cw: number; ch: number;
    // player feet Y (when on ground = GND)
    py: number; vy: number; onGround: boolean;
    chaser: number;    // px behind player (negative)
    obs: Obs[];
    bldgs: Bldg[];
    npcs: NPC[];
    sx: number; score: number;
    spd: number; boost: number; bcd: number;
    frame: number;
    started: boolean; over: boolean;
}

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
const BCOLS = ['#b7dcd9', '#E8CCAD', '#c8dce0', '#ddd0c8', '#c4d9b8'];
const LABELS = ['CAFÉ', 'SHOP', 'MART', 'FOOD', 'BAKERY', 'DELI'];

function mkBldgs(cw: number, gnd: number): Bldg[] {
    const arr: Bldg[] = [];
    let x = -60;
    while (x < cw + 250) {
        const w = 55 + Math.random() * 85;
        const h = 45 + Math.random() * gnd * 0.6;
        arr.push({ x, w, h, col: BCOLS[arr.length % BCOLS.length], label: Math.random() > .45 ? LABELS[arr.length % LABELS.length] : undefined });
        x += w + 6 + Math.random() * 15;
    }
    return arr;
}

function mkObs(x: number, ch: number): Obs {
    const kinds: ObsKind[] = ['bush', 'tree', 'stone', 'barrier', 'hydrant'];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const sz: Record<ObsKind, [number, number]> = { bush: [36, 28], tree: [28, 55], stone: [30, 19], barrier: [22, 38], hydrant: [18, 30] };
    const [w, h] = sz[kind];
    return { x, w, h, kind };
}

function init(cw: number, ch: number): GS {
    const gnd = ch * GROUND_RATIO;
    return {
        cw, ch, py: gnd, vy: 0, onGround: true,
        chaser: CHASER_START,
        obs: [{ x: cw + 120, w: 36, h: 28, kind: 'bush' }],
        bldgs: mkBldgs(cw, gnd),
        npcs: [0.08, 0.25, 0.45, 0.62, 0.8].map((frac, i) => ({ frac, speed: 0.3 + i * 0.08, col: BCOLS[i % BCOLS.length] })),
        sx: 0, score: 0,
        spd: BASE_SPEED, boost: 0, bcd: 0,
        frame: 0, started: false, over: false,
    };
}

// ═══════════════════════════════════════════════════════════
//  CHARACTER DRAW
//  feetY = the Y coordinate of the character's feet
// ═══════════════════════════════════════════════════════════
function drawChar(
    ctx: CanvasRenderingContext2D,
    cx: number,        // center x
    feetY: number,     // feet y — character is drawn ABOVE this
    frame: number,
    scale: number,
    isJumping: boolean,
    isRunning: boolean,
    primary: string,
    secondary: string,
    facingLeft = false,
) {
    const S = scale;
    ctx.save();
    if (facingLeft) { ctx.translate(cx * 2, 0); ctx.scale(-1, 1); }

    // Sizes relative to S
    const BODY_H = 20 * S;
    const HEAD_R = 9 * S;
    const LEG_H = 18 * S;

    // Key Y positions (all relative to feetY upward)
    const fY = feetY;
    const hipY = fY - LEG_H;
    const waistY = hipY - BODY_H * 0.35;
    const chestY = hipY - BODY_H;
    const neckY = chestY - 2 * S;
    const headY = neckY - HEAD_R;

    // ── Run animation frame (0-3, cycles every 8 ticks) ──
    const rf = isRunning ? Math.floor(frame / 6) % 4 : 0;

    // Leg positions: [frontKneeOffX, frontFootOffX, backKneeOffX, backFootOffX]
    // positive = in front (right) of character center, negative = behind (left)
    const legFrames = [
        [8, -2, -6, 10],   // frame 0: right leg forward
        [3, 8, -2, -4],   // frame 1: passing
        [-6, 2, 8, -10],   // frame 2: left leg forward
        [-2, -8, 3, 4],   // frame 3: passing
    ];
    const jump_legs = [12, 8, -12, -8]; // tucked

    const [fkx, ffx, bkx, bfx] = isJumping
        ? jump_legs.map(v => v * S)
        : legFrames[rf].map(v => v * S);

    // ── Tail (drawn first so behind body) ──
    const tailWag = isRunning ? Math.sin(frame * 0.3) * 10 * S : 5 * S;
    ctx.strokeStyle = secondary;
    ctx.lineWidth = 5 * S;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 6 * S, waistY);
    ctx.quadraticCurveTo(cx - 20 * S, waistY + tailWag, cx - 26 * S, hipY - tailWag * 1.2);
    ctx.stroke();

    // ── Back leg ──
    ctx.strokeStyle = primary;
    ctx.lineWidth = 6 * S;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, hipY);
    ctx.lineTo(cx + bkx, hipY + LEG_H * 0.5);
    ctx.lineTo(cx + bfx, fY);
    ctx.stroke();
    // back foot
    ctx.fillStyle = '#7B3B00';
    ctx.beginPath();
    ctx.ellipse(cx + bfx, fY - 2 * S, 6 * S, 3 * S, 0, 0, Math.PI * 2);
    ctx.fill();

    // ── Body ──
    const bodyBob = isRunning ? Math.sin(frame * 0.3) * 1.5 * S : 0;
    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.ellipse(cx, (chestY + hipY) / 2 + bodyBob, 9 * S, BODY_H * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();

    // ── Arms (clear swing) ──
    // arm swing: opposite to front leg
    const armSwing = isRunning ? Math.sin(frame * 0.52 + Math.PI) * 12 * S : 0;
    ctx.strokeStyle = primary;
    ctx.lineWidth = 5 * S;
    ctx.lineCap = 'round';
    // front arm
    ctx.beginPath();
    ctx.moveTo(cx + 4 * S, chestY + 5 * S + bodyBob);
    ctx.lineTo(cx + 14 * S + armSwing, chestY + 16 * S + bodyBob);
    ctx.stroke();
    // back arm
    ctx.beginPath();
    ctx.moveTo(cx - 4 * S, chestY + 5 * S + bodyBob);
    ctx.lineTo(cx - 14 * S - armSwing, chestY + 16 * S + bodyBob);
    ctx.stroke();
    // fists
    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.arc(cx + 14 * S + armSwing, chestY + 17 * S + bodyBob, 3 * S, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 14 * S - armSwing, chestY + 17 * S + bodyBob, 3 * S, 0, Math.PI * 2);
    ctx.fill();

    // ── Front leg ──
    ctx.strokeStyle = primary;
    ctx.lineWidth = 6 * S;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, hipY + bodyBob);
    ctx.lineTo(cx + fkx, hipY + LEG_H * 0.5 + bodyBob);
    ctx.lineTo(cx + ffx, fY);
    ctx.stroke();
    // front foot
    ctx.fillStyle = '#7B3B00';
    ctx.beginPath();
    ctx.ellipse(cx + ffx, fY - 2 * S, 6 * S, 3 * S, 0, 0, Math.PI * 2);
    ctx.fill();

    // ── Head ──
    ctx.fillStyle = secondary;
    ctx.beginPath();
    ctx.arc(cx + 4 * S, headY + bodyBob, HEAD_R, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.ellipse(cx + 10 * S, headY + 3 * S + bodyBob, 6 * S, 4 * S, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#440000';
    ctx.beginPath();
    ctx.arc(cx + 14 * S, headY + 1 * S + bodyBob, 1.8 * S, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.fillStyle = primary;
    [{ ex: -3, ecx: cx - 10 * S, ecy: headY - 18 * S }, { ex: 8, ecx: cx + 14 * S, ecy: headY - 18 * S }].forEach(({ ex, ecx, ecy }) => {
        ctx.beginPath();
        ctx.moveTo(cx + ex * S, headY - 6 * S + bodyBob);
        ctx.lineTo(ecx, ecy + bodyBob);
        ctx.lineTo(cx + ex * S + 9 * S, headY - 7 * S + bodyBob);
        ctx.fill();
    });

    // White of eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(cx + 9 * S, headY - 1 * S + bodyBob, 4 * S, 3.5 * S, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupil
    ctx.fillStyle = facingLeft ? '#ff3333' : '#1a0800';
    ctx.beginPath();
    ctx.arc(cx + 10 * S, headY - 0.5 * S + bodyBob, 2 * S, 0, Math.PI * 2);
    ctx.fill();
    // Shine
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(cx + 9 * S, headY - 2 * S + bodyBob, 0.9 * S, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// ═══════════════════════════════════════════════════════════
//  OBSTACLE DRAWS
// ═══════════════════════════════════════════════════════════
function drawObs(ctx: CanvasRenderingContext2D, o: Obs, gnd: number) {
    const bx = o.x, by = gnd - o.h;

    if (o.kind === 'bush') {
        const bushCircles: [number, number, number][] = [[.3, .6, .42], [.65, .6, .4], [.5, .35, .38]];
        bushCircles.forEach(([xf, yf, r]) => {
            ctx.fillStyle = '#2E7D32';
            ctx.beginPath(); ctx.arc(bx + o.w * xf, gnd - o.h * yf, o.h * r, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
            ctx.stroke();
        });
        // lighter highlight circle
        ctx.fillStyle = 'rgba(100,200,80,.35)';
        ctx.beginPath(); ctx.arc(bx + o.w * .4, gnd - o.h * .72, o.h * .18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(bx + o.w * .4, gnd - o.h * .2, o.w * .2, o.h * .2);
        ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 1.5;
        ctx.strokeRect(bx + o.w * .4, gnd - o.h * .2, o.w * .2, o.h * .2);
    }

    if (o.kind === 'tree') {
        // Trunk with outline
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(bx + o.w * .35, by + o.h * .5, o.w * .3, o.h * .5);
        ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 1.5;
        ctx.strokeRect(bx + o.w * .35, by + o.h * .5, o.w * .3, o.h * .5);
        // Foliage tiers with outlines
        ['#1B5E20', '#2E7D32', '#388E3C'].forEach((c, t) => {
            ctx.fillStyle = c;
            const tw = o.w * (0.95 - t * .05);
            const ty = by + (o.h * .5 * t) / 3;
            ctx.beginPath();
            ctx.moveTo(bx + o.w / 2, ty);
            ctx.lineTo(bx + o.w / 2 - tw / 2, by + o.h * .52);
            ctx.lineTo(bx + o.w / 2 + tw / 2, by + o.h * .52);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#1A237E22'; ctx.lineWidth = 1.5; ctx.stroke();
        });
        // Highlight
        ctx.fillStyle = 'rgba(120,220,80,.25)';
        ctx.beginPath(); ctx.ellipse(bx + o.w * .55, by + o.h * .18, o.w * .12, o.h * .1, 0, 0, Math.PI * 2); ctx.fill();
    }

    if (o.kind === 'stone') {
        ctx.fillStyle = '#9E9E9E';
        ctx.beginPath();
        ctx.moveTo(bx + o.w * .1, gnd); ctx.quadraticCurveTo(bx - 4, gnd - o.h * .6, bx + o.w * .3, gnd - o.h);
        ctx.quadraticCurveTo(bx + o.w * .7, gnd - o.h * 1.05, bx + o.w + 4, gnd - o.h * .5);
        ctx.quadraticCurveTo(bx + o.w + 5, gnd - 2, bx + o.w * .9, gnd);
        ctx.closePath(); ctx.fill();
        // Dark outline
        ctx.strokeStyle = '#424242'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx + o.w * .1, gnd); ctx.quadraticCurveTo(bx - 4, gnd - o.h * .6, bx + o.w * .3, gnd - o.h);
        ctx.quadraticCurveTo(bx + o.w * .7, gnd - o.h * 1.05, bx + o.w + 4, gnd - o.h * .5);
        ctx.quadraticCurveTo(bx + o.w + 5, gnd - 2, bx + o.w * .9, gnd);
        ctx.closePath(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.35)';
        ctx.beginPath(); ctx.ellipse(bx + o.w * .35, gnd - o.h * .72, o.w * .14, o.h * .14, -.4, 0, Math.PI * 2); ctx.fill();
    }

    if (o.kind === 'barrier') {
        // Posts
        ctx.fillStyle = '#263238';
        ctx.fillRect(bx + 1, by, 6, o.h); ctx.fillRect(bx + o.w - 7, by, 6, o.h);
        ctx.strokeStyle = '#000'; ctx.lineWidth = 1;
        ctx.strokeRect(bx + 1, by, 6, o.h); ctx.strokeRect(bx + o.w - 7, by, 6, o.h);
        // Warning bar
        ctx.fillStyle = '#EC802B';
        ctx.fillRect(bx, by + o.h * .18, o.w, o.h * .26);
        ctx.strokeStyle = '#BF360C'; ctx.lineWidth = 1.5;
        ctx.strokeRect(bx, by + o.h * .18, o.w, o.h * .26);
        // Stripes
        ctx.fillStyle = '#FFD740';
        for (let i = 0; i < 4; i++) {
            const sx = bx + (o.w / 4) * i;
            ctx.beginPath(); ctx.moveTo(sx, by + o.h * .18); ctx.lineTo(sx + o.w / 4 * .55, by + o.h * .44);
            ctx.lineTo(sx + o.w / 4 * .55 - 3, by + o.h * .44); ctx.lineTo(sx - 3, by + o.h * .18); ctx.closePath(); ctx.fill();
        }
    }

    if (o.kind === 'hydrant') {
        // Base
        ctx.fillStyle = '#D32F2F';
        ctx.fillRect(bx + o.w * .15, by + o.h * .55, o.w * .7, o.h * .45);
        // Body
        ctx.beginPath(); ctx.roundRect(bx + o.w * .22, by + o.h * .2, o.w * .56, o.h * .45, 4); ctx.fill();
        ctx.strokeStyle = '#8B0000'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(bx + o.w * .22, by + o.h * .2, o.w * .56, o.h * .45, 4); ctx.stroke();
        // Cap
        ctx.fillStyle = '#B71C1C';
        ctx.beginPath(); ctx.ellipse(bx + o.w * .5, by + o.h * .22, o.w * .3, o.h * .12, 0, 0, Math.PI * 2); ctx.fill();
        // Nozzles
        ctx.fillStyle = '#C62828';
        ctx.fillRect(bx - 2, by + o.h * .34, o.w * .25, o.h * .17);
        ctx.fillRect(bx + o.w * .75, by + o.h * .34, o.w * .25, o.h * .17);
        ctx.strokeStyle = '#8B0000'; ctx.lineWidth = 1;
        ctx.strokeRect(bx - 2, by + o.h * .34, o.w * .25, o.h * .17);
        ctx.strokeRect(bx + o.w * .75, by + o.h * .34, o.w * .25, o.h * .17);
        // Bolt highlight
        ctx.fillStyle = '#FFD600';
        ctx.beginPath(); ctx.arc(bx + o.w * .5, by + o.h * .44, o.w * .13, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1.5; ctx.stroke();
        // Shine
        ctx.fillStyle = 'rgba(255,255,255,.3)';
        ctx.beginPath(); ctx.ellipse(bx + o.w * .36, by + o.h * .3, o.w * .1, o.h * .07, -0.3, 0, Math.PI * 2); ctx.fill();
    }
}

// ─── Building ───────────────────────────────────────────
function drawBldg(ctx: CanvasRenderingContext2D, b: Bldg, gnd: number) {
    const by = gnd - b.h;
    ctx.fillStyle = b.col;
    ctx.fillRect(b.x, by, b.w, b.h);
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(b.x - 2, by - 4, b.w + 4, 6);
    // windows
    const wc = Math.floor((b.w - 12) / 18);
    const wr = Math.floor((b.h - 24) / 22);
    ctx.fillStyle = '#EDC55B';
    for (let r = 0; r < wr; r++) for (let c = 0; c < wc; c++)
        ctx.fillRect(b.x + 8 + c * 18, by + 14 + r * 22, 10, 9);
    // door
    ctx.fillStyle = '#5D4037'; ctx.fillRect(b.x + b.w / 2 - 6, gnd - 26, 12, 26);
    if (b.label) {
        ctx.fillStyle = '#EC802B'; ctx.fillRect(b.x + 6, gnd - 44, b.w - 12, 16);
        ctx.fillStyle = '#fff'; ctx.font = `bold 8px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(b.label, b.x + b.w / 2, gnd - 36);
        ctx.fillStyle = '#EC802B';
        ctx.beginPath(); ctx.moveTo(b.x + 4, gnd - 27); ctx.lineTo(b.x - 4, gnd - 20);
        ctx.lineTo(b.x + b.w + 4, gnd - 20); ctx.lineTo(b.x + b.w - 4, gnd - 27); ctx.closePath(); ctx.fill();
    }
    ctx.strokeStyle = 'rgba(0,0,0,.07)'; ctx.lineWidth = 1; ctx.strokeRect(b.x, by, b.w, b.h);
}

// ─── Lamp ───────────────────────────────────────────────
function drawLamp(ctx: CanvasRenderingContext2D, lx: number, gnd: number) {
    ctx.strokeStyle = '#546E7A'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(lx, gnd); ctx.lineTo(lx, gnd - 65); ctx.lineTo(lx + 20, gnd - 70); ctx.stroke();
    ctx.fillStyle = '#EDC55B'; ctx.beginPath(); ctx.arc(lx + 20, gnd - 73, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(237,197,91,.15)'; ctx.beginPath(); ctx.arc(lx + 20, gnd - 73, 18, 0, Math.PI * 2); ctx.fill();
}

// ─── NPC walker ─────────────────────────────────────────
function drawNPC(ctx: CanvasRenderingContext2D, nx: number, gnd: number, frame: number, col: string) {
    const bob = Math.sin(frame * .2) * 1.5, fY = gnd - 2 + bob;
    const la = Math.sin(frame * .18) * 7;
    ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    // body
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(nx, fY - 22, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(nx, fY - 18); ctx.lineTo(nx, fY - 10); ctx.stroke();
    // arms
    ctx.beginPath(); ctx.moveTo(nx, fY - 16); ctx.lineTo(nx - la, fY - 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(nx, fY - 16); ctx.lineTo(nx + la, fY - 10); ctx.stroke();
    // legs
    ctx.beginPath(); ctx.moveTo(nx, fY - 10); ctx.lineTo(nx + la, fY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(nx, fY - 10); ctx.lineTo(nx - la, fY); ctx.stroke();
}

// ═══════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════
const MiniGame = () => {
    const cvs = useRef<HTMLCanvasElement>(null);
    const wrap = useRef<HTMLDivElement>(null);
    const gs = useRef<GS | null>(null);
    const raf = useRef<number>(0);
    const lastTap = useRef(0);

    const doJump = useCallback(() => {
        const s = gs.current; if (!s) return;
        if (s.over) { gs.current = init(s.cw, s.ch); gs.current.started = true; return; }
        if (!s.started) { s.started = true; return; }
        if (s.onGround) { s.vy = JUMP_V; s.onGround = false; }
    }, []);

    const doBoost = useCallback(() => {
        const s = gs.current; if (!s || !s.started || s.over || s.bcd > 0) return;
        s.boost = BOOST_FRAMES; s.bcd = BOOST_CD;
    }, []);

    // ── MAIN DRAW ──────────────────────────────────────────
    const draw = useCallback((ctx: CanvasRenderingContext2D) => {
        const s = gs.current; if (!s) return;
        const { cw, ch, frame, sx, py } = s;
        const GND = ch * GROUND_RATIO;
        const PX = cw * 0.22;

        ctx.clearRect(0, 0, cw, ch);

        // Sky
        const sky = ctx.createLinearGradient(0, 0, 0, GND);
        sky.addColorStop(0, 'rgba(135,206,235,0.55)'); sky.addColorStop(.6, 'rgba(224,244,255,0.5)'); sky.addColorStop(1, 'rgba(255,249,230,0.45)');
        ctx.fillStyle = sky; ctx.fillRect(0, 0, cw, GND);

        // Sun
        ctx.fillStyle = '#FFD54F'; ctx.beginPath(); ctx.arc(cw * .84, ch * .1, 22, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,213,79,.18)'; ctx.beginPath(); ctx.arc(cw * .84, ch * .1, 38, 0, Math.PI * 2); ctx.fill();

        // Clouds (0.07x)
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        [[.06, .12, 26], [.31, .07, 18], [.54, .13, 22], [.77, .09, 20]].forEach(([cf, yf, r], ci) => {
            const cx2 = ((cf * cw * 2.5 - sx * .07 + ci * 200) % (cw + 220) + cw + 220) % (cw + 220) - 110;
            const cy2 = yf * ch;
            ctx.beginPath(); ctx.arc(cx2, cy2, r, 0, Math.PI * 2); ctx.arc(cx2 + r * .9, cy2 - r * .25, r * .72, 0, Math.PI * 2); ctx.arc(cx2 - r * .65, cy2, r * .62, 0, Math.PI * 2); ctx.fill();
        });

        // Hill silhouette (0.05x)
        ctx.fillStyle = 'rgba(168,210,210,.22)';
        ctx.beginPath(); ctx.moveTo(0, GND);
        [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2].forEach((hs, hi) => {
            const hx = ((hs * cw * 1.7 - sx * .05) % (cw * 2) + cw * 2) % (cw * 2) - 80;
            const hw = 80 + hi * 22, hh = GND * .2 + hi * 8;
            ctx.quadraticCurveTo(hx + hw * .35, GND - hh, hx + hw, GND);
        });
        ctx.lineTo(cw, GND); ctx.closePath(); ctx.fill();

        // Buildings (0.18x) — faded background
        ctx.globalAlpha = 0.35;
        s.bldgs.forEach(b => {
            const rx = ((b.x - sx * .18) % (cw + 320) + cw + 320) % (cw + 320) - 160;
            drawBldg(ctx, { ...b, x: rx }, GND);
        });
        ctx.globalAlpha = 1;

        // Lamps (0.62x)
        const lsp = 130, lc = Math.ceil(cw / lsp) + 2;
        for (let i = 0; i < lc; i++) {
            const lx = ((i * lsp - sx * .62) % (cw + lsp) + cw + lsp) % (cw + lsp) - lsp;
            drawLamp(ctx, lx, GND);
        }

        // NPCs (0.45x)
        if (s.started) {
            s.npcs.forEach((npc, ni) => {
                const nx = ((npc.frac * cw * 2 + ni * 100 - sx * .45 - frame * npc.speed) % (cw + 80) + cw + 80) % (cw + 80) - 40;
                if (nx > -20 && nx < cw + 20) drawNPC(ctx, nx, GND, frame + ni * 15, npc.col);
            });
        }

        // Sidewalk
        ctx.fillStyle = '#CFD8DC'; ctx.fillRect(0, GND, cw, ch * .035);
        ctx.strokeStyle = '#B0BEC5'; ctx.lineWidth = 1;
        const tw2 = 50, to = (sx * .88) % tw2;
        for (let tx = -to; tx < cw; tx += tw2) { ctx.beginPath(); ctx.moveTo(tx, GND); ctx.lineTo(tx, GND + ch * .035); ctx.stroke(); }

        // Road
        const rg = ctx.createLinearGradient(0, GND + ch * .035, 0, ch);
        rg.addColorStop(0, '#78909C'); rg.addColorStop(1, '#546E7A');
        ctx.fillStyle = rg; ctx.fillRect(0, GND + ch * .035, cw, ch - GND - ch * .035);
        ctx.strokeStyle = '#fff'; ctx.setLineDash([32, 22]); ctx.lineWidth = 2;
        const dashY = GND + (ch - GND) * .6, dOff = sx % 54;
        ctx.beginPath(); ctx.moveTo(-dOff, dashY); ctx.lineTo(cw + 54, dashY); ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = '#EC802B'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, GND); ctx.lineTo(cw, GND); ctx.stroke();

        // Speed lines when boosting
        if (s.boost > 0) {
            ctx.strokeStyle = 'rgba(255,255,80,.2)'; ctx.lineWidth = 2;
            for (let li = 0; li < 12; li++) {
                const ly = GND * (.1 + li * .07);
                const llen = 25 + li * 5;
                const lx2 = (frame * 9 + li * 65) % (cw + 80);
                ctx.beginPath(); ctx.moveTo(lx2, ly); ctx.lineTo(lx2 - llen, ly); ctx.stroke();
            }
        }

        // Obstacles
        s.obs.forEach(o => drawObs(ctx, o, GND));

        // ── Wolf chaser ──────────────────────────────────────
        const chaserX = PX + s.chaser;
        if (chaserX > -70) {
            // drawn offscreen to the left, facing right (chasing the fox)
            drawChar(ctx, chaserX, GND, frame, 0.92, false, s.started && !s.over, '#3a3560', '#5a5090', false);
            if (s.chaser > -100 && s.started) {
                ctx.fillStyle = '#3a3560';
                ctx.beginPath(); ctx.roundRect(chaserX - 38, GND - 90, 76, 24, 6); ctx.fill();
                ctx.fillStyle = '#fff'; ctx.font = `bold 9px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText("I'll get you! 😤", chaserX, GND - 78);
            }
        }

        // ── Fox runner — use py as feet Y position ───────────
        // py = feet Y (GND when on ground, lower when jumping)
        drawChar(ctx, PX, py, frame, 1, !s.onGround, s.started && !s.over, '#EC802B', '#EDC55B', false);

        // ── HUD ──────────────────────────────────────────────
        const hfs = Math.max(12, Math.min(cw * .028, 18));
        ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.roundRect(10, 10, 92, 26, 13); ctx.fill();
        ctx.fillStyle = '#EC802B'; ctx.font = `bold ${hfs}px DynaPuff,system-ui`;
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(`🏃 ${s.score}m`, 18, 23);

        if (s.bcd > 0 || s.boost > 0) {
            ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.roundRect(10, 42, 92, 22, 11); ctx.fill();
            ctx.fillStyle = s.boost > 0 ? '#EDC55B' : 'rgba(237,197,91,.4)';
            ctx.font = `bold ${hfs * .72}px Dekko,sans-serif`;
            ctx.fillText(s.boost > 0 ? `⚡ ${Math.ceil(s.boost / 18)}s` : `⚡ cd ${Math.ceil(s.bcd / 60)}s`, 18, 53);
        }

        const barW = Math.min(cw * .22, 120), barX = cw - barW - 12;
        ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.roundRect(barX - 4, 8, barW + 8, 30, 8); ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,.1)'; ctx.beginPath(); ctx.roundRect(barX, 18, barW, 12, 6); ctx.fill();
        const ratio = Math.min(1, Math.max(0, (s.chaser - CHASER_START) / (-CHASER_START)));
        ctx.fillStyle = ratio > .75 ? '#FF5252' : ratio > .45 ? '#FFD740' : '#69F0AE';
        ctx.beginPath(); ctx.roundRect(barX, 18, barW * ratio, 12, 6); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = `bold ${hfs * .58}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText('CHASER', barX + barW / 2, 10);

        // ── Start overlay ──────────────────────────────────────
        const mFS = Math.max(14, Math.min(cw * .038, 22));
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        if (!s.started && !s.over) {
            ctx.fillStyle = 'rgba(255,255,255,.9)';
            const bw = Math.min(cw * .76, 340), bh = ch * .46, bx2 = (cw - bw) / 2, by2 = (GND - bh) / 2 + 6;
            ctx.beginPath(); ctx.roundRect(bx2, by2, bw, bh, 16); ctx.fill();
            ctx.fillStyle = '#EC802B'; ctx.font = `bold ${mFS * 1.2}px DynaPuff,system-ui`;
            ctx.fillText('🦊 City Runner!', cw / 2, by2 + bh * .2);
            ctx.fillStyle = '#546E7A'; ctx.font = `${mFS * .68}px Arial`;
            ctx.fillText('Jump: Space / ↑ / Tap', cw / 2, by2 + bh * .44);
            ctx.fillText('Boost: Shift / Double-tap', cw / 2, by2 + bh * .58);
            ctx.fillStyle = '#EC802B'; ctx.font = `bold ${mFS * .82}px DynaPuff,system-ui`;
            ctx.fillText('Press SPACE or TAP to start!', cw / 2, by2 + bh * .82);
        }
        if (s.over) {
            ctx.fillStyle = 'rgba(255,255,255,.92)';
            const bw = Math.min(cw * .68, 300), bh = ch * .44, bx2 = (cw - bw) / 2, by2 = (GND - bh) / 2;
            ctx.beginPath(); ctx.roundRect(bx2, by2, bw, bh, 16); ctx.fill();
            ctx.fillStyle = '#EC802B'; ctx.font = `bold ${mFS * 1.1}px DynaPuff,system-ui`;
            ctx.fillText('CAUGHT! 😱', cw / 2, by2 + bh * .26);
            ctx.fillStyle = '#3a3560'; ctx.font = `${mFS * .75}px Arial`;
            ctx.fillText(`You ran ${s.score}m!`, cw / 2, by2 + bh * .53);
            ctx.fillStyle = '#EC802B'; ctx.font = `bold ${mFS * .72}px DynaPuff,system-ui`;
            ctx.fillText('Space / Tap to run again!', cw / 2, by2 + bh * .8);
        }
    }, []);

    // ── TICK ──────────────────────────────────────────────────
    const tick = useCallback(() => {
        const s = gs.current, canvas = cvs.current;
        if (!s || !canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;

        if (s.started && !s.over) {
            s.frame++;
            const GND = s.ch * GROUND_RATIO;
            const PX = s.cw * 0.22;

            // Normalize speed to canvas width so mobile & desktop feel the same
            const speedScale = s.cw / 960;
            const baseSpd = (BASE_SPEED + Math.floor(s.score / 40) * .35) * speedScale;
            s.spd = s.boost > 0 ? BOOST_SPEED * speedScale : baseSpd;
            if (s.boost > 0) { s.boost--; s.chaser -= BOOST_REPEL; }
            if (s.bcd > 0) s.bcd--;

            s.sx += s.spd;
            s.score = Math.floor(s.sx / 40);

            // ── Player physics ──
            s.vy += GRAVITY;
            s.py += s.vy;
            // Clamp to ground: py = feet Y, max at GND
            if (s.py >= GND) { s.py = GND; s.vy = 0; s.onGround = true; }

            // ── Obstacles ──
            s.obs = s.obs.map(o => ({ ...o, x: o.x - s.spd }));
            const last = s.obs[s.obs.length - 1];
            if (last && last.x < s.cw - (s.cw * .48 + Math.random() * s.cw * .28))
                s.obs.push(mkObs(s.cw + 30, s.ch));
            s.obs = s.obs.filter(o => o.x + o.w > -10);

            // ── Chaser ──
            s.chaser += CHASER_GAIN;
            if (s.chaser >= -8) { s.over = true; }

            // ── Collision (immediate game over) ──
            for (const o of s.obs) {
                const m = 5;
                // player feet = s.py, player occupies PX-14..PX+14 horizontally
                // obstacle top = GND - o.h
                if (PX + 14 > o.x + m && PX - 14 < o.x + o.w - m && s.py > GND - o.h) {
                    s.over = true; break;
                }
            }
        }
        draw(ctx);
        raf.current = requestAnimationFrame(tick);
    }, [draw]);

    // ── RESIZE ────────────────────────────────────────────────
    const resize = useCallback(() => {
        const canvas = cvs.current, w = wrap.current; if (!canvas || !w) return;
        const r = w.getBoundingClientRect();
        const W = Math.floor(r.width), H = Math.floor(r.height);
        canvas.width = W; canvas.height = H;
        const s = gs.current;
        const GND = H * GROUND_RATIO;
        if (s) { s.cw = W; s.ch = H; if (s.py > GND) s.py = GND; }
        else { gs.current = init(W, H); }
    }, []);

    useEffect(() => {
        resize();
        raf.current = requestAnimationFrame(tick);
        const ro = new ResizeObserver(resize);
        if (wrap.current) ro.observe(wrap.current);
        return () => { cancelAnimationFrame(raf.current); ro.disconnect(); };
    }, [resize, tick]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); doJump(); }
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') { e.preventDefault(); doBoost(); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [doJump, doBoost]);

    useEffect(() => {
        const ob = new IntersectionObserver(([en]) => {
            if (!en.isIntersecting && gs.current) gs.current.started = false;
        }, { threshold: .1 });
        if (wrap.current) ob.observe(wrap.current);
        return () => ob.disconnect();
    }, []);

    const handleTap = useCallback(() => {
        const now = Date.now();
        if (now - lastTap.current < 280) doBoost(); else doJump();
        lastTap.current = now;
    }, [doJump, doBoost]);

    return (
        <div ref={wrap} className="w-full h-full" style={{ minHeight: 0 }}>
            <canvas
                ref={cvs}
                className="block w-full h-full"
                style={{ touchAction: 'none', userSelect: 'none', cursor: 'pointer' }}
                onClick={handleTap}
                onTouchStart={e => { e.preventDefault(); handleTap(); }}
            />
        </div>
    );
};

export default MiniGame;
