/* =====================================================================
   ✿ CALENDARIO DE ADVIENTO · by Bachira ✿
   SOLO EDITA LOS BLOQUES 1, 2, 3 Y 4 (arriba). Lo demás es la magia.
   ===================================================================== */

/* 1) TUS PNG (fondo transparente). Pega cada link entre las comillas ''.
      Si lo dejas vacío, se muestra un emoji de adorno en su lugar.      */
const PNG = {
  gatoArbol : '',   // gatito con árbol de navidad   (arriba a la derecha)
  gatoSanta : '',   // gatito santa                  (junto al retrato)
  gatoNieve : '',   // gatito muñeco de nieve        (derecha, sobre el calendario)
  arbolito  : '',   // arbolito                      (izquierda)
  baston    : '',   // bastón de caramelo            (borde izquierdo)
  muerdago  : '',   // muérdago rojo                 (arriba al centro)
  regalos   : '',   // regalos de navidad            (esquinas de abajo)
  santa     : '',   // santa                         (esquina superior izquierda)
  campana   : '',   // campanita (extra)
  estrella  : ''    // estrella (extra)
};

/* 2) RETRATO DEL BOT (link de la imagen) */
const FOTO_BOT = '';

/* 3) DATOS DEL BOT (ejemplo: Felipe) */
const BOT = {
  titulo   : 'Felipe Moreno Gonzaga',
  nombre   : 'Felipe Alonso Moreno Gonzaga',
  edad     : '25 años',
  ocupacion: 'Hacendado',
  altura   : '1.85 m',
  version  : '1.0',
  update   : '17/11/2026',
  rol      : 'Felipe vive atormentado por un amor que cree <em>prohibido</em>. <em>Tu rol:</em> eres su supuesta hermana, recién vuelta del convento, la dueña de sus desvelos y su tentación más dulce y amarga.',
  plataformas: [  // [nombre, link]
    ['SillyTavern', 'https://drive.google.com/file/d/1jG1AeGkG21d85K3GVyW4mvuj0R_URvVW/view?usp=drivesdk'],
    ['Janitor AI',  'https://janitorai.com/characters/e3ece49e-056a-4b69-ab26-966043738ba1_character-felipe'],
    ['Caveduck',    'https://caveduck.io/es/share/characters/ec8ec5ec-d03b-4fb3-9eb4-06ca9c1fc50b?_share_hash='],
    ['Dokichat',    'https://www.dokichat.club/es/chat/01a18efc-d70b-710e-bd9c-fe20d5a28dd9']
  ],
  rating: [       // [icono, nombre, porcentaje 0-100]
    ['🎭', 'Drama', 80], ['💔', 'Angst', 60], ['🚩', 'Red Flags', 40],
    ['🌶️', 'Spicy', 50], ['✨', 'Fantasía', 10], ['💕', 'Amor', 100]
  ],
  tags: ['🕰️ América del siglo XIX', '👢 Hacendado', '🔥 Amor prohibido', '⛪ Culpa y fe', '🎄 Navidad']
};

/* 4) CANCIÓN Y LETRA  (time = segundo en que empieza cada línea) */
const SONGS = [{
  title : 'Far From Any Road',
  artist: 'The Handsome Family',
  src   : 'song.mp3',
  lyrics: [
    { time: 0,  line: '♪ Pega aquí la primera línea de la letra ♪' },
    { time: 10, line: 'Segunda línea…' },
    { time: 20, line: 'Tercera línea…' }
  ]
}];

/* 5) ADORNOS PNG: [clave, emoji de respaldo, posición CSS, ancho px, giro°] */
const SLOTS = [
  ['santa',    '🎅', 'left:0;top:2px', 86, -8],
  ['muerdago', '🌿', 'left:600px;top:46px', 66, 0],
  ['estrella', '⭐', 'left:1010px;top:30px', 42, 12],
  ['campana',  '🔔', 'right:92px;top:34px', 46, 14],
  ['gatoArbol','🐱', 'right:6px;top:64px', 92, 6],
  ['baston',   '🍭', 'left:-8px;top:250px', 90, -18],
  ['arbolito', '🎄', 'left:-12px;top:420px', 88, -4],
  ['gatoSanta','🐱', 'left:226px;top:350px', 92, 6],
  ['gatoNieve','⛄', 'right:18px;top:452px', 92, -4],
  ['regalos',  '🎁', 'left:-12px;bottom:-16px', 78, -6],
  ['regalos',  '🎁', 'right:-12px;bottom:-16px', 72, 8]
];

/* ============================ MAGIA ============================ */
const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const R = (a, b) => a + Math.random() * (b - a);
const stage = $('#stage');

/* Escala para que todo quepa en una sola pantalla */
function fit() { stage.style.transform = `translate(-50%,-50%) scale(${Math.min(innerWidth / 1280, innerHeight / 740)})`; }
addEventListener('resize', fit); fit();

