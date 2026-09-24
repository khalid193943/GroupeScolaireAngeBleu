import { FlaskConical, Drama, Trophy, Bot, BookOpen, Palette } from 'lucide-react';
import { VIE as V } from '../content/site';
import { Reveal } from '../components/ui/motion';
import { Seo } from '../components/ui';
import { PageHero, SectionHead, CtaBand, CardGrid } from '../components/sections';

export default function VieScolaire() {
  return (
    <main>
      <Seo title="Vie scolaire — Groupe Scolaire Ange Bleu" description={V.lead} path="/vie-scolaire" />
      <PageHero chapter="Vie scolaire · clubs, sorties, événements" title={V.title} lead={V.lead} />
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="Toute l’année, sur inscription" title="Six clubs, six façons de grandir." /><div className="mt-12"><CardGrid items={V.clubs} icons={[FlaskConical, Drama, Trophy, Bot, BookOpen, Palette]} /></div></div></section>
      <section className="section pt-0"><div className="wrap">
        <div className="mesh-blue on-blue rounded-[var(--r-lg)] p-8 md:p-14">
          <SectionHead light chapter="On ne travaille pas que pour les notes" title="Chaque année, nos élèves défendent l’école ailleurs qu’en classe." />
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{V.events.map((e, i) => <Reveal key={i} as="li" delay={0.05 * i} className="glass-dark rounded-[var(--r)] p-6"><p className="text-gold-2 text-xs font-bold tracking-wide uppercase">{e.when}</p><p className="t-h4 text-white mt-3">{e.title}</p><p className="text-white/75 text-sm mt-2">{e.text}</p></Reveal>)}</ol>
        </div>
      </div></section>
      <section className="section pt-0"><div className="wrap"><div className="bg-gold-3 rounded-[var(--r-lg)] p-8 md:p-14 max-w-[1000px] mx-auto"><SectionHead chapter="Une par trimestre, préparée en classe" title="Les sorties se méritent et se préparent." lead={V.outings} /></div></div></section>
      <CtaBand />
    </main>
  );
}
