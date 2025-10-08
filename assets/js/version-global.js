(function () {
  function initial(defValue) {
    try {
      const q = new URL(location).searchParams.get('semver');
      if (q) return q;
    } catch (_) {}
    try {
      const s = localStorage.getItem('semver');
      if (s) return s;
    } catch (_) {}
    return defValue || 'latest';
  }

  function setVersion(v, { broadcast = true, pushUrl = true, persist = true } = {}) {
    if (typeof v !== 'string' || !v) return;
    try { window.__SEMVER__ = v; } catch (_) {}
    if (persist) { try { localStorage.setItem('semver', v); } catch (_) {} }
    if (pushUrl) {
      try {
        const u = new URL(location);
        u.searchParams.set('semver', v);
        history.replaceState({}, '', u);
      } catch (_) {}
    }
    if (broadcast) {
      try {
        window.dispatchEvent(new CustomEvent('semver:changed', { detail: { value: v } }));
      } catch (_) {}
    }
  }

  // expose
  window.__setSemver__ = setVersion;
  window.__getSemverInitial__ = initial;

  // bootstrap global once
  if (typeof window.__SEMVER__ !== 'string') {
    setVersion(initial(window.__SEMVER_DEFAULT__ || 'latest'), { broadcast: false, pushUrl: false });
  }
})();