/* Lucecitas colgando */
function lights(box) {
  const W = 1280, n = 8, w = W / n, cols = ['#ff3b3b', '#ffd43b', '#3fdc6d', '#4db8ff', '#ff7ad9'];
  let d = '', b = '', k = 0;
  for (let s = 0; s < n; s++) {
    const x0 = s * w, x1 = x0 + w, y = 14, cy = 60;
    d += `M${x0} ${y}Q${x0 + w / 2} ${cy} ${x1} ${y}`;
    for (let i = 1; i <= 5; i++) {
      const t = i / 6, u = 1 - t;
      const x = u * u * x0 + 2 * u * t * (x0 + w / 2) + t * t * x1, yy = u * u * y + 2 * u * t * cy + t * t * y;
      b += `<g transform="translate(${x.toFixed(1)} ${yy.toFixed(1)})"><rect x="-3" y="-3" width="6" height="7" fill="#3a3a3a"/><ellipse class="bl" cy="9" rx="5.5" ry="8" style="--c:${cols[k % 5]};animation-delay:-${(k++ * .37).toFixed(2)}s"/></g>`;
    }
  }
  box.innerHTML = `<svg viewBox="0 0 ${W} 80" width="100%" height="100%" preserveAspectRatio="xMidYMin slice"><path d="${d}" fill="none" stroke="#1d2b1f" stroke-width="2.2"/>${b}</svg>`;
}
lights($('#lights')); lights($('.s1 .lt'));

/* Esferas colgantes: [x, largo del hilo, tamaño, color] */
[[84, 44, 38, '#d62839'], [250, 70, 34, '#f1c040'], [430, 38, 30, '#2d9a57'], [760, 66, 36, '#d62839'],
 [930, 40, 32, '#4d8fe0'], [1120, 72, 36, '#f1c040'], [1236, 46, 30, '#2d9a57']].forEach(([x, l, s, c]) => {
  const b = el('div', 'ball', '<i></i>');
  b.style.cssText = `left:${x}px;--l:${l}px;--s:${s}px;--c:${c};animation-delay:-${R(0, 3).toFixed(1)}s`;
  b.firstChild.style.marginLeft = `-${s / 2}px`;
  stage.append(b);
});

/* Adornos PNG */
SLOTS.forEach(([k, e, pos, w, r]) => {
  const s = el('div', 'sl', PNG[k] ? `<img src="${PNG[k]}" alt="">` : e);
  s.style.cssText = `${pos};width:${w}px;font-size:${w * .85}px;transform:rotate(${r}deg);animation-delay:-${R(0, 3).toFixed(1)}s`;
  stage.append(s);
});

/* Nieve */
for (let i = 0; i < 46; i++) {
  const s = el('span', 'sn', i % 4 ? '❄' : '•');
  s.style.cssText = `left:${R(0, 100)}%;font-size:${R(10, 26)}px;opacity:${R(.5, .95).toFixed(2)};animation-duration:${R(9, 20).toFixed(1)}s;animation-delay:-${R(0, 20).toFixed(1)}s`;
  document.body.append(s);
}

/* ---------- Ficha del bot ---------- */
$('#left').innerHTML = `<div class="ph">${FOTO_BOT ? `<img src="${FOTO_BOT}" alt="${BOT.titulo}">` : '🎅'}</div>
  <div class="plat">${BOT.plataformas.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</div>`;

$('#info').innerHTML = `
  <h1 class="name">✦ ${BOT.titulo} ✦</h1>
  <div class="vers"><span>Versión ${BOT.version}</span><span>Última actualización: ${BOT.update}</span></div>
  <div class="meta">
    <div><b>Nombre</b>${BOT.nombre}</div><div><b>Edad</b>${BOT.edad}</div>
    <div><b>Ocupación</b>${BOT.ocupacion}</div><div><b>Altura</b>${BOT.altura}</div>
  </div>
  <p class="role">${BOT.rol}</p>
  <h2 class="sec">❄ Rating ❄</h2>
  <div class="rate">${BOT.rating.map(([i, n, v]) => `<section class="ri"><div><span>${i} ${n}</span><span>${v}%</span></div><div class="tr"><i data-v="${v}"></i></div></section>`).join('')}</div>
  <div class="pl" id="pl">
    <div class="lyr" id="lyr"></div>
    <div class="disc">💿</div>
    <div class="t"><b id="st"></b><small id="sa"></small><div class="trk" id="trk"><i id="fl"></i></div><div class="tm"><span id="cu">0:00</span><span id="du">0:00</span></div></div>
    <button class="sb" id="lk" aria-label="Me gusta">♡</button>
    <button class="cb" id="pp" aria-label="Reproducir">▶</button>
    <button class="sb" id="lb" aria-label="Ver letra" title="Ver letra">📜</button>
  </div>
  <div class="tags">${BOT.tags.map(t => `<span>${t}</span>`).join('')}</div>`;

