/* HOF splash (Uber style): black screen, logo fades in, then zooms through into the app */
(function () {
  try { if (sessionStorage.getItem('hof_splash_done')) return; } catch (e) {}

  var MIN_SHOW = 1700;   // ms the logo stays before exit
  var MAX_WAIT = 4000;   // never block the app longer than this
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css = '' +
    '#hof-splash{position:fixed;inset:0;z-index:2147483647;background:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:background .55s ease .1s}' +
    '#hof-splash.out{background:transparent;pointer-events:none}' +
    '#hof-splash .l{width:min(34vw,150px);aspect-ratio:463/640;background:url(hof-logo.png) center/contain no-repeat;opacity:0;transform:scale(.88);will-change:transform,opacity}' +
    '#hof-splash.in .l{animation:hofIn .7s cubic-bezier(.16,1,.3,1) forwards}' +
    '#hof-splash.out .l{animation:hofOut .65s cubic-bezier(.65,0,.35,1) forwards}' +
    '@keyframes hofIn{to{opacity:1;transform:scale(1)}}' +
    '@keyframes hofOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(14)}}' +
    '@media (prefers-reduced-motion:reduce){#hof-splash .l{transform:none!important}#hof-splash.out .l{animation:hofFade .3s forwards}@keyframes hofFade{from{opacity:1}to{opacity:0}}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.documentElement.appendChild(style);

  var el = document.createElement('div');
  el.id = 'hof-splash';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="l"></div>';
  document.documentElement.appendChild(el);

  var start = Date.now();
  var loaded = false, finished = false;

  function startIn() { requestAnimationFrame(function () { el.className = 'in'; }); }
  var img = new Image();
  img.onload = img.onerror = startIn;
  img.src = 'hof-logo.png';

  function finish() {
    if (finished) return;
    finished = true;
    el.className = 'out';
    try { sessionStorage.setItem('hof_splash_done', '1'); } catch (e) {}
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, reduce ? 500 : 900);
  }
  function tryFinish() {
    var wait = Math.max(0, MIN_SHOW - (Date.now() - start));
    setTimeout(finish, wait);
  }

  if (document.readyState === 'complete') { loaded = true; tryFinish(); }
  else window.addEventListener('load', function () { loaded = true; tryFinish(); });
  setTimeout(finish, MAX_WAIT);
})();
