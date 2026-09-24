import { PARENTS as P, PHOTOS } from '../content/site';
import { PhoneCall, NotebookPen, CalendarCheck } from 'lucide-react';
import { Reveal } from '../components/ui/motion';
import { Seo } from '../components/ui';
import { PageHero, SectionHead, CtaBand, CardGrid } from '../components/sections';

export default function Parents() {
  return (
    <main>
      <Seo title="Espace parents — Groupe Scolaire Ange Bleu" description={P.lead} path="/parents" />
      <PageHero chapter="Espace parents · suivi et communication" title={P.title} lead={P.lead} />
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="La communication" title="Vous savez toujours où en est votre enfant." /><div className="mt-12"><CardGrid items={P.items} icons={[PhoneCall, NotebookPen, CalendarCheck]} photos={[PHOTOS.team, PHOTOS.classroom, PHOTOS.event]} /></div></div></section>
      <section className="section pt-0"><div className="wrap"><div className="mesh-blue on-blue rounded-[var(--r-lg)] p-8 md:p-14"><SectionHead light chapter="Le contrat moral" title="Nos engagements, et les vôtres." lead="Une scolarité réussie est une affaire à trois : l’élève, l’école, la famille." /><div className="mt-12 grid md:grid-cols-3 gap-4">{P.contract.map(([w, t], i) => <Reveal key={i} delay={0.08 * i} className="glass-dark rounded-[var(--r)] p-6"><p className="font-display italic text-gold-2 text-2xl">{w}</p><p className="text-white/80 t-small mt-3">{t}</p></Reveal>)}</div></div></div></section>
      <CtaBand title="La direction reçoit sans rendez-vous le samedi matin." desc="Et répond à toute question de parent sous 48 heures. Pour une première rencontre, réservez une visite pendant les cours." />
    </main>
  );
}
