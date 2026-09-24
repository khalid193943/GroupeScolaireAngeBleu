import { GraduationCap } from 'lucide-react';
import { RESULTATS as R } from '../content/site';
import { Reveal, Counter } from '../components/ui/motion';
import { Seo, Stat, Halo } from '../components/ui';
import { PageHero, SectionHead, CtaBand } from '../components/sections';

export default function Resultats() {
  return (
    <main>
      <Seo title="Résultats — Groupe Scolaire Ange Bleu" description={R.lead} path="/resultats" />
      <PageHero chapter="Résultats · vérifiables" title={R.title} lead={R.lead} />
      <section className="section pt-0"><div className="wrap grid md:grid-cols-2 gap-5">
        {R.feats.map((f, i) => <Reveal key={i} delay={0.1 * i} className={`${i === 0 ? 'bg-sky-2' : 'mesh-blue on-blue'} rounded-[var(--r-lg)] p-8 md:p-12 relative overflow-hidden`}><div className="absolute -right-24 -top-16 w-[380px] opacity-50"><Halo /></div><p className={`relative font-display text-[clamp(4.5rem,9vw,8rem)] leading-none tracking-tight ${i === 0 ? 'text-azure' : 'text-gold-2'}`}><Counter to={Number(f.year)} duration={1.4} /></p><p className={`relative t-h3 mt-4 ${i === 1 ? 'text-white' : ''}`}>{f.title}</p><p className={`relative t-body mt-3 ${i === 1 ? 'text-white/80' : 'text-mute'}`}>{f.text}</p></Reveal>)}
      </div></section>
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="En chiffres" title="Ce que produisent douze années." /><div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">{R.numbers.map(([n, l], i) => <Reveal key={i} delay={0.06 * i} className="card p-7"><Stat n={n} l={l} /></Reveal>)}</div></div></section>
      <section className="section pt-0"><div className="wrap">
        <SectionHead chapter="L’après-bac" title="Où sont nos anciens aujourd’hui." lead="La vraie mesure d’un lycée n’est pas le taux de réussite — c’est ce que les élèves tiennent ensuite." />
        <ul className="mt-10 flex flex-wrap gap-3">{R.after.map((a, i) => <Reveal key={i} as="li" delay={0.04 * i} className="glass rounded-full pl-2 pr-5 py-2 flex items-center gap-3"><span className="w-9 h-9 rounded-full bg-azure text-white flex items-center justify-center"><GraduationCap size={16} /></span><span className="font-semibold text-[15px]">{a}</span></Reveal>)}</ul>
      </div></section>
      <section className="section pt-0"><div className="wrap"><SectionHead chapter="Les distinctions qui ne sont pas des notes" title="Robotique, olympiades, éloquence, sport." /><ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{R.distinctions.map(([t, s], i) => <Reveal key={i} as="li" delay={0.06 * i} className="card p-6"><p className="t-h4">{t}</p><p className="t-small text-mute mt-1">{s}</p></Reveal>)}</ul></div></section>
      <CtaBand />
    </main>
  );
}
