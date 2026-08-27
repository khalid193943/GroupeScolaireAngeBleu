/* =========================================================
   L'ANGE BLEU — Administration (démonstration)

   ⚠️ Les identifiants sont écrits en clair dans ce fichier.
   C'est acceptable pour une démonstration, JAMAIS pour un
   site en production : n'importe qui peut lire le code source
   d'une page web. Sur la version définitive, la vérification
   se fera sur un serveur, avec un mot de passe qui ne quitte
   jamais celui-ci.
   ========================================================= */

const ACCES = { email: 'direction@angebleu.ma', mdp: 'AngeBleu#1986' };

const CLE = { msg: 'ab_messages', ins: 'ab_inscriptions', news: 'ab_actualites', ses: 'ab_session' };

const $ = (id) => document.getElementById(id);
const esc = (s) => { const d = document.createElement('div'); d.textContent = s ?? ''; return d.innerHTML; };

const lire = (k) => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch (_) { return []; } };
const ecrire = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {
  dire("Enregistrement impossible : espace du navigateur saturé.", true); } };

let MSG = [], INS = [], NEWS = [];

/* ---------- message court ---------- */
let minuteur = null;
function dire(txt, erreur) {
  let z = $('flash');
  if (!z) { z = document.createElement('div'); z.id = 'flash'; z.className = 'flash'; document.body.appendChild(z); }
  z.textContent = txt;
  z.classList.toggle('err', !!erreur);
  z.classList.add('on');
  clearTimeout(minuteur);
  minuteur = setTimeout(() => z.classList.remove('on'), 3600);
}

const dateFr = (iso) => {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) +
         ' · ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

/* ---------- données de démonstration ----------
   Pour que l'écran ne soit pas vide lors de la présentation. */
function amorcer() {
  // Un indicateur séparé : si un visiteur a rempli le formulaire avant
  // la première ouverture de l'admin, la clé existe déjà et les exemples
  // ne seraient jamais créés. On les AJOUTE plutôt que de tout écraser.
  if (localStorage.getItem('ab_amorce')) return;
  localStorage.setItem('ab_amorce', '1');

  const ajouter = (cle, exemples) => {
    const actuel = lire(cle);
    ecrire(cle, actuel.concat(exemples));
  };

  ajouter(CLE.msg, [
    { id: 'm1', nom: 'Nadia Bennani', email: 'nadia.b@example.ma', tel: '06 61 22 33 44',
      message: "Bonjour, ma fille aura 3 ans en septembre. Reste-t-il des places en petite section ? Et proposez-vous le transport depuis le quartier Essalam ?",
      date: new Date(Date.now() - 36e5 * 5).toISOString(), statut: 'nouveau' },
    { id: 'm2', nom: 'Rachid El Amrani', email: 'r.elamrani@example.ma', tel: '06 12 34 56 78',
      message: "Je voudrais visiter l'école avec mon épouse. Quels jours recevez-vous ?",
      date: new Date(Date.now() - 36e5 * 30).toISOString(), statut: 'nouveau' },
    { id: 'm3', nom: 'Fatima Zahra Idrissi', email: 'fz.idrissi@example.ma', tel: '06 55 44 33 22',
      message: "Mon fils est en moyenne section chez vous. Je souhaiterais un rendez-vous avec son enseignante avant les vacances.",
      date: new Date(Date.now() - 36e5 * 72).toISOString(), statut: 'lu' },
  ]);

  ajouter(CLE.ins, [
    { id: 'i1', enfant: 'Lina Bennani', naissance: '2023-04-12', section: 'Petite section · 3-4 ans',
      parent: 'Nadia Bennani', tel: '06 61 22 33 44', email: 'nadia.b@example.ma',
      message: "Nous habitons le quartier Essalam, le transport nous intéresse.",
      date: new Date(Date.now() - 36e5 * 6).toISOString(), statut: 'nouveau' },
    { id: 'i2', enfant: 'Yassine Tazi', naissance: '2022-09-03', section: 'Moyenne section · 4-5 ans',
      parent: 'Omar Tazi', tel: '06 70 11 22 33', email: 'o.tazi@example.ma', message: '',
      date: new Date(Date.now() - 36e5 * 28).toISOString(), statut: 'contacte' },
    { id: 'i3', enfant: 'Adam Chraibi', naissance: '2021-11-20', section: 'Grande section · 5-6 ans',
      parent: 'Salma Chraibi', tel: '06 44 55 66 77', email: 's.chraibi@example.ma',
      message: "Transfert depuis une autre école, certificat de radiation disponible.",
      date: new Date(Date.now() - 36e5 * 96).toISOString(), statut: 'inscrit' },
  ]);

  ajouter(CLE.news, [
    { id: 'n1', titre: "Quarante ans : les enfants ont ouvert le bal", cat: 'Événement', dateAff: 'Mai 2026',
      texte: "Pâte à sel, pâte à modeler et douceurs sucrées — les grandes sections ont façonné le chiffre 40 pendant toute une semaine. Leurs créations seront réunies pour un événement surprise avant la fin de l'année.",
      cree: new Date(Date.now() - 864e5 * 20).toISOString() },
    { id: 'n2', titre: "Les inscriptions 2026-2027 sont ouvertes", cat: 'Inscriptions', dateAff: 'Rentrée 2026',
      texte: "Chaque année, les petites sections sont complètes avant l'été. La pré-inscription en ligne ne vous engage à rien.",
      cree: new Date(Date.now() - 864e5 * 8).toISOString() },
  ]);
}

