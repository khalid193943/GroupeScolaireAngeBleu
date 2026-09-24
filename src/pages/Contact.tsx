import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SITE } from '../content/site';
import { store } from '../data/store';
import { Reveal } from '../components/ui/motion';
import { Seo } from '../components/ui';
import { PageHero, SectionHead } from '../components/sections';

const field = 'w-full bg-white border border-line text-deep rounded-2xl px-4 h-12 focus:outline-none focus:border-azure';
const label = 'block text-sm font-semibold text-deep mb-2';

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', subject: 'Visiter l’établissement', slot: 'Matin en semaine (conseillé)', message: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const [sent, setSent] = useState(false);
  const body = `${f.subject} — ${SITE.name}%0A%0ANom : ${f.name}%0ATéléphone : ${f.phone}%0ACréneau souhaité : ${f.slot}%0A%0A${f.message}`;
  const submit = async (e: React.FormEvent) => { e.preventDefault(); await store.add('messages', { ...f, date: new Date().toISOString(), read: false }); setSent(true); };
  return (
    <main>
      <Seo title="Contact — Groupe Scolaire Ange Bleu" description="Réserver une visite, appeler, écrire. El Jadida, depuis 1986." path="/contact" />
      <PageHero chapter="Contact · visiter, appeler, écrire" title="Une visite vaut toutes les promesses." lead="Quarante minutes, pendant les cours. Choisissez un créneau souhaité, nous confirmons par téléphone sous 48 h." />
      <section className="section pt-0">
        <div className="wrap grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <SectionHead chapter="Nous joindre" title="Vous préférez le téléphone ? Nous aussi, parfois." lead="Un appel de cinq minutes répond souvent mieux qu’un long formulaire." />
            <ul className="space-y-4">
              <li className="card p-5 flex gap-4"><Phone size={18} className="text-gold mt-1 shrink-0" /><span><span className="t-meta block">Téléphone</span><a href={SITE.phoneHref} className="t-h4 ulink">{SITE.phone}</a></span></li>
              <li className="card p-5 flex gap-4"><Mail size={18} className="text-gold mt-1 shrink-0" /><span><span className="t-meta block">E-mail</span><a href={`mailto:${SITE.email}`} className="t-h4 ulink">{SITE.email}</a></span></li>
              <li className="card p-5 flex gap-4"><MapPin size={18} className="text-gold mt-1 shrink-0" /><span><span className="t-meta block">Adresse</span><span className="t-h4 block">{SITE.address.line1}<br />{SITE.address.line2}</span><a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="ulink text-sm text-azure font-semibold inline-flex items-center gap-1 mt-1">Ouvrir dans Google Maps <ArrowUpRight size={13} /></a></span></li>
              <li className="card p-5 flex gap-4"><Clock size={18} className="text-gold mt-1 shrink-0" /><span><span className="t-meta block">Horaires d’accueil</span><span className="t-body">{SITE.hours}</span></span></li>
            </ul>
          </div>
          <Reveal className="lg:col-span-7 bg-sky-2 rounded-[var(--r-lg)] p-7 md:p-10" delay={0.1}>
            <p className="chip mb-6">Réserver une visite</p>
            <form className="grid sm:grid-cols-2 gap-5" onSubmit={submit}>
              <div><label className={label}>Votre nom *</label><input required className={field} value={f.name} onChange={set('name')} /></div>
              <div><label className={label}>Téléphone *</label><input required type="tel" className={field} value={f.phone} onChange={set('phone')} /></div>
              <div><label className={label}>Objet *</label><select className={field} value={f.subject} onChange={set('subject')}>{['Visiter l’établissement', 'Question sur l’inscription', 'Question sur les tarifs', 'Cantine et transport', 'Autre demande'].map((o) => <option key={o}>{o}</option>)}</select></div>
              <div><label className={label}>Créneau souhaité</label><select className={field} value={f.slot} onChange={set('slot')}>{['Peu importe', 'Matin en semaine (conseillé)', 'Après-midi en semaine', 'Samedi matin'].map((o) => <option key={o}>{o}</option>)}</select></div>
              <div className="sm:col-span-2"><label className={label}>Votre message *</label><textarea required rows={5} className={`${field} h-auto py-3`} value={f.message} onChange={set('message')} /></div>
              {sent ? <p className="sm:col-span-2 card p-5 text-azure font-semibold">Demande envoyée. Nous vous rappelons sous 48 h ouvrées pour confirmer le créneau. À très vite.</p> : (
              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <button type="submit" className="btn btn-azure"><Send size={16} /> Envoyer la demande</button>
                <a href={`${SITE.whatsappHref}?text=${body}`} target="_blank" rel="noopener noreferrer" className="btn btn-white"><MessageCircle size={16} /> WhatsApp</a>
              </div>)}
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
