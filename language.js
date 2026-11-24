/* ImageMorph language routing — static, privacy-preserving, no external dependencies. */
(() => {
  'use strict';
  const SUPPORTED = ['en','es','pt-BR','de','fr','hi','id','it','ja','ko','nl','pl','ru','sk','tr','uk','vi','zh-Hans','zh-Hant'];
  const STORAGE_KEY = 'imagemorph.website.language';
  const FILES = ['index.html', 'support.html', 'privacy.html'];
  const select = document.getElementById('site-language');
  const script = document.querySelector('script[src$="language.js"]');
  if (!script || !select) return;

  // The script's URL, rather than location.pathname, identifies the site's root
  // even under a GitHub Pages project path or from a local file:// preview.
  const base = new URL('.', script.src);
  const relative = decodeURI(location.pathname.slice(base.pathname.length));
  const chunks = relative.split('/').filter(Boolean);
  const pathLang = SUPPORTED.includes(chunks[0]) && chunks[0] !== 'en' ? chunks[0] : null;
  const pageName = FILES.includes(chunks[chunks.length - 1]) ? chunks[chunks.length - 1] : 'index.html';
  const pageLang = pathLang || 'en';

  const store = value => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) { /* private browsing/file scheme */ }
  };
  const stored = () => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(value) ? value : null;
    } catch (_) { return null; }
  };
  const match = value => {
    const v = String(value || '').toLowerCase().replaceAll('_','-');
    const exact = SUPPORTED.find(x => x.toLowerCase() === v);
    if (exact) return exact;
    if (v.startsWith('zh-')) return /(?:tw|hk|mo|hant)(?:-|$)/.test(v) ? 'zh-Hant' : 'zh-Hans';
    const primary = v.split('-')[0];
    if (primary === 'pt') return 'pt-BR';
    const code = SUPPORTED.find(x => x.toLowerCase() === primary);
    return code || null;
  };
  const preferred = () => {
    const list = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages : [navigator.language];
    for (const language of list) {
      const code = match(language);
      if (code) return code;
    }
    return 'en';
  };
  // Language switching always starts at the top of the corresponding page.
  // This avoids carrying #studio/#free-tools into a different locale.
  const target = language => new URL((language === 'en' ? '' : language + '/') + pageName, base).href;

  // An explicit localized URL wins over saved/browser preferences.
  // Root (English) pages honor the saved preference, or detect on first visit.
  if (pathLang) {
    store(pathLang);
  } else {
    const effective = stored() || preferred();
    if (effective !== 'en') {
      location.replace(target(effective));
      return;
    }
  }

  select.value = pageLang;
  select.addEventListener('change', () => {
    const next = select.value;
    if (!SUPPORTED.includes(next)) return;
    store(next);
    if (next !== pageLang) location.assign(target(next));
  });

  // ImageMorph Mac App Store launch gate. Keep OFF while App Review is pending.
  // Enable only after official public availability and all localized Apple badge
  // assets have been obtained unchanged from Apple's marketing tools.
  const APP_STORE_RELEASED = false;
  const APP_STORE_URL = 'https://apps.apple.com/app/id6817488526';

  if (pageName === 'index.html') {
    const actions = document.querySelector('main .hero-actions');
    const provisional = document.getElementById('imagemorph-app-store-link');
    if (provisional) provisional.remove();
    if (APP_STORE_RELEASED && actions) {
      const badge = document.createElement('a');
      badge.id = 'imagemorph-official-app-store-badge';
      badge.className = 'app-store-badge-link';
      badge.href = APP_STORE_URL;
      badge.rel = 'noopener noreferrer';
      badge.setAttribute('aria-label', 'ImageMorph on the Mac App Store');
      const artwork = document.createElement('img');
      artwork.alt = 'Mac App Store';
      artwork.width = 180;
      artwork.height = 60;
      artwork.loading = 'eager';
      // These assets must be authentic, unmodified official Apple artwork.
      artwork.src = new URL('assets/app-store-badges/' + pageLang + '.svg', base).href;
      badge.appendChild(artwork);
      actions.appendChild(badge);
    }
  }

})();
