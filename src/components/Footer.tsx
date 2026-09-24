import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE, IMG, NAV } from '../content/site';
import { WordReveal, Reveal } from './ui/motion';
import { Halo } from './ui';

export const Footer = () => (
  <footer className="relative mt-10">
    {/* Panneau d'invitation : île arrondie sur dégradé bleu */}
    <div className="wrap">
      <div className="mesh-blue on-blue rounded-[var(--r-lg)] px-8 py-14 md:px-16 md:py-20 relative overflow-hidden">
        <Halo className="absolute -right-10 -top-6 w-[420px] opacity-70" />
        <div className="relative grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="chip mb-6">Rentrée {SITE.year}</p>
            <h2 className="t-h1 text-white"><WordReveal text="Une visite vaut toutes les promesses." /></h2>
            <Reveal delay={0.1}><p className="t-lead text-white/80 mt-5 max-w-[46ch]">Quarante minutes, pendant les cours, portes ouvertes. Venez voir les enseignants faire cours.</p></Reveal>
          </div>
          <Reveal className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3" delay={0.2}>
            <Link to="/contact" className="btn btn-gold btn-lg">Réserver une visite</Link>
            <Link to="/inscription" className="btn btn-ghost-light btn-lg">Pré-inscrire <ArrowUpRight size={18} /></Link>
          </Reveal>
        </div>
      </div>
    </div>
    <div className="wrap pt-16 pb-10">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3"><img src={IMG.monogramme} alt="" className="h-12" /><span className="font-display leading-tight text-deep">{SITE.name}<br /><span className="font-sans text-mute text-sm font-semibold">Depuis 1986 à El Jadida</span></span></div>
          <p className="font-display italic text-azure mt-6 text-lg">{SITE.motto}</p>
          <p className="t-small text-mute mt-3 max-w-[38ch]">Primaire, collège et lycée trilingues. Douze années, une seule maison.</p>
        </div>
        <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {[['L’établissement', [NAV[0], NAV[4], NAV[5], NAV[6], NAV[7]]], ['Les cycles', NAV.slice(1, 4)], ['Pratique', NAV.slice(8)]].map(([title, links]: any) => (
            <div key={title}><p className="t-meta mb-4">{title}</p><ul className="space-y-2.5">{links.map((l: any) => <li key={l.to}><Link to={l.to} className="ulink text-[15px] font-semibold text-deep/80">{l.label}</Link></li>)}</ul></div>
          ))}
        </div>
        <div className="md:col-span-3 card p-6 space-y-4 text-[14px]">
          <p className="flex gap-3"><MapPin size={16} className="text-gold shrink-0 mt-0.5" /><span>{SITE.address.line1}<br />{SITE.address.line2}</span></p>
          <a href={SITE.phoneHref} className="flex gap-3 font-semibold"><Phone size={16} className="text-gold shrink-0 mt-0.5" />{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`} className="flex gap-3 font-semibold"><Mail size={16} className="text-gold shrink-0 mt-0.5" />{SITE.email}</a>
          <p className="flex gap-3 text-mute"><Clock size={16} className="text-gold shrink-0 mt-0.5" />{SITE.hours}</p>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="ulink font-semibold text-azure inline-flex items-center gap-1">Google Maps <ArrowUpRight size={13} /></a>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mute">
        <p>© {new Date().getFullYear()} {SITE.name} — El Jadida, Maroc</p>
        <div className="flex gap-5"><Link to="/contact" className="hover:text-deep">Contact</Link><Link to="/inscription" className="hover:text-deep">Inscription</Link></div>
      </div>
    </div>
  </footer>
);
