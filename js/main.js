/* 2k@property — site interactions (no dependencies) */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ------------------------------------------------------------------
   * Project data (used by the gallery lightbox)
   * ------------------------------------------------------------------ */
  var PROJECTS = {
    1: { year: 2008, use: 'house', area: '119,85', images: ['00', 'dim', 'dim-3'] },
    2: { year: 2011, use: 'house', area: '119,51', images: ['00', 'fl-3', 'fl-4', 'fl-5', 'floud'] },
    3: { year: 2016, use: 'house', area: '132,68', images: ['00', 'p', 'p-2', 'p-3', 'p-5'] },
    4: { year: 2015, use: 'mixed', area: '139,80 / 120,06', images: ['00', 'pap-3', 'pap-4', 'pap'] },
    5: { year: 2017, use: 'house', area: '159,01', images: ['00', 'gel-2', 'gel-3', 'gel-4', 'gel-5', 'gel-6', 'gel-7'] }
  };

  /* ------------------------------------------------------------------
   * Translations (Greek is the source text in the HTML)
   * ------------------------------------------------------------------ */
  var EN = {
    'skip': 'Skip to content',
    'nav.needs': 'What you need', 'nav.services': 'Services', 'nav.projects': 'Projects', 'nav.about': 'Team', 'nav.contact': 'Contact',
    'cta.quote': 'Request a quote', 'cta.find': 'Find what you need',
    'hero.eyebrow': 'Engineering office · Arta, Greece',
    'hero.title': 'We survey, design and build your space.',
    'hero.lead': 'Topographic surveys, permits, energy certificates, legalisations, architectural &amp; structural design and construction — all from one team of engineers, with clear guidance at every step.',
    'hero.badge': 'From first study to handing over the keys',
    'facts.engineers': 'qualified engineers', 'facts.areas': 'service areas', 'facts.since': 'our first projects',
    'needs.eyebrow': 'Quick help', 'needs.title': 'What do you need today?',
    'needs.sub': 'Pick the job and we’ll call you back with every document you’ll need.',
    'need.ask': 'Ask for it →',
    'need.topo.t': 'Topographic survey', 'need.topo.d': 'For contracts, the Land Registry, Forestry Office or plot boundaries.',
    'need.transfer.t': 'Engineer’s certificate', 'need.transfer.d': 'For a property transfer, gift or sale.',
    'need.pea.t': 'Energy certificate (EPC)', 'need.pea.d': 'For selling, renting or the “Exoikonomo” programme.',
    'need.legal.t': 'Legalising unpermitted works', 'need.legal.d': 'Regularising structures and changes of use.',
    'need.permit.t': 'Building permit', 'need.permit.d': 'Building permits and small-scale works approvals.',
    'need.shop.t': 'Shop operating licence', 'need.shop.d': 'Licences for shops, food businesses and workshops.',
    'need.build.t': 'New home or renovation', 'need.build.d': 'Architectural &amp; structural design, construction and project management.',
    'need.seismic.t': 'Seismic assessment', 'need.seismic.d': 'Assessment and retrofit design per KANEPE / EN1998-3.',
    'services.eyebrow': 'Services', 'services.title': 'Every property service, in one office',
    'services.sub': 'Tap a category to see exactly what we take on.',
    'svc.topo.t': 'Topographic surveys', 'svc.topo.s': 'Surveys, boundaries, Land Registry work and 3D terrain models with state-of-the-art equipment.',
    'svc.topo.1': 'Surveys and setting-out', 'svc.topo.2': 'Locating and checking land parcels', 'svc.topo.3': 'Property boundary demarcation',
    'svc.topo.4': 'Subdivision and merging of plots', 'svc.topo.5': 'Topographic plans for notarial deeds',
    'svc.topo.6': 'Site works: cut/fill volumes, deformation monitoring', 'svc.topo.7': 'Plans for the Forestry Office and Land Registry',
    'svc.topo.8': 'Digital terrain models and 3D visualisations', 'svc.topo.9': 'Photo-interpretation studies and photogrammetry',
    'svc.topo.10': 'Transport studies', 'svc.topo.11': 'Aerial surveying',
    'svc.eng.t': 'Engineering services', 'svc.eng.s': 'Permits, legalisations, energy certificates, transfer certificates and property development.',
    'svc.eng.1': 'Building permits and small-scale works approvals', 'svc.eng.2': 'Operating licences for all types of shops (food businesses, workshops etc.)',
    'svc.eng.3': 'Legalising / regularising unpermitted structures', 'svc.eng.4': 'Engineer’s certificates and declarations for property transfers',
    'svc.eng.5': 'Energy inspections and Energy Performance Certificates (EPC)', 'svc.eng.6': 'Expert technical reports',
    'svc.eng.7': 'Advice on property development', 'svc.eng.8': 'Real-estate brokerage', 'svc.eng.9': 'Planning and managing building investments',
    'svc.eng.10': 'Health &amp; Safety Technician / Coordinator',
    'svc.arch.t': 'Architectural design', 'svc.arch.s': 'Spaces shaped around how you live and what you like.',
    'svc.arch.1': 'Architectural design of homes and special buildings', 'svc.arch.2': 'Alterations to existing buildings and flats',
    'svc.arch.3': 'Functional space planning', 'svc.arch.4': 'Outdoor space design',
    'svc.struct.t': 'Structural engineering', 'svc.struct.s': 'Buildings and infrastructure, designed for safety and economy.',
    'svc.struct.1': 'Reinforced concrete buildings', 'svc.struct.2': 'Steel industrial and agricultural buildings',
    'svc.struct.3': 'Composite buildings', 'svc.struct.4': 'Load-bearing masonry buildings',
    'svc.build.t': 'Construction &amp; project management', 'svc.build.s': 'Years of experience in new builds, completions and renovations.',
    'svc.build.1': 'New homes and other buildings', 'svc.build.2': 'Completing unfinished buildings',
    'svc.build.3': 'Renovating flats and commercial spaces', 'svc.build.4': 'Site supervision and project management through to handover',
    'svc.seis.t': 'Seismic assessment &amp; retrofit', 'svc.seis.s': 'Evaluating existing structures according to KANEPE and EN1998-3.',
    'svc.seis.1': 'Accurate geometric survey of the existing structure', 'svc.seis.2': 'Material assessment with destructive / non-destructive testing',
    'svc.seis.3': 'Laboratory testing', 'svc.seis.4': 'Seismic assessment and retrofit design with modern analysis tools',
    'process.eyebrow': 'How we work', 'process.title': 'Simple, in four steps',
    'step1.t': 'Tell us what you need', 'step1.d': 'By phone, email or the form. We reply promptly.',
    'step2.t': 'Site visit &amp; quote', 'step2.d': 'We inspect the property and give you a clear cost and timeline.',
    'step3.t': 'Design &amp; delivery', 'step3.d': 'We handle studies, paperwork and authorities — and keep you updated at every stage.',
    'step4.t': 'Handover', 'step4.d': 'You receive your certificates, permits or the finished project.',
    'projects.eyebrow': 'Our projects', 'projects.title': 'Homes we designed and built',
    'filter.all': 'All', 'filter.house': 'Detached houses', 'filter.mixed': 'Home &amp; shop',
    'use.house': 'Detached house', 'use.mixed': 'Home / Shop', 'unit.sqm': 'm²', 'loc.arta': 'Arta', 'photos': 'photos',
    'about.eyebrow': 'Who we are', 'about.title': 'Engineers who protect the value of your property',
    'about.p1': 'We are a team of engineers with many years of professional experience, offering complete property services in Arta and the wider region.',
    'about.p2': 'Our core principle is to tailor our services to each client. We design and build to your own specifications (tailor made), explain every option clearly, and make sure the value of your property is protected and enhanced.',
    'team.1.name': 'Ioannis L. Kateris', 'team.1.role': 'Civil Engineer (Dipl.)',
    'team.2.name': 'Dimitris L. Karavasilis', 'team.2.role': 'Surveying Engineer (Dipl.)',
    'contact.eyebrow': 'Contact', 'contact.title': 'Tell us what you need',
    'contact.sub': 'Fill in the form or give us a call. We reply the same or the next working day.',
    'form.subject': 'Subject', 'opt.general': 'General question', 'form.name': 'Full name', 'form.phone': 'Phone',
    'form.email': 'Email', 'form.optional': '(optional)', 'form.message': 'Message',
    'form.message.ph': 'e.g. I need a topographic survey for a plot near Arta',
    'form.send': 'Send request',
    'form.err.name': 'Please enter your name.', 'form.err.phone': 'Please enter a contact phone number.', 'form.err.email': 'That email doesn’t look right.',
    'info.call': 'Call us', 'info.mail': 'Send an email', 'info.visit': 'Visit us · Directions', 'info.addr': 'Gogou Bakola 27, 47132 Arta',
    'footer.tag': 'Complete property services in Arta: design, permits, surveys and construction.',
    'footer.links': 'Navigate', 'footer.contact': 'Contact', 'footer.rights': 'All rights reserved', 'footer.top': 'Back to top ↑',
    'bar.call': 'Call', 'bar.msg': 'Message', 'bar.map': 'Directions',
    'lb.cta': 'I want something similar'
  };

  var UI = {
    el: {
      sent: 'Ανοίγει το πρόγραμμα email σας με έτοιμο το μήνυμα. Αν προτιμάτε, καλέστε μας στο 26810 23277.',
      fix: 'Ελέγξτε τα πεδία που σημειώνονται.',
      year: 'Έτος κατασκευής', use: 'Χρήση', area: 'Εμβαδόν', loc: 'Τοποθεσία',
      house: 'Μονοκατοικία', mixed: 'Κατοικία / Κατάστημα', sqm: 'τ.μ.', arta: 'Άρτα', project: 'Έργο',
      mailSubject: 'Αίτημα από την ιστοσελίδα', mName: 'Όνομα', mPhone: 'Τηλέφωνο', mEmail: 'Email', mSubject: 'Θέμα', mMsg: 'Μήνυμα',
      menuOpen: 'Άνοιγμα μενού', menuClose: 'Κλείσιμο μενού', langLabel: 'Switch to English',
      title: document.title
    },
    en: {
      sent: 'Your email app is opening with the message ready. Prefer the phone? Call +30 26810 23277.',
      fix: 'Please check the highlighted fields.',
      year: 'Built', use: 'Use', area: 'Floor area', loc: 'Location',
      house: 'Detached house', mixed: 'Home / Shop', sqm: 'm²', arta: 'Arta', project: 'Project',
      mailSubject: 'Website enquiry', mName: 'Name', mPhone: 'Phone', mEmail: 'Email', mSubject: 'Subject', mMsg: 'Message',
      menuOpen: 'Open menu', menuClose: 'Close menu', langLabel: 'Αλλαγή σε Ελληνικά',
      title: '2k@property | Engineering Office in Arta – Surveys, Permits, EPC, Design & Construction'
    }
  };

  var lang = 'el';
  try { if (localStorage.getItem('lang') === 'en') lang = 'en'; } catch (e) { /* storage unavailable */ }

  function t(key) { return UI[lang][key]; }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (el.dataset.el === undefined) el.dataset.el = el.innerHTML;
      el.innerHTML = lang === 'en' && EN[key] ? EN[key] : el.dataset.el;
    });
    $$('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (el.dataset.elPh === undefined) el.dataset.elPh = el.placeholder;
      el.placeholder = lang === 'en' && EN[key] ? EN[key] : el.dataset.elPh;
    });
    var btn = $('#lang-toggle');
    btn.textContent = lang === 'en' ? 'ΕΛ' : 'EN';
    btn.setAttribute('aria-label', t('langLabel'));
    document.title = t('title');
    try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
  }

  $('#lang-toggle').addEventListener('click', function () { applyLang(lang === 'el' ? 'en' : 'el'); });
  if (lang === 'en') applyLang('en');

  /* ------------------------------------------------------------------
   * Header: scrolled state, mobile menu, current section
   * ------------------------------------------------------------------ */
  var header = $('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var nav = $('#main-nav');
  var menuBtn = $('#menu-toggle');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? t('menuClose') : t('menuOpen'));
  }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  if ('IntersectionObserver' in window) {
    var links = $$('.main-nav ul a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { spy.observe(s); });

    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealer.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.section-head, .need-card, .service, .steps li, .project-card, .about-copy, .about-media, .contact-form-wrap, .contact-info').forEach(function (el) {
      el.classList.add('reveal');
      revealer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
   * Quick finder → preselect the form subject
   * ------------------------------------------------------------------ */
  var subject = $('#f-subject');
  function preselect(value) {
    if (!value) return;
    subject.value = value;
    var field = subject.closest('.field');
    field.classList.remove('flash');
    void field.offsetWidth; // restart animation
    field.classList.add('flash');
  }
  $$('[data-subject]').forEach(function (card) {
    card.addEventListener('click', function () {
      preselect(card.getAttribute('data-subject'));
      setTimeout(function () { $('#f-name').focus({ preventScroll: true }); }, 600);
    });
  });

  /* ------------------------------------------------------------------
   * Project filters
   * ------------------------------------------------------------------ */
  var chips = $$('.chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-pressed', String(c === chip)); });
      $$('.project-card').forEach(function (card) { card.hidden = f !== 'all' && card.getAttribute('data-cat') !== f; });
    });
  });

  /* ------------------------------------------------------------------
   * Lightbox gallery
   * ------------------------------------------------------------------ */
  var lb = $('#lightbox');
  var lbImg = $('#lb-img');
  var current = null, idx = 0;

  function src(id, name, small) { return 'assets/img/projects/' + id + '/' + name + (small ? '-sm' : '') + '.webp'; }

  function show(i) {
    var p = PROJECTS[current];
    idx = (i + p.images.length) % p.images.length;
    lbImg.src = src(current, p.images[idx]);
    lbImg.alt = t(p.use) + ' ' + p.year + ' – ' + (idx + 1) + '/' + p.images.length;
    $('#lb-count').textContent = (idx + 1) + ' / ' + p.images.length;
    $$('#lb-thumbs button').forEach(function (b, n) { b.classList.toggle('is-active', n === idx); });
    var next = new Image(); next.src = src(current, p.images[(idx + 1) % p.images.length]);
  }

  function openProject(id) {
    current = id;
    var p = PROJECTS[id];
    $('#lb-eyebrow').textContent = t('project') + ' · ' + p.year;
    $('#lb-title').textContent = t(p.use);
    $('#lb-specs').innerHTML =
      '<dt>' + t('year') + '</dt><dd>' + p.year + '</dd>' +
      '<dt>' + t('use') + '</dt><dd>' + t(p.use) + '</dd>' +
      '<dt>' + t('area') + '</dt><dd>' + p.area + ' ' + t('sqm') + '</dd>' +
      '<dt>' + t('loc') + '</dt><dd>' + t('arta') + '</dd>';
    var thumbs = $('#lb-thumbs');
    thumbs.innerHTML = '';
    p.images.forEach(function (name, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', (n + 1) + ' / ' + p.images.length);
      b.innerHTML = '<img src="' + src(id, name, true) + '" alt="" loading="lazy">';
      b.addEventListener('click', function () { show(n); });
      thumbs.appendChild(b);
    });
    show(0);
    if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    if (typeof lb.close === 'function') lb.close(); else lb.removeAttribute('open');
  }
  lb.addEventListener('close', function () { document.body.style.overflow = ''; });

  $$('.project-card').forEach(function (card) {
    card.addEventListener('click', function () { openProject(card.getAttribute('data-project')); });
  });
  $('#lb-prev').addEventListener('click', function () { show(idx - 1); });
  $('#lb-next').addEventListener('click', function () { show(idx + 1); });
  $('#lb-close').addEventListener('click', closeLb);
  $('#lb-cta').addEventListener('click', function () { closeLb(); preselect('build'); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
  var touchX = null;
  lbImg.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lbImg.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ------------------------------------------------------------------
   * Contact form — validates, then opens a pre-filled email.
   * To receive submissions directly, point the form at a form service
   * (e.g. Formspree / Netlify Forms) or a small PHP endpoint.
   * ------------------------------------------------------------------ */
  var form = $('#contact-form');
  var note = $('#form-note');

  function setError(input, bad) { input.closest('.field').classList.toggle('has-error', bad); return bad; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#f-name'), phone = $('#f-phone'), email = $('#f-email'), msg = $('#f-message');
    var bad = false;
    bad = setError(name, name.value.trim().length < 2) || bad;
    bad = setError(phone, phone.value.replace(/\D/g, '').length < 10) || bad;
    bad = setError(email, email.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) || bad;
    if (bad) {
      note.style.color = 'var(--danger)';
      note.textContent = t('fix');
      var first = $('.has-error input', form);
      if (first) first.focus();
      return;
    }
    var subjLabel = subject.options[subject.selectedIndex].textContent.trim();
    var body = [
      t('mSubject') + ': ' + subjLabel,
      t('mName') + ': ' + name.value.trim(),
      t('mPhone') + ': ' + phone.value.trim(),
      email.value.trim() ? t('mEmail') + ': ' + email.value.trim() : null,
      '',
      t('mMsg') + ':',
      msg.value.trim()
    ].filter(function (l) { return l !== null; }).join('\n');
    var href = 'mailto:info@2kproperty.gr?subject=' + encodeURIComponent(t('mailSubject') + ' – ' + subjLabel) + '&body=' + encodeURIComponent(body);
    note.style.color = '';
    note.textContent = t('sent');
    window.location.href = href;
  });
  $$('input', form).forEach(function (input) {
    input.addEventListener('input', function () { input.closest('.field').classList.remove('has-error'); });
  });

  /* Footer year */
  var y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
