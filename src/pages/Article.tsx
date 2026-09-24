import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { store, News, fmtDate } from '../data/store';
import { Seo } from '../components/ui';
import { PageHero, CtaBand } from '../components/sections';
import { NewsCard } from './Actualites';

export default function Article() {
  const { id } = useParams();
  const [news, setNews] = useState<News[] | null>(null);
  useEffect(() => store.subscribe('news', (r) => setNews(r.filter((n) => n.published))), []);
  if (!news) return <div className="min-h-[60svh]" />;
  const n = news.find((x) => x.id === id);
  if (!n) return <Navigate to="/actualites" replace />;
  const others = news.filter((x) => x.id !== id).slice(0, 3);
  return (
    <main>
      <Seo title={`${n.title} — Groupe Scolaire Ange Bleu`} description={n.excerpt} path={`/actualites/${n.id}`} />
      <PageHero chapter={`${n.category} · ${fmtDate(n.date)}`} title={n.title} lead={n.excerpt} />
      <section className="section pt-0"><div className="wrap-narrow">
        {n.image && <img src={n.image} alt="" className="w-full rounded-[var(--r-lg)] mb-10" />}
        <div className="card p-8 md:p-12 t-body space-y-5">{n.content.split(/\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>
        <Link to="/actualites" className="btn btn-white mt-8"><ArrowLeft size={16} /> Toutes les actualités</Link>
      </div></section>
      {others.length > 0 && <section className="section pt-0"><div className="wrap"><p className="chip mb-8">À lire aussi</p><ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{others.map((o, i) => <NewsCard key={o.id} n={o} i={i} />)}</ul></div></section>}
      <CtaBand />
    </main>
  );
}
