import emblem from '../assets/emblem.png';
import monogramme from '../assets/monogramme.png';
import monogrammeBlanc from '../assets/monogramme-blanc.png';
import logoComplet from '../assets/logo-complet.png';
import campus from '../assets/campus.jpg';

/** Coordonnées et identité. Les valeurs « XX » sont à compléter par l'établissement. */
export const SITE = {
  name: 'Groupe Scolaire Ange Bleu',
  short: 'Ange Bleu',
  tagline: 'Primaire · Collège · Lycée',
  city: 'El Jadida',
  since: 1986,
  year: '2026-2027',
  domain: 'https://gsangebleu.ma',
  motto: 'L’exigence est une forme de respect.',
  phone: '05 23 XX XX XX',
  phoneHref: 'tel:+2120523000000',
  email: 'contact@gsangebleu.ma',
  whatsappHref: 'https://wa.me/2120523000000',
  address: { line1: 'Groupe Scolaire Ange Bleu', line2: 'El Jadida, Maroc' },
  mapsUrl: 'https://www.google.com/maps?q=El+Jadida+Maroc',
  hours: 'Lundi – vendredi 8h – 17h30 · Samedi 9h – 12h (direction sans rendez-vous)',
  social: { facebook: 'https://www.facebook.com', instagram: 'https://www.instagram.com' },
};

export const IMG = { emblem, monogramme, monogrammeBlanc, logoComplet, campus };

