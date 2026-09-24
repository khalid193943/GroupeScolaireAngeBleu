import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Send, MessageCircle } from 'lucide-react';
import { SITE, INSCRIPTION as I, FAQ } from '../content/site';
import { store } from '../data/store';
import { Reveal } from '../components/ui/motion';
import { Seo, Accordion, Button } from '../components/ui';
import { PageHero, SectionHead } from '../components/sections';

const field = 'w-full bg-white border border-line text-deep rounded-2xl px-4 h-12 focus:outline-none focus:border-azure';
const label = 'block text-sm font-semibold text-deep mb-2';

export default function Inscription() {
  const [f, setF] = useState({ parent: '', phone: '', email: '', child: '', level: '', start: 'Septembre 2026', note: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const body = `Pré-inscription — ${SITE.name}%0A%0AParent : ${f.parent}%0ATéléphone : ${f.phone}%0AE-mail : ${f.email}%0AEnfant : ${f.child}%0ANiveau demandé : ${f.level}%0ARentrée : ${f.start}%0A%0A${f.note}`;
  const ok = f.parent && f.phone && f.child && f.level;
  const [sent, setSent] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); if (!ok) return; await store.add('inscriptions', { ...f, date: new Date().toISOString(), status: 'nouvelle' }); setSent(true); };
  return (
    <main>
      <Seo title="Inscription — Groupe Scolaire Ange Bleu" description={I.lead} path="/inscription" />
      <PageHero chapter={`Inscription — rentrée ${SITE.year}`} title={I.title} lead={I.lead}>
        <Button href="#formulaire" variant="azure" size="lg">Pré-inscrire maintenant</Button>
        <Button to="/contact" variant="white" size="lg" icon="none">Poser une question d’abord</Button>
      </PageHero>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHead chapter="Le parcours d’inscription" title="De la visite à la rentrée." />
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {I.steps.map((s, i) => <Reveal key={i} as="li" delay={0.08 * i} className="card p-7"><span className="w-10 h-10 rounded-full bg-gold text-night font-display flex items-center justify-center">{i + 1}</span><p className="t-h4 mt-5">{s.title}</p><p className="t-small text-mute mt-2">{s.text}</p></Reveal>)}
          </ol>
        </div>
      </section>

      <section id="formulaire" className="section pt-0 scroll-mt-20">
        <div className="wrap grid lg:grid-cols-12 gap-10 bg-sky-2 rounded-[var(--r-lg)] p-8 md:p-14">
          <div className="lg:col-span-5"><SectionHead chapter="Gagnez du temps" title="Pré-inscription en ligne." lead="Deux minutes. L’administration vous rappelle sous 48 h pour fixer la visite." />
            <p className="t-small text-mute mt-6">Vous préférez le téléphone ? <a href={SITE.phoneHref} className="ulink text-azure font-semibold">{SITE.phone}</a></p>
          </div>
          <form className="lg:col-span-7 grid sm:grid-cols-2 gap-5" onSubmit={submit}>
            <div><label className={label}>Nom du parent *</label><input required className={field} value={f.parent} onChange={set('parent')} /></div>
            <div><label className={label}>Téléphone *</label><input required type="tel" className={field} value={f.phone} onChange={set('phone')} /></div>
            <div><label className={label}>E-mail</label><input type="email" className={field} value={f.email} onChange={set('email')} /></div>
            <div><label className={label}>Prénom de l’enfant *</label><input required className={field} value={f.child} onChange={set('child')} /></div>
            <div><label className={label}>Niveau demandé *</label><select required className={field} value={f.level} onChange={set('level')}><option value="">Choisir un niveau…</option>{I.levels.map((l) => <option key={l}>{l}</option>)}</select></div>
            <div><label className={label}>Rentrée souhaitée *</label><select className={field} value={f.start} onChange={set('start')}><option>Septembre 2026</option><option>En cours d’année</option></select></div>
            <div className="sm:col-span-2"><label className={label}>Un mot sur votre enfant (facultatif)</label><textarea rows={4} className={`${field} h-auto py-3`} value={f.note} onChange={set('note')} /></div>
            {sent ? <p className="sm:col-span-2 card p-5 text-azure font-semibold">Pré-inscription envoyée. L’administration vous rappelle sous 48 h ouvrées pour fixer la visite. Merci de votre confiance.</p> : (
            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button type="submit" disabled={!ok} className="btn btn-azure disabled:opacity-50"><Send size={16} /> Envoyer la pré-inscription</button>
              <a href={`${SITE.whatsappHref}?text=${body}`} target="_blank" rel="noopener noreferrer" className="btn btn-white"><MessageCircle size={16} /> Envoyer par WhatsApp</a>
            </div>)}
            <p className="sm:col-span-2 text-xs text-mute">Vos informations sont transmises à l’administration de l’école et ne sont utilisées que pour traiter votre demande.</p>
          </form>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHead chapter="À préparer avant de venir" title="Le dossier, pièce par pièce." lead="Tout tient dans une chemise. Si une pièce vous manque, venez quand même : le dossier peut être complété dans la semaine." />
          <ul className="mt-10 grid sm:grid-cols-2 gap-4 max-w-[1000px]">{I.dossier.map((r, i) => <Reveal key={i} as="li" delay={0.04 * i} className="card px-5 py-4 flex gap-4 items-center"><span className="w-8 h-8 rounded-full bg-sky flex items-center justify-center shrink-0 text-azure"><Check size={14} /></span><span className="t-small">{r}</span></Reveal>)}</ul>
        </div>
      </section>

      <section className="section pt-0"><div className="wrap-narrow"><SectionHead center chapter="Questions fréquentes" title="Avant de nous appeler." className="mb-10" /><Accordion items={FAQ} /><p className="t-small text-mute mt-6 text-center">Une autre question ? <Link to="/contact" className="ulink font-semibold text-azure">Écrivez-nous</Link></p></div></section>
    </main>
  );
}
