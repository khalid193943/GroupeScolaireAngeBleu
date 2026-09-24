/* Aperçu autonome : Firebase n'est pas embarqué (mode démonstration uniquement). */
const noop = () => { throw new Error('Firebase non disponible dans l’aperçu.'); };
export const initializeApp = noop; export const getFirestore = noop; export const collection = noop; export const query = noop; export const orderBy = noop; export const onSnapshot = noop; export const addDoc = noop; export const updateDoc = noop; export const deleteDoc = noop; export const doc = noop;
export const getAuth = noop; export const signInWithEmailAndPassword = noop; export const signOut = noop; export const onAuthStateChanged = noop;