/* ---------- connexion ---------- */
function entrer() {
  const m = $('mail').value.trim().toLowerCase();
  const p = $('mdp').value;
  if (m === ACCES.email && p === ACCES.mdp) {
    sessionStorage.setItem(CLE.ses, '1');
    $('gate').style.display = 'none';
    $('app').classList.add('on');
    charger();
  } else {
    $('gateErr').classList.add('on');
    $('mdp').value = '';
    $('mdp').focus();
  }
}
$('btnEntrer').addEventListener('click', entrer);
['mail', 'mdp'].forEach(id => $(id).addEventListener('keydown', e => { if (e.key === 'Enter') entrer(); }));

$('btnSortir').addEventListener('click', () => {
  sessionStorage.removeItem(CLE.ses);
  $('app').classList.remove('on');
  $('gate').style.display = 'grid';
  $('mdp').value = '';
});

/* ---------- onglets ---------- */
document.querySelectorAll('.onglet').forEach(o => o.addEventListener('click', () => {
  document.querySelectorAll('.onglet').forEach(x => x.classList.remove('on'));
  document.querySelectorAll('.panneau').forEach(x => x.classList.remove('on'));
  o.classList.add('on');
  document.querySelector(`.panneau[data-p="${o.dataset.t}"]`).classList.add('on');
}));

/* =========================================================
   MESSAGES
   ========================================================= */
function rendreMsg() {
  const q = $('qMsg').value.trim().toLowerCase();
  const f = $('fMsg').value;
  const vus = MSG
    .filter(m => !q || (m.nom + ' ' + m.email + ' ' + m.message).toLowerCase().includes(q))
    .filter(m => !f || m.statut === f)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  $('lMsg').innerHTML = vus.map(m => `
    <article class="item ${m.statut === 'nouveau' ? 'neuf' : ''}" data-id="${esc(m.id)}">
      <div class="item-h">
        <div class="item-n">${esc(m.nom)}<small>${esc(m.email)}</small></div>
        <div style="display:flex;align-items:center;gap:.6rem;">
          <span class="badge ${m.statut}">${m.statut === 'nouveau' ? 'Non lu' : 'Traité'}</span>
          <span class="item-d">${dateFr(m.date)}</span>
        </div>
      </div>
      <div class="item-b">
        ${m.tel ? `<span class="tag"><a href="tel:${esc(m.tel.replace(/\s/g, ''))}">${esc(m.tel)}</a></span>` : ''}
        <span class="tag"><a href="mailto:${esc(m.email)}">Répondre par email</a></span>
      </div>
      <div class="item-m">${esc(m.message)}</div>
      <div class="item-a">
        <button class="btn btn-ligne btn-sm" data-a="bascule">${m.statut === 'nouveau' ? 'Marquer comme traité' : 'Marquer comme non lu'}</button>
        <button class="btn btn-rouge btn-sm" data-a="suppr">Supprimer</button>
      </div>
    </article>`).join('');

  $('vMsg').hidden = vus.length > 0;
  const neufs = MSG.filter(m => m.statut === 'nouveau').length;
  const sem = MSG.filter(m => Date.now() - new Date(m.date) < 6048e5).length;
  $('sMsgNeuf').textContent = neufs;
  $('sMsgTot').textContent = MSG.length;
  $('sMsgSem').textContent = sem;
  $('sMsgRep').textContent = MSG.length - neufs;
  $('pMsg').textContent = neufs;
}

