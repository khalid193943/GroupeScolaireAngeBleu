import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { CYCLES, CycleId } from '../content/site';
import { WordReveal, Reveal } from '../components/ui/motion';
import { Seo, Chip, Button } from '../components/ui';
import { PageHero, SectionHead, CtaBand, Timeline, CardGrid } from '../components/sections';

const ORDER: CycleId[] = ['primaire', 'college', 'lycee'];

export default function Cycle() {
  const { id } = useParams();
  if (!id || !(id in CYCLES)) return <Navigate to="/404" replace />;
  const cid = id as CycleId; const c = CYCLES[cid];
  const idx = ORDER.indexOf(cid); const prev = ORDER[idx - 1]; const next = ORDER[idx + 1];
  return (
    <main>
      <Seo title={`${c.title} — Groupe Scolaire Ange Bleu`} description={c.heroLead} path={`/cycles/${cid}`} />
      <PageHero chapter={`${c.chapter} · ${c.title} · ${c.ages} · ${c.levels}`} title={c.heroTitle} lead={c.heroLead}>
        <Button to="/inscription" variant="azure" size="lg">Inscrire en {c.title.toLowerCase()}</Button>
        <Button to="/contact" variant="white" size="lg" icon="none">Réserver une visite</Button>
      </PageHero>

      <section className="section pt-0"><div className="wrap">
        <div className="bg-sky-2 rounded-[var(--r-lg)] p-8 md:p-14 max-w-[1000px] mx-auto"><Chip className="mb-6">L’enjeu de ces années</Chip><p className="t-h2"><WordReveal text={c.stakeTitle} /></p><Reveal delay={0.15}><p className="t-body text-mute mt-6 max-w-[64ch]">{c.stakeText}</p></Reveal></div>
      </div></section>

      <section className="section pt-0"><div className="wrap">
        <SectionHead chapter="Année après année" title={c.yearsTitle} />
        <ol className="mt-12 space-y-4">
          {c.years.map((y, i) => (
            <Reveal key={i} as="li" delay={0.05 * i} amount={0.3} className="card p-6 md:p-8 grid md:grid-cols-[5rem_1fr_1.2fr] gap-4 md:gap-10">
              <span className="w-14 h-14 rounded-full bg-gold text-night font-display text-lg flex items-center justify-center">{y.n}</span>
              <span><span className="t-h3 block">{y.title}</span><span className="t-body text-mute block mt-2">{y.text}</span></span>
              <ul className="space-y-2 md:pt-1">{y.points.map((p) => <li key={p} className="flex gap-3 t-small"><Check size={16} className="text-azure shrink-0 mt-1" />{p}</li>)}</ul>
            </Reveal>
          ))}
        </ol>
      </div></section>

      {c.day && <section className="section pt-0"><div className="wrap"><SectionHead chapter="Le rythme, sans enjoliver" title={c.dayTitle!} /><div className="mt-12"><Timeline items={c.day} /></div></div></section>}
      {c.extras && <section className="section pt-0"><div className="wrap"><SectionHead chapter="Ce que le bac ne mesure pas" title={c.extrasTitle!} /><div className="mt-12"><CardGrid items={c.extras} /></div></div></section>}

      <div className="wrap pb-10 flex justify-between gap-4">
        {prev ? <Link to={`/cycles/${prev}`} className="btn btn-white">← {CYCLES[prev].title}</Link> : <span />}
        {next ? <Link to={`/cycles/${next}`} className="btn btn-white">{CYCLES[next].title} <ArrowUpRight size={14} /></Link> : <Link to="/resultats" className="btn btn-white">Voir les résultats <ArrowUpRight size={14} /></Link>}
      </div>
      <CtaBand />
    </main>
  );
}
