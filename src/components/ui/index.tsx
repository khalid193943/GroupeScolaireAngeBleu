import { ReactNode, useEffect, useRef, useState, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Plus } from 'lucide-react';
import { SITE } from '../../content/site';
import { EASE } from './motion';

export const Button = ({ children, to, href, variant = 'azure', size = 'md', icon = 'arrow', className = '', onClick, type = 'button', disabled }: { children: ReactNode; to?: string; href?: string; variant?: 'azure' | 'gold' | 'white' | 'ghost' | 'ghost-light'; size?: 'md' | 'lg'; icon?: 'arrow' | 'none'; className?: string; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }) => {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const onMove = (e: React.MouseEvent) => { if (!window.matchMedia('(pointer: fine)').matches || !ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.16); y.set((e.clientY - r.top - r.height / 2) * 0.26); };
  const onLeave = () => { x.set(0); y.set(0); };
  const M = motion.create(to ? Link : href ? 'a' : 'button') as any;
  return <M ref={ref} to={to} href={href} type={to || href ? undefined : type} disabled={disabled} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x, y }} className={`group btn btn-${variant} ${size === 'lg' ? 'btn-lg' : ''} ${className}`}>{children}{icon === 'arrow' && <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />}</M>;
};

export const Chip = ({ children, className = '' }: { children: ReactNode; className?: string }) => <span className={`chip ${className}`}>{children}</span>;

export const Marquee = ({ items, duration = 40, className = '' }: { items: ReactNode[]; duration?: number; className?: string }) => {
  const row = <>{items.map((it, i) => <span key={i} className="flex items-center gap-8 pr-8">{it}<span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden /></span>)}</>;
  return <div className={`marquee-wrap ${className}`} aria-hidden><div className="marquee" style={{ '--marquee-duration': `${duration}s` } as CSSProperties}><div className="flex items-center">{row}</div><div className="flex items-center">{row}</div></div></div>;
};

export const Accordion = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i} className={`card overflow-hidden transition-colors ${on ? 'ring-gold' : ''}`}>
            <button onClick={() => setOpen(on ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-6" aria-expanded={on}>
              <span className="t-h4">{it.q}</span>
              <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${on ? 'bg-gold text-night rotate-45' : 'bg-sky text-azure'}`}><Plus size={16} /></span>
            </button>
            <AnimatePresence initial={false}>{on && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden"><p className="t-body text-mute px-6 pb-6 max-w-[62ch]">{it.a}</p></motion.div>}</AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const Seo = ({ title, description, path = '/' }: { title: string; description: string; path?: string }) => (
  <Helmet><title>{title}</title><meta name="description" content={description} /><link rel="canonical" href={`${SITE.domain}${path}`} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /></Helmet>
);

export const useMedia = (q: string) => {
  const [m, setM] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(q).matches : false));
  useEffect(() => { const mq = window.matchMedia(q); const f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f); }, [q]);
  return m;
};

/* Le halo doré du logo, en anneau SVG : signature graphique du site */
export const Halo = ({ className = '', spin = true }: { className?: string; spin?: boolean }) => (
  <svg viewBox="0 0 400 140" className={`${className} ${spin ? 'halo' : ''}`} aria-hidden fill="none">
    <defs><linearGradient id="halo-g" x1="0" x2="1"><stop offset="0" stopColor="#F4D27A" /><stop offset="0.5" stopColor="#E3A72F" /><stop offset="1" stopColor="#F4D27A" /></linearGradient></defs>
    <ellipse cx="200" cy="70" rx="190" ry="52" stroke="url(#halo-g)" strokeWidth="10" strokeLinecap="round" opacity="0.95" />
    <ellipse cx="200" cy="70" rx="190" ry="52" stroke="#fff" strokeWidth="2" opacity="0.5" />
  </svg>
);

export const Stat = ({ n, l, d, light = false }: { n: string; l: string; d?: string; light?: boolean }) => (
  <div><p className={`t-num ${light ? 'text-white' : 'text-deep'}`}>{n}</p><p className={`font-semibold mt-2 ${light ? 'text-white' : 'text-deep'}`}>{l}</p>{d && <p className={`t-small mt-1 ${light ? 'text-white/70' : 'text-mute'}`}>{d}</p>}</div>
);
