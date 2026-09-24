import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, NavLink, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, CalendarDays, Inbox, UserPlus, LogOut, ExternalLink, Eye, EyeOff, Loader2 } from 'lucide-react';
import { auth, store, DEMO_ACCESS, HAS_FIREBASE } from '../data/store';
import { IMG, SITE } from '../content/site';
import { Clouds } from '../components/sections';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const NewsPage = lazy(() => import('./pages/News'));
const EventsPage = lazy(() => import('./pages/Events'));
const MessagesPage = lazy(() => import('./pages/Messages'));
const InscriptionsPage = lazy(() => import('./pages/Inscriptions'));

const LINKS = [
  { to: '/admin', label: 'Tableau de bord', Icon: LayoutDashboard, end: true },
  { to: '/admin/actualites', label: 'Actualités', Icon: Newspaper, badge: 'news' },
  { to: '/admin/evenements', label: 'Agenda', Icon: CalendarDays, badge: 'events' },
  { to: '/admin/messages', label: 'Messages', Icon: Inbox, badge: 'messages' },
  { to: '/admin/inscriptions', label: 'Pré-inscriptions', Icon: UserPlus, badge: 'inscriptions' },
];

const Login = ({ onDone }: { onDone: (u: { email: string }) => void }) => {
  const [email, setEmail] = useState(HAS_FIREBASE ? '' : DEMO_ACCESS.email);
  const [pw, setPw] = useState(HAS_FIREBASE ? '' : DEMO_ACCESS.password);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setBusy(true); setErr(''); try { onDone(await auth.login(email, pw)); } catch (x: any) { setErr(x?.message?.includes('auth/') ? 'Identifiant ou mot de passe incorrect.' : x?.message || 'Connexion impossible.'); } finally { setBusy(false); } };
  return (
    <div className="min-h-svh mesh relative flex items-center justify-center p-6">
      <Clouds tone="mixed" />
      <form onSubmit={submit} className="relative card w-full max-w-[420px] p-8 md:p-10 space-y-5">
        <div className="flex items-center gap-3"><img src={IMG.monogramme} alt="" className="h-12" /><div><p className="font-display text-xl leading-none">Administration</p><p className="t-meta mt-1">{SITE.name}</p></div></div>
        <label className="block"><span className="block text-sm font-semibold mb-1.5">Identifiant</span><input className="w-full bg-white border border-line rounded-2xl px-4 h-11" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></label>
        <label className="block"><span className="block text-sm font-semibold mb-1.5">Mot de passe</span><span className="relative block"><input type={show ? 'text' : 'password'} className="w-full bg-white border border-line rounded-2xl px-4 h-11 pr-11" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" /><button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mute" aria-label="Afficher">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
        {err && <p className="text-sm text-red-700 bg-red-50 rounded-2xl px-4 py-3">{err}</p>}
        <button type="submit" disabled={busy} className="btn btn-azure w-full">{busy ? <Loader2 size={16} className="animate-spin" /> : 'Se connecter'}</button>
        {!HAS_FIREBASE && <p className="text-xs text-mute">Mode démonstration : les identifiants sont pré-remplis et les données restent dans ce navigateur. En production, la connexion passe par Firebase Auth.</p>}
        <Link to="/" className="block text-center text-sm text-azure font-semibold">← Retour au site</Link>
      </form>
    </div>
  );
};

export default function AdminApp() {
  const [user, setUser] = useState<{ email: string } | null | undefined>(undefined);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const loc = useLocation();
  useEffect(() => auth.onChange(setUser), []);
  useEffect(() => {
    if (!user) return;
    const u = [store.subscribe('news', (r) => setCounts((c) => ({ ...c, news: r.length }))), store.subscribe('events', (r) => setCounts((c) => ({ ...c, events: r.length }))), store.subscribe('messages', (r) => setCounts((c) => ({ ...c, messages: r.filter((m) => !m.read).length }))), store.subscribe('inscriptions', (r) => setCounts((c) => ({ ...c, inscriptions: r.filter((i) => i.status === 'nouvelle').length })))];
    return () => u.forEach((f) => f());
  }, [user]);
  if (user === undefined) return <div className="min-h-svh flex items-center justify-center text-mute"><Loader2 className="animate-spin" /></div>;
  if (!user) return <Login onDone={setUser} />;
  return (
    <div className="min-h-svh bg-cloud lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-0 lg:h-svh bg-white border-r border-line p-5 flex flex-col gap-6">
        <Link to="/admin" className="flex items-center gap-3"><img src={IMG.monogramme} alt="" className="h-10" /><span className="font-display leading-none"><span className="block text-lg">Ange Bleu</span><span className="block t-meta mt-0.5">Administration</span></span></Link>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto">
          {LINKS.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap transition-colors ${isActive ? 'bg-azure text-white' : 'text-deep/75 hover:bg-sky'}`}><l.Icon size={16} />{l.label}{l.badge && counts[l.badge] > 0 && <span className="ml-auto text-[11px] bg-gold text-night rounded-full px-2 py-0.5">{counts[l.badge]}</span>}</NavLink>)}
        </nav>
        <div className="mt-auto space-y-2 text-sm">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-mute hover:text-deep"><ExternalLink size={14} /> Voir le site</a>
          <p className="text-xs text-mute truncate">{user.email}</p>
          <button onClick={() => auth.logout().then(() => setUser(null))} className="flex items-center gap-2 text-red-700"><LogOut size={14} /> Se déconnecter</button>
        </div>
      </aside>
      <main className="p-5 md:p-8 lg:p-10 min-w-0" key={loc.pathname}>
        <Suspense fallback={<div className="text-mute"><Loader2 className="animate-spin" /></div>}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="actualites" element={<NewsPage />} />
            <Route path="evenements" element={<EventsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="inscriptions" element={<InscriptionsPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
