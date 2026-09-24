/* ------------------------------------------------------------------ */
/* Couche de données unique : Firebase (Firestore + Auth) quand la       */
/* configuration VITE_FIREBASE_* est fournie, sinon mémoire du navigateur*/
/* (mode démonstration, données d'exemple).                              */
/* ------------------------------------------------------------------ */
export type News = { id: string; title: string; date: string; category: string; excerpt: string; content: string; image?: string; published: boolean };
export type Event = { id: string; title: string; date: string; time?: string; place?: string; cycle?: string; desc?: string };
export type Message = { id: string; name: string; phone: string; email?: string; subject: string; slot?: string; message: string; date: string; read: boolean };
export type Inscription = { id: string; parent: string; phone: string; email?: string; child: string; level: string; start: string; note?: string; date: string; status: 'nouvelle' | 'contactée' | 'admise' | 'refusée' };
export type Collections = { news: News; events: Event; messages: Message; inscriptions: Inscription };
export type Key = keyof Collections;

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const HAS_FIREBASE = Boolean(cfg.apiKey && cfg.projectId);

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const today = (d = 0) => new Date(Date.now() + d * 86400000).toISOString().slice(0, 10);

/* Données d'exemple (mode démonstration) */
const SEED: { [K in Key]: Collections[K][] } = {
  news: [
    { id: 'n1', title: 'Journée portes ouvertes — samedi 11 octobre', date: today(-3), category: 'Vie de l’école', excerpt: 'Classes, laboratoires, atelier robotique et cantine ouverts aux familles, de 9h à 13h.', content: 'Les familles sont invitées à découvrir l’établissement pendant les heures de cours : classes du primaire, laboratoires de physique et de chimie, atelier robotique et cantine. La direction et les directeurs de cycle répondent à toutes les questions. Entrée libre, inscription conseillée par téléphone.', image: '', published: true },
    { id: 'n2', title: 'Nos équipes qualifiées pour la finale régionale de robotique', date: today(-12), category: 'Robotique', excerpt: 'Deux équipes du collège et une du lycée défendront l’école en avril.', content: 'Après la phase de sélection, trois équipes Ange Bleu sont qualifiées pour la finale régionale. Les robots ont été conçus et programmés au club robotique, deux après-midis par semaine, depuis septembre.', image: '', published: true },
    { id: 'n3', title: 'Résultats du bac 2026 : 100 % de réussite, 88 % de mentions', date: today(-40), category: 'Résultats', excerpt: 'Une promotion entière reçue, avec une majorité de mentions bien et très bien.', content: 'Tous nos candidats ont obtenu leur baccalauréat, avec 88 % de mentions bien et très bien. Bravo aux élèves, aux familles et aux enseignants.', image: '', published: true },
  ],
  events: [
    { id: 'e1', title: 'Portes ouvertes', date: today(17), time: '9h – 13h', place: 'Tout l’établissement', cycle: 'Tous cycles', desc: 'Visite libre des classes, laboratoires et de la cantine.' },
    { id: 'e2', title: 'Semaine des langues — concours d’éloquence', date: today(45), time: '14h', place: 'Salle polyvalente', cycle: 'Collège · Lycée', desc: 'En arabe, français et anglais, devant les familles.' },
    { id: 'e3', title: 'Réunion parents — bilan du 1er trimestre', date: today(60), time: '17h', place: 'Par cycle', cycle: 'Tous cycles', desc: 'Vingt minutes par famille, bulletin commenté.' },
  ],
  messages: [
    { id: 'm1', name: 'Nadia El Fassi', phone: '06 12 34 56 78', email: 'nadia@example.com', subject: 'Visiter l’établissement', slot: 'Matin en semaine (conseillé)', message: 'Bonjour, nous souhaitons visiter l’école pour notre fille qui entre en 3e année primaire.', date: today(-1), read: false },
    { id: 'm2', name: 'Youssef Benali', phone: '06 98 76 54 32', subject: 'Cantine et transport', message: 'Le transport dessert-il le quartier Saada ?', date: today(-4), read: true },
  ],
  inscriptions: [
    { id: 'i1', parent: 'Karim Ouazzani', phone: '06 11 22 33 44', email: 'karim@example.com', child: 'Lina', level: '1re année collège', start: 'Septembre 2026', note: 'Actuellement scolarisée à Casablanca, déménagement en août.', date: today(-2), status: 'nouvelle' },
    { id: 'i2', parent: 'Salma Idrissi', phone: '06 55 66 77 88', child: 'Adam', level: '1re année primaire', start: 'Septembre 2026', date: today(-9), status: 'contactée' },
  ],
};

