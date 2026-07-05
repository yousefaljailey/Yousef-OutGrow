/* WCAG AA text-contrast scanner — paste into the browser DevTools console on any page,
   or run per route. Flags brand-green/gray text failing AA against its effective background,
   with the large-text exemption applied. Zero deps. Used for the 2026-07-04 audit (0 fails). */
(() => {
  const effBg = (el) => { let n = el; while (n && n !== document.documentElement) { const bg = getComputedStyle(n).backgroundColor; if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg; n = n.parentElement; } return "rgb(255, 255, 255)"; };
  const lum = (rgb) => { const m = (rgb.match(/\d+/g) || [255, 255, 255]).map(Number); const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)]; return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const fails = [];
  document.querySelectorAll("*").forEach((el) => {
    if (!(el.checkVisibility ? el.checkVisibility() : el.offsetParent !== null)) return;
    const cs = getComputedStyle(el);
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
    const px = parseFloat(cs.fontSize), w = parseInt(cs.fontWeight) || 400;
    const need = px >= 24 || (px >= 18.66 && w >= 700) ? 3 : 4.5;
    const r = ratio(cs.color, effBg(el));
    if (r < need) fails.push({ r: +r.toFixed(2), need, text: el.textContent.trim().slice(0, 40), el });
  });
  console.table(fails.slice(0, 40));
  console.log(fails.length + " failing text elements on this page/state");
  return fails;
})();
