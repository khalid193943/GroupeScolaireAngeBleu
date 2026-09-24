import { FlaskConical, Bot, BookOpen, Monitor, Trophy, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import { CAMPUS as C, PHOTOS, ENGAGEMENTS } from '../content/site';
import { HeartPulse, Eye, Clock } from 'lucide-react';
import { Reveal } from '../components/ui/motion';
import { Seo, Stat } from '../components/ui';
import { PageHero, SectionHead, CtaBand, CardGrid, PhotoStrip, Photo } from '../components/sections';

export default function Campus() {
  return (
    <main>
      <Seo title="Campus et équipements — Groupe Scolaire Ange Bleu" description={C.lead} path="/campus" />
      <PageHero chapter="L’établissement · Campus" title={C.title} lead={C.lead} />
      <section className="pb-14"><PhotoStrip photos={[PHOTOS.space1, PHOTOS.lab, PHOTOS.library, PHOTOS.sport, PHOTOS.space2, PHOTOS.canteen, PHOTOS.space3, PHOTOS.space4]} captions={['La cour principale', 'Laboratoire', 'Bibliothèque', 'Terrain de sport', 'Salle de classe', 'Cantine', 'Salle informatique', 'Atelier robotique']} /></section>
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="Nos équipements" title="Ce que votre enfant utilisera chaque semaine." lead="Du vrai matériel, manipulé par les élèves. Chaque espace est utilisé chaque semaine, par chaque cycle, dans l’emploi du temps — pas seulement lors des portes ouvertes." /><div className="mt-12"><CardGrid items={C.items} icons={[FlaskConical, Bot, BookOpen, Monitor, Trophy, UtensilsCrossed, ShieldCheck]} photos={[PHOTOS.lab, PHOTOS.act1, PHOTOS.library, PHOTOS.space3, PHOTOS.sport, PHOTOS.canteen, PHOTOS.space1]} /></div></div></section>
      <section className="section pt-0"><div className="wrap">
        <div className="bg-sky-2 rounded-[var(--r-lg)] p-8 md:p-14 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6"><SectionHead chapter="Sécurité, santé, accès" title="Un cadre sûr, du portail à la classe." lead="Enceinte fermée, accès contrôlé, personnel de surveillance à chaque entrée et sortie des classes, infirmerie avec personnel de premiers secours, protocole d’appel immédiat des parents. Les transports scolaires entrent dans l’enceinte : aucun élève n’attend sur le trottoir." /></div>
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">{ENGAGEMENTS.map((e, i) => { const Icon = [ShieldCheck, HeartPulse, Eye, Clock][i]; return <Reveal key={i} delay={0.06 * i} className="card p-5"><Icon size={26} strokeWidth={1.5} className="text-azure" /><p className="font-bold mt-3">{e.title}</p><p className="text-xs text-mute mt-1">{e.text}</p></Reveal>; })}</div>
        </div>
      </div></section>
      <section className="section pt-0"><div className="wrap"><div className="mesh-blue on-blue rounded-[var(--r-lg)] p-8 md:p-14"><SectionHead light chapter="En chiffres" title="Les moyens d’un grand établissement." /><div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">{C.numbers.map(([n, l], i) => <Reveal key={i} delay={0.06 * i}><Stat n={n} l={l} light /></Reveal>)}</div></div></div></section>
      <CtaBand title="Rien ne remplace une visite un matin de semaine." desc="Classes, laboratoires, cantine : quarante minutes pendant les cours, avec la direction." />
    </main>
  );
}
