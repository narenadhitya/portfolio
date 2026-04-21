
/* ══ 1. TECH STACK ══════════════════════════════════════════ */
const TECH = [
  {name:'Python',color:'#3776AB'},{name:'PyTorch',color:'#EE4C2C'},
  {name:'TensorFlow',color:'#FF6F00'},{name:'OpenCV',color:'#5C3EE8'},
  {name:'Scikit-learn',color:'#F7931E'},{name:'Git',color:'#F05032'},
  {name:'NumPy',color:'#013243'},{name:'Pandas',color:'#150458'},
  {name:'Java',color:'#007396'},{name:'C++',color:'#00599C'}
];
const techGrid = document.getElementById('tech-grid');
TECH.forEach(t => {
  const el = document.createElement('div');
  el.className = 'tech-tag';
  el.innerHTML = `<svg class="tech-icon" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="${t.color}" opacity=".9"/></svg>${t.name}`;
  techGrid.appendChild(el);
});

/* ══ 2. ALL PROJECTS ════════════════════════════════════════ */
const ALL_PROJECTS = [
  {title:'Textile Defect Detection',desc:'Real-time defect detection using CV and DL on live fabric feeds. TNIMPACT state hackathon.',tags:['PyTorch','OpenCV','EfficientNet'],link:'https://github.com/narenadhitya/Automated-Real-time-Textile-Defect-Detection-System',img:'img/Textile defect.png'},
  {title:'Credit Card Fraud Detection',desc:'ML pipeline for imbalanced fraud detection with ensemble methods and banking-context engineering.',tags:['Scikit-learn','SMOTE','Random Forest'],link:'https://github.com/narenadhitya/Credit-fraud-detector',img:'img/Credit fraud.png'},
  {title:'Graphing Calculator',desc:'Web application for graphing mathematical functions with equation parsing,interactive features and real-time visualization.',tags:['HTML','CSS','JavaScript'],link:'https://github.com/narenadhitya/Graphing-Calculator',img:'img/Graphing Calculator.png'},
  {title:'Intelligent Data Cleaning',desc:'Automated data quality recommendation system with smart imputation and anomaly flagging.',tags:['Python','Pandas','LLM'],link:'#',img:'img/placeholder1.png'},
  {title:'Project TBD',desc:'Work in progress. Check back soon.',tags:['TBD'],link:'#'},
  {title:'Project TBD',desc:'Work in progress. Check back soon.',tags:['TBD'],link:'#'},
];

function makeCard(p){
  return `<div class="project-card">
    <div class="card-img">
        <img src="${p.img}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
    <div class="card-body">
      <div class="card-title">${p.title}</div>
      <p class="card-desc">${p.desc}</p>
      <div class="card-tags">${p.tags.map(t=>`<span class="card-tag">${t}</span>`).join('')}</div>
      <a href="${p.link}" class="card-link">GitHub <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10L10 2M4 2h6v6"/></svg></a>
    </div>
  </div>`;
}
document.getElementById('all-cards-grid').innerHTML = ALL_PROJECTS.map(makeCard).join('');

/* ══ 3. NAV ═════════════════════════════════════════════════ */
const allPage = document.getElementById('all-projects-page');
document.getElementById('see-all-trigger').addEventListener('click', e => {
  e.preventDefault(); allPage.classList.add('open'); allPage.scrollTop = 0;
});
document.getElementById('back-btn').addEventListener('click', () => {
  allPage.classList.remove('open');
});

/* ══ 4. THEME TOGGLE + RIPPLE ═══════════════════════════════
   Ripple wave expands from the toggle button,
   floods the screen in the destination colour,
   then the theme flips at the wave's peak and the circle
   fades out — leaving the new theme underneath.
═══════════════════════════════════════════════════════════ */
const htmlEl       = document.documentElement;
const toggleBtn    = document.getElementById('theme-toggle');
const toggleIcon   = toggleBtn.querySelector('.toggle-icon');
const rippleCircle = document.getElementById('theme-ripple-circle');

let rippling = false;

