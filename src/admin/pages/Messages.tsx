import { useEffect, useState } from 'react';
import { Trash2, Download, Phone, Mail, MessageCircle } from 'lucide-react';
import { store, Message } from '../../data/store';
import { Title, Badge, Btn, Empty, csv, fmtDateTime } from '../ui';

export default function MessagesPage() {
  const [rows, setRows] = useState<Message[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<'tous' | 'nouveaux'>('tous');
  useEffect(() => store.subscribe('messages', setRows), []);
  const list = rows.filter((m) => filter === 'tous' || !m.read);
  const cur = rows.find((m) => m.id === open);
  return (
    <div>
      <Title title="Messages" desc="Les demandes envoyées depuis la page Contact (visites, questions)." actions={<Btn variant="white" onClick={() => csv(rows, 'messages')}><Download size={14} /> Exporter</Btn>} />
      <div className="flex gap-2 mb-5">{(['tous', 'nouveaux'] as const).map((f) => <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${filter === f ? 'bg-azure text-white' : 'bg-white border border-line'}`}>{f === 'tous' ? `Tous (${rows.length})` : `Non lus (${rows.filter((m) => !m.read).length})`}</button>)}</div>
      <div className="grid lg:grid-cols-[380px_1fr] gap-5">
        {list.length === 0 ? <Empty>Aucun message.</Empty> : (
          <ul className="space-y-2">{list.map((m) => <li key={m.id}><button onClick={() => { setOpen(m.id); if (!m.read) store.update('messages', m.id, { read: true }); }} className={`w-full text-left card p-4 hover:bg-cloud ${open === m.id ? 'ring-gold' : ''}`}><div className="flex items-center justify-between gap-3"><span className={`text-sm ${m.read ? 'font-semibold' : 'font-extrabold'}`}>{m.name}</span>{!m.read && <Badge tone="gold">nouveau</Badge>}</div><p className="text-xs text-mute mt-0.5">{m.subject} · {fmtDateTime(m.date)}</p><p className="text-sm text-mute mt-1 line-clamp-1">{m.message}</p></button></li>)}</ul>
        )}
        {cur && (
          <article className="card p-6 md:p-8 self-start">
            <p className="t-meta">{fmtDateTime(cur.date)} · {cur.subject}{cur.slot && ` · ${cur.slot}`}</p>
            <h2 className="t-h3 mt-2">{cur.name}</h2>
            <p className="t-body mt-5 whitespace-pre-wrap">{cur.message}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`tel:${cur.phone.replace(/\s/g, '')}`} className="btn btn-azure !h-10 !px-4 text-sm"><Phone size={14} /> {cur.phone}</a>
              <a href={`https://wa.me/${cur.phone.replace(/\D/g, '').replace(/^0/, '212')}`} target="_blank" rel="noopener noreferrer" className="btn btn-white !h-10 !px-4 text-sm"><MessageCircle size={14} /> WhatsApp</a>
              {cur.email && <a href={`mailto:${cur.email}`} className="btn btn-white !h-10 !px-4 text-sm"><Mail size={14} /> {cur.email}</a>}
              <Btn variant="danger" onClick={() => { if (confirm('Supprimer ce message ?')) { store.remove('messages', cur.id); setOpen(null); } }}><Trash2 size={14} /> Supprimer</Btn>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
