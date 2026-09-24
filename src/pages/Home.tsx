import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence, MotionValue } from 'motion/react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Bot, Code2, FlaskConical, Languages, BookOpen, Cpu, GraduationCap, Sparkles } from 'lucide-react';
import { IMG, HOME, CYCLES, CycleId, PHOTOS, JOURNEE } from '../content/site';
import { WordReveal, LineMask, Reveal, Counter, EASE } from '../components/ui/motion';
import { Button, Marquee, Seo, Halo, Chip } from '../components/ui';
import { SectionHead, VideoCard, PhotoStrip, Photo } from '../components/sections';
import { preloaderDelay } from '../components/Preloader';
import { store, News, fmtDate } from '../data/store';
import { NewsCard } from './Actualites';

/* ------------------------------------------------------------------ */
/* Hero — centré, lumineux, halo qui flotte, pastilles de verre         */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const reduce = useReducedMotion();
  const d = preloaderDelay();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const chips = [['2×', 'premiers du Maroc'], ['100 %', 'de réussite au bac'], ['40 ans', 'd’expérience'], ['3', 'langues enseignées']];
  return (
    <section ref={ref} className="relative overflow-hidden min-h-[100svh] flex flex-col bg-cloud">
      {/* La façade : plein cadre, légère parallaxe, fondue vers le blanc en bas pour porter le texte */}
      <motion.div className="absolute inset-x-0 -top-[6%] -bottom-[6%]" style={reduce ? undefined : { y: yPhoto }} initial={reduce ? false : { scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2.2, delay: d, ease: EASE }} aria-hidden>
        <img src={IMG.campus} alt="" className="w-full h-full object-cover object-[center_28%]" decoding="async" fetchPriority="high" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #F7FAFF 0%, rgba(247,250,255,0.98) 28%, rgba(247,250,255,0.9) 46%, rgba(247,250,255,0.45) 62%, rgba(247,250,255,0) 100%)' }} aria-hidden />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/35 to-transparent" aria-hidden />
      <motion.div className="wrap relative z-10 flex-1 flex flex-col items-center justify-end text-center pb-14 md:pb-20" style={{ ...(reduce ? {} : { y: yText }), paddingTop: 'calc(var(--header-h) + 42svh)' }}>
        <motion.div className="relative" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: d + 0.4, ease: EASE }}>
          <div className="absolute left-1/2 -translate-x-1/2 -top-14 w-[260px] pointer-events-none" aria-hidden><Halo /></div>
          <p className="chip mb-8 relative">{HOME.eyebrow}</p>
        </motion.div>
        <h1 className="t-hero max-w-[14ch]">
          <LineMask inView={false} delay={d + 0.45}>L’école qui forme</LineMask>
          <LineMask inView={false} delay={d + 0.6}><span className="em">la génération d’après.</span></LineMask>
        </h1>
        <motion.p className="t-lead text-mute mt-7 max-w-[44ch]" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: d + 1, ease: EASE }}>{HOME.lead}</motion.p>
        <motion.div className="mt-9 flex flex-wrap justify-center gap-3" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: d + 1.2, ease: EASE }}>
          <Button to="/contact" variant="azure" size="lg">Réserver une visite</Button>
          <Button to="/cycles/primaire" variant="white" size="lg" icon="none">Découvrir les cycles</Button>
        </motion.div>
        <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
          {chips.map(([n, l], i) => (
            <motion.div key={i} className="glass rounded-full px-5 py-2.5 flex items-center gap-3" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: [0, -6, 0] }} transition={{ opacity: { duration: 0.8, delay: d + 1.4 + i * 0.1 }, y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: d + 1.4 + i * 0.1 } }}>
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden />
              <span className="font-display text-azure text-xl leading-none">{n}</span>
              <span className="text-[14px] font-semibold text-deep">{l}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Le mot du directeur — s'illumine mot à mot en défilant               */
