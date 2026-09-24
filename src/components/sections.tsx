import { ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'motion/react';
import { WordReveal, Reveal, EASE } from './ui/motion';
import { Button, Halo } from './ui';
import { PHOTOS, POOL, VIDEO, GALLERY_CAPTIONS } from '../content/site';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';

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
      <motion.div className="absolute top-[calc(var(--header-h)+1.5rem)] left-1/2 -translate-x-1/2 w-[200px] md:w-[260px] pointer-events-none" style={reduce ? undefined : { y: yHalo }} aria-hidden><Halo /></motion.div>
      <motion.div className="wrap relative z-10 text-center" style={{ ...(reduce ? {} : { y: yText, opacity: fade }), paddingTop: 'calc(var(--header-h) + clamp(6rem, 11vw, 9.5rem))', paddingBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
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
    <div className={`w-[110px] mb-2 ${center ? 'mx-auto' : ''}`} aria-hidden><Halo className="w-full" /></div>
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

/* Cartes : grande icône, photo en tête si fournie */
export const CardGrid = ({ items, icons, photos, cols = 3 }: { items: { title: string; text: string }[]; icons?: any[]; photos?: string[]; cols?: 2 | 3 | 4 }) => (
  <ul className={`grid sm:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : cols === 4 ? 'lg:grid-cols-4' : ''} gap-5`}>
    {items.map((it, i) => { const Icon = icons?.[i]; const ph = photos?.[i % (photos.length || 1)]; return (
      <Reveal key={i} as="li" delay={(i % cols) * 0.08} className="card overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(10,42,94,0.3)] transition-all duration-500 group">
        {ph && <div className="aspect-[16/10] bg-sky-2 overflow-hidden"><img src={ph} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" /></div>}
        <div className="p-7">
          {Icon && <span className={`inline-flex w-14 h-14 rounded-full items-center justify-center bg-sky text-azure mb-5 ${ph ? '-mt-14 relative ring-4 ring-white bg-white shadow-lg' : ''}`}><Icon size={26} strokeWidth={1.6} /></span>}
          <h3 className="t-h4 text-lg">{it.title}</h3><p className="t-small text-mute mt-2">{it.text}</p>
        </div>
      </Reveal>
    ); })}
  </ul>
);

/* Bande de photos qui défile */
export const PhotoStrip = ({ photos = [...POOL, PHOTOS.canteen, PHOTOS.transport], captions = GALLERY_CAPTIONS }: { photos?: string[]; captions?: string[] }) => {
  const row = photos.map((ph, i) => (
    <figure key={i} className="w-[300px] md:w-[380px] shrink-0 rounded-[var(--r)] overflow-hidden bg-sky-2 relative aspect-[4/3]">
      <img src={ph} alt={captions[i] || ''} loading="lazy" className="w-full h-full object-cover" />
      {captions[i] && <figcaption className="absolute left-4 bottom-4 chip">{captions[i]}</figcaption>}
    </figure>
  ));
  return (
    <div className="marquee-wrap" aria-label="Photos de l’école">
      <div className="marquee gap-5" style={{ '--marquee-duration': '70s' } as any}><div className="flex gap-5 pr-5">{row}</div><div className="flex gap-5 pr-5" aria-hidden>{row}</div></div>
    </div>
  );
};

/* Photo seule, arrondie, avec légende */
export const Photo = ({ src, alt = '', ratio = 'aspect-[16/10]', className = '', caption }: { src: string; alt?: string; ratio?: string; className?: string; caption?: string }) => (
  <figure className={`relative rounded-[var(--r)] overflow-hidden bg-sky-2 ${ratio} ${className}`}>
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
    {caption && <figcaption className="absolute left-4 bottom-4 chip">{caption}</figcaption>}
  </figure>
);

/* Vidéo de présentation dans une carte arrondie : se lance quand elle est visible */
export const VideoCard = ({ src = VIDEO, poster = PHOTOS.classroom }: { src?: string; poster?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start end', 'center center'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const scale = useTransform(p, [0, 1], [0.92, 1]);
  const radius = useTransform(p, [0, 1], [60, 40]);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !reduce) v.play().then(() => setPlaying(true)).catch(() => {}); else { v.pause(); setPlaying(false); } }, { threshold: 0.5 });
    io.observe(v); return () => io.disconnect();
  }, [reduce]);
  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {}); else { v.pause(); setPlaying(false); } };
  return (
    <div ref={wrap}>
      <motion.div className="relative overflow-hidden bg-deep shadow-[0_60px_120px_-50px_rgba(10,42,94,0.5)] aspect-video" style={reduce ? { borderRadius: 40 } : { scale, borderRadius: radius }}>
        <video ref={ref} className="absolute inset-0 w-full h-full object-cover" muted={muted} loop playsInline preload="metadata" poster={poster} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}><source src={src} type="video/mp4" /></video>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/60 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <span className="chip !bg-white/85">Deux minutes à Ange Bleu</span>
          <div className="flex gap-2">
            <button onClick={toggle} className="w-12 h-12 rounded-full bg-white/90 text-deep flex items-center justify-center hover:bg-gold transition-colors" aria-label={playing ? 'Pause' : 'Lecture'}>{playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}</button>
            <button onClick={() => { setMuted((m) => !m); if (ref.current) ref.current.muted = !muted; }} className="w-12 h-12 rounded-full bg-white/90 text-deep flex items-center justify-center hover:bg-gold transition-colors" aria-label={muted ? 'Activer le son' : 'Couper le son'}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
