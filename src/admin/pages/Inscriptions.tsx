import { useEffect, useState } from 'react';
import { Trash2, Download, Phone, Mail } from 'lucide-react';
import { store, Inscription } from '../../data/store';
import { Title, Badge, Btn, Empty, csv, fmtDateTime, input } from '../ui';

const STATUS: Inscription['status'][] = ['nouvelle', 'contactée', 'admise', 'refusée'];
const tone = (s: Inscription['status']) => (s === 'nouvelle' ? 'gold' : s === 'admise' ? 'green' : s === 'refusée' ? 'red' : 'sky');

export default function InscriptionsPage() {
  const [rows, setRows] = useState<Inscription[]>([]);
  const [status, setStatus] = useState<'toutes' | Inscription['status']>('toutes');
  const [q, setQ] = useState('');
  useEffect(() => store.subscribe('inscriptions', setRows), []);
  const list = rows.filter((i) => (status === 'toutes' || i.status === status) && `${i.child} ${i.parent} ${i.level}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <Title title="Pré-inscriptions" desc="Les demandes envoyées depuis la page Inscription. Changez le statut au fil du traitement." actions={<Btn variant="white" onClick={() => csv(rows, 'pre-inscriptions')}><Download size={14} /> Exporter</Btn>} />
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {(['toutes', ...STATUS] as const).map((s) => <button key={s} onClick={() => setStatus(s)} className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${status === s ? 'bg-azure text-white' : 'bg-white border border-line'}`}>{s}{s !== 'toutes' && ` (${rows.filter((r) => r.status === s).length})`}</button>)}
        <input className={`${input} max-w-xs ml-auto`} placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {list.length === 0 ? <Empty>Aucune demande.</Empty> : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cloud text-left t-meta"><tr><th className="p-4">Enfant</th><th className="p-4">Niveau · rentrée</th><th className="p-4">Parent</th><th className="p-4">Reçue le</th><th className="p-4">Statut</th><th className="p-4"></th></tr></thead>
            <tbody className="divide-y divide-line">
              {list.map((i) => (
                <tr key={i.id} className="align-top">
                  <td className="p-4"><p className="font-bold">{i.child}</p>{i.note && <p className="text-xs text-mute mt-1 max-w-[32ch]">{i.note}</p>}</td>
                  <td className="p-4">{i.level}<br /><span className="text-mute">{i.start}</span></td>
                  <td className="p-4">{i.parent}<br /><a href={`tel:${i.phone.replace(/\s/g, '')}`} className="text-azure font-semibold inline-flex items-center gap-1"><Phone size={12} />{i.phone}</a>{i.email && <><br /><a href={`mailto:${i.email}`} className="text-azure inline-flex items-center gap-1"><Mail size={12} />{i.email}</a></>}</td>
                  <td className="p-4 text-mute whitespace-nowrap">{fmtDateTime(i.date)}</td>
                  <td className="p-4"><select value={i.status} onChange={(e) => store.update('inscriptions', i.id, { status: e.target.value as Inscription['status'] })} className="bg-white border border-line rounded-full px-3 py-1.5 text-sm font-semibold capitalize">{STATUS.map((s) => <option key={s}>{s}</option>)}</select><div className="mt-2"><Badge tone={tone(i.status)}>{i.status}</Badge></div></td>
                  <td className="p-4"><Btn variant="danger" onClick={() => { if (confirm('Supprimer cette demande ?')) store.remove('inscriptions', i.id); }}><Trash2 size={14} /></Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
