import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Download } from 'lucide-react';
import { store, News, fmtDate } from '../../data/store';
import { Title, Panel, Badge, Btn, Field, input, textarea, Modal, Empty, csv } from '../ui';

const blank = (): Omit<News, 'id'> => ({ title: '', date: new Date().toISOString().slice(0, 10), category: 'Vie de l’école', excerpt: '', content: '', image: '', published: true });
const CATS = ['Vie de l’école', 'Résultats', 'Robotique', 'Sport', 'Culture', 'Inscriptions', 'Événement'];

export default function NewsPage() {
  const [rows, setRows] = useState<News[]>([]);
  const [edit, setEdit] = useState<(Omit<News, 'id'> & { id?: string }) | null>(null);
  const [q, setQ] = useState('');
  useEffect(() => store.subscribe('news', setRows), []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); if (!edit) return; const { id, ...data } = edit; if (id) await store.update('news', id, data); else await store.add('news', data); setEdit(null); };
  const list = rows.filter((n) => n.title.toLowerCase().includes(q.toLowerCase()));
  const toImage = (f: File) => new Promise<string>((res) => { const img = new Image(); const r = new FileReader(); r.onload = () => { img.onload = () => { const c = document.createElement('canvas'); const k = Math.min(1, 1600 / img.width); c.width = img.width * k; c.height = img.height * k; c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', 0.82)); }; img.src = r.result as string; }; r.readAsDataURL(f); });
  return (
    <div>
      <Title title="Actualités" desc="Les nouvelles publiées apparaissent sur la page Actualités, dans le fil de l’accueil et parmi les trois dernières nouvelles." actions={<><Btn variant="white" onClick={() => csv(rows.map(({ id, image, ...r }) => r), 'actualites')}><Download size={14} /> Exporter</Btn><Btn onClick={() => setEdit(blank())}><Plus size={14} /> Nouvelle actualité</Btn></>} />
      <input className={`${input} max-w-sm mb-5`} placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} />
      {list.length === 0 ? <Empty>Aucune actualité. Créez la première.</Empty> : (
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((n) => (
            <li key={n.id} className="card overflow-hidden flex flex-col">
              <div className="aspect-[16/9] bg-sky-2 relative">{n.image && <img src={n.image} alt="" className="w-full h-full object-cover" />}<span className="absolute top-3 left-3"><Badge tone={n.published ? 'green' : 'grey'}>{n.published ? 'publiée' : 'brouillon'}</Badge></span></div>
              <div className="p-5 flex-1 flex flex-col"><p className="t-meta">{n.category} · {fmtDate(n.date)}</p><p className="t-h4 mt-1.5">{n.title}</p><p className="text-sm text-mute mt-1.5 line-clamp-2">{n.excerpt}</p>
                <div className="mt-auto pt-4 flex gap-2"><Btn variant="white" onClick={() => setEdit({ ...n })}><Pencil size={14} /> Modifier</Btn><Btn variant="white" onClick={() => store.update('news', n.id, { published: !n.published })}>{n.published ? <EyeOff size={14} /> : <Eye size={14} />}</Btn><Btn variant="danger" onClick={() => { if (confirm('Supprimer cette actualité ?')) store.remove('news', n.id); }}><Trash2 size={14} /></Btn></div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? 'Modifier l’actualité' : 'Nouvelle actualité'}>
        {edit && (
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><Field label="Titre *"><input required className={input} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} /></Field></div>
            <Field label="Date *"><input required type="date" className={input} value={edit.date} onChange={(e) => setEdit({ ...edit, date: e.target.value })} /></Field>
            <Field label="Catégorie"><select className={input} value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })}>{CATS.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <div className="sm:col-span-2"><Field label="Résumé (une ou deux phrases) *"><textarea required className={`${textarea} min-h-[80px]`} value={edit.excerpt} onChange={(e) => setEdit({ ...edit, excerpt: e.target.value })} /></Field></div>
            <div className="sm:col-span-2"><Field label="Texte de l’article *" hint="Un paragraphe par ligne."><textarea required className={`${textarea} min-h-[200px]`} value={edit.content} onChange={(e) => setEdit({ ...edit, content: e.target.value })} /></Field></div>
            <div className="sm:col-span-2"><Field label="Photo" hint="Redimensionnée automatiquement (1600 px maximum)."><input type="file" accept="image/*" className="text-sm" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setEdit({ ...edit, image: await toImage(f) }); }} />{edit.image && <img src={edit.image} alt="" className="mt-3 h-32 rounded-2xl object-cover" />}</Field></div>
            <label className="sm:col-span-2 flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={edit.published} onChange={(e) => setEdit({ ...edit, published: e.target.checked })} /> Publiée sur le site</label>
            <div className="sm:col-span-2 flex gap-2 justify-end"><Btn variant="white" onClick={() => setEdit(null)}>Annuler</Btn><Btn type="submit">Enregistrer</Btn></div>
          </form>
        )}
      </Modal>
    </div>
  );
}
