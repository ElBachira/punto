/* =====================================================
   CONFIGURACIÓN — AQUÍ PEGAS TUS LINKS Y DATOS
   ===================================================== */

// 1) Links de tus PNG decorativos (si queda vacío '' se muestra un emoji)
const IMGS = {
  gatoArbol: '',   // gatito con árbol de navidad
  gatoSanta: '',   // gatito santa
  gatoMuneco: '',  // gatito muñeco de nieve
  arbolito: '',    // arbolito
  baston: '',      // bastón de caramelo
  muerdago: '',    // muérdago rojo
  regalos: '',     // regalos de navidad
  santa: ''        // santa
};

// 2) Datos del bot de hoy (Calendario de Adviento I)
const BOT = {
  name: 'Felipe Moreno Gonzaga',
  img: 'stellan.png',            // <- link de la imagen del bot
  edad: '25 años',
  ocup: 'Hacendado',
  alt: '1.85 m',
  upd: '17/11/2026',
  plats: [['SillyTavern', '#'], ['Janitor', '#'], ['Caveduck', '#'], ['Dokichat', '#']], // [nombre, link]
  tags: ['🕰️ América del siglo XIX', '👢 Hacendado', '🔥 Amor prohibido'],
  rating: [['🎭', 'Drama', 80], ['💔', 'Angst', 60], ['🚩', 'Red Flags', 30], ['🌶️', 'Spicy', 40], ['✨', 'Fantasía', 5], ['💕', 'Amor', 100]]
};

// 3) Canción y letra (t = segundo en que empieza cada línea)
const SONG = {
  title: 'Una lágrima que dar',
  artist: 'Danny Elfman',
  src: 'song.mp3',               // <- link o archivo del audio
  lyrics: [
    { t: 0, l: '♪ Pega aquí la letra ♪' },
    { t: 10, l: 'Una línea por objeto' }
  ]
};

// 4) Puertas 1–24. Las que no estén aquí aparecen cerradas.
const BOTS = {
  1: { name: BOT.name, img: BOT.img, link: '#' }
  // 2: { name: 'Nombre del bot', img: 'link-imagen', link: 'link-del-bot' },
};

/* ===================================================== */
const $ = s => document.querySelector(s);
const mk = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };

// stickers
const EMO = { gatoArbol: '🐈', gatoSanta: '🎅', gatoMuneco: '☃️', arbolito: '🎄', baston: '🍬', muerdago: '🌿', regalos: '🎁', santa: '🎅' };
Object.keys(EMO).forEach(k => {
  const d = mk('div', 'k-' + k);
  if (IMGS[k]) { const i = new Image(); i.alt = ''; i.onerror = () => { d.textContent = EMO[k]; }; i.src = IMGS[k]; d.append(i); }
  else d.textContent = EMO[k];
  $('#stk').append(d);
});

// luces y esferas
(() => {
  const L = $('#lights'), f = x => 3 + 9 * Math.sin(Math.PI * ((x * 4) % 1)), cols = ['#ff4d5a', '#ffd23f', '#4dd9ff', '#7dff8a', '#ff7bd5'];
  let p = 'M0 3'; for (let i = 0; i <= 80; i++) p += `L${i / 80 * 100} ${f(i / 80)}`;
  L.innerHTML = `<svg viewBox="0 0 100 30" preserveAspectRatio="none"><path d="${p}" fill="none" stroke="#111" stroke-width="1.3" vector-effect="non-scaling-stroke"/></svg>`;
  for (let i = 0; i < 28; i++) { const x = (i + .5) / 28; L.append(mk('i', '')); const b = L.lastChild; b.style.cssText = `left:${x * 100}%;top:${f(x)}px;--c:${cols[i % 5]};--d:${(i % 7) * .23}s`; }
  [[3, '#d7262b', 26], [9, '#3b8bff', 14], [15, '#f4b942', 20]].forEach(([x, c, h]) => { const u = mk('u'); u.style.cssText = `left:${x}%;top:${f(x / 100)}px;--c:${c};--h:${h}px`; L.append(u); });
})();

// nieve
(() => {
  const c = $('#snow'), x = c.getContext('2d'); let w, h; const F = [];
  const r = () => { w = c.width = innerWidth; h = c.height = innerHeight; }; r(); addEventListener('resize', r);
  for (let i = 0; i < 70; i++) F.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: 1 + Math.random() * 2.8, s: .4 + Math.random(), d: Math.random() * 6 });
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  (function t() {
    x.clearRect(0, 0, w, h); x.fillStyle = '#fff';
    F.forEach(f => { f.y += f.s; f.d += .02; f.x += Math.sin(f.d) * .5; if (f.y > h) { f.y = -5; f.x = Math.random() * w; } x.globalAlpha = .5 + f.r / 6; x.beginPath(); x.arc(f.x, f.y, f.r, 0, 7); x.fill(); });
    requestAnimationFrame(t);
  })();
})();

