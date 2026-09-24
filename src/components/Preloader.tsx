import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SITE, IMG } from '../content/site';
import { EASE } from './ui/motion';

const KEY = 'ab-loaded'; const DURATION = 2;
export const preloaderDelay = () => { try { return sessionStorage.getItem(KEY) ? 0 : DURATION + 0.3; } catch { return 0; } };

/* Écran d'ouverture : le halo se dessine autour du monogramme, sur fond clair */
export const Preloader = () => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => { try { return !sessionStorage.getItem(KEY); } catch { return false; } });
  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = 'hidden';
    const t = window.setTimeout(() => { setShow(false); document.documentElement.style.overflow = ''; try { sessionStorage.setItem(KEY, '1'); } catch {} }, DURATION * 1000 + 150);
    return () => { window.clearTimeout(t); document.documentElement.style.overflow = ''; };
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100] mesh flex flex-col items-center justify-center" initial={false} exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }} transition={{ duration: 0.8, ease: EASE }} role="status" aria-label="Chargement">
          <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full" aria-hidden fill="none">
              <motion.ellipse cx="150" cy="150" rx="138" ry="138" stroke="#E3A72F" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0, rotate: -90 }} animate={{ pathLength: 1 }} transition={{ duration: DURATION, ease: [0.4, 0, 0.2, 1] }} style={{ transformOrigin: '50% 50%' }} />
              <ellipse cx="150" cy="150" rx="138" ry="138" stroke="rgba(10,42,94,0.08)" strokeWidth="3" />
            </svg>
            <motion.img src={IMG.monogramme} alt="" className="w-[46%]" initial={reduce ? false : { scale: 0.7, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: EASE }} />
          </div>
          <motion.p className="font-display italic text-azure text-xl md:text-2xl mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>{SITE.motto}</motion.p>
          <p className="t-meta mt-3">{SITE.name} · El Jadida</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
