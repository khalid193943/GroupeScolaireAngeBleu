import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, CalendarDays, Inbox, UserPlus, ArrowUpRight, RotateCcw } from 'lucide-react';
import { store, News, Event, Message, Inscription, fmtDate, isUpcoming, HAS_FIREBASE } from '../../data/store';
import { Title, Panel, Badge, Btn, fmtDateTime } from '../ui';

export default function Dashboard() {
  const [news, setNews] = useState<News[]>([]); const [events, setEvents] = useState<Event[]>([]); const [msgs, setMsgs] = useState<Message[]>([]); const [ins, setIns] = useState<Inscription[]>([]);
  useEffect(() => { const u = [store.subscribe('news', setNews), store.subscribe('events', setEvents), store.subscribe('messages', setMsgs), store.subscribe('inscriptions', setIns)]; return () => u.forEach((f) => f()); }, []);
  const cards = [
    { to: '/admin/actualites', label: 'Actualités publiées', n: news.filter((n) => n.published).length, Icon: Newspaper, tone: 'bg-sky-2' },
    { to: '/admin/evenements', label: 'Événements à venir', n: events.filter((e) => isUpcoming(e.date)).length, Icon: CalendarDays, tone: 'bg-gold-3' },
    { to: '/admin/messages', label: 'Messages non lus', n: msgs.filter((m) => !m.read).length, Icon: Inbox, tone: 'bg-sky-2' },
    { to: '/admin/inscriptions', label: 'Pré-inscriptions nouvelles', n: ins.filter((i) => i.status === 'nouvelle').length, Icon: UserPlus, tone: 'bg-gold-3' },
  ];
  return (
    <div>
      <Title title="Bonjour." desc="L’essentiel de l’activité du site : nouvelles demandes, messages, publications." actions={!HAS_FIREBASE ? <Btn variant="white" onClick={() => { if (confirm('Remettre les données d’exemple ?')) store.reset(); }}><RotateCcw size={14} /> Données d’exemple</Btn> : undefined} />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => <Link key={c.to} to={c.to} className={`${c.tone} rounded-[var(--r)] p-6 hover:-translate-y-1 transition-transform`}><c.Icon size={20} className="text-azure" /><p className="t-num mt-4">{c.n}</p><p className="font-semibold mt-1">{c.label}</p></Link>)}
      </div>
      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <Panel>
          <div className="flex items-center justify-between mb-4"><h2 className="t-h4">Dernières pré-inscriptions</h2><Link to="/admin/inscriptions" className="text-sm font-semibold text-azure inline-flex items-center gap-1">Tout voir <ArrowUpRight size={13} /></Link></div>
          <ul className="divide-y divide-line">{ins.slice(0, 5).map((i) => <li key={i.id} className="py-3 flex items-center justify-between gap-4 text-sm"><span><span className="font-semibold">{i.child}</span> <span className="text-mute">· {i.level}</span><span className="block text-xs text-mute">{i.parent} · {fmtDateTime(i.date)}</span></span><Badge tone={i.status === 'nouvelle' ? 'gold' : i.status === 'admise' ? 'green' : i.status === 'refusée' ? 'red' : 'sky'}>{i.status}</Badge></li>)}{ins.length === 0 && <li className="py-3 text-mute text-sm">Aucune demande.</li>}</ul>
        </Panel>
        <Panel>
          <div className="flex items-center justify-between mb-4"><h2 className="t-h4">Derniers messages</h2><Link to="/admin/messages" className="text-sm font-semibold text-azure inline-flex items-center gap-1">Tout voir <ArrowUpRight size={13} /></Link></div>
          <ul className="divide-y divide-line">{msgs.slice(0, 5).map((m) => <li key={m.id} className="py-3 flex items-center justify-between gap-4 text-sm"><span><span className="font-semibold">{m.name}</span> <span className="text-mute">· {m.subject}</span><span className="block text-xs text-mute">{fmtDateTime(m.date)}</span></span>{!m.read && <Badge tone="gold">nouveau</Badge>}</li>)}{msgs.length === 0 && <li className="py-3 text-mute text-sm">Aucun message.</li>}</ul>
        </Panel>
        <Panel className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4"><h2 className="t-h4">Agenda</h2><Link to="/admin/evenements" className="text-sm font-semibold text-azure inline-flex items-center gap-1">Gérer <ArrowUpRight size={13} /></Link></div>
          <ul className="grid sm:grid-cols-3 gap-3">{events.filter((e) => isUpcoming(e.date)).sort((a, b) => (a.date > b.date ? 1 : -1)).slice(0, 3).map((e) => <li key={e.id} className="bg-cloud rounded-2xl p-4 text-sm"><p className="t-meta">{fmtDate(e.date)}{e.time && ` · ${e.time}`}</p><p className="font-semibold mt-1">{e.title}</p></li>)}</ul>
        </Panel>
      </div>
    </div>
  );
}