toggleBtn.addEventListener('click', () => {
  if (rippling) return;
  rippling = true;

  const isDark     = htmlEl.getAttribute('data-theme') === 'dark';
  const goingDark  = !isDark;

  // Destination bg colour — what the wave will "paint"
  const waveColor  = goingDark ? '#0e0e0d' : '#f5f3ef';

  // Origin: centre of toggle button
  const btnRect = toggleBtn.getBoundingClientRect();
  const ox = btnRect.left + btnRect.width  / 2;
  const oy = btnRect.top  + btnRect.height / 2;

  // Diameter needed to cover the entire viewport from this origin
  const maxRadius  = Math.hypot(
    Math.max(ox, window.innerWidth  - ox),
    Math.max(oy, window.innerHeight - oy)
  );
  const diameter   = maxRadius * 2 + 40;
  const scaleFactor = diameter / 80; // base size is 80px

  // ── Position & reset circle ──────────────────────────────
  Object.assign(rippleCircle.style, {
    transition:  'none',
    left:        ox + 'px',
    top:         oy + 'px',
    width:       '80px',
    height:      '80px',
    background:  waveColor,
    opacity:     '1',
    transform:   'translate(-50%,-50%) scale(0)',
  });

  // Force reflow so the reset takes effect
  void rippleCircle.getBoundingClientRect();

  // ── Animate expand ───────────────────────────────────────
  rippleCircle.style.transition =
    `transform 0.68s cubic-bezier(0.4, 0, 0.2, 1)`;
  rippleCircle.style.transform  =
    `translate(-50%,-50%) scale(${scaleFactor})`;

  // ── Flip theme at 50% of animation ──────────────────────
  const TOTAL_MS = 680;
  setTimeout(() => {
    htmlEl.setAttribute('data-theme', goingDark ? 'dark' : 'light');
    toggleIcon.textContent = goingDark ? '☾' : '☀';
  }, TOTAL_MS * 0.48);

  // ── Fade out circle after theme has flipped ──────────────
  setTimeout(() => {
    rippleCircle.style.transition = 'opacity 0.22s ease';
    rippleCircle.style.opacity    = '0';
  }, TOTAL_MS * 0.52);

  // ── Cleanup ──────────────────────────────────────────────
  setTimeout(() => {
    rippleCircle.style.transition = 'none';
    rippleCircle.style.transform  = 'translate(-50%,-50%) scale(0)';
    rippleCircle.style.opacity    = '0';
    rippling = false;
  }, TOTAL_MS + 260);
});