/* ----------------------------- mode local ----------------------------- */
const LS = 'ab-data-v1';
type DB = { [K in Key]: Collections[K][] };
const listeners = new Set<() => void>();
const loadLocal = (): DB => { try { const raw = localStorage.getItem(LS); if (raw) return JSON.parse(raw); } catch {} return JSON.parse(JSON.stringify(SEED)); };
let local: DB | null = null;
const db = () => (local ||= loadLocal());
const commit = () => { try { localStorage.setItem(LS, JSON.stringify(db())); } catch {} listeners.forEach((f) => f()); };

/* ---------------------------- mode Firebase --------------------------- */
let fb: Promise<{ fs: any; auth: any; mod: any; authMod: any }> | null = null;
const firebase = () => (fb ||= (async () => {
  const [{ initializeApp }, mod, authMod] = await Promise.all([import('firebase/app'), import('firebase/firestore'), import('firebase/auth')]);
  const app = initializeApp(cfg);
  return { fs: mod.getFirestore(app), auth: authMod.getAuth(app), mod, authMod };
})());

/* -------------------------------- API --------------------------------- */
export const store = {
  /** S'abonne à une collection (triée par date décroissante). Retourne la fonction de désabonnement. */
  subscribe<K extends Key>(key: K, cb: (rows: Collections[K][]) => void): () => void {
    if (HAS_FIREBASE) {
      let unsub = () => {};
      firebase().then(({ fs, mod }) => { unsub = mod.onSnapshot(mod.query(mod.collection(fs, key), mod.orderBy('date', 'desc')), (snap: any) => cb(snap.docs.map((d: any) => ({ id: d.id, ...d.data() }))), () => cb([])); });
      return () => unsub();
    }
    const push = () => cb(([...(db()[key] as any[])].sort((a: any, b: any) => (a.date < b.date ? 1 : -1))) as Collections[K][]);
    push(); listeners.add(push); return () => listeners.delete(push);
  },
  async add<K extends Key>(key: K, row: Omit<Collections[K], 'id'>): Promise<string> {
    if (HAS_FIREBASE) { const { fs, mod } = await firebase(); const ref = await mod.addDoc(mod.collection(fs, key), row); return ref.id; }
    const id = uid(); (db()[key] as any[]).push({ id, ...row }); commit(); return id;
  },
  async update<K extends Key>(key: K, id: string, patch: Partial<Collections[K]>) {
    if (HAS_FIREBASE) { const { fs, mod } = await firebase(); await mod.updateDoc(mod.doc(fs, key, id), patch as any); return; }
    const list = db()[key] as any[]; const i = list.findIndex((r) => r.id === id); if (i >= 0) list[i] = { ...list[i], ...patch }; commit();
  },
  async remove(key: Key, id: string) {
    if (HAS_FIREBASE) { const { fs, mod } = await firebase(); await mod.deleteDoc(mod.doc(fs, key, id)); return; }
    (db() as any)[key] = (db()[key] as any[]).filter((r) => r.id !== id); commit();
  },
  reset() { local = JSON.parse(JSON.stringify(SEED)); commit(); },
};

/* ----------------------------- connexion ------------------------------ */
const SESSION = 'ab-admin-session';
/** Identifiants de démonstration (mode local uniquement). En production : Firebase Auth. */
export const DEMO_ACCESS = { email: 'direction@angebleu.ma', password: 'AngeBleu#1986' };
export const auth = {
  async login(email: string, password: string): Promise<{ email: string }> {
    if (HAS_FIREBASE) { const { auth, authMod } = await firebase(); const cred = await authMod.signInWithEmailAndPassword(auth, email, password); return { email: cred.user.email || email }; }
    if (email.trim().toLowerCase() === DEMO_ACCESS.email && password === DEMO_ACCESS.password) { sessionStorage.setItem(SESSION, email); return { email }; }
    throw new Error('Identifiant ou mot de passe incorrect.');
  },
  async logout() { if (HAS_FIREBASE) { const { auth, authMod } = await firebase(); await authMod.signOut(auth); } sessionStorage.removeItem(SESSION); },
  onChange(cb: (user: { email: string } | null) => void): () => void {
    if (HAS_FIREBASE) { let unsub = () => {}; firebase().then(({ auth, authMod }) => { unsub = authMod.onAuthStateChanged(auth, (u: any) => cb(u ? { email: u.email } : null)); }); return () => unsub(); }
    const e = sessionStorage.getItem(SESSION); cb(e ? { email: e } : null); return () => {};
  },
};

export const fmtDate = (iso: string) => { try { return new Date(iso + (iso.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return iso; } };
export const isUpcoming = (iso: string) => iso >= today();
