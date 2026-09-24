import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import { SITE, IMG, NAV } from '../content/site';
import { EASE } from './ui/motion';

const PRIMARY = NAV.filter((n) => ['/etablissement', '/cycles/primaire', '/cycles/college', '/cycles/lycee', '/actualites'].includes(n.to));

/* Navigation flottante : une capsule de verre centrée, qui se resserre au défilement */
export const Header = () => {
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : ''; return () => { document.documentElement.style.overflow = ''; }; }, [open]);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className={`wrap flex justify-center transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-5'}`}>
          <div className={`pointer-events-auto glass rounded-full flex items-center gap-1 pl-2 pr-2 transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'} w-full max-w-[1120px]`}>
            <Link to="/" className="flex items-center gap-3 pl-1 pr-3" aria-label={SITE.name}>
              <img src={IMG.monogramme} alt="" className={`object-contain transition-all duration-500 ${scrolled ? 'h-9' : 'h-11'}`} />
              <span className="hidden md:block font-display leading-none text-deep"><span className="block text-[19px]">Ange Bleu</span><span className="block text-[11px] font-sans font-semibold text-mute tracking-wide mt-0.5">EL JADIDA · DEPUIS 1986</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-0.5 mx-auto" aria-label="Navigation principale">
              {PRIMARY.map((n) => <NavLink key={n.to} to={n.to} className={({ isActive }) => `px-3.5 py-2 rounded-full text-[14px] font-semibold transition-colors ${isActive ? 'bg-sky text-azure' : 'text-deep/75 hover:text-deep hover:bg-white'}`}>{n.label}</NavLink>)}
            </nav>
            <div className="ml-auto lg:ml-0 flex items-center gap-1.5">
              <Link to="/inscription" className="btn btn-gold hidden sm:inline-flex !h-10 !px-4 text-[14px]">S’inscrire</Link>
              <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu" className="h-10 w-10 rounded-full bg-deep text-white flex items-center justify-center hover:bg-azure transition-colors" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
                <span className="relative w-5 h-5 flex items-center justify-center"><span className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[3px]'}`} /><span className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[3px]'}`} /></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div id="menu" className="fixed inset-0 z-40 mesh" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="wrap h-full pt-28 pb-10 overflow-y-auto">
              <div className="max-w-[1120px] mx-auto grid lg:grid-cols-12 gap-10">
                <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-2">
                  {[{ label: 'Accueil', to: '/' }, ...NAV].map((l, i) => (
                    <motion.li key={l.to} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.03, duration: 0.6, ease: EASE }}>
                      <Link to={l.to} className="group glass rounded-3xl flex items-center justify-between px-6 py-5 hover:bg-white transition-colors">
                        <span className="font-display text-[clamp(1.3rem,2vw,1.7rem)] leading-none">{l.label}</span>
                        <span className="w-9 h-9 rounded-full bg-sky text-azure flex items-center justify-center group-hover:bg-gold group-hover:text-night transition-colors"><ArrowUpRight size={16} /></span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <motion.div className="lg:col-span-4 card p-7 space-y-5 text-[15px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <p className="chip">Contact</p>
                  <a href={SITE.phoneHref} className="flex items-center gap-3 font-semibold"><Phone size={15} className="text-gold" />{SITE.phone}</a>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 font-semibold"><Mail size={15} className="text-gold" />{SITE.email}</a>
                  <p className="text-mute">{SITE.address.line1}, {SITE.address.line2}<br />{SITE.hours}</p>
                  <Link to="/contact" className="btn btn-azure w-full">Réserver une visite</Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
