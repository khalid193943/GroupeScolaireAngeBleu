import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ETABLISSEMENT as E, HOME, IMG, PHOTOS, PEDAGOGIE, LANGUES, ENGAGEMENTS } from '../content/site';
import { BookOpenCheck, Languages, Cpu, ClipboardCheck, Users, Compass, ShieldCheck, HeartPulse, Eye, Clock, Globe } from 'lucide-react';
import { WordReveal, Reveal } from '../components/ui/motion';
import { Seo, Chip, Stat, Halo } from '../components/ui';
import { PageHero, SectionHead, CtaBand, CardGrid, Photo, PhotoStrip } from '../components/sections';

export default function Etablissement() {
  return (
    <main>
      <Seo title="L’établissement — Groupe Scolaire Ange Bleu" description={E.lead} path="/etablissement" />
      <PageHero chapter="L’établissement · depuis 1986" title={E.title} lead={E.lead} />

      {/* Photos d'ouverture */}
      <section className="section pt-0"><div className="wrap grid md:grid-cols-12 gap-5">
        <Reveal className="md:col-span-7"><Photo src={PHOTOS.kids} ratio="aspect-[16/10]" caption="La cour principale" /></Reveal>
        <Reveal className="md:col-span-5" delay={0.1}><Photo src={PHOTOS.classroom} ratio="aspect-[16/10] md:aspect-auto md:h-full" caption="Salle de classe" /></Reveal>
      </div></section>

      {/* Lettre du directeur — carte blanche centrée */}
      <section className="section pt-0"><div className="wrap">
        <div className="card p-8 md:p-14 max-w-[900px] mx-auto text-center relative overflow-hidden">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[420px] opacity-50"><Halo /></div>
          <Chip className="mb-8 relative">Le mot du directeur</Chip>
          <p className="t-quote text-deep relative"><WordReveal text={`« ${E.directorQuote} »`} stagger={0.02} /></p>
          <div className="mt-8 text-mute t-body max-w-[60ch] mx-auto space-y-4">{E.directorText.map((p, i) => <Reveal key={i} as="p" delay={0.05 * i}>{p}</Reveal>)}</div>
          <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-3"><span className="w-16 h-16 rounded-full bg-sky flex items-center justify-center ring-gold"><img src={IMG.monogramme} alt="" className="w-9" /></span><span className="t-meta">{HOME.director.role}</span></Reveal>
        </div>
      </div></section>

      {/* Mission & vision : deux îles */}
      <section className="section pt-0"><div className="wrap grid md:grid-cols-2 gap-5">
        {[['Notre mission', HOME.mission, 'bg-sky-2'], ['Notre vision', HOME.vision, 'bg-gold-3']].map(([h, p, bg], i) => <Reveal key={i} delay={i * 0.1} className={`${bg} rounded-[var(--r-lg)] p-8 md:p-12`}><Chip className="mb-6">{h}</Chip><p className="t-h2">{p}</p></Reveal>)}
      </div></section>

      {/* Pédagogie */}
      <section className="section pt-0"><div className="wrap">
        <SectionHead chapter="Notre pédagogie" title={PEDAGOGIE.title} lead={PEDAGOGIE.lead} />
        <div className="mt-12"><CardGrid items={PEDAGOGIE.blocks} icons={[BookOpenCheck, Languages, Cpu, ClipboardCheck, Users, Compass]} /></div>
      </div></section>

      {/* Langues */}
      <section className="section pt-0"><div className="wrap">
        <div className="mesh-blue on-blue rounded-[var(--r-lg)] p-8 md:p-14 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6"><SectionHead light chapter="Trois langues de travail" title={LANGUES.title} lead={LANGUES.text} /></div>
          <div className="lg:col-span-6 grid gap-4">{LANGUES.items.map(([l, t], i) => <Reveal key={i} delay={0.08 * i} className="glass-dark rounded-[var(--r)] p-6 flex gap-5 items-start"><span className="w-14 h-14 rounded-full bg-white/15 text-gold-2 flex items-center justify-center shrink-0"><Globe size={26} strokeWidth={1.5} /></span><span><span className="t-h4 text-white block">{l}</span><span className="text-white/75 text-sm block mt-1">{t}</span></span></Reveal>)}</div>
        </div>
      </div></section>

      {/* Histoire : frise horizontale de cartes */}
      <section className="section bg-white"><div className="wrap">
        <SectionHead chapter="Quarante ans, quelques dates" title="De la première classe au premier rang national." />
        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {E.history.map((h, i) => <Reveal key={i} as="li" delay={(i % 3) * 0.08} className="card p-7 relative overflow-hidden"><span className="absolute right-5 top-4 font-display text-[4.5rem] leading-none text-sky-2 select-none">{h.year}</span><p className="t-meta relative">{h.year}</p><p className="t-h3 mt-6 relative">{h.title}</p><p className="t-small text-mute mt-2 relative">{h.text}</p></Reveal>)}
        </ol>
      </div></section>

      {/* Principes */}
      <section className="section"><div className="wrap">
        <div className="mesh-blue on-blue rounded-[var(--r-lg)] p-8 md:p-14">
          <SectionHead light chapter="Tenus depuis 1986" title="Quatre principes, jamais négociés." lead="Tous vérifiables en une visite d’une heure." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{HOME.principles.map((p, i) => <Reveal key={i} delay={0.08 * i} className="glass-dark rounded-[var(--r)] p-6"><p className="font-display text-gold-2 text-2xl">0{i + 1}</p><p className="t-h4 text-white mt-3">{p.title}</p><p className="text-white/75 text-sm mt-2">{p.text}</p></Reveal>)}</div>
        </div>
      </div></section>

      {/* Équipe */}
      <section className="section pt-0"><div className="wrap">
        <SectionHead chapter="Corps enseignant" title="Des enseignants, pas des gestionnaires." lead="La qualité d’une école tient à une seule chose : qui se trouve devant la classe à 8 heures du matin." />
        <div className="mt-12"><CardGrid items={E.team} icons={[Eye, Users, Clock]} photos={[PHOTOS.team, PHOTOS.classroom, PHOTOS.kids]} /></div>
        <div className="mt-14 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5"><Chip className="mb-5">Comment nous recrutons</Chip><p className="t-body text-mute max-w-[44ch]">Aucun enseignant n’est titularisé sans avoir fait cours devant nous. Le diplôme ouvre la porte de l’entretien ; c’est la leçon d’essai qui décide.</p></div>
          <ol className="lg:col-span-7 grid sm:grid-cols-2 gap-4">{E.recruit.map((r, i) => <Reveal key={i} as="li" delay={0.06 * i} className="card p-5 flex gap-4"><span className="w-9 h-9 rounded-full bg-gold text-night font-display flex items-center justify-center shrink-0">{i + 1}</span><span className="t-small">{r}</span></Reveal>)}</ol>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-14 pt-10 border-t border-line">{E.teamNumbers.map(([n, l], i) => <Reveal key={i} delay={0.06 * i}><Stat n={n} l={l} /></Reveal>)}</div>
        <Reveal className="mt-10"><Link to="/contact" className="ulink font-semibold text-azure inline-flex items-center gap-1.5">Venez les voir faire cours <ArrowUpRight size={15} /></Link></Reveal>
      </div></section>
      {/* Engagements */}
      <section className="section pt-0"><div className="wrap">
        <SectionHead chapter="Nos engagements" title="Ce que nous garantissons aux familles." />
        <div className="mt-12"><CardGrid items={ENGAGEMENTS} icons={[ShieldCheck, HeartPulse, Eye, Clock]} cols={4} /></div>
      </div></section>
      <section className="pb-6"><PhotoStrip /></section>
      <CtaBand />
    </main>
  );
}
