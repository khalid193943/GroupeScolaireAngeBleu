import { FlaskConical, Drama, Trophy, Bot, BookOpen, Palette } from 'lucide-react';
import { VIE as V, PHOTOS } from '../content/site';
import { Reveal } from '../components/ui/motion';
import { Seo } from '../components/ui';
import { PageHero, SectionHead, CtaBand, CardGrid, PhotoStrip, Photo } from '../components/sections';

export default function VieScolaire() {
  return (
    <main>
      <Seo title="Vie scolaire — Groupe Scolaire Ange Bleu" description={V.lead} path="/vie-scolaire" />
      <PageHero chapter="Vie scolaire · clubs, sorties, événements" title={V.title} lead={V.lead} />
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="Toute l’année, sur inscription" title="Six clubs, six façons de grandir." /><div className="mt-12"><CardGrid items={V.clubs} icons={[FlaskConical, Drama, Trophy, Bot, BookOpen, Palette]} photos={[PHOTOS.lab, PHOTOS.act2, PHOTOS.sport, PHOTOS.act1, PHOTOS.library, PHOTOS.act3]} /></div></div></section>
      <section className="section pt-0"><div className="wrap">
        <div className="mesh-blue on-blue rounded-[var(--r-lg)] p-8 md:p-14">
          <SectionHead light chapter="On ne travaille pas que pour les notes" title="Chaque année, nos élèves défendent l’école ailleurs qu’en classe." />
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{V.events.map((e, i) => <Reveal key={i} as="li" delay={0.05 * i} className="glass-dark rounded-[var(--r)] p-6"><p className="text-gold-2 text-xs font-bold tracking-wide uppercase">{e.when}</p><p className="t-h4 text-white mt-3">{e.title}</p><p className="text-white/75 text-sm mt-2">{e.text}</p></Reveal>)}</ol>
        </div>
      </div></section>
      <section className="section pt-0"><div className="wrap"><div className="bg-gold-3 rounded-[var(--r-lg)] p-8 md:p-14 grid lg:grid-cols-12 gap-10 items-center"><div className="lg:col-span-7"><SectionHead chapter="Une par trimestre, préparée en classe" title="Les sorties se méritent et se préparent." lead={V.outings} /><ul className="mt-8 grid sm:grid-cols-2 gap-3 text-[15px]">{['Le port et la Cité portugaise d’El Jadida', 'La ferme pédagogique et les salines', 'Le musée et le théâtre municipal', 'Visite d’une école d’ingénieurs (lycée)'].map((x) => <li key={x} className="card px-4 py-3 font-semibold">{x}</li>)}</ul></div><div className="lg:col-span-5"><Photo src={PHOTOS.event} ratio="aspect-[4/5]" caption="Sortie de fin d’année" /></div></div></div></section>
      <section className="pb-6"><PhotoStrip photos={[PHOTOS.act1, PHOTOS.act2, PHOTOS.act3, PHOTOS.act4, PHOTOS.act5, PHOTOS.sport, PHOTOS.event, PHOTOS.kids]} captions={['Robotique', 'Théâtre', 'Tournoi', 'Arts plastiques', 'Club sciences', 'Sport', 'Remise des prix', 'La cour']} /></section>
      <CtaBand />
    </main>
  );
}
