import { ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'motion/react';
import { WordReveal, Reveal, EASE } from './ui/motion';
import { Button, Halo } from './ui';

/* En-tête de page : centré, lumineux, halo doré */
/* Nuées de couleur en lent mouvement (fond signature du site) */
export const Clouds = ({ tone = 'sky' }: { tone?: 'sky' | 'gold' | 'mixed' }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
    <div className={`absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-3xl opacity-70 blob ${tone === 'gold' ? 'bg-gold-3' : 'bg-sky-2'}`} />
    <div className={`absolute top-[20%] -right-[15%] w-[45vw] h-[45vw] rounded-full blur-3xl opacity-80 blob ${tone === 'sky' ? 'bg-azure-3/30' : 'bg-gold-3'}`} style={{ animationDelay: '-7s' }} />
    <div className="absolute -bottom-[25%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-white blur-3xl opacity-80 blob" style={{ animationDelay: '-13s' }} />
  </div>
);

export const PageHero = ({ chapter, title, lead, children }: { chapter: string; title: string; lead?: string; children?: ReactNode }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yHalo = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative mesh overflow-hidden">
      <Clouds tone="mixed" />
      <motion.div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] md:w-[760px] opacity-80 pointer-events-none" style={reduce ? undefined : { y: yHalo }}><Halo /></motion.div>
      <motion.div className="wrap relative z-10 text-center" style={{ ...(reduce ? {} : { y: yText, opacity: fade }), paddingTop: 'calc(var(--header-h) + clamp(4rem, 9vw, 8rem))', paddingBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
        <motion.p className="chip mb-7" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>{chapter}</motion.p>
        <h1 className="t-display max-w-[18ch] mx-auto"><WordReveal text={title} inView={false} delay={0.1} /></h1>
        {lead && <motion.p className="t-lead text-mute max-w-[56ch] mx-auto mt-6" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: EASE }}>{lead}</motion.p>}
        {children && <motion.div className="mt-8 flex flex-wrap justify-center gap-3" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7, ease: EASE }}>{children}</motion.div>}
      </motion.div>
    </section>
  );
};

export const SectionHead = ({ chapter, title, lead, center = false, light = false, className = '', link }: { chapter: string; title: string; lead?: string; center?: boolean; light?: boolean; className?: string; link?: { label: string; to: string } }) => (
  <div className={`max-w-[760px] ${center ? 'mx-auto text-center' : ''} ${className}`}>
    <p className="chip mb-6">{chapter}</p>
    <h2 className={`t-h2 ${light ? 'text-white' : ''}`}><WordReveal text={title} /></h2>
    {lead && <Reveal delay={0.1}><p className={`t-body mt-5 max-w-[56ch] ${center ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-mute'}`}>{lead}</p></Reveal>}
    {link && <Reveal delay={0.15}><Link to={link.to} className={`ulink font-semibold inline-block mt-5 ${light ? 'text-white' : 'text-azure'}`}>{link.label}</Link></Reveal>}
  </div>
);

/* Île d'appel : panneau arrondi doré */
export const CtaBand = ({ title = 'Les niveaux les plus demandés se remplissent avant l’été.', desc = 'Une visite de quarante minutes pendant les cours, ou une pré-inscription en deux minutes. L’administration rappelle sous 48 h.' }: { title?: string; desc?: string }) => (
  <section className="section pt-0">
    <div className="wrap">
      <div className="rounded-[var(--r-lg)] bg-gold-3 relative overflow-hidden px-8 py-12 md:px-14 md:py-16 grid lg:grid-cols-12 gap-8 items-center">
        <Clouds tone="gold" />
        <div className="absolute -right-16 -bottom-24 w-[420px] opacity-60 pointer-events-none"><Halo /></div>
        <div className="lg:col-span-8 relative"><h2 className="t-h2"><WordReveal text={title} /></h2><Reveal delay={0.1}><p className="t-body text-mute mt-4 max-w-[52ch]">{desc}</p></Reveal></div>
        <Reveal className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 relative" delay={0.2}><Button to="/inscription" variant="azure" size="lg">Pré-inscrire</Button><Button to="/contact" variant="white" size="lg" icon="none">Réserver une visite</Button></Reveal>
      </div>
    </div>
  </section>
);

/* Cartes sobres */
export const CardGrid = ({ items, icons, cols = 3 }: { items: { title: string; text: string }[]; icons?: any[]; cols?: 2 | 3 | 4 }) => (
  <ul className={`grid sm:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : cols === 4 ? 'lg:grid-cols-4' : ''} gap-5`}>
    {items.map((it, i) => { const Icon = icons?.[i]; return (
      <Reveal key={i} as="li" delay={(i % cols) * 0.08} className="card p-7 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(10,42,94,0.3)] transition-all duration-500">
        {Icon && <span className="inline-flex w-11 h-11 rounded-full items-center justify-center bg-sky text-azure mb-5"><Icon size={18} /></span>}
        <h3 className="t-h4">{it.title}</h3><p className="t-small text-mute mt-2">{it.text}</p>
      </Reveal>
    ); })}
  </ul>
);

/* Ligne de temps : le fil doré se dessine au défilement */
export const Timeline = ({ items }: { items: { time: string; text: string }[] }) => {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const h = useTransform(useSpring(scrollYProgress, { stiffness: 80, damping: 24 }), [0, 1], ['0%', '100%']);
  return (
    <ol ref={ref} className="relative max-w-[760px] pl-10 space-y-4">
      <div className="absolute left-3 top-4 bottom-4 w-px bg-line" aria-hidden><motion.div className="w-full bg-gold origin-top" style={reduce ? { height: '100%' } : { height: h }} /></div>
      {items.map((d, i) => (
        <Reveal key={i} as="li" amount={0.5} delay={0.04 * i} className="relative card px-6 py-5 grid grid-cols-[6rem_1fr] gap-4 items-baseline">
          <span className="absolute -left-10 top-6 w-[15px] h-[15px] rounded-full bg-white border-2 border-gold" aria-hidden />
          <span className="font-display text-azure text-xl">{d.time}</span><span className="t-body">{d.text}</span>
        </Reveal>
      ))}
    </ol>
  );
};
