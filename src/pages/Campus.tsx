import { FlaskConical, Bot, BookOpen, Monitor, Trophy, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import { CAMPUS as C } from '../content/site';
import { Reveal } from '../components/ui/motion';
import { Seo, Stat } from '../components/ui';
import { PageHero, SectionHead, CtaBand, CardGrid } from '../components/sections';

export default function Campus() {
  return (
    <main>
      <Seo title="Campus et équipements — Groupe Scolaire Ange Bleu" description={C.lead} path="/campus" />
      <PageHero chapter="L’établissement · Campus" title={C.title} lead={C.lead} />
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="Nos équipements" title="Ce que votre enfant utilisera chaque semaine." /><div className="mt-12"><CardGrid items={C.items} icons={[FlaskConical, Bot, BookOpen, Monitor, Trophy, UtensilsCrossed, ShieldCheck]} /></div></div></section>
      <section className="section pt-0"><div className="wrap"><div className="mesh-blue on-blue rounded-[var(--r-lg)] p-8 md:p-14"><SectionHead light chapter="En chiffres" title="Les moyens d’un grand établissement." /><div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">{C.numbers.map(([n, l], i) => <Reveal key={i} delay={0.06 * i}><Stat n={n} l={l} light /></Reveal>)}</div></div></div></section>
      <CtaBand title="Rien ne remplace une visite un matin de semaine." desc="Classes, laboratoires, cantine : quarante minutes pendant les cours, avec la direction." />
    </main>
  );
}