/* ------------------------------------------------------------------ */
const LitWord = ({ word, i, n, p }: { word: string; i: number; n: number; p: MotionValue<number> }) => {
  const start = i / n; const end = start + 1 / n;
  const opacity = useTransform(p, [start, end], [0.16, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">{word}</motion.span>;
};
const Director = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const words = HOME.director.quote.split(' ');
  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="wrap-narrow text-center">
        <Chip className="mb-8">Le mot du directeur</Chip>
        <div ref={ref}><p className="t-quote text-deep">{reduce ? HOME.director.quote : words.map((w, i) => <LitWord key={i} word={w} i={i} n={words.length} p={p} />)}</p></div>
        <Reveal delay={0.1}><p className="t-body text-mute mt-10 max-w-[60ch] mx-auto">{HOME.director.text}</p></Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-3">
          <span className="w-16 h-16 rounded-full bg-sky flex items-center justify-center ring-gold"><img src={IMG.monogramme} alt="" className="w-9" /></span>
          <span className="t-meta">{HOME.director.role}</span>
          <Link to="/etablissement" className="ulink font-semibold text-azure text-sm">Lire la suite</Link>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Cycles — trois cartes qui s'empilent au défilement                   */
/* ------------------------------------------------------------------ */
const CycleCard = ({ id, i, total, progress }: { id: CycleId; i: number; total: number; progress: MotionValue<number> }) => {
  const c = CYCLES[id];
  const reduce = useReducedMotion();
  const tones = ['bg-sky-2 text-deep', 'bg-gold-3 text-deep', 'mesh-blue on-blue'];
  const icons = { primaire: BookOpen, college: Cpu, lycee: GraduationCap };
  const Icon = icons[id];
  const start = i / total; const end = (i + 1) / total;
  const scale = useTransform(progress, [start, end], [1, 0.94]);
  const fade = useTransform(progress, [start, end], [1, 0.6]);
  const last = i === total - 1;
  return (
    <motion.li className="sticky" style={{ top: `calc(var(--header-h) + ${i * 14}px)`, ...(reduce || last ? {} : { scale, opacity: fade }) }}>
      <div className={`rounded-[var(--r-lg)] ${tones[i]} p-8 md:p-12 lg:p-14 min-h-[62svh] grid lg:grid-cols-12 gap-8 shadow-[0_40px_80px_-40px_rgba(10,42,94,0.35)]`}>
        <div className="lg:col-span-7 flex flex-col">
          <p className="chip mb-6 w-fit">{c.chapter} · {c.ages} · {c.levels}</p>
          <p className="font-display text-[0.9rem] opacity-60 mb-2">0{i + 1}</p>
          <h3 className="t-h1">{c.title} <span className={last ? 'em-gold' : 'em'}>— {c.tagline.split('·')[1]?.trim() || c.tagline}</span></h3>
          <p className={`t-lead mt-6 max-w-[46ch] ${last ? 'text-white/85' : 'text-mute'}`}>{c.heroLead}</p>
          <div className="mt-auto pt-8"><Link to={`/cycles/${id}`} className={`btn ${last ? 'btn-gold' : 'btn-azure'}`}>Découvrir le {c.title.toLowerCase()} <ArrowUpRight size={16} /></Link></div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-[var(--r)] overflow-hidden aspect-[4/3] lg:aspect-[4/5] bg-white/40"><img src={PHOTOS[id]} alt={c.title} loading="lazy" className="w-full h-full object-cover" /></div>
          <span className={`absolute -top-4 -right-2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${last ? 'bg-gold text-night' : 'bg-white text-azure'}`}><Icon size={30} strokeWidth={1.5} /></span>
        </div>
      </div>
    </motion.li>
  );
};
const Cycles = () => {
  const ref = useRef<HTMLOListElement>(null);
  const ids: CycleId[] = ['primaire', 'college', 'lycee'];
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section className="section mesh">
      <div className="wrap">
        <SectionHead center chapter="Un parcours en trois chapitres" title="Douze années, une seule maison." lead="Chaque cycle prépare le suivant, sans rupture ni redémarrage. Faites défiler : les chapitres se superposent." />
        <ol ref={ref} className="mt-16 space-y-6">{ids.map((id, i) => <CycleCard key={id} id={id} i={i} total={ids.length} progress={scrollYProgress} />)}</ol>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Au-delà du programme — grille « bento »                              */
/* ------------------------------------------------------------------ */
const Beyond = () => {
  const icons = [Bot, Code2, FlaskConical, Languages];
  return (
    <section className="section bg-white">
      <div className="wrap">
        <SectionHead chapter="Au-delà du programme officiel" title="Le programme marocain, plus ce qui vient après." lead="Toutes les matières nationales sont enseignées. Nous y ajoutons ce que le programme n’a pas encore." />
        <div className="grid md:grid-cols-12 gap-5 mt-14">
          {HOME.beyond.map((b, i) => { const Icon = icons[i]; const big = i === 0 || i === 3; return (
            <Reveal key={i} delay={0.08 * i} className={`${big ? 'md:col-span-7' : 'md:col-span-5'} rounded-[var(--r)] p-8 md:p-10 relative overflow-hidden min-h-[320px] flex flex-col justify-end group on-blue`}>
              <img src={[PHOTOS.act1, PHOTOS.classroom, PHOTOS.lab, PHOTOS.library][i]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />
              <span className="absolute right-6 top-6 w-16 h-16 rounded-full flex items-center justify-center bg-white/90 text-azure shadow-lg transition-transform duration-700 group-hover:rotate-12"><Icon size={30} strokeWidth={1.5} /></span>
              <h3 className="t-h2 text-white relative">{b.title}</h3>
              <p className="t-body mt-3 max-w-[44ch] text-white/85 relative">{b.text}</p>
            </Reveal>
          ); })}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Premiers du Maroc                                                    */
/* ------------------------------------------------------------------ */
const Firsts = () => (
  <section className="section">
    <div className="wrap">
      <div className="mesh-blue on-blue rounded-[var(--r-lg)] px-8 py-14 md:px-16 md:py-24 relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-[520px] opacity-40 halo-spin" aria-hidden><Halo spin={false} /></div>
        <div className="relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="chip mb-6">2015 et 2025</p>
            <h2 className="t-h1 text-white"><WordReveal text="Premiers du Maroc. Deux fois, à dix ans d’écart." /></h2>
            <Reveal delay={0.1}><p className="t-lead text-white/80 mt-6 max-w-[40ch]">Une première place peut être un accident de promotion. Deux, c’est une méthode.</p></Reveal>
            <Reveal delay={0.2} className="mt-8"><Button to="/resultats" variant="gold">Voir tous les résultats</Button></Reveal>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[['2', '×', 'premiers au niveau national'], ['100', '%', 'de réussite au bac'], ['85', '%', 'de mentions bien et très bien'], ['40', '', 'promotions depuis 1986']].map(([n, s, l], i) => (
              <Reveal key={i} delay={0.08 * i} className="glass-dark rounded-[var(--r)] p-6"><p className="t-num text-gold-2"><Counter to={Number(n)} suffix={s} /></p><p className="text-white/80 text-sm mt-2">{l}</p></Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Numbers = () => (
  <section className="section pt-0 bg-white">
    <div className="wrap grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 pt-14 border-t border-line">
      {HOME.numbers.map((x, i) => <Reveal key={i} delay={i * 0.06}><p className="t-num text-azure">{x.n}</p><p className="font-semibold mt-2">{x.l}</p><p className="t-small text-mute mt-1">{x.d}</p></Reveal>)}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Anciens                                                              */
/* ------------------------------------------------------------------ */
const Voices = () => {
  const list = HOME.alumni;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => { if (paused || reduce) return; const id = window.setInterval(() => setI((x) => (x + 1) % list.length), 6500); return () => window.clearInterval(id); }, [paused, reduce, list.length]);
  return (
    <section className="section mesh" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="wrap">
        <SectionHead center chapter="Nos anciens parlent mieux que nous" title="Où sont-ils aujourd’hui." />
        <div className="relative mt-14 max-w-[820px] mx-auto min-h-[340px]">
          <AnimatePresence mode="popLayout">
            <motion.figure key={i} className="card p-8 md:p-12 text-center absolute inset-0 flex flex-col items-center justify-center" initial={{ opacity: 0, y: 30, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -20, rotate: -2 }} transition={{ duration: 0.7, ease: EASE }}>
              <Sparkles size={22} className="text-gold mb-5" />
              <blockquote className="t-quote text-deep max-w-[30ch] !text-[clamp(1.25rem,2vw,1.9rem)]">{list[i].text}</blockquote>
              <figcaption className="mt-7 flex items-center gap-3"><span className="w-10 h-10 rounded-full bg-azure text-white font-display flex items-center justify-center">{list[i].name[0]}</span><span className="text-left"><span className="block font-bold text-sm">{list[i].name}</span><span className="block t-meta">{list[i].role}</span></span></figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-center gap-5">
          <button onClick={() => setI((i - 1 + list.length) % list.length)} className="w-11 h-11 rounded-full bg-white border border-line flex items-center justify-center hover:bg-azure hover:text-white transition-colors" aria-label="Précédent"><ArrowLeft size={16} /></button>
          <ol className="flex items-center gap-2" aria-hidden>{list.map((_, k) => <li key={k}><button onClick={() => setI(k)} className={`block h-2 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-gold' : 'w-2 bg-deep/20'}`} /></li>)}</ol>
          <button onClick={() => setI((i + 1) % list.length)} className="w-11 h-11 rounded-full bg-white border border-line flex items-center justify-center hover:bg-azure hover:text-white transition-colors" aria-label="Suivant"><ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Actualités — les trois dernières                                     */
/* ------------------------------------------------------------------ */
const LatestNews = () => {
  const [news, setNews] = useState<News[]>([]);
  useEffect(() => store.subscribe('news', (r) => setNews(r.filter((n) => n.published).slice(0, 3))), []);
  if (news.length === 0) return null;
  return (
    <section className="section bg-white">
      <div className="wrap">
        <SectionHead chapter="Actualités" title="Ce qui se passe à Ange Bleu." link={{ label: 'Toutes les actualités', to: '/actualites' }} />
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{news.map((n, i) => <NewsCard key={n.id} n={n} i={i} />)}</ul>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Vidéo de présentation                                                */
/* ------------------------------------------------------------------ */
const Video = () => (
  <section className="section mesh relative overflow-hidden">
    <div className="wrap">
      <SectionHead center chapter="En vidéo" title="Deux minutes dans nos couloirs." lead="Les classes, les laboratoires, la cour, la cantine : l’ambiance de l’école, sans commentaire." />
      <div className="mt-12 max-w-[1040px] mx-auto"><VideoCard /></div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Une journée à Ange Bleu — photos + étapes                            */
/* ------------------------------------------------------------------ */
const Day = () => {
  const photos = [PHOTOS.kids, PHOTOS.classroom, PHOTOS.sport, PHOTOS.canteen, PHOTOS.lab, PHOTOS.act2, PHOTOS.event];
  return (
    <section className="section bg-white">
      <div className="wrap">
        <SectionHead chapter="Le quotidien" title={JOURNEE.title} lead={JOURNEE.lead} />
        <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {JOURNEE.steps.map((st, i) => (
            <Reveal key={i} as="li" delay={(i % 3) * 0.08} className="card overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden bg-sky-2 relative"><img src={photos[i]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" /><span className="absolute left-4 top-4 chip">{st.time}</span></div>
              <div className="p-6"><h3 className="t-h4 text-lg">{st.title}</h3><p className="t-small text-mute mt-2">{st.text}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

const Gallery = () => (
  <section className="py-6 md:py-10 bg-white">
    <div className="wrap mb-8"><SectionHead chapter="L’école en images" title="La cour, les labos, la bibliothèque, le terrain." link={{ label: 'Visiter le campus', to: '/campus' }} /></div>
    <PhotoStrip />
  </section>
);

export default function Home() {
  const [ticker, setTicker] = useState<News[]>([]);
  useEffect(() => store.subscribe('news', (r) => setTicker(r.filter((n) => n.published).slice(0, 4))), []);
  return (
    <main>
      <Seo title="Groupe Scolaire Ange Bleu — Primaire, Collège et Lycée à El Jadida" description="Depuis 1986 à El Jadida. Primaire, collège et lycée trilingues, robotique et numérique — et deux fois premiers du Maroc." />
      <Hero />
      <div className="bg-azure text-white py-3.5 flex items-stretch"><Link to="/actualites" className="shrink-0 flex items-center gap-2 pl-[var(--gutter)] pr-5 text-[13px] font-bold tracking-[0.08em] uppercase text-gold-2">Actualités</Link><div className="min-w-0 flex-1"><Marquee duration={60} items={[...ticker.map((n) => <Link key={n.id} to={`/actualites/${n.id}`} className="text-[13px] font-bold tracking-[0.04em] whitespace-nowrap hover:underline"><span className="text-white/60 mr-2">{fmtDate(n.date)}</span>{n.title}</Link>), ...HOME.facts.map((f) => <span key={f} className="text-[13px] font-bold tracking-[0.08em] uppercase whitespace-nowrap">{f}</span>)]} /></div></div>
      <Director />
      <Video />
      <Cycles />
      <Beyond />
      <Day />
      <Firsts />
      <Numbers />
      <Gallery />
      <LatestNews />
      <Voices />
    </main>
  );
}