$('lMsg').addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b) return;
  const id = b.closest('.item').dataset.id;
  const m = MSG.find(x => x.id === id); if (!m) return;
  if (b.dataset.a === 'bascule') {
    m.statut = m.statut === 'nouveau' ? 'lu' : 'nouveau';
    ecrire(CLE.msg, MSG); rendreMsg();
  } else if (b.dataset.a === 'suppr') {
    if (!confirm(`Supprimer définitivement le message de ${m.nom} ?`)) return;
    MSG = MSG.filter(x => x.id !== id);
    ecrire(CLE.msg, MSG); rendreMsg(); dire('Message supprimé.');
  }
});
['qMsg', 'fMsg'].forEach(id => { $(id).addEventListener('input', rendreMsg); $(id).addEventListener('change', rendreMsg); });

/* =========================================================
   INSCRIPTIONS
   ========================================================= */
const LIB_INS = { nouveau: 'À traiter', contacte: 'Contactée', inscrit: 'Inscrite', refus: 'Sans suite' };

function age(iso) {
  if (!iso) return '';
  const n = new Date(iso); if (isNaN(n)) return '';
  const a = Math.floor((Date.now() - n) / 3156e7);
  return a > 0 ? `${a} ans` : 'moins d\'un an';
}

function rendreIns() {
  const q = $('qIns').value.trim().toLowerCase();
  const fs = $('fInsSec').value, f = $('fIns').value;
  const vus = INS
    .filter(i => !q || (i.enfant + ' ' + i.parent + ' ' + i.email).toLowerCase().includes(q))
    .filter(i => !fs || i.section === fs)
    .filter(i => !f || i.statut === f)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  $('lIns').innerHTML = vus.map(i => `
    <article class="item ${i.statut === 'nouveau' ? 'neuf' : ''}" data-id="${esc(i.id)}">
      <div class="item-h">
        <div class="item-n">${esc(i.enfant)}<small>${esc(i.section)}${i.naissance ? ' · ' + age(i.naissance) : ''}</small></div>
        <div style="display:flex;align-items:center;gap:.6rem;">
          <span class="badge ${i.statut}">${LIB_INS[i.statut] || i.statut}</span>
          <span class="item-d">${dateFr(i.date)}</span>
        </div>
      </div>
      <div class="item-b">
        <span class="tag">Parent : <b>${esc(i.parent)}</b></span>
        ${i.tel ? `<span class="tag"><a href="tel:${esc(i.tel.replace(/\s/g, ''))}">${esc(i.tel)}</a></span>` : ''}
        ${i.email ? `<span class="tag"><a href="mailto:${esc(i.email)}">${esc(i.email)}</a></span>` : ''}
      </div>
      ${i.message ? `<div class="item-m">${esc(i.message)}</div>` : ''}
      <div class="item-a">
        <select class="btn btn-ligne btn-sm" data-a="statut" style="padding-inline-end:1.6rem;">
          ${Object.entries(LIB_INS).map(([k, v]) =>
            `<option value="${k}" ${i.statut === k ? 'selected' : ''}>${v}</option>`).join('')}
        </select>
        <button class="btn btn-rouge btn-sm" data-a="suppr">Supprimer</button>
      </div>
    </article>`).join('');

  $('vIns').hidden = vus.length > 0;
  const neufs = INS.filter(i => i.statut === 'nouveau').length;
  $('sInsNeuf').textContent = neufs;
  $('sInsTot').textContent = INS.length;
  $('sInsCont').textContent = INS.filter(i => i.statut === 'contacte').length;
  $('sInsOk').textContent = INS.filter(i => i.statut === 'inscrit').length;
  $('pIns').textContent = neufs;
}

$('lIns').addEventListener('change', e => {
  const s = e.target.closest('[data-a="statut"]'); if (!s) return;
  const i = INS.find(x => x.id === s.closest('.item').dataset.id); if (!i) return;
  i.statut = s.value; ecrire(CLE.ins, INS); rendreIns(); dire('Statut mis à jour.');
});
$('lIns').addEventListener('click', e => {
  const b = e.target.closest('[data-a="suppr"]'); if (!b) return;
  const id = b.closest('.item').dataset.id;
  const i = INS.find(x => x.id === id); if (!i) return;
  if (!confirm(`Supprimer la demande pour ${i.enfant} ?`)) return;
  INS = INS.filter(x => x.id !== id); ecrire(CLE.ins, INS); rendreIns(); dire('Demande supprimée.');
});
['qIns', 'fIns', 'fInsSec'].forEach(id => { $(id).addEventListener('input', rendreIns); $(id).addEventListener('change', rendreIns); });

/* =========================================================
   ACTUALITÉS
   ========================================================= */
