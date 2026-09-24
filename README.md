# Groupe Scolaire Ange Bleu — site (refonte 2026)

Site vitrine du Groupe Scolaire Ange Bleu (El Jadida). Thème propre « lumière et halo » : fond clair, dégradés ciel, or du halo du logo, typographie Fraunces + Manrope, formes capsule et cartes de verre. React 19 + Vite + Tailwind v4 + Motion, en français, sans base de données.

## Lancer / déployer
```bash
npm install
npm run dev          # développement (http://localhost:3000)
npm run build        # production → dist/  (Vercel : framework Vite, output dist ; vercel.json gère les routes)
npm run build:apercu # aperçu autonome en un seul fichier → dist-apercu/index.html
```

## Où modifier le contenu
Tout le texte du site est dans **`src/content/site.ts`** : coordonnées (`SITE` — téléphone, e-mail, adresse, horaires, WhatsApp : les valeurs « XX » sont à compléter), navigation, accueil, les trois cycles (`CYCLES`), établissement, campus, vie scolaire, résultats, services, espace parents, inscription, FAQ.

Palette et typographie : `src/index.css` (bleu `#0068BA`, bleu profond `#0A2A5E`, or `#E3A72F`, ciel `#EAF3FF`, nuage `#F7FAFF`).

## Pages
`/` accueil · `/etablissement` · `/cycles/primaire` `/cycles/college` `/cycles/lycee` · `/campus` · `/vie-scolaire` · `/resultats` · `/services` · `/parents` · `/inscription` · `/contact`

## Administration (`/admin`)
Tableau de bord, actualités (création, photo, brouillon/publié, export CSV), agenda (événements avec « Ajouter à mon agenda » côté public), messages (page Contact, lus/non lus, rappel, WhatsApp), pré-inscriptions (statut nouvelle → contactée → admise/refusée, export CSV).

### Deux modes, un seul code
- **Sans configuration** (par défaut, et dans l'aperçu) : mode démonstration. Les données restent dans le navigateur (localStorage), avec des exemples. Connexion : `direction@angebleu.ma` / `AngeBleu#1986` (pré-remplis). Le bouton « Données d'exemple » du tableau de bord remet les exemples.
- **Avec Firebase** : copier `.env.example` en `.env`, renseigner les clés du projet Firebase, déployer `firestore.rules`, créer un utilisateur dans Firebase Auth (e-mail + mot de passe). Les mêmes écrans lisent et écrivent alors dans Firestore ; la connexion passe par Firebase Auth. Les identifiants de démonstration sont désactivés automatiquement.

La couche de données est dans `src/data/store.ts` (collections `news`, `events`, `messages`, `inscriptions`).

## Formulaires
Contact et pré-inscription enregistrent la demande (visible dans l'administration) et proposent toujours l'envoi par WhatsApp.

## Photos
La façade (`src/assets/campus.jpg`) est en fond du hero de l'accueil. D'autres photos pourront être ajoutées dans les cartes des cycles et la page Campus.
