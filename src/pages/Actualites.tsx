import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { store, News, Event, fmtDate, isUpcoming } from '../data/store';
import { Reveal } from '../components/ui/motion';
import { Seo } from '../components/ui';
import { PageHero, SectionHead, CtaBand, Clouds } from '../components/sections';

export const NewsCard = ({ n, i = 0 }: { n: News; i?: number }) => (
  <Reveal as="li" delay={(i % 3) * 0.08} className="card overflow-hidden group hover:-translate-y-1.5 transition-transform duration-500">
    <Link to={`/actualites/${n.id}`} className="block">
      <div className="aspect-[4/3] bg-sky-2 relative overflow-hidden">
        {n.image ? <img src={n.image} alt="" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" loading="lazy" /> : <Clouds tone="mixed" />}
        <span className="absolute top-4 left-4 chip">{n.category}</span>
      </div>
      <div className="p-6"><p className="t-meta">{fmtDate(n.date)}</p><h3 className="t-h3 mt-2">{n.title}</h3><p className="t-small text-mute mt-2 line-clamp-2">{n.excerpt}</p></div>
    </Link>
  </Reveal>
);

export default function Actualites() {
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => { const a = store.subscribe('news', (r) => setNews(r.filter((n) => n.published))); const b = store.subscribe('events', setEvents); return () => { a(); b(); }; }, []);
  const upcoming = events.filter((e) => isUpcoming(e.date)).sort((a, b) => (a.date > b.date ? 1 : -1));
  const ics = (e: Event) => `data:text/calendar;charset=utf-8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:${e.date.replace(/-/g, '')}\nSUMMARY:${e.title}\nLOCATION:${e.place || ''}\nDESCRIPTION:${e.desc || ''}\nEND:VEVENT\nEND:VCALENDAR`)}`;
  return (
    <main>
      <Seo title="Actualités — Groupe Scolaire Ange Bleu" description="Les nouvelles et l’agenda de l’école." path="/actualites" />
      <PageHero chapter="Actualités · la vie de l’école" title="Ce qui se passe à Ange Bleu." lead="Événements, résultats, projets des clubs : les nouvelles de l’établissement, publiées par la direction." />
      <section className="section pt-0"><div className="wrap">
        <SectionHead chapter="Dernières nouvelles" title="À la une." />
        {news.length === 0 ? <p className="text-mute mt-10">Aucune actualité pour le moment.</p> : <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{news.map((n, i) => <NewsCard key={n.id} n={n} i={i} />)}</ul>}
      </div></section>
      <section className="section pt-0"><div className="wrap">
        <div className="mesh-blue on-blue rounded-[var(--r-lg)] p-8 md:p-14">
          <SectionHead light chapter="Agenda" title="À vos agendas." lead="Portes ouvertes, réunions, concours : ajoutez chaque événement à votre calendrier en un geste." />
          {upcoming.length === 0 ? <p className="text-white/70 mt-10">Aucun événement à venir.</p> : (
            <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((e, i) => (
                <Reveal key={e.id} as="li" delay={0.06 * i} className="glass-dark rounded-[var(--r)] p-6 flex flex-col">
                  <p className="text-gold-2 font-bold text-sm flex items-center gap-2"><CalendarDays size={14} />{fmtDate(e.date)}</p>
                  <p className="t-h4 text-white mt-3">{e.title}</p>
                  <p className="text-white/70 text-sm mt-2 space-x-3">{e.time && <span className="inline-flex items-center gap-1"><Clock size={12} />{e.time}</span>}{e.place && <span className="inline-flex items-center gap-1"><MapPin size={12} />{e.place}</span>}</p>
                  {e.desc && <p className="text-white/75 text-sm mt-2">{e.desc}</p>}
                  <a href={ics(e)} download={`${e.title}.ics`} className="mt-auto pt-4 ulink text-sm font-semibold inline-flex items-center gap-1">Ajouter à mon agenda <ArrowUpRight size={13} /></a>
                </Reveal>
              ))}
            </ol>
          )}
        </div>
      </div></section>
      <CtaBand />
    </main>
  );
}
