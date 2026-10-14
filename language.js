/* Static localized pages; no network calls or third-party dependencies. */
(function () {
  'use strict';
  const supported = ['en', 'es', 'pt-BR'];
  function match(value) {
    const v = String(value || '').toLowerCase().replace(/_/g, '-');
    if (v === 'en' || v.startsWith('en-')) return 'en';
    if (v === 'es' || v.startsWith('es-')) return 'es';
    if (v === 'pt' || v.startsWith('pt-')) return 'pt-BR';
    return null;
  }
  const here = new URL(window.location.href);
  const current = document.documentElement.lang;
  const parts = here.pathname.split('/');
  let page = parts.pop() || 'index.html';
  if (!['index.html', 'support.html', 'privacy.html'].includes(page)) return;
  if (['es', 'pt-BR'].includes(parts[parts.length - 1])) parts.pop();
  const base = parts.join('/') + '/';
  function destination(lang) {
    const next = new URL(here);
    next.pathname = base + (lang === 'en' ? '' : lang + '/') + page;
    next.searchParams.set('lang', lang);
    return next;
  }
  let saved = null;
  try { saved = localStorage.getItem('imagemorph.site.language'); } catch (_) {}
  const explicit = here.searchParams.get('lang');
  let preferred = supported.includes(explicit) ? explicit : null;
  if (!preferred && current !== 'en') preferred = current;
  if (!preferred && supported.includes(saved)) preferred = saved;
  if (!preferred) preferred = (navigator.languages || [navigator.language]).map(match).find(Boolean) || 'en';
  if (preferred !== current) {
    window.location.replace(destination(preferred).href);
    return;
  }
  const selector = document.getElementById('site-language');
  if (!selector) return;
  selector.value = current;
  selector.addEventListener('change', function () {
    if (!supported.includes(selector.value)) return;
    try { localStorage.setItem('imagemorph.site.language', selector.value); } catch (_) {}
    window.location.assign(destination(selector.value).href);
  });
}());
