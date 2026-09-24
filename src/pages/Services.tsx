import { UtensilsCrossed, Bus, BookOpenCheck, Sunrise, HeartPulse } from 'lucide-react';
import { SERVICES as S, FAQ, PHOTOS } from '../content/site';
import { Seo, Accordion } from '../components/ui';
import { PageHero, SectionHead, CtaBand, Timeline, CardGrid } from '../components/sections';

export default function Services() {
  return (
    <main>
      <Seo title="Cantine, transport, étude — Groupe Scolaire Ange Bleu" description={S.lead} path="/services" />
      <PageHero chapter="Pratique · cantine, transport, étude" title={S.title} lead={S.lead} />
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="Une journée prise en charge" title="Du portail du matin au portail du soir." /><div className="mt-12"><Timeline items={S.day} /></div></div></section>
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="En détail" title="Cinq services, un seul interlocuteur." /><div className="mt-12"><CardGrid items={S.items} icons={[UtensilsCrossed, Bus, BookOpenCheck, Sunrise, HeartPulse]} photos={[PHOTOS.canteen, PHOTOS.transport, PHOTOS.library, PHOTOS.classroom, PHOTOS.team]} /></div></div></section>
      <section className="section pt-0"><div className="wrap-narrow"><SectionHead center chapter="Questions fréquentes" title="Ce que les parents nous demandent." className="mb-10" /><Accordion items={FAQ} /></div></section>
      <CtaBand />
    </main>
  );
}