/* ---------- Reproductor y letra ---------- */
const au = $('#au'), pl = $('#pl'), lyr = $('#lyr');
const S = SONGS[0], fmt = t => (t / 60 | 0) + ':' + String(t % 60 | 0).padStart(2, '0');
au.src = S.src; $('#st').textContent = S.title; $('#sa').textContent = S.artist;
lyr.innerHTML = S.lyrics.map(l => `<p>${l.line}</p>`).join('');
$('#pp').onclick = () => au.paused ? au.play().catch(() => {}) : au.pause();
au.onplay = () => { pl.classList.add('playing'); $('#pp').textContent = '⏸'; };
au.onpause = () => { pl.classList.remove('playing'); $('#pp').textContent = '▶'; };
au.onloadedmetadata = () => $('#du').textContent = fmt(au.duration);
let cur = -1;
au.ontimeupdate = () => {
  $('#cu').textContent = fmt(au.currentTime);
  if (au.duration) $('#fl').style.transform = `scaleX(${au.currentTime / au.duration})`;
  let j = -1; S.lyrics.forEach((l, n) => { if (l.time <= au.currentTime) j = n; });
  if (j !== cur) {
    cur = j; const ps = lyr.children;
    [...ps].forEach((p, n) => p.classList.toggle('on', n === j));
    if (ps[j]) lyr.scrollTop = ps[j].offsetTop - lyr.clientHeight / 2 + 12;
  }
};
$('#trk').onclick = e => { if (au.duration) { const r = e.currentTarget.getBoundingClientRect(); au.currentTime = (e.clientX - r.left) / r.width * au.duration; } };
$('#lk').onclick = e => { const on = e.currentTarget.classList.toggle('on'); e.currentTarget.textContent = on ? '♥' : '♡'; };
$('#lb').onclick = () => pl.classList.toggle('open');

/* ---------- Calendario de adviento (1-24) ----------
   Los bots salen de BOTS_LIST (tu bots.js). Cada bot: { nombre, url, imagen } */
const BOTS = (window.BOTS_LIST || []).filter(b => b && b.url);
for (let d = 1; d <= 24; d++) {
  const b = BOTS[d - 1];
  const door = el('button', 'door c' + ((d - 1) % 4), `<span class="in">${b && b.imagen ? `<img src="${b.imagen}" alt="">` : '🎁'}</span><span class="lid"><i>${d}</i></span>`);
  door.setAttribute('aria-label', 'Puertita ' + d);
  door.onclick = () => {
    door.classList.add('open');
    setTimeout(() => openM(b
      ? `<small>Puertita ${d}</small>${b.imagen ? `<br><img class="av" src="${b.imagen}" alt="">` : ''}<h2>${b.nombre}</h2><a class="go" href="${b.url}" target="_blank" rel="noopener">Ir al bot 🎁</a>`
      : `<div class="em">🎁</div><h2>Puertita ${d}</h2><p>Este regalito sigue envuelto. ¡Vuelve pronto, habrá sorpresa!</p>`), 450);
  };
  $('#doors').append(door);
}

/* ---------- Ventanas ---------- */
const M = $('#modal');
const openM = h => { $('#mc').innerHTML = h; M.classList.add('on'); };
M.onclick = e => { if (e.target === M || e.target.classList.contains('x')) M.classList.remove('on'); };
addEventListener('keydown', e => { if (e.key === 'Escape') M.classList.remove('on'); });
$('#homeBtn').onclick = () => openM(`<div class="em">🎄✨🎁</div><h2>¡Bienvenid@!</h2>
  <p>He disfrutado muchísimo hacer este calendario para ustedes. Cada puertita guarda una trama distinta, y ojalá las disfruten todas tanto como yo disfruté crearlas.</p>
  <p>Gracias por acompañarme en esta Navidad, de verdad.</p>
  <p class="sg">Con mucho amor,<br>Bachira ♡</p>`);

/* ---------- Intro: tarjeta → "New Bot" → página ---------- */
const intro = $('#intro'), sl = [...intro.querySelectorAll('.slide')];
const dc = (box, list, sz) => list.forEach(([e, p, s]) => { const d = el('span', 'dc', e); d.style.cssText = `${p};font-size:${s}vmin`; box.append(d); });
dc(sl[0], [['🎄', 'left:3%;top:40%', 11], ['🎁', 'left:4%;bottom:5%', 13], ['🍪', 'right:4%;bottom:4%', 12], ['🍭', 'right:5%;top:24%', 11],
  ['⭐', 'right:15%;top:15%', 6], ['🔔', 'left:13%;top:16%', 6], ['❄️', 'left:9%;top:68%', 6], ['❄️', 'right:10%;top:62%', 7], ['🎁', 'left:32%;bottom:1%', 8]], 0);
dc(sl[1], [['❄️', 'left:6vmin;top:6vmin', 8], ['🎄', 'right:6vmin;top:6vmin', 8], ['🎁', 'left:6vmin;bottom:6vmin', 8], ['🔔', 'right:6vmin;bottom:6vmin', 8]], 0);
let k = 0, tm;
function show(i) { k = i; sl.forEach((s, j) => s.classList.toggle('on', j === i)); clearTimeout(tm); tm = setTimeout(next, i ? 3000 : 5500); }
function next() {
  if (k < sl.length - 1) return show(k + 1);
  intro.classList.add('out'); setTimeout(() => intro.remove(), 950);
  setTimeout(() => document.querySelectorAll('.rate i').forEach(i => i.style.width = i.dataset.v + '%'), 300);
}
intro.onclick = next; show(0);
