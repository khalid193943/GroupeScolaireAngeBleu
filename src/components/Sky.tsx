import { useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent, MotionValue } from 'motion/react';
import { Halo } from './ui';

/* Étoiles scintillantes (déterministes) */
export const StarField = ({ n = 90, className = '' }: { n?: number; className?: string }) => {
  const stars = useMemo(() => Array.from({ length: n }, (_, i) => { const r = (k: number) => ((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1 + 1) % 1; return { x: r(1) * 100, y: r(2) * 100, s: 1 + r(3) * 2.2, d: r(4) * 6, o: 0.35 + r(5) * 0.65 }; }), [n]);
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {stars.map((s, i) => <span key={i} className="absolute rounded-full bg-white twinkle" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o, animationDelay: `-${s.d}s`, animationDuration: `${3 + (s.d % 3)}s` }} />)}
      <span className="shooting" style={{ left: '15%', top: '18%', animationDelay: '2s' }} />
      <span className="shooting" style={{ left: '60%', top: '10%', animationDelay: '7s' }} />
    </div>
  );
};

/* Banc de nuages : silhouette SVG qui dérive, posée au bord d'une section */
const PUFFS = 'M0 120 C 80 120 90 60 170 60 C 230 60 240 30 320 30 C 400 30 420 80 500 80 C 560 80 580 40 660 40 C 740 40 760 90 840 90 C 900 90 920 55 1000 55 C 1080 55 1100 100 1180 100 C 1260 100 1280 70 1360 70 C 1420 70 1440 120 1440 120 Z';
export const CloudBand = ({ position = 'bottom', tone = 'white', flip = false }: { position?: 'top' | 'bottom'; tone?: 'white' | 'cloud' | 'night'; flip?: boolean }) => {
  const reduce = useReducedMotion();
  const fill = tone === 'white' ? '#FFFFFF' : tone === 'cloud' ? '#F7FAFF' : '#071A33';
  return (
    <div className={`absolute inset-x-0 ${position === 'bottom' ? 'bottom-[-2px]' : 'top-[-2px]'} h-[90px] md:h-[130px] pointer-events-none overflow-hidden`} aria-hidden style={{ transform: `${position === 'top' ? 'scaleY(-1)' : ''} ${flip ? 'scaleX(-1)' : ''}` }}>
      <motion.svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 left-[-10%] w-[120%] h-full" animate={reduce ? undefined : { x: ['0%', '-4%', '0%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}><path d={PUFFS} fill={fill} /></motion.svg>
    </div>
  );
};

/* L'auréole voyageuse : quitte le hero et descend avec le défilement, en ondulant */
export const TravelingHalo = ({ progress }: { progress: MotionValue<number> }) => {
  const reduce = useReducedMotion();
  const p = useSpring(progress, { stiffness: 50, damping: 20 });
  const top = useTransform(p, [0, 0.05, 0.92, 1], ['-20vh', '18vh', '76vh', '110vh']);
  // Ondule d'un bord à l'autre en évitant le centre (où se trouve le texte)
  const left = useTransform(p, (v) => `${50 + Math.tanh(3 * Math.sin(v * Math.PI * 4)) * 30}%`);
  const scale = useTransform(p, [0.05, 0.5, 0.92], [1, 0.55, 0.35]);
  const rotate = useTransform(p, (v) => Math.sin(v * Math.PI * 4) * -14);
  const opacity = useTransform(p, [0, 0.04, 0.9, 0.98], [0, 1, 1, 0]);
  if (reduce) return null;
  return (
    <motion.div className="fixed z-30 pointer-events-none w-[min(36vw,300px)] -translate-x-1/2 opacity-70" style={{ top, left, scale, rotate, opacity }} aria-hidden>
      <div className="absolute inset-[20%] rounded-full bg-gold-2/40 blur-3xl" />
      <Halo />
    </motion.div>
  );
};

/* Altimètre : où en est la descente */
export const Altimeter = ({ progress }: { progress: MotionValue<number> }) => {
  const [v, setV] = useState(0);
  useMotionValueEvent(progress, 'change', (x) => setV(x));
  const steps = [['Ciel', 0], ['Nuages', 0.25], ['École', 0.55], ['Terre', 0.85]] as const;
  const label = steps.reduce((acc, s) => (v >= s[1] ? s[0] : acc), 'Ciel' as string);
  return (
    <div className="hidden xl:flex fixed right-7 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 pointer-events-none" aria-hidden>
      <span className="chip !py-1 !px-3 text-[11px]">{label}</span>
      <div className="relative h-56 w-px bg-deep/15 rounded-full">
        <motion.div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold ring-4 ring-gold/25" style={{ top: useTransform(progress, [0, 1], ['0%', '96%']) }} />
        {steps.map(([n, at]) => <span key={n} className="absolute -left-1 w-2 h-px bg-deep/30" style={{ top: `${at * 100}%` }} />)}
      </div>
      <span className="text-[10px] font-bold tracking-widest text-mute uppercase [writing-mode:vertical-rl]">La descente</span>
    </div>
  );
};

export const useScrollPage = () => { const { scrollYProgress } = useScroll(); return scrollYProgress; };
