import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence, MotionValue } from 'motion/react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Bot, Code2, FlaskConical, Languages, BookOpen, Cpu, GraduationCap, Sparkles, CalendarCheck, Trophy, Users } from 'lucide-react';
import { IMG, HOME, CYCLES, CycleId, PHOTOS, JOURNEE } from '../content/site';
import { LineMask, Reveal, Counter, EASE } from '../components/ui/motion';
import { Button, Seo, Halo, Chip, useMedia } from '../components/ui';
import { SectionHead, VideoCard, PhotoStrip, Photo } from '../components/sections';
import { preloaderDelay } from '../components/Preloader';
import { store, News } from '../data/store';
import { StarField, CloudBand } from '../components/Sky';
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
  return (
    <section ref={ref} className="relative overflow-hidden min-h-[100svh] flex flex-col bg-cloud">
      {/* La façade : plein cadre, légère parallaxe, fondue vers le blanc en bas pour porter le texte */}
      <motion.div className="absolute inset-x-0 -top-[6%] -bottom-[6%]" style={reduce ? undefined : { y: yPhoto }} initial={reduce ? false : { scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2.2, delay: d, ease: EASE }} aria-hidden>
        <img src={IMG.campus} alt="" className="w-full h-full object-cover object-[center_62%]" decoding="async" fetchPriority="high" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #F7FAFF 0%, rgba(247,250,255,0.98) 28%, rgba(247,250,255,0.9) 46%, rgba(247,250,255,0.45) 62%, rgba(247,250,255,0) 100%)' }} aria-hidden />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/35 to-transparent" aria-hidden />
      {/* L'auréole, au-dessus de l'école, dans le ciel */}
      <motion.div className="absolute left-1/2 -translate-x-1/2 top-[13%] md:top-[11%] w-[min(60vw,460px)] pointer-events-none drop-shadow-[0_20px_40px_rgba(227,167,47,0.35)]" style={reduce ? undefined : { y: yPhoto }} initial={reduce ? false : { opacity: 0, scale: 0.7, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.6, delay: d + 0.3, ease: EASE }} aria-hidden><Halo /></motion.div>
      <motion.div className="wrap relative z-10 flex-1 flex flex-col items-center justify-end text-center pb-14 md:pb-20" style={{ ...(reduce ? {} : { y: yText }), paddingTop: 'calc(var(--header-h) + 30svh)' }}>
        <motion.p className="chip mb-8" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: d + 0.4, ease: EASE }}>{HOME.eyebrow}</motion.p>
        <h1 className="t-hero max-w-[14ch]">
          <LineMask inView={false} delay={d + 0.45}>L’école qui forme</LineMask>
          <LineMask inView={false} delay={d + 0.6}><span className="em">la génération d’après.</span></LineMask>
        </h1>
        <motion.p className="t-lead text-mute mt-7 max-w-[44ch]" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: d + 1, ease: EASE }}>{HOME.lead}</motion.p>
        <motion.div className="mt-9 flex flex-wrap justify-center gap-3" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: d + 1.2, ease: EASE }}>
          <Button to="/contact" variant="azure" size="lg">Réserver une visite</Button>
          <Button to="/cycles/primaire" variant="white" size="lg" icon="none">Découvrir les cycles</Button>
        </motion.div>
      </motion.div>
      <CloudBand position="bottom" tone="white" />
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
    <section className="section night on-blue relative overflow-hidden">
      <StarField />
      <CloudBand position="top" tone="white" />
      <div className="wrap-narrow text-center relative">
        <Chip className="mb-8">Le mot du directeur</Chip>
        <div ref={ref}><p className="t-quote text-white">{reduce ? HOME.director.quote : words.map((w, i) => <LitWord key={i} word={w} i={i} n={words.length} p={p} />)}</p></div>
        <Reveal delay={0.1}><p className="t-body text-white/75 mt-10 max-w-[60ch] mx-auto">{HOME.director.text}</p></Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-3">
          <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center ring-gold glow"><img src={IMG.monogramme} alt="" className="w-9" /></span>
          <span className="t-meta">{HOME.director.role}</span>
          <Link to="/etablissement" className="ulink font-semibold text-gold-2 text-sm">Lire la suite</Link>
        </Reveal>
      </div>
      <CloudBand position="bottom" tone="cloud" flip />
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
/* La constellation — 2015 et 2025, deux étoiles qui se relient         */
/* ------------------------------------------------------------------ */
const Constellation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center center'] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });
  const line = useTransform(p, [0.15, 0.7], [0, 1]);
  const star2 = useTransform(p, [0.55, 0.8], [0, 1]);
  const big = useTransform(p, [0.7, 1], [0.6, 1]);
  const bigO = useTransform(p, [0.7, 0.95], [0, 1]);
  const Star = ({ year, label, x, y, o }: { year: string; label: string; x: string; y: string; o?: MotionValue<number> }) => (
    <motion.div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3" style={{ left: x, top: y, opacity: o ?? 1, scale: o ?? 1 }}>
      <span className="relative block w-6 h-6"><span className="absolute inset-0 rounded-full bg-gold-2 glow" /><span className="absolute -inset-3 rounded-full border border-gold-2/40" /><span className="absolute -inset-6 rounded-full border border-gold-2/15" /></span>
      <span className="font-display text-white text-[clamp(2.2rem,4.5vw,4.2rem)] leading-none">{year}</span>
      <span className="chip">{label}</span>
    </motion.div>
  );
  return (
    <section ref={ref} className="night on-blue relative overflow-hidden">
      <StarField n={140} />
      <CloudBand position="top" tone="white" />
      <div className="wrap relative section">
        <SectionHead center light chapter="Une constellation à deux étoiles" title="Premiers du Maroc. Deux fois." lead="Une première place peut être un accident de promotion. Deux, à dix ans d’écart, c’est une méthode — et douze années de travail pour chaque bachelier." />
        {/* Le ciel des deux étoiles */}
        <div className="relative mx-auto mt-16 max-w-[980px] h-[380px] md:h-[440px]">
          <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full" aria-hidden fill="none" preserveAspectRatio="none">
            <motion.path d="M 160 260 C 320 120, 520 120, 840 200" stroke="url(#c-g)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 10" style={{ pathLength: reduce ? 1 : line }} />
            <defs><linearGradient id="c-g" x1="0" x2="1"><stop offset="0" stopColor="#F4D27A" /><stop offset="1" stopColor="#fff" /></linearGradient></defs>
          </svg>
          <Star year="2015" label="1re place nationale · sciences" x="16%" y="65%" />
          <Star year="2025" label="1re place nationale · encore" x="84%" y="50%" o={reduce ? undefined : star2} />
          {/* Le grand 2× naît entre les deux étoiles */}
          <motion.div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={reduce ? undefined : { scale: big, opacity: bigO }}>
            <div className="relative">
              <div className="absolute -inset-10 md:-inset-16 halo-spin opacity-80"><Halo spin={false} className="w-full h-full" /></div>
              <p className="relative font-display text-gold-2 text-[clamp(5rem,12vw,11rem)] leading-none tracking-tight glow">2<span className="text-[0.55em] align-top">×</span></p>
            </div>
            <p className="text-white/80 text-sm font-bold tracking-[0.2em] uppercase mt-2">premiers du Maroc</p>
          </motion.div>
        </div>
        <Reveal delay={0.2} className="mt-10 text-center"><Button to="/resultats" variant="gold" size="lg">Voir tous les résultats</Button></Reveal>
      </div>
      <CloudBand position="bottom" tone="white" flip />
    </section>
  );
};