export const NAV = [
  { label: 'L’établissement', to: '/etablissement' },
  { label: 'Primaire', to: '/cycles/primaire' },
  { label: 'Collège', to: '/cycles/college' },
  { label: 'Lycée', to: '/cycles/lycee' },
  { label: 'Campus', to: '/campus' },
  { label: 'Vie scolaire', to: '/vie-scolaire' },
  { label: 'Résultats', to: '/resultats' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Services', to: '/services' },
  { label: 'Espace parents', to: '/parents' },
  { label: 'Inscription', to: '/inscription' },
  { label: 'Contact', to: '/contact' },
];

export const HOME = {
  eyebrow: 'El Jadida · depuis 1986',
  title: 'L’école qui forme la génération d’après.',
  lead: 'Primaire, collège et lycée. Trilingue, tourné vers la robotique et le numérique — et deux fois premier du Maroc.',
  facts: ['2× premiers du Maroc', '100 % de réussite au bac', '40 ans d’expérience', '3 langues enseignées', 'Robotique dès le collège', 'Rentrée 2026 : inscriptions ouvertes'],
  director: {
    quote: 'Un enfant qu’on forme aujourd’hui exercera un métier qui n’existe pas encore. Notre travail est de le rendre capable de l’apprendre.',
    text: 'C’est la raison pour laquelle nous avons introduit la robotique, le codage et les langues très tôt — sans jamais lâcher l’arabe, l’orthographe et le calcul mental. La nouveauté ne remplace pas les fondamentaux : elle s’appuie dessus.',
    role: 'La direction — Groupe Scolaire Ange Bleu, El Jadida',
  },
  mission: 'Conduire chaque élève du premier alphabet au baccalauréat, sans qu’il ait jamais à recommencer ailleurs.',
  vision: 'Une école marocaine qui enseigne le programme national et y ajoute la robotique, le code et trois langues de travail.',
  principles: [
    { title: 'Exigence', text: 'Demander peu à un enfant, c’est décider à sa place qu’il ne peut pas.' },
    { title: 'Ouverture', text: 'Trois langues, le numérique, la robotique. Le monde entre dans la classe.' },
    { title: 'Accompagnement', text: 'Personne ne décroche en silence. On appelle avant que ce soit grave.' },
    { title: 'Résultat', text: 'Deux fois premiers du Maroc. Les chiffres sont publics, les anciens joignables.' },
  ],
  beyond: [
    { title: 'Robotique', text: 'Assembler, programmer, faire bouger. Dès la 1re année collège, avec sortie en compétition.' },
    { title: 'Codage', text: 'Scratch au primaire, Python au lycée. Un poste par élève, projets notés.' },
    { title: 'Sciences en labo', text: 'Trois laboratoires. On manipule, on mesure, on se trompe — puis on recommence.' },
    { title: 'Trois langues', text: 'Arabe, français, anglais. Comme langues de travail, pas comme matières.' },
  ],
  numbers: [
    { n: '40', l: 'années d’existence', d: 'Ouvert en 1986 avec deux salles et une cour.' },
    { n: '2×', l: 'premiers au niveau national', d: 'En 2015 puis en 2025.' },
    { n: '100%', l: 'de réussite au baccalauréat', d: 'Avec une majorité de mentions bien et très bien.' },
    { n: '11 ans', l: 'd’ancienneté des enseignants', d: 'Nos professeurs restent.' },
    { n: '3', l: 'langues de travail', d: 'Arabe, français et anglais dès le primaire.' },
  ],
  alumni: [
    { name: 'Salma B.', role: 'Bachelière 2019 · Faculté de médecine, Casablanca', text: 'J’ai passé douze ans ici. En médecine, j’ai retrouvé la méthode de travail qu’on m’avait apprise au collège : je n’ai jamais eu à la réinventer.' },
    { name: 'Adam T.', role: 'Bachelier 2024 · École d’ingénieurs, Rabat', text: 'Le club robotique m’a donné envie de faire une école d’ingénieurs. J’ai programmé mon premier robot en 2e année collège.' },
    { name: 'Karim E.', role: 'Parent d’élèves · El Jadida', text: 'Mes trois enfants y sont passés. Ce qui m’a marqué : on m’appelait avant que les notes baissent, jamais après.' },
  ],
};

export type CycleId = 'primaire' | 'college' | 'lycee';
export const CYCLES: Record<CycleId, {
  chapter: string; title: string; ages: string; levels: string; tagline: string; heroTitle: string; heroLead: string;
  stakeTitle: string; stakeText: string; yearsTitle: string; years: { n: string; title: string; text: string; points: string[] }[];
  dayTitle?: string; day?: { time: string; text: string }[]; extras?: { title: string; text: string }[]; extrasTitle?: string;
}> = {
  primaire: {
    chapter: 'Chapitre I', title: 'Primaire', ages: '6 à 12 ans', levels: '6 niveaux', tagline: 'Six niveaux · les fondations',
    heroTitle: 'Six années qui décident du reste.',
    heroLead: 'Un bon bachelier se construit en CE2. Lire sans buter, écrire sans y penser, calculer de tête : ce qui s’installe ici ne se rattrape jamais complètement ailleurs.',
    stakeTitle: 'Les fondations ne se refont pas',
    stakeText: 'Au primaire, tout est encore possible — et tout se joue. Un enfant qui sort de chez nous en 6e année lit couramment dans trois langues, pose une division sans calculatrice, et sait ce que veut dire « rendre un travail soigné ». C’est pour cela que nos moyens les plus solides — enseignants les plus expérimentés, effectifs les plus réduits — vont aux petites classes.',
    yearsTitle: 'Ce qui s’installe, dans l’ordre',
    years: [
      { n: '1re', title: 'Le déchiffrage devient lecture', text: 'L’année de la lecture en arabe et en français, et des premiers nombres.', points: ['Lecture syllabique quotidienne, à voix haute', 'Écriture cursive, tenue du crayon, soin du cahier', 'Numération jusqu’à 100, premiers calculs'] },
      { n: '2e', title: 'Lire pour comprendre', text: 'On ne déchiffre plus : on comprend ce qu’on lit, et on commence l’anglais à l’oral.', points: ['Lecture courante et questions de compréhension', 'Addition et soustraction posées, tables', 'Anglais oral : chansons, consignes, vocabulaire'] },
      { n: '3e', title: 'L’année charnière', text: 'Le CE2 de la maison : c’est ici qu’un futur bachelier prend — ou non — ses automatismes.', points: ['Rédaction de textes courts dans les deux langues', 'Multiplication, division, calcul mental chronométré', 'Anglais écrit, premières phrases'] },
      { n: '4e', title: 'Travailler seul', text: 'L’autonomie s’apprend : leçons à réciter, devoirs planifiés, cartable préparé seul.', points: ['Grammaire et conjugaison systématiques', 'Problèmes à plusieurs étapes', 'Exposés courts devant la classe'] },
      { n: '5e', title: 'La rigueur avant le collège', text: 'Le rythme s’approche de celui du collège : plus d’écrit, plus de mémoire, plus d’exigence.', points: ['Rédactions structurées, dictées longues', 'Fractions, décimaux, géométrie de construction', 'Sciences : premières expériences guidées'] },
      { n: '6e', title: 'Prêt pour la suite', text: 'Année de consolidation et d’examen : l’élève part au collège avec ses méthodes déjà en place.', points: ['Préparation au certificat de fin de primaire', 'Trois langues écrites et parlées', 'Passage accompagné vers le collège — les mêmes murs, les mêmes repères'] },
    ],
  },
  college: {
    chapter: 'Chapitre II', title: 'Collège', ages: '12 à 15 ans', levels: '3 niveaux', tagline: 'Trois niveaux · la méthode',
    heroTitle: 'L’âge où l’on décide sans le savoir.',
    heroLead: 'Trois années où un élève prend ses méthodes — ou les perd. Personne ne rate son bac en terminale : cela se joue ici, entre 12 et 15 ans.',
    stakeTitle: 'La méthode avant les notes',
    stakeText: 'Au collège, la quantité de travail double et les matières se spécialisent. L’élève qui n’a pas de méthode coule en silence. Notre réponse : des devoirs surveillés réguliers, des copies corrigées ligne à ligne, une heure de méthodologie intégrée à l’emploi du temps, et des parents appelés dès le premier signal faible. C’est aussi le cycle des laboratoires : la physique et la chimie s’apprennent paillasse en main, pas au tableau.',
    yearsTitle: 'Trois années, trois paliers',
    years: [
      { n: '1re', title: 'Apprendre à apprendre', text: 'L’année de la transition : nouveaux professeurs par matière, nouveau rythme, nouvelles règles du jeu.', points: ['Heure de méthodologie hebdomadaire : prise de notes, organisation, mémorisation', 'Premiers devoirs surveillés en conditions d’examen', 'Entrée au laboratoire : physique-chimie et SVT en travaux pratiques'] },
      { n: '2e', title: 'Monter en puissance', text: 'L’année où l’écart se creuse ailleurs — et se resserre chez nous.', points: ['Rédactions et démonstrations : l’écrit devient structuré', 'Soutien ciblé en petits groupes', 'Anglais renforcé : l’oral devient exigible'] },
      { n: '3e', title: 'L’année de l’examen', text: 'Le brevet régional se prépare comme un bac : examens blancs, annales, gestion du temps.', points: ['Deux examens blancs complets dans l’année', 'Entretien d’orientation individuel : sciences ou lettres au lycée', 'Bilan de cycle remis aux parents avant l’été'] },
    ],
    dayTitle: 'Une journée type',
    day: [
      { time: '7h55', text: 'Entrée en classe. Absences signalées aux parents dans l’heure.' },
      { time: '8h00', text: 'Cours du matin. Quatre séances de 55 minutes, matières fondamentales en tête.' },
      { time: '12h00', text: 'Pause déjeuner. Cantine sur place ou retour à la maison.' },
      { time: '14h00', text: 'Cours de l’après-midi. Laboratoires, langues, EPS selon les jours.' },
      { time: '17h00', text: 'Fin des cours. Étude surveillée en option jusqu’à 18h.' },
    ],
  },
  lycee: {
    chapter: 'Chapitre III', title: 'Lycée', ages: '15 à 18 ans', levels: 'tronc commun, 1re et 2e bac', tagline: 'Sciences et lettres · le bac',
    heroTitle: 'Premiers du Maroc. Deux fois.',
    heroLead: 'En 2015 et en 2025, nos bacheliers ont été classés premiers au niveau national. Ce n’est pas un hasard de promotion : c’est le dernier chapitre de douze années de travail.',
    stakeTitle: 'Le bac est un seuil, pas un sommet',
    stakeText: 'Notre objectif n’est pas seulement la mention : c’est ce qui vient après. Un bachelier d’Ange Bleu doit tenir le rythme d’une classe préparatoire, d’une faculté de médecine ou d’une école d’ingénieurs — au Maroc ou à l’étranger. C’est pour cela que le lycée travaille en conditions réelles : devoirs en temps limité, colles orales, annales nationales dès la première année du bac.',
    yearsTitle: 'Deux voies, une même exigence',
    years: [
      { n: 'TC', title: 'Tronc commun', text: 'Une année pour consolider et choisir. Tous les élèves suivent le socle scientifique et littéraire avant de s’orienter.', points: ['Socle scientifique et littéraire commun', 'Entretien d’orientation individuel au deuxième trimestre'] },
      { n: 'Sc.', title: 'Sciences', text: 'Sciences mathématiques et sciences expérimentales (PC, SVT). Laboratoire chaque semaine.', points: ['Préparation aux concours des grandes écoles', 'Devoirs en temps limité sur annales nationales'] },
      { n: 'Lt.', title: 'Lettres et humanités', text: 'Littérature, philosophie, langues. Une filière tenue avec la même rigueur que les sciences.', points: ['Dissertations corrigées ligne à ligne', 'Oraux réguliers'] },
    ],
    dayTitle: 'Comment on prépare un premier du Maroc',
    day: [
      { time: 'Sept.', text: 'Programme bouclé en avance : le dernier trimestre est réservé aux révisions.' },
      { time: 'Oct. – mai', text: 'Un devoir surveillé par semaine, en temps limité, corrigé rendu sous huit jours.' },
      { time: 'Janv.', text: 'Premier bac blanc complet, conditions réelles, anonymat des copies.' },
      { time: 'Avril', text: 'Deuxième bac blanc + orientation. Dossiers post-bac finalisés, Maroc et étranger.' },
      { time: 'Juin', text: 'Le bac. Et depuis toujours : 100 % de réussite.' },
    ],
    extrasTitle: 'Sortir prêt, pas seulement reçu.',
    extras: [
      { title: 'Python et algorithmique', text: 'Le langage réellement utilisé en prépa et en école d’ingénieurs, travaillé sur projets.' },
      { title: 'Club robotique avancé', text: 'Projets de fin d’année présentés en compétition inter-établissements.' },
      { title: 'Orientation préparée', text: 'Entretiens individuels, dossiers post-bac au Maroc et à l’étranger, préparation aux concours.' },
    ],
  },
};

export const ETABLISSEMENT = {
  title: 'Quarante ans au même endroit.',
  lead: 'Une école ne se juge pas sur une année, mais sur ce que deviennent ses élèves une génération plus tard. Nous avons maintenant le recul pour répondre.',
  directorQuote: 'Nous n’avons jamais promis plus que du travail.',
  directorText: ['Quand nous avons ouvert en 1986, El Jadida comptait peu d’écoles privées. Nous avons fait un pari simple : des enseignants exigeants, des classes tenues, et des parents traités en partenaires. Quarante ans plus tard, nous accueillons les enfants de nos anciens élèves. C’est la seule réussite dont nous soyons vraiment fiers.', 'Le reste — les classements, les taux de réussite — n’est que la conséquence.'],
  history: [
    { year: '1986', title: 'Ouverture du primaire', text: 'Deux salles, une cour, et la conviction que la lecture et le calcul se gagnent avant 10 ans.' },
    { year: '1994', title: 'Ouverture du collège', text: 'Nos premiers élèves grandissent : nous grandissons avec eux plutôt que de les laisser partir.' },
    { year: '2001', title: 'Ouverture du lycée', text: 'Le parcours est complet. Un élève peut faire ses douze années sous le même toit.' },
    { year: '2015', title: 'Premiers du Maroc', text: 'Nos bacheliers sont classés premiers au niveau national. Le pari de 1986 est vérifié.' },
    { year: '2019', title: 'Laboratoires et numérique', text: 'Trois laboratoires rééquipés, salle informatique, puis l’atelier robotique.' },
    { year: '2025', title: 'Premiers du Maroc, encore', text: 'Dix ans après. Ce n’était pas un hasard de promotion : c’est une méthode qui aboutit.' },
  ],
  team: [
    { title: 'La direction générale', text: 'Présente sur site tous les jours. Elle reçoit les parents sans rendez-vous chaque samedi matin.' },
    { title: 'Trois directeurs de cycle', text: 'Un responsable par cycle — primaire, collège, lycée — qui connaît chaque élève par son prénom et suit chaque conseil de classe.' },
    { title: 'La vie scolaire', text: 'Surveillants, infirmerie et cellule d’écoute : les absences sont signalées aux parents dans l’heure.' },
  ],
  recruit: ['Dossier et diplômes. Spécialité exigée dans la matière enseignée.', 'Entretien pédagogique, avec la direction et le directeur de cycle.', 'Leçon d’essai : une heure devant une vraie classe, observée.', 'Année probatoire : visites de classe et accompagnement avant titularisation.'],
  teamNumbers: [['11 ans', 'd’ancienneté moyenne'], ['100 %', 'de spécialistes dans leur matière'], ['2', 'journées de formation interne par an'], ['1', 'leçon d’essai obligatoire avant recrutement']],
};

export const CAMPUS = {
  title: 'Un établissement, pas une salle de classe.',
  lead: 'Laboratoires équipés, bibliothèque en trois langues, installations sportives et espaces à la taille de douze années de vie.',
  items: [
    { title: 'Trois laboratoires', text: 'Physique, chimie, sciences de la vie. Du vrai matériel, manipulé par les élèves — pas montré depuis l’estrade.' },
    { title: 'Atelier robotique', text: 'Cartes programmables, capteurs, moteurs et imprimante 3D. Ouvert aux clubs deux après-midis par semaine.' },
    { title: 'Bibliothèque trilingue', text: 'Un fonds en arabe, français et anglais, du roman jeunesse aux annales du bac. Ouverte entre les cours et le soir.' },
    { title: 'Salle informatique', text: 'Un poste par élève, initiation dès le primaire, bureautique et programmation au collège et au lycée.' },
    { title: 'Terrains de sport', text: 'Football, basket et athlétisme dans l’enceinte de l’établissement. L’EPS est un cours, pas une récréation.' },
    { title: 'Cantine sur place', text: 'Cuisine préparée dans l’établissement, menus affichés chaque semaine dans l’espace parents.' },
    { title: 'Sécurité et accès', text: 'Enceinte fermée, accès contrôlé, personnel de surveillance à chaque entrée et sortie des classes.' },
  ],
  numbers: [['3', 'labos physique, chimie, SVT'], ['3', 'langues dans le fonds de la bibliothèque'], ['1', 'poste informatique par élève'], ['2', 'après-midis d’atelier robotique par semaine']],
};

export const VIE = {
  title: 'Ce qui se passe après la sonnerie.',
  lead: 'Une école où l’on ne fait que des cours forme des élèves fatigués. Les clubs, les sorties et les événements font partie du projet — pas de la décoration.',
  clubs: [
    { title: 'Club sciences', text: 'Expériences au laboratoire, préparation aux olympiades de mathématiques et de physique.' },
    { title: 'Théâtre et éloquence', text: 'En trois langues. Un spectacle par an, ouvert aux familles, et des concours d’éloquence inter-niveaux.' },
    { title: 'Sport et tournois', text: 'Football, basket, athlétisme. Tournois inter-classes chaque trimestre, rencontres inter-écoles au printemps.' },
    { title: 'Club robotique', text: 'Programmation et petits robots dès le collège. Les projets sont présentés à la fête de fin d’année.' },
    { title: 'Club lecture', text: 'Un livre par mois, discuté à la bibliothèque. Le goût de lire ne se décrète pas : il s’attrape.' },
    { title: 'Arts plastiques', text: 'Dessin, peinture, exposition annuelle dans le hall. Les œuvres restent accrochées toute l’année.' },
  ],
  events: [
    { title: 'Compétition de robotique', when: 'Printemps · collège et lycée', text: 'Nos équipes conçoivent et programment leur robot, puis affrontent d’autres établissements sur un défi imposé.' },
    { title: 'Marathon de l’école', when: 'Avril · tous les cycles', text: 'Une course ouverte à tous les cycles et aux parents. Le sport comme discipline collective.' },
    { title: 'Olympiades maths et sciences', when: 'Hiver · collège et lycée', text: 'Préparation encadrée toute l’année au club sciences, entraînement sur les épreuves passées.' },
    { title: 'Concours d’éloquence', when: 'Février · semaine des langues', text: 'En arabe, français et anglais. Savoir défendre une idée devant une salle.' },
    { title: 'Tournois inter-écoles', when: 'Toute l’année · sélections', text: 'Football, basket et athlétisme contre les établissements de la région.' },
    { title: 'Expo-sciences et projets', when: 'Juin · ouvert aux familles', text: 'Chaque club présente son projet aux familles : robots, expériences, maquettes, applications.' },
  ],
  outings: 'Les sorties se méritent et se préparent : une par trimestre, adossée au programme. On visite le port après le cours de géographie, la kasbah après celui d’histoire.',
};

export const RESULTATS = {
  title: 'Rien à croire sur parole.',
  lead: 'Les classements sont publics, les taux sont vérifiables, les anciens sont joignables. Voici ce que produisent douze années à Ange Bleu — en chiffres et en parcours.',
  feats: [
    { year: '2015', title: 'Premiers au niveau national', text: 'Nos bacheliers en sciences obtiennent la première place du Maroc. Une génération entière formée chez nous depuis le primaire.' },
    { year: '2025', title: 'Premiers au niveau national, encore', text: 'Dix ans plus tard, la démonstration se répète. Ce n’est pas un hasard de promotion : c’est une méthode qui aboutit.' },
  ],
  numbers: [['100 %', 'de réussite au baccalauréat'], ['100 %', 'de réussite au brevet régional'], ['85 %', 'de mentions bien et très bien'], ['40', 'promotions de bacheliers depuis 1986']],
  after: ['Médecine — Casablanca, Rabat', 'Classes préparatoires', 'Écoles d’ingénieurs (EMI, ENSA…)', 'ENCG et commerce', 'Architecture', 'Universités à l’étranger'],
  distinctions: [['Compétition de robotique', 'Équipes collège et lycée'], ['Olympiades de mathématiques', 'Préparation encadrée'], ['Concours d’éloquence', 'En trois langues'], ['Marathon de l’école', 'Tous cycles et familles']],
};

export const SERVICES = {
  title: 'De 7h45 à 18h, tout est prévu.',
  lead: 'Cantine, transport, étude surveillée : le quotidien pris en charge, pour que les parents travaillent tranquilles et que les enfants ne perdent pas une heure.',
  day: [
    { time: '7h15', text: 'Ramassage scolaire. Circuits couvrant El Jadida et ses environs, accompagnateur à bord.' },
    { time: '7h45', text: 'Accueil. Portail surveillé, entrée contrôlée.' },
    { time: '12h00', text: 'Cantine. Repas cuisinés sur place, menus affichés chaque semaine.' },
    { time: '16h30', text: 'Sortie ou étude. Retour en transport, ou étude surveillée encadrée par des enseignants.' },
    { time: '18h00', text: 'Fermeture. Dernier départ du transport, derniers élèves récupérés.' },
  ],
  items: [
    { title: 'Cantine', text: 'Cuisine préparée dans l’établissement, pas de sous-traitance. Menus équilibrés validés chaque semaine, alternatives en cas d’allergie signalée.' },
    { title: 'Transport scolaire', text: 'Plusieurs circuits dans El Jadida et ses environs, un accompagnateur adulte dans chaque véhicule, horaires communiqués à la rentrée.' },
    { title: 'Étude surveillée', text: 'De 16h30 à 18h, encadrée par des enseignants — pas de simples surveillants. Les devoirs rentrent faits à la maison.' },
    { title: 'Garderie du matin', text: 'Dès 7h45 pour les parents qui embauchent tôt. Les élèves sont accueillis dans une salle dédiée jusqu’à la sonnerie.' },
    { title: 'Infirmerie et assurance', text: 'Personnel de premiers secours sur place, protocole d’appel des parents immédiat, assurance scolaire incluse dans les frais.' },
  ],
};

export const PARENTS = {
  title: 'On appelle avant que ce soit grave.',
  lead: 'Les parents sont des partenaires, pas des visiteurs de juin. Voici comment nous travaillons ensemble, toute l’année.',
  items: [
    { title: 'L’appel avant le bulletin', text: 'Une absence est signalée dans l’heure. Une baisse de résultats déclenche un appel du directeur de cycle — avant le conseil de classe, pas après.' },
    { title: 'Le carnet et les circulaires', text: 'Le carnet de correspondance fait l’aller-retour chaque semaine au primaire. Les circulaires importantes sont remises en main propre et par message.' },
    { title: 'Trois rendez-vous par an', text: 'Après chaque conseil de classe, vingt minutes par famille, avec le bulletin commenté. Et la direction reçoit sans rendez-vous le samedi matin.' },
  ],
  contract: [
    ['Nous', 'Prévenir tôt, corriger vite, recevoir toujours. Aucune question de parent ne reste sans réponse plus de 48 heures.'],
    ['Vous', 'La ponctualité le matin, le carnet signé, la présence aux trois rendez-vous de l’année.'],
    ['Ensemble', 'Un cadre cohérent — ce qui est exigé en classe est soutenu à la maison, et réciproquement.'],
  ],
};

export const INSCRIPTION = {
  title: 'Quatre étapes, une réponse sous cinq jours.',
  lead: 'Pas de dossier labyrinthique ni d’attente sans nouvelles. Voici exactement comment inscrire votre enfant, de la première visite à la rentrée.',
  steps: [
    { title: 'La visite', text: 'Quarante minutes pendant les cours : classes, laboratoires, cantine. Vous posez toutes vos questions à la direction.' },
    { title: 'Le dossier', text: 'Vous déposez les pièces. L’administration vérifie tout avec vous sur place, en une seule fois.' },
    { title: 'Le test de niveau', text: 'Pour le collège et le lycée : un test écrit en langues et mathématiques. Une photographie du niveau, pour bien placer l’élève.' },
    { title: 'La réponse', text: 'Sous cinq jours ouvrés, par téléphone. En cas d’admission, la place est réservée dès le versement des frais d’inscription.' },
  ],
  dossier: ['Extrait d’acte de naissance récent de l’élève', '4 photos d’identité récentes', 'Bulletins des deux dernières années (ou du dernier trimestre pour une entrée en 1re année)', 'Certificat de sortie délivré par l’établissement d’origine', 'Copie de la CIN des parents (père, mère ou tuteur légal)', 'Carnet de santé, vaccinations à jour'],
  levels: ['1re année primaire', '2e année primaire', '3e année primaire', '4e année primaire', '5e année primaire', '6e année primaire', '1re année collège', '2e année collège', '3e année collège', 'Tronc commun', '1re année bac', '2e année bac'],
};

export const FAQ = [
  { q: 'Quels sont les horaires ?', a: 'Les cours ont lieu de 8h à 12h et de 14h à 17h. L’accueil ouvre à 7h45 et l’étude surveillée se termine à 18h.' },
  { q: 'Y a-t-il un transport scolaire ?', a: 'Oui, plusieurs circuits couvrent El Jadida et ses environs, avec un accompagnateur adulte dans chaque véhicule.' },
  { q: 'Quelles langues sont enseignées ?', a: 'L’arabe, le français et l’anglais, comme langues de travail dès le primaire.' },
  { q: 'Comment se passe l’inscription ?', a: 'Une visite, un dossier, un test de niveau pour le collège et le lycée, puis une réponse sous cinq jours ouvrés.' },
  { q: 'Peut-on inscrire un enfant en cours d’année ?', a: 'Oui, selon les places disponibles dans le niveau demandé. Contactez le secrétariat.' },
  { q: 'Comment suivre la scolarité de mon enfant ?', a: 'Carnet de correspondance, circulaires, trois rendez-vous par an après chaque conseil de classe, et un appel du directeur de cycle dès le premier signal faible.' },
];
