/* ============================================================
   L'ANGE BLEU — interactions
   header · nav mobile · progression · scroll reveal · compteurs
   hero vidéo (fallback Ken Burns) · sliders · lightbox
   onglets · formulaires
   ============================================================ */
(function () {
  'use strict';
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => [...(c || document).querySelectorAll(s)];
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header : état au scroll + barre de progression ---------- */
  const hdr = $('#hdr'), prog = $('#prog');
  function surScroll () {
    const y = scrollY;
    if (hdr) hdr.classList.toggle('plein', y > 40);
    if (prog) {
      const h = document.documentElement.scrollHeight - innerHeight;
      prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  addEventListener('scroll', surScroll, { passive: true });
  surScroll();

  /* ---------- Navigation mobile ---------- */
  const burger = $('#burger'), nav = $('#nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const ouvert = nav.classList.toggle('ouvert');
      burger.setAttribute('aria-expanded', ouvert);
      document.body.style.overflow = ouvert ? 'hidden' : '';
    });
    $$('a', nav).forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('ouvert');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- Révélation au scroll ---------- */
  const aReveler = $$('.rv, [data-cascade]');
  if (aReveler.length && !reduit && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entrees) => {
      entrees.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    aReveler.forEach(el => io.observe(el));
  } else {
    aReveler.forEach(el => el.classList.add('vu'));
  }

  /* ---------- Compteurs animés ---------- */
  const compteurs = $$('[data-compte]');
  if (compteurs.length) {
    const ioC = new IntersectionObserver((entrees) => {
      entrees.forEach(e => {
        if (!e.isIntersecting) return;
        ioC.unobserve(e.target);
        const el = e.target, fin = parseFloat(el.dataset.compte);
        const suffixe = el.dataset.suffixe || '';
        if (reduit) { el.textContent = fin + suffixe; return; }
        const debut = performance.now(), duree = 1600;
        (function tic (t) {
          const p = Math.min((t - debut) / duree, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(fin * ease) + suffixe;
          if (p < 1) requestAnimationFrame(tic);
        })(debut);
      });
    }, { threshold: 0.5 });
    compteurs.forEach(el => ioC.observe(el));
  }

  /* ---------- Hero vidéo : fallback Ken Burns si la vidéo échoue ---------- */
  const video = $('#hero-video'), kb = $('#kb');
  function lanceKenBurns () {
    if (!kb) return;
    if (video) video.style.display = 'none';
    kb.classList.add('on');
    const imgs = $$('img', kb);
    if (!imgs.length) return;
    let i = 0;
    imgs[0].classList.add('on');
    if (imgs.length > 1 && !reduit) {
      setInterval(() => {
        imgs[i].classList.remove('on');
        i = (i + 1) % imgs.length;
        imgs[i].classList.add('on');
      }, 7000);
    }
  }
  if (video) {
    let ok = false;
    video.addEventListener('canplay', () => { ok = true; }, { once: true });
    video.addEventListener('error', lanceKenBurns, { once: true });
    const src = $('source', video);
    if (src) src.addEventListener('error', lanceKenBurns, { once: true });
    setTimeout(() => { if (!ok && (video.readyState < 2)) lanceKenBurns(); }, 3500);
    if (reduit) { video.removeAttribute('autoplay'); video.pause && video.pause(); lanceKenBurns(); }
  } else if (kb) {
    lanceKenBurns();
  }

  /* ---------- Sliders (générique, plusieurs par page possibles) ---------- */
  $$('[data-slider]').forEach(slider => {
    const piste = $('.slider-piste', slider);
    const slides = $$('.slide', slider);
    const pts = $$('.slider-pt', slider);
    const prev = $('[data-prev]', slider);
    const next = $('[data-next]', slider);
    if (!piste || slides.length < 2) return;
    let i = 0, minuteur = null;

    function va (n) {
      i = (n + slides.length) % slides.length;
      piste.style.translate = `${-i * 100}% 0`;
      pts.forEach((p, k) => p.classList.toggle('on', k === i));
    }
    function auto () {
      if (reduit) return;
      clearInterval(minuteur);
      minuteur = setInterval(() => va(i + 1), 6500);
    }
    prev && prev.addEventListener('click', () => { va(i - 1); auto(); });
    next && next.addEventListener('click', () => { va(i + 1); auto(); });
    pts.forEach((p, k) => p.addEventListener('click', () => { va(k); auto(); }));

    /* tactile */
    let x0 = null;
    piste.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    piste.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) va(i + (dx < 0 ? 1 : -1));
      x0 = null; auto();
    }, { passive: true });

    va(0); auto();
  });

  /* ---------- Lightbox média ---------- */
  const lbox = $('#lbox');
  if (lbox) {
    const lImg = $('img', lbox), lLeg = $('.lbox-leg', lbox);
    const items = $$('.gal-i');
    let idx = 0;
    function ouvre (n) {
      idx = (n + items.length) % items.length;
      const img = $('img', items[idx]);
      lImg.src = img.dataset.grand || img.src;
      lImg.alt = img.alt || '';
      lLeg.textContent = items[idx].dataset.legende || img.alt || '';
      lbox.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function ferme () { lbox.classList.remove('on'); document.body.style.overflow = ''; }
    items.forEach((it, n) => it.addEventListener('click', () => ouvre(n)));
    $('.lbox-x', lbox).addEventListener('click', ferme);
    $('.lbox-fl.g', lbox) && $('.lbox-fl.g', lbox).addEventListener('click', () => ouvre(idx - 1));
    $('.lbox-fl.d', lbox) && $('.lbox-fl.d', lbox).addEventListener('click', () => ouvre(idx + 1));
    lbox.addEventListener('click', e => { if (e.target === lbox) ferme(); });
    addEventListener('keydown', e => {
      if (!lbox.classList.contains('on')) return;
      if (e.key === 'Escape') ferme();
      if (e.key === 'ArrowLeft') ouvre(idx - 1);
      if (e.key === 'ArrowRight') ouvre(idx + 1);
    });
  }

  /* ---------- Onglets ---------- */
  $$('[data-onglets]').forEach(bloc => {
    const boutons = $$('.onglet', bloc);
    const panneaux = $$('.panneau', bloc);
    boutons.forEach((b, n) => b.addEventListener('click', () => {
      boutons.forEach(x => x.classList.remove('on'));
      panneaux.forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      panneaux[n] && panneaux[n].classList.add('on');
    }));
  });

  /* ---------- Formulaires : validation + confirmation ---------- */
  $$('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valide = true;
      $$('[required]', form).forEach(champ => {
        const parent = champ.closest('.champ');
        let ok = champ.value.trim() !== '';
        if (ok && champ.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champ.value);
        if (ok && champ.type === 'tel') ok = champ.value.replace(/\D/g, '').length >= 9;
        parent && parent.classList.toggle('err', !ok);
        if (!ok) valide = false;
      });
      if (!valide) {
        const premier = $('.champ.err input, .champ.err select, .champ.err textarea', form);
        premier && premier.focus();
        return;
      }
      const ok = $('.form-ok', form.parentElement) || $('.form-ok', form);
      form.style.display = 'none';
      ok && ok.classList.add('on');
      ok && ok.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'center' });
    });
    $$('input, select, textarea', form).forEach(c =>
      c.addEventListener('input', () => c.closest('.champ') && c.closest('.champ').classList.remove('err')));
  });

  /* ---------- Année du pied de page ---------- */
  const an = $('#annee');
  if (an) an.textContent = new Date().getFullYear();
})();