const Numbers = () => (
  <section className="section mesh relative overflow-hidden">
    <div className="wrap">
      <SectionHead center chapter="En chiffres" title="Quarante ans, en cinq repères." />
      <ul className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {HOME.numbers.map((x, i) => (
          <Reveal key={i} as="li" delay={i * 0.07} className="card p-6 text-center relative overflow-hidden group hover:-translate-y-1.5 transition-transform duration-500">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[120px] opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden><Halo spin={false} /></div>
            <p className="t-num text-azure mt-6">{x.n}</p>
            <p className="font-bold mt-3">{x.l}</p>
            <p className="t-small text-mute mt-1">{x.d}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Anciens                                                              */
/* ------------------------------------------------------------------ */
const Voices = () => {
  const base = HOME.alumni;
  const extra = [
    { name: 'Yasmine R.', role: 'Bachelière 2022 · CPGE, Rabat', text: 'Les devoirs en temps limité du lycée m’ont préparée aux concours mieux que tout ce que j’ai vu ensuite.' },
    { name: 'Omar L.', role: 'Parent d’élèves · El Jadida', text: 'Trois enfants, douze ans : jamais un appel sans réponse, jamais une surprise sur un bulletin.' },
    { name: 'Hiba M.', role: 'Bachelière 2020 · Architecture, Casablanca', text: 'Le club arts plastiques m’a donné le goût du dessin. Je fais de l’architecture aujourd’hui.' },
    { name: 'Mehdi K.', role: 'Bachelier 2023 · ENSA', text: 'Python au lycée, robotique au collège : mon école d’ingénieurs a commencé bien avant le bac.' },
    { name: 'Sara A.', role: 'Parent d’élève · Primaire', text: 'Ma fille lit couramment en trois langues à 8 ans. Je n’y croyais pas.' },
    { name: 'Anas B.', role: 'Bachelier 2018 · Médecine, Rabat', text: 'La rigueur d’ici est devenue une habitude. En médecine, c’est ce qui fait la différence.' },
    { name: 'Nour E.', role: 'Élève de 2e bac', text: 'On sait toujours ce qu’on attend de nous. C’est reposant, en fait.' },
  ];
  const all = [...base, ...extra];
  const rowA = all.slice(0, 5); const rowB = all.slice(5).concat(all.slice(0, 5 - all.slice(5).length));
  const Card = ({ v }: { v: (typeof all)[number] }) => (
    <figure className="card p-6 w-[280px] lg:w-[calc((100vw-2*var(--gutter)-4rem)/5)] shrink-0 flex flex-col">
      <Sparkles size={18} className="text-gold mb-3" />
      <blockquote className="font-display italic text-deep text-[1.05rem] leading-snug">{v.text}</blockquote>
      <figcaption className="mt-5 pt-4 border-t border-line flex items-center gap-3"><span className="w-9 h-9 rounded-full bg-azure text-white font-display flex items-center justify-center text-sm">{v.name[0]}</span><span><span className="block font-bold text-sm">{v.name}</span><span className="block text-xs text-mute">{v.role}</span></span></figcaption>
    </figure>
  );
  const Row = ({ list, reverse }: { list: typeof all; reverse?: boolean }) => (
    <div className="marquee-wrap"><div className={`marquee gap-4 ${reverse ? 'reverse' : ''}`} style={{ '--marquee-duration': '55s' } as any}><div className="flex gap-4 pr-4">{list.map((v, k) => <Card key={k} v={v} />)}</div><div className="flex gap-4 pr-4" aria-hidden>{list.map((v, k) => <Card key={k} v={v} />)}</div></div></div>
  );
  return (
    <section className="section mesh overflow-hidden">
      <div className="wrap"><SectionHead center chapter="Nos anciens parlent mieux que nous" title="Où sont-ils aujourd’hui." /></div>
      <div className="mt-14 space-y-4 px-[var(--gutter)]"><Row list={rowA} /><Row list={rowB} reverse /></div>
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
    <section className="night on-blue relative overflow-hidden">
      <StarField n={80} />
      <CloudBand position="top" tone="cloud" />
      <div className="wrap section relative">
        <SectionHead light chapter="Actualités" title="Ce qui se passe à Ange Bleu." link={{ label: 'Toutes les actualités', to: '/actualites' }} />
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 on-light">{news.map((n, i) => <NewsCard key={n.id} n={n} i={i} />)}</ul>
      </div>
      <CloudBand position="bottom" tone="cloud" flip />
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* L'école en quelques mots — mosaïque de photos + fiche d'identité     */
/* ------------------------------------------------------------------ */
const About = () => {
  const facts = [
    { Icon: CalendarCheck, t: 'Fondé en 1986', d: 'Quarante ans au même endroit, à El Jadida.' },
    { Icon: GraduationCap, t: 'Du CP au bac', d: 'Primaire, collège et lycée sous le même toit.' },
    { Icon: Languages, t: 'Trilingue', d: 'Arabe, français, anglais comme langues de travail.' },
    { Icon: Bot, t: 'Robotique et code', d: 'Dès le collège, un poste par élève.' },
    { Icon: Trophy, t: '2× premiers du Maroc', d: 'En 2015 et en 2025.' },
    { Icon: Users, t: 'Classes tenues', d: 'Effectifs limités, enseignants spécialistes.' },
  ];
  return (
    <section className="section mesh relative overflow-hidden">
      <div className="wrap grid lg:grid-cols-12 gap-12 items-center">
        {/* Mosaïque : trois photos posées comme des tirages */}
        <div className="lg:col-span-6 relative h-[420px] md:h-[520px]">
          {[[PHOTOS.kids, 'La cour', 'left-0 top-4 w-[62%] -rotate-3'], [PHOTOS.lab, 'Le laboratoire', 'right-0 top-0 w-[46%] rotate-2'], [PHOTOS.classroom, 'En classe', 'left-[22%] bottom-0 w-[56%] rotate-1']].map(([src, cap, cls], i) => (
            <Reveal key={i} delay={0.12 * i} className={`absolute ${cls}`}>
              <figure className="bg-white p-3 pb-10 rounded-[22px] shadow-[0_40px_80px_-30px_rgba(10,42,94,0.35)] hover:-translate-y-2 hover:rotate-0 transition-transform duration-700"><div className="aspect-[4/3] rounded-[14px] overflow-hidden bg-sky-2"><img src={src} alt="" loading="lazy" className="w-full h-full object-cover" /></div><figcaption className="absolute left-5 bottom-3 font-display italic text-deep">{cap}</figcaption></figure>
            </Reveal>
          ))}
          <div className="absolute -left-10 -bottom-10 w-[240px] halo-spin opacity-70" aria-hidden><Halo spin={false} /></div>
        </div>
        <div className="lg:col-span-6">
          <SectionHead chapter="L’école en quelques mots" title="Une école marocaine, tournée vers demain." lead="Le Groupe Scolaire Ange Bleu accueille les enfants d’El Jadida depuis 1986, de la première année primaire au baccalauréat. Le programme national, enseigné avec exigence ; trois langues de travail ; la robotique et le code ; et des parents traités en partenaires." />
          <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {facts.map((f, i) => <Reveal key={i} as="li" delay={0.05 * i} className="flex gap-4"><span className="w-12 h-12 rounded-full bg-white text-azure flex items-center justify-center shrink-0 shadow-sm ring-1 ring-line"><f.Icon size={22} strokeWidth={1.6} /></span><span><span className="block font-bold">{f.t}</span><span className="block text-sm text-mute">{f.d}</span></span></Reveal>)}
          </ul>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3"><Button to="/etablissement" variant="azure">Découvrir l’établissement</Button><Button to="/contact" variant="white" icon="none">Réserver une visite</Button></Reveal>
        </div>
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
  const photos = [PHOTOS.transport, PHOTOS.classroom, PHOTOS.kids, PHOTOS.canteen, PHOTOS.lab, PHOTOS.act2, PHOTOS.transport];
  const items = JOURNEE.steps;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const lg = useMedia('(min-width: 1024px)'); const sm = useMedia('(min-width: 640px)');
  const per = lg ? 3 : sm ? 2 : 1;
  const max = items.length - per;
  useEffect(() => { if (paused || reduce) return; const id = window.setInterval(() => setI((x) => (x >= max ? 0 : x + 1)), 3800); return () => window.clearInterval(id); }, [paused, reduce, max]);
  return (
    <section className="section bg-white overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHead chapter="Le quotidien" title={JOURNEE.title} lead={JOURNEE.lead} />
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setI((x) => Math.max(0, x - 1))} className="w-11 h-11 rounded-full bg-white border border-line flex items-center justify-center hover:bg-azure hover:text-white transition-colors" aria-label="Précédent"><ArrowLeft size={16} /></button>
            <button onClick={() => setI((x) => (x >= max ? 0 : x + 1))} className="w-11 h-11 rounded-full bg-white border border-line flex items-center justify-center hover:bg-azure hover:text-white transition-colors" aria-label="Suivant"><ArrowRight size={16} /></button>
          </div>
        </div>
        <div className="mt-12 overflow-visible">
          <motion.ol className="flex gap-5" animate={{ x: `calc(${-i} * (100% + 1.25rem) / ${per})` }} transition={{ duration: 0.8, ease: EASE }}>
            {items.map((st, k) => (
              <li key={k} className="card overflow-hidden group shrink-0" style={{ width: `calc((100% - ${(per - 1) * 1.25}rem) / ${per})` }}>
                <div className="aspect-[16/10] overflow-hidden bg-sky-2 relative"><img src={photos[k]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" /><span className="absolute left-4 top-4 chip">{st.time}</span></div>
                <div className="p-6"><h3 className="t-h4 text-lg">{st.title}</h3><p className="t-small text-mute mt-2">{st.text}</p></div>
              </li>
            ))}
          </motion.ol>
        </div>
        <ol className="mt-8 flex justify-center gap-2" aria-hidden>{Array.from({ length: max + 1 }).map((_, k) => <li key={k}><button onClick={() => setI(k)} className={`block h-2 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-gold' : 'w-2 bg-deep/20'}`} /></li>)}</ol>
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
  return (
    <main className="relative">
      <Seo title="Groupe Scolaire Ange Bleu — Primaire, Collège et Lycée à El Jadida" description="Depuis 1986 à El Jadida. Primaire, collège et lycée trilingues, robotique et numérique — et deux fois premiers du Maroc." />
      <Hero />
      <Director />
      <About />
      <Video />
      <Cycles />
      <Beyond />
      <Day />
      <Constellation />
      <Numbers />
      <Gallery />
      <LatestNews />
      <Voices />
    </main>
  );
}
