/* HOF – House of Champions: premium intro animation
   Use: <script src="hof-splash.js"></script>  (inside <head> of index.html) */
(function () {
  var TOTAL = 3600;            // ms before the intro starts fading out
  var FADE  = 600;             // fade-out time
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { TOTAL = 1200; }

  var css = `
  #hof-splash{position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;
    align-items:center;justify-content:center;overflow:hidden;
    background:radial-gradient(circle at 50% 42%,#0b2a86 0%,#04124a 38%,#020a2a 75%);
    transition:opacity ${FADE}ms ease,transform ${FADE}ms ease;font-family:'Poppins',system-ui,sans-serif}
  #hof-splash.out{opacity:0;transform:scale(1.06);pointer-events:none}
  #hof-splash .ring{position:absolute;width:62vmin;height:62vmin;border-radius:50%;
    border:2px solid rgba(60,170,255,.55);opacity:0;transform:scale(.3);
    animation:hofRing 1.6s .55s cubic-bezier(.2,.7,.2,1) forwards}
  #hof-splash .ring.r2{animation-delay:.8s;border-color:rgba(120,220,255,.4)}
  #hof-splash .halo{position:absolute;width:70vmin;height:70vmin;border-radius:50%;
    background:radial-gradient(circle,rgba(40,150,255,.45),rgba(40,150,255,0) 65%);
    opacity:0;animation:hofHalo 2.4s .4s ease-out forwards}
  #hof-splash svg{width:min(52vw,300px);height:auto;position:relative;overflow:visible;
    filter:drop-shadow(0 0 18px rgba(40,160,255,.55))}
  #hof-splash .crown{opacity:0;transform:translateY(-70px) scale(.9);transform-box:fill-box;
    transform-origin:center;animation:hofCrown .7s .45s cubic-bezier(.2,1.3,.4,1) forwards}
  #hof-splash .mark{opacity:0;transform:scale(.55);transform-box:fill-box;transform-origin:center;
    animation:hofMark .8s .85s cubic-bezier(.2,1.2,.3,1) forwards}
  #hof-splash .sweep{transform:translateX(-700px);animation:hofSweep 1s 1.55s ease-in-out forwards}
  #hof-splash .title{margin-top:26px;color:#fff;font-weight:700;font-size:min(7vw,30px);
    letter-spacing:.1em;opacity:0;text-shadow:0 0 18px rgba(60,170,255,.8);
    animation:hofTitle 1.3s 1.6s cubic-bezier(.2,.8,.2,1) forwards}
  #hof-splash .sub{margin-top:8px;color:#7fd0ff;font-weight:500;font-size:min(3.4vw,13px);
    letter-spacing:.6em;opacity:0;animation:hofSub 1s 2.1s ease forwards}
  @keyframes hofRing{0%{opacity:.9;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
  @keyframes hofHalo{0%{opacity:0;transform:scale(.6)}40%{opacity:1}100%{opacity:.55;transform:scale(1.05)}}
  @keyframes hofCrown{to{opacity:1;transform:none}}
  @keyframes hofMark{to{opacity:1;transform:none}}
  @keyframes hofSweep{to{transform:translateX(900px)}}
  @keyframes hofTitle{0%{opacity:0;letter-spacing:.02em;transform:translateY(8px)}
    100%{opacity:1;letter-spacing:.42em;transform:none}}
  @keyframes hofSub{to{opacity:.9}}
  @media (prefers-reduced-motion:reduce){#hof-splash *{animation-duration:.01s!important;animation-delay:0s!important}}
  `;

  var svg = `
  <svg viewBox="180 30 676 975" xmlns="http://www.w3.org/2000/svg" aria-label="HOF">
    <defs>
      <linearGradient id="hofG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f5fdff"/><stop offset=".42" stop-color="#96e4ff"/>
        <stop offset="1" stop-color="#168cff"/>
      </linearGradient>
      <linearGradient id="hofS" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/>
        <stop offset=".5" stop-color="#fff" stop-opacity=".95"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="hofC">
        <polygon points="285,135 385,183 397,232 462,212 444,155 517,52 590,152 570,212 638,232 648,183 746,135 685,308 517,258 357,310"/>
        <path fill-rule="evenodd" d="M200,400 L293,345 L293,522 L385,503 L385,375 L517,300 L836,398 L836,497 L667,443 L667,513 L787,545 L787,640 L667,605 L667,835 L520,985 L383,848 L385,597 L293,615 L293,790 L200,735 Z M470,418 L517,385 L570,418 L570,775 L520,853 L470,775 Z"/>
      </clipPath>
    </defs>
    <g class="crown">
      <polygon fill="url(#hofG)" points="285,135 385,183 397,232 462,212 444,155 517,52 590,152 570,212 638,232 648,183 746,135 685,308 517,258 357,310"/>
      <polygon fill="#0a6cff" opacity=".28" points="517,52 590,152 570,212 517,250"/>
    </g>
    <g class="mark">
      <path fill="url(#hofG)" fill-rule="evenodd" d="M200,400 L293,345 L293,522 L385,503 L385,375 L517,300 L836,398 L836,497 L667,443 L667,513 L787,545 L787,640 L667,605 L667,835 L520,985 L383,848 L385,597 L293,615 L293,790 L200,735 Z M470,418 L517,385 L570,418 L570,775 L520,853 L470,775 Z"/>
      <polygon fill="#0a6cff" opacity=".28" points="520,830 667,790 667,835 520,985"/>
    </g>
    <g clip-path="url(#hofC)"><rect class="sweep" x="0" y="0" width="260" height="1100" fill="url(#hofS)" transform="skewX(-18)"/></g>
  </svg>`;

  var root = document.createElement('div');
  root.id = 'hof-splash';
  root.innerHTML = '<div class="halo"></div><div class="ring"></div><div class="ring r2"></div>' +
    svg + '<div class="title">HOF</div><div class="sub">HOUSE OF CHAMPIONS</div>';

  var style = document.createElement('style');
  style.textContent = css;
  document.documentElement.appendChild(style);
  document.documentElement.appendChild(root);

  var prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  var done = false;
  function finish() {
    if (done) return; done = true;
    root.classList.add('out');
    setTimeout(function () {
      root.remove(); style.remove();
      document.documentElement.style.overflow = prevOverflow;
    }, FADE + 50);
  }
  setTimeout(finish, TOTAL);
  root.addEventListener('click', finish);          // tap to skip
})();
