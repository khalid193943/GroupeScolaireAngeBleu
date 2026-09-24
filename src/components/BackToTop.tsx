import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { EASE } from './ui/motion';

/** Bouton « remonter » : apparaît après un écran de défilement, avec un anneau de progression de lecture. */
export const BackToTop = () => {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const dash = useTransform(scrollYProgress, [0, 1], [0, 1]);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] w-14 h-14 rounded-full bg-azure text-white shadow-[0_20px_40px_-15px_rgba(0,104,186,0.6)] flex items-center justify-center group"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-label="Remonter en haut de la page"
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden>
            <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <motion.circle cx="28" cy="28" r="26" fill="none" stroke="#E3A72F" strokeWidth="2" strokeLinecap="round" style={{ pathLength: dash }} />
          </svg>
          <ArrowUp size={20} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