function rendreNews() {
  const q = $('qNews').value.trim().toLowerCase();
  const vus = NEWS
    .filter(n => !q || (n.titre + ' ' + n.texte).toLowerCase().includes(q))
    .sort((a, b) => new Date(b.cree) - new Date(a.cree));

  $('lNews').innerHTML = vus.map(n => `
    <article class="item" data-id="${esc(n.id)}">
      <div class="item-h">
        <div class="item-n">${esc(n.titre)}<small>${esc(n.dateAff)}</small></div>
        <span class="badge contacte">${esc(n.cat)}</span>
      </div>
      <div class="item-m">${esc(n.texte)}</div>
      <div class="item-a">
        <button class="btn btn-ligne btn-sm" data-a="modif">Modifier</button>
        <button class="btn btn-rouge btn-sm" data-a="suppr">Supprimer</button>
      </div>
    </article>`).join('');

  $('vNews').hidden = vus.length > 0;
  $('pNews').textContent = NEWS.length;
}

function ouvrirNews(n) {
  $('newsTitre').textContent = n ? "Modifier l'actualité" : 'Publier une actualité';
  $('newsId').value = n ? n.id : '';
  $('nTitre').value = n ? n.titre : '';
  $('nCat').value = n ? n.cat : 'Événement';
  $('nDate').value = n ? n.dateAff : '';
  $('nTxt').value = n ? n.texte : '';
  $('newsOk').textContent = n ? 'Enregistrer' : 'Publier';
  $('boiteNews').hidden = false;
  $('nTitre').focus();
}
$('btnNews').addEventListener('click', () => ouvrirNews(null));
['newsX', 'newsAnnul'].forEach(id => $(id).addEventListener('click', () => { $('boiteNews').hidden = true; }));
$('boiteNews').addEventListener('click', e => { if (e.target.id === 'boiteNews') $('boiteNews').hidden = true; });

$('newsOk').addEventListener('click', () => {
  const titre = $('nTitre').value.trim();
  if (!titre) { dire('Le titre est nécessaire.', true); $('nTitre').focus(); return; }
  const id = $('newsId').value;
  const donnees = { titre, cat: $('nCat').value, dateAff: $('nDate').value.trim(), texte: $('nTxt').value.trim() };
  if (id) {
    Object.assign(NEWS.find(n => n.id === id), donnees);
    dire('Actualité mise à jour.');
  } else {
    NEWS.push({ id: 'n' + Date.now(), ...donnees, cree: new Date().toISOString() });
    dire('Actualité publiée.');
  }
  ecrire(CLE.news, NEWS); rendreNews(); $('boiteNews').hidden = true;
});

$('lNews').addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b) return;
  const id = b.closest('.item').dataset.id;
  const n = NEWS.find(x => x.id === id); if (!n) return;
  if (b.dataset.a === 'modif') ouvrirNews(n);
  else if (b.dataset.a === 'suppr') {
    if (!confirm(`Supprimer « ${n.titre} » ?`)) return;
    NEWS = NEWS.filter(x => x.id !== id); ecrire(CLE.news, NEWS); rendreNews(); dire('Actualité supprimée.');
  }
});
$('qNews').addEventListener('input', rendreNews);

/* ---------- export ---------- */
$('btnExport').addEventListener('click', () => {
  const cell = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  let csv = '\uFEFF';
  csv += 'MESSAGES\n' + ['Date', 'Nom', 'Email', 'Téléphone', 'Message', 'Statut'].map(cell).join(';') + '\n';
  MSG.forEach(m => csv += [dateFr(m.date), m.nom, m.email, m.tel, m.message, m.statut].map(cell).join(';') + '\n');
  csv += '\nINSCRIPTIONS\n' + ['Date', 'Enfant', 'Naissance', 'Section', 'Parent', 'Téléphone', 'Email', 'Message', 'Statut'].map(cell).join(';') + '\n';
  INS.forEach(i => csv += [dateFr(i.date), i.enfant, i.naissance, i.section, i.parent, i.tel, i.email, i.message, LIB_INS[i.statut]].map(cell).join(';') + '\n');

  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url; a.download = `ange-bleu-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  dire('Export téléchargé.');
});

/* ---------- démarrage ---------- */
function charger() {
  MSG = lire(CLE.msg); INS = lire(CLE.ins); NEWS = lire(CLE.news);
  rendreMsg(); rendreIns(); rendreNews();
}

amorcer();
if (sessionStorage.getItem(CLE.ses)) {
  $('gate').style.display = 'none';
  $('app').classList.add('on');
  charger();
}
