/* E.Universe site v2 — shared behaviour (no dependencies) */
(function () {
  'use strict';

  /* 1. Placeholder images
     Any <figure class="ph"> whose <img> fails to load is marked .is-missing
     and shows the expected file name, so a missing photo is obvious and the
     fix is simply to drop the file into assets/img/. */
  function flagMissing(img) {
    var fig = img.closest('.ph');
    if (!fig) return;
    fig.classList.add('is-missing');
    fig.setAttribute('data-file', img.getAttribute('src').replace(/^.*\//, ''));
  }
  document.querySelectorAll('.ph img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) { flagMissing(img); }
    img.addEventListener('error', function () { flagMissing(img); });
  });

  /* 2. Header over a dark hero (Story): light text while the hero is in view,
        normal text once the page has scrolled past it. */
  var header = document.querySelector('.site-header');
  var darkHero = document.querySelector('[data-dark-hero]');
  if (header && darkHero) {
    var update = function () {
      var past = darkHero.getBoundingClientRect().bottom < 60;
      header.classList.toggle('site-header--light', !past);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* 3. Select placeholder colour (grey until a topic is chosen) */
  document.querySelectorAll('select.field__input').forEach(function (sel) {
    var sync = function () { sel.classList.toggle('is-placeholder', sel.value === ''); };
    sync(); sel.addEventListener('change', sync);
  });

  /* 4. Contact form → mailto (until a form service such as Formspree is configured).
        The <form action> is the single place to swap later. */
  var form = document.querySelector('form[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = new FormData(form);
      var subject = 'Enquiry via euniverse.co.jp — ' + f.get('topic');
      var body = [
        'Name: ' + f.get('name'),
        'Company / Organisation: ' + (f.get('company') || '—'),
        'Email: ' + f.get('email'),
        'Topic: ' + f.get('topic'),
        '',
        f.get('message')
      ].join('\n');
      window.location.href = form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  /* 5. Mobile menu */
  var menu = document.querySelector('.mobile-menu');
  var openBtn = document.querySelector('.icon-btn--menu');
  var closeBtn = document.querySelector('.mobile-menu__close');
  function setMenu(open) {
    if (!menu) return;
    menu.setAttribute('data-open', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (openBtn) openBtn.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
})();

/* 6. Header scrolled state: adds .is-scrolled once the page has moved, so the symbol gets a disc (see site.css) */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var sync = function () { header.classList.toggle('is-scrolled', window.scrollY > 24); };
  sync();
  window.addEventListener('scroll', sync, { passive: true });
})();
