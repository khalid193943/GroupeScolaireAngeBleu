import React, { ReactNode, useEffect, useRef, useState, CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useInView, useSpring, MotionValue } from 'motion/react';

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal — apparition douce (opacité + léger déplacement). À réserver
   aux éléments qui portent l'attention : titres, images, blocs clés.   */
/* ------------------------------------------------------------------ */
export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className = '',
  once = true,
  amount = 0.25,
  as: Tag = 'div',
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: any;
  style?: CSSProperties;
}) => {
  const reduce = useReducedMotion();
  const M: any = (motion as any)[Tag] ?? motion.div;
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </M>
  );
};

/* ------------------------------------------------------------------ */
/* WordReveal — chaque mot monte depuis un masque. Pour le hero et
   les grandes phrases éditoriales.                                    */
/* ------------------------------------------------------------------ */
export const WordReveal = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.045,
  as: Tag = 'span',
  inView = true,
  duration = 1.1,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: any;
  inView?: boolean;
  duration?: number;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // On observe le conteneur (les mots sont masqués par overflow:hidden, donc invisibles pour l'IntersectionObserver)
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const show = reduce || !inView || seen;
  const words = text.split(' ');
  const M: any = (motion as any)[Tag] ?? motion.span;
  return (
    <M ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: '110%', opacity: 0.001 }}
            animate={show ? { y: '0%', opacity: 1 } : undefined}
            transition={{ duration, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </M>
  );
};

/* ------------------------------------------------------------------ */
/* LineMask — révèle un bloc (une ligne) depuis un masque.             */
/* ------------------------------------------------------------------ */
export const LineMask = ({ children, delay = 0, className = '', inView = true }: { children: ReactNode; delay?: number; className?: string; inView?: boolean }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const show = reduce || !inView || seen;
  return (
    <span ref={ref} className={`mask-line ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={reduce ? false : { y: '110%', opacity: 0.001 }}
        animate={show ? { y: '0%', opacity: 1 } : undefined}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* ClipReveal — une image (ou un bloc) qui se dévoile par clip-path.   */
/* ------------------------------------------------------------------ */
export const ClipReveal = ({ children, className = '', delay = 0, from = 'bottom' }: { children: ReactNode; className?: string; delay?: number; from?: 'bottom' | 'left' | 'top' | 'right' }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.25 });
  const start =
    from === 'bottom' ? 'inset(100% 0 0 0)' : from === 'top' ? 'inset(0 0 100% 0)' : from === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
  return (
    <div ref={ref} className={className.includes('aspect') ? '' : undefined}>
      <motion.div
        className={className}
        initial={reduce ? false : { clipPath: start }}
        animate={reduce || seen ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
        transition={{ duration: 1.3, delay, ease: EASE }}
        style={{ willChange: 'clip-path' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Parallax — déplacement vertical lié au scroll (transform only).     */
/* ------------------------------------------------------------------ */
export const Parallax = ({ children, className = '', amount = 60, scale = 1 }: { children: ReactNode; className?: string; amount?: number; scale?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={reduce ? undefined : { y, scale }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Counter — compteur animé quand il entre dans le viewport.           */
/* ------------------------------------------------------------------ */
export const Counter = ({ to, suffix = '', prefix = '', className = '', duration = 1.6 }: { to: number; suffix?: string; prefix?: string; className?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* useSmoothProgress — progression de scroll lissée pour les sections  */
/* épinglées (horizontal, etc.).                                        */
/* ------------------------------------------------------------------ */
export const useSmoothProgress = (ref: React.RefObject<HTMLElement | null>, offset: any = ['start start', 'end end']): MotionValue<number> => {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });
};

/* ------------------------------------------------------------------ */
/* useTrackDistance — largeur réelle à faire défiler pour une piste     */
/* horizontale épinglée (s'arrête exactement sur le dernier élément).   */
/* ------------------------------------------------------------------ */
export const useTrackDistance = (trackRef: React.RefObject<HTMLElement | null>, deps: any[] = []) => {
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (el) setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const t = setTimeout(measure, 600); // après chargement des polices
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return distance;
};

/* ------------------------------------------------------------------ */
/* useHorizontalPin — section épinglée dont la piste se déplace         */
/* horizontalement au scroll. Mesure la piste en pixels : fonctionne    */
/* à l'identique sur mobile et sur ordinateur.                          */
/* ------------------------------------------------------------------ */
export const useHorizontalPin = (sectionRef: React.RefObject<HTMLElement | null>, trackRef: React.RefObject<HTMLElement | null>) => {
  const progress = useSmoothProgress(sectionRef);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const gutter = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter')) || 24;
      setShift(Math.max(0, track.scrollWidth - window.innerWidth + gutter));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [trackRef]);
  const x = useTransform(progress, [0, 1], [0, -shift]);
  return { progress, x };
};