/* ══ 5. CUSTOM CURSOR ═══════════════════════════════════════ */
const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = -200, my = -200, rx = -200, ry = -200;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});
(function animRing(){
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

/* ══ 6. DOT GRID ════════════════════════════════════════════ */
const dotCanvas = document.getElementById('dot-canvas');
const dc = dotCanvas.getContext('2d');
const SPACING = 28, DOT_R = 1.1, GLOW_R = 130;
let dots = [];
let dcx = -500, dcy = -500;

function buildDots(){
  dots = [];
  const cols = Math.ceil(window.innerWidth  / SPACING) + 2;
  const rows = Math.ceil(window.innerHeight / SPACING) + 2;
  for(let r=0; r<rows; r++)
    for(let c=0; c<cols; c++)
      dots.push({x: c*SPACING, y: r*SPACING});
}
function resizeDots(){
  dotCanvas.width  = window.innerWidth;
  dotCanvas.height = window.innerHeight;
  buildDots();
}
resizeDots();
window.addEventListener('resize', resizeDots);
document.addEventListener('mousemove', e => { dcx = e.clientX; dcy = e.clientY; });

(function drawDots(){
  dc.clearRect(0, 0, dotCanvas.width, dotCanvas.height);
  const rgb = htmlEl.getAttribute('data-theme') === 'dark' ? '240,237,232' : '17,17,16';
  for(const d of dots){
    const dist  = Math.hypot(d.x - dcx, d.y - dcy);
    const alpha = dist > GLOW_R ? 0.065 : 0.065 + (1 - dist/GLOW_R)**2 * 0.66;
    dc.globalAlpha = alpha;
    dc.fillStyle   = `rgb(${rgb})`;
    dc.beginPath();
    dc.arc(d.x, d.y, DOT_R, 0, Math.PI*2);
    dc.fill();
  }
  requestAnimationFrame(drawDots);
})();

/* ══ 7. CONTACT CARD — LOCALIZED BORDER GLOW ═══════════════ */
const card  = document.getElementById('contact-card');
const gc_el = document.getElementById('card-glow-canvas');
const gc    = gc_el.getContext('2d');

function buildPerimeter(w, h, r) {
  const pts = [], STEPS = 600;
  const circumference = 2*(w+h) - 8*r + 2*Math.PI*r;
  const tL = w-2*r, rL = h-2*r, bL = w-2*r, lL = h-2*r, aL = (Math.PI/2)*r;
  function s(l){ return Math.max(2, Math.round(STEPS * l / circumference)); }
  const sT=s(tL), sR=s(rL), sB=s(bL), sL=s(lL), sA=s(aL);

  for(let i=0;i<=sA;i++){ const a=Math.PI+(Math.PI/2)*(i/sA); pts.push([r+r*Math.cos(a), r+r*Math.sin(a)]); }
  for(let i=1;i<=sT;i++) pts.push([r+tL*(i/sT), 0]);
  for(let i=1;i<=sA;i++){ const a=-Math.PI/2+(Math.PI/2)*(i/sA); pts.push([w-r+r*Math.cos(a), r+r*Math.sin(a)]); }
  for(let i=1;i<=sR;i++) pts.push([w, r+rL*(i/sR)]);
  for(let i=1;i<=sA;i++){ const a=(Math.PI/2)*(i/sA); pts.push([w-r+r*Math.cos(a), h-r+r*Math.sin(a)]); }
  for(let i=1;i<=sB;i++) pts.push([w-r-bL*(i/sB), h]);
  for(let i=1;i<=sA;i++){ const a=Math.PI/2+(Math.PI/2)*(i/sA); pts.push([r+r*Math.cos(a), h-r+r*Math.sin(a)]); }
  for(let i=1;i<=sL;i++) pts.push([0, h-r-lL*(i/sL)]);
  return pts;
}

let perim = [];
function resizeGlowCanvas(){
  const cw = card.offsetWidth + 2, ch = card.offsetHeight + 2;
  gc_el.width = cw; gc_el.height = ch;
  gc_el.style.width = cw+'px'; gc_el.style.height = ch+'px';
  perim = buildPerimeter(cw-1, ch-1, 6);
}
resizeGlowCanvas();
new ResizeObserver(resizeGlowCanvas).observe(card);

let cardMx = -9999, cardMy = -9999;
document.addEventListener('mousemove', e => {
  const rect = card.getBoundingClientRect();
  cardMx = e.clientX - rect.left + 1;
  cardMy = e.clientY - rect.top  + 1;
});

const GLOW_ARC = 90;
(function drawCardBorder(){
  const w = gc_el.width, h = gc_el.height;
  gc.clearRect(0, 0, w, h);
  if(!perim.length){ requestAnimationFrame(drawCardBorder); return; }

  const isDark  = htmlEl.getAttribute('data-theme') === 'dark';
  const divRgb  = isDark ? '42,42,40'    : '176,176,176';
  const glowRgb = isDark ? '127,200,212' : '201,168,76';

  gc.beginPath();
  gc.moveTo(perim[0][0], perim[0][1]);
  for(let i=1;i<perim.length;i++) gc.lineTo(perim[i][0], perim[i][1]);
  gc.closePath();
  gc.strokeStyle = `rgba(${divRgb},1)`;
  gc.lineWidth = 1;
  gc.stroke();

  let minDist = Infinity, closestIdx = 0;
  for(let i=0;i<perim.length;i++){
    const d = Math.hypot(perim[i][0]-cardMx, perim[i][1]-cardMy);
    if(d < minDist){ minDist = d; closestIdx = i; }
  }

  const proximity = Math.max(0, 1 - minDist / 180);
  if(proximity < 0.01){ requestAnimationFrame(drawCardBorder); return; }

  const total = perim.length;
  for(let di = -GLOW_ARC; di < GLOW_ARC; di++){
    const idx  = (closestIdx + di + total) % total;
    const idx2 = (idx + 1) % total;
    const t    = 1 - Math.abs(di) / GLOW_ARC;
    const eased = t * t * t;
    const alpha = eased * 0.95 * proximity;
    if(alpha < 0.005) continue;
    gc.beginPath();
    gc.moveTo(perim[idx][0],  perim[idx][1]);
    gc.lineTo(perim[idx2][0], perim[idx2][1]);
    gc.strokeStyle = `rgba(${glowRgb},${alpha.toFixed(3)})`;
    gc.lineWidth = 2;
    gc.lineCap = 'round';
    gc.stroke();
  }
  requestAnimationFrame(drawCardBorder);
})();

/* ══ 8. SCROLL FADE-IN ══════════════════════════════════════ */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, {threshold: 0.1});
document.querySelectorAll('.fade-section').forEach(el => io.observe(el));