// ficha del bot
$('#pic').onerror = e => { e.target.style.opacity = 0; };
$('#pic').src = BOT.img; $('#cov').src = BOT.img;
$('#nm').textContent = BOT.name;
$('#dl').innerHTML = [['🎂', 'Edad', BOT.edad], ['💼', 'Ocupación', BOT.ocup], ['📏', 'Altura', BOT.alt], ['🔔', 'Última actualización', BOT.upd]].map(([i, k, v]) => `<div><dt>${i} ${k}:</dt><dd>${v}</dd></div>`).join('');
$('#plats').innerHTML = BOT.plats.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('');
$('#rate').innerHTML = BOT.rating.map(([i, n, v]) => `<div class="r"><span>${i} ${n}</span><span>${v}%</span><i style="--w:${v}%"></i></div>`).join('');
$('#tags').innerHTML = BOT.tags.map(t => `<span>${t}</span>`).join('');
$('#st').textContent = SONG.title; $('#sa').textContent = SONG.artist;
$('#ll').innerHTML = SONG.lyrics.map(o => `<p>${o.l}</p>`).join('');

// reproductor
const A = new Audio(); A.preload = 'none'; A.src = SONG.src;
$('#play').onclick = () => { A.paused ? A.play().catch(() => { $('#st').textContent = 'Agrega tu audio en SONG.src'; setTimeout(() => $('#st').textContent = SONG.title, 2500); }) : A.pause(); };
A.onplay = () => { $('#card').classList.add('playing'); $('#play').textContent = '❚❚'; };
A.onpause = A.onended = () => { $('#card').classList.remove('playing'); $('#play').textContent = '▶'; };
A.ontimeupdate = () => {
  const t = A.currentTime; $('#fill').style.width = (A.duration ? t / A.duration * 100 : 0) + '%';
  let k = -1; SONG.lyrics.forEach((o, i) => { if (o.t <= t) k = i; });
  const box = $('#ll'), ps = [...box.children]; ps.forEach((p, i) => p.classList.toggle('a', i === k));
  if (k >= 0 && ps.length > 1) box.scrollTo({ top: ps[k].offsetTop - box.clientHeight / 2, behavior: 'smooth' });
};
$('#trk').onclick = e => { if (isFinite(A.duration)) { const r = e.currentTarget.getBoundingClientRect(); A.currentTime = A.duration * (e.clientX - r.left) / r.width; } };
$('#lbtn').onclick = () => $('#lyr').classList.toggle('on');
$('#lx').onclick = () => $('#lyr').classList.remove('on');

// calendario 1–24
function pop(n) {
  const b = BOTS[n];
  $('#popc').innerHTML = b
    ? `<span class="seal">🎁</span><h2>Puerta ${n}</h2>${b.img ? `<img src="${b.img}" alt="">` : ''}<p><b>${b.name}</b></p><a class="go" href="${b.link}" target="_blank" rel="noopener">Ir al bot</a><button class="x" data-x>Cerrar</button>`
    : `<span class="seal">🔒</span><h2>Puerta ${n}</h2><p>Esta puertita todavía está cerrada. ¡Pronto habrá una nueva trama esperándote!</p><button class="x" data-x>Cerrar</button>`;
  $('#pop').classList.add('on');
}
for (let n = 1; n <= 24; n++) {
  const b = BOTS[n], d = mk('button', 'door' + (b ? ' avail' : ''), `<span class="back">${b ? (b.img ? `<img src="${b.img}" alt="">` : '⭐') : '🎁'}</span><span class="front">${n}</span>`);
  d.setAttribute('aria-label', 'Puerta ' + n);
  if (n === 1) d.classList.add('open');
  d.onclick = () => {
    if (b) { d.classList.add('open'); setTimeout(() => pop(n), 550); }
    else { d.classList.add('shake'); setTimeout(() => d.classList.remove('shake'), 500); pop(n); }
  };
  $('#doors').append(d);
}

// modales
$('#home').onclick = () => $('#welcome').classList.add('on');
document.addEventListener('click', e => {
  if (e.target.matches('[data-x]') || e.target.classList.contains('modal')) e.target.closest('.modal').classList.remove('on');
});

// intro: tarjeta -> New Bot (temporal) -> calendario
let done = false;
const enter = () => { if (done) return; done = true; $('#newbot').classList.add('hide'); $('#card').classList.remove('pre'); };
$('#open').onclick = () => { $('#intro').classList.add('hide'); $('#newbot').classList.remove('hide'); setTimeout(enter, 3200); };
$('#newbot').onclick = enter;
