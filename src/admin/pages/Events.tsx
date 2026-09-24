import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { store, Event, fmtDate, isUpcoming } from '../../data/store';
import { Title, Badge, Btn, Field, input, textarea, Modal, Empty } from '../ui';

const blank = (): Omit<Event, 'id'> => ({ title: '', date: new Date().toISOString().slice(0, 10), time: '', place: '', cycle: 'Tous cycles', desc: '' });

export default function EventsPage() {
  const [rows, setRows] = useState<Event[]>([]);
  const [edit, setEdit] = useState<(Omit<Event, 'id'> & { id?: string }) | null>(null);
  useEffect(() => store.subscribe('events', setRows), []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); if (!edit) return; const { id, ...data } = edit; if (id) await store.update('events', id, data); else await store.add('events', data); setEdit(null); };
  const sorted = [...rows].sort((a, b) => (a.date > b.date ? 1 : -1));
  return (
    <div>
      <Title title="Agenda" desc="Les événements à venir apparaissent sur la page Actualités avec un bouton « Ajouter à mon agenda »." actions={<Btn onClick={() => setEdit(blank())}><Plus size={14} /> Nouvel événement</Btn>} />
      {sorted.length === 0 ? <Empty>Aucun événement.</Empty> : (
        <ul className="space-y-3">
          {sorted.map((e) => (
            <li key={e.id} className="card p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-20 shrink-0 text-center bg-cloud rounded-2xl py-2"><p className="font-display text-2xl leading-none">{e.date.slice(8, 10)}</p><p className="t-meta">{new Date(e.date + 'T12:00').toLocaleDateString('fr-FR', { month: 'short' })}</p></div>
              <div className="flex-1 min-w-0"><p className="t-h4">{e.title}</p><p className="text-sm text-mute">{fmtDate(e.date)}{e.time && ` · ${e.time}`}{e.place && ` · ${e.place}`}{e.cycle && ` · ${e.cycle}`}</p>{e.desc && <p className="text-sm text-mute mt-1">{e.desc}</p>}</div>
              <Badge tone={isUpcoming(e.date) ? 'sky' : 'grey'}>{isUpcoming(e.date) ? 'à venir' : 'passé'}</Badge>
              <div className="flex gap-2"><Btn variant="white" onClick={() => setEdit({ ...e })}><Pencil size={14} /></Btn><Btn variant="danger" onClick={() => { if (confirm('Supprimer cet événement ?')) store.remove('events', e.id); }}><Trash2 size={14} /></Btn></div>
            </li>
          ))}
        </ul>
      )}
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? 'Modifier l’événement' : 'Nouvel événement'}>
        {edit && (
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><Field label="Titre *"><input required className={input} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} /></Field></div>
            <Field label="Date *"><input required type="date" className={input} value={edit.date} onChange={(e) => setEdit({ ...edit, date: e.target.value })} /></Field>
            <Field label="Horaire"><input className={input} placeholder="9h – 13h" value={edit.time} onChange={(e) => setEdit({ ...edit, time: e.target.value })} /></Field>
            <Field label="Lieu"><input className={input} value={edit.place} onChange={(e) => setEdit({ ...edit, place: e.target.value })} /></Field>
            <Field label="Cycle"><select className={input} value={edit.cycle} onChange={(e) => setEdit({ ...edit, cycle: e.target.value })}>{['Tous cycles', 'Primaire', 'Collège', 'Lycée', 'Collège · Lycée'].map((c) => <option key={c}>{c}</option>)}</select></Field>
            <div className="sm:col-span-2"><Field label="Description"><textarea className={`${textarea} min-h-[90px]`} value={edit.desc} onChange={(e) => setEdit({ ...edit, desc: e.target.value })} /></Field></div>
            <div className="sm:col-span-2 flex gap-2 justify-end"><Btn variant="white" onClick={() => setEdit(null)}>Annuler</Btn><Btn type="submit">Enregistrer</Btn></div>
          </form>
        )}
      </Modal>
    </div>
  );
}
