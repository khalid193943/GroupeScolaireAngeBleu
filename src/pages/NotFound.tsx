import { Link } from 'react-router-dom';
import { Seo } from '../components/ui';
export default function NotFound() {
  return (
    <main className="mesh min-h-[80svh] flex items-center">
      <Seo title="Page introuvable — Groupe Scolaire Ange Bleu" description="Page introuvable." path="/404" />
      <div className="wrap" style={{ paddingTop: 'var(--header-h)' }}><p className="chip mb-6">Erreur 404</p><h1 className="t-display">Cette page n’est pas au programme.</h1><p className="t-lead text-mute mt-6 max-w-[40ch]">Le lien est peut-être ancien. Reprenez depuis l’accueil ou contactez-nous.</p><div className="mt-8 flex gap-3"><Link to="/" className="btn btn-azure">Retour à l’accueil</Link><Link to="/contact" className="btn btn-white">Contact</Link></div></div>
    </main>
  );
}
