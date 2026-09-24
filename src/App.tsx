import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { BackToTop } from './components/BackToTop';

const Home = lazy(() => import('./pages/Home'));
const Etablissement = lazy(() => import('./pages/Etablissement'));
const Cycle = lazy(() => import('./pages/Cycle'));
const Campus = lazy(() => import('./pages/Campus'));
const VieScolaire = lazy(() => import('./pages/VieScolaire'));
const Resultats = lazy(() => import('./pages/Resultats'));
const Services = lazy(() => import('./pages/Services'));
const Parents = lazy(() => import('./pages/Parents'));
const Inscription = lazy(() => import('./pages/Inscription'));
const Contact = lazy(() => import('./pages/Contact'));
const Actualites = lazy(() => import('./pages/Actualites'));
const Article = lazy(() => import('./pages/Article'));
const AdminApp = lazy(() => import('./admin/AdminApp'));
const NotFound = lazy(() => import('./pages/NotFound'));

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (hash) { const el = document.getElementById(hash.slice(1)); if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; } } window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname, hash]);
  return null;
};

const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter;

const Site = () => (
  <>
    <Preloader />
    <Header />
        <Suspense fallback={<div className="fixed inset-x-0 top-0 z-[90] h-0.5"><span className="block h-full bg-gold origin-left" style={{ animation: 'loader-bar 1.2s cubic-bezier(.16,1,.3,1) infinite' }} /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/etablissement" element={<Etablissement />} />
            <Route path="/cycles/:id" element={<Cycle />} />
            <Route path="/campus" element={<Campus />} />
            <Route path="/vie-scolaire" element={<VieScolaire />} />
            <Route path="/resultats" element={<Resultats />} />
            <Route path="/services" element={<Services />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:id" element={<Article />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
    <Footer />
    <BackToTop />
  </>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollManager />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="*" element={<Site />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
