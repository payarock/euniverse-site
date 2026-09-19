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

  /* 2. Mobile menu */
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
