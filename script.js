/* ============ EDITA SOLO ESTA PARTE ============ */
const BOT = {
  name: "Felipe Moreno Gonzaga",
  url: "Calendario de Adviento I",
  img: "stellan.png",
  data: [
    ["user", "Nombre", "Felipe Alonso Moreno Gonzaga"],
    ["cake-candles", "Edad", "25 años"],
    ["briefcase", "Ocupación", "Hacendado"],
    ["ruler-vertical", "Altura", "1.82 m"],
    ["calendar-check", "Última actualización", "18/11/2026"]
  ],
  note: "Calendario de Adviento",
  quote: "¿Cómo puede el corazón albergar un sentimiento *tan profundo* y, al mismo tiempo, *tan prohibido*?",

  desc: [],
  role: "",
  side: [],
  inspired: "",

  rating: [["🎭", "Drama", 100], ["🥀", "Angst", 80], ["🚩", "Red Flags", 0], ["🌶️", "Spicy", 40], ["✨", "Fantasía", 0], ["💌", "Amor", 100]],
  plats: [
    ["SillyTavern", "fa-beer-mug-empty", "https://drive.google.com/file/d/1jG1AeGkG21d85K3GVyW4mvuj0R_URvVW/view?usp=drivesdk"],
    ["Janitor", "fa-robot", "https://janitorai.com/characters/e3ece49e-056a-4b69-ab26-966043738ba1_character-felipe"],
    ["Caveduck", "fa-dungeon", "https://caveduck.io/es/share/characters/ec8ec5ec-d03b-4fb3-9eb4-06ca9c1fc50b?_share_hash="],
    ["Dokichat", "fa-comments", "https://www.dokichat.club/es/chat/01a18efc-d70b-710e-bd9c-fe20d5a28dd9"]
  ],
  tags: ["América del siglo XIX", "Hacendado", "Amor Prohibido"],

  songs: [{
    title: "Far From Any Road",
    artist: "The Handsome Family",
    src: "song.mp3",
    cover: "",
    lyrics: []
  }]
};

/* AMIGOS CREADORES (NUEVO) */
const FRIENDS = [
  { name: "Dorethey", role: "Creadora de bots", pic: "https://i.imgur.com/dorethey.jpg", url: "https://elbachira.github.io/dorethey" },
  { name: "Annetts", role: "Creadora de bots", pic: "https://i.imgur.com/annetts.jpg", url: "https://elbachira.github.io/annetts" },
  { name: "Isa", role: "Creadora de bots", pic: "https://i.imgur.com/isa.jpg", url: "https://elbachira.github.io/isa" },
  { name: "Nero", role: "Creador de bots", pic: "https://i.imgur.com/nero.jpg", url: "https://elbachira.github.io/nero" }
];

const ADVIENTO = {
  masculinos: ["Alejandro", "Altherian", "Bowser", "Brahms", "Drexler", "Elisha", "Evress", "Freterhard", "Haru",
               "Ichirou", "Ismen", "Ivaren", "Jack Heart", "Jaufré", "Jessamy", "Juan", "Kardi", "Lenny"],
  femeninos: ["Altheris", "Ismene", "Jessamell", "Oka", "Valentina", ""]
};
/* ============================================= */

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = s => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');
const list = v => [].concat(v || []).filter(Boolean);

document.title = BOT.name + ' · Bachira';
$('#url').textContent = BOT.url;
$('#name').textContent = BOT.name;

const im = $('#img');
im.alt = 'Retrato de ' + BOT.name;
im.src = BOT.img;
im.onerror = () => im.style.opacity = 0;

/* letrero */
const up = '<i class="fas fa-angles-up" aria-hidden="true"></i>';
if (BOT.note) $('#note').innerHTML = up + '<span>' + fmt(BOT.note) + '</span>' + up; else $('#note').remove();

/* NUEVA: ficha de datos con iconos */
const dl = $('#dlist');
if (BOT.data && BOT.data.length) {
  dl.innerHTML = BOT.data.map(([ico, k, v]) =>
    `<div class="drow"><div class="dico"><i class="fas fa-${esc(ico)}"></i></div><div class="dtxt"><b>${esc(k)}</b><span>${fmt(v)}</span></div></div>`
  ).join('');
} else { $('.datacard').remove(); }

/* frase */
const paras = list(BOT.desc).concat(list(BOT.role));
$('#desc').innerHTML =
  (BOT.quote ? `<p class="q">${fmt(BOT.quote)}</p>` : '') +
  paras.map(p => `<p>${fmt(p)}</p>`).join('');

/* rating */
const RT = BOT.rating || [];
if (RT.length) {
  $('#rating').innerHTML = RT.map(([i, n, v], k) => {
    const p = Math.max(0, Math.min(100, Number(v) || 0));
    return `<div class="r" title="${esc(n)} ${p}%"><div class="rn"><span class="ri" aria-hidden="true">${i}</span><b>${esc(n)}</b></div><em>${p}%</em>` +
      `<div class="meter" role="progressbar" aria-label="${esc(n)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}"><i style="--v:${p}%;--i:${k}"></i></div></div>`;
  }).join('');
} else { $('#rating').remove(); $('.rt').remove(); }

/* plataformas y etiquetas */
$('#plats').innerHTML = (BOT.plats || []).map(([n, i, u]) =>
  `<a class="pl" href="${esc(u)}" target="_blank" rel="noopener"><i class="fas ${esc(i)}"></i><span>${esc(n)}</span></a>`).join('');
$('#tags').innerHTML = (BOT.tags || []).map(t => `<span>${esc(t)}</span>`).join('');
if (!(BOT.tags || []).length) $('#tags').remove();

/* calendario de adviento */
const BL = (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) ? BOTS_LIST : [];
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const sinBot = b => !b || !b.url || !b.imagen || /ejemplo|your_|pr[oó]ximamente/i.test(b.nombre + b.imagen);
const regalo = '<svg class="g" aria-hidden="true"><use href="#gift"/></svg>';
const strip = $('#strip');

strip.addEventListener('error', e => {
  if (e.target.tagName !== 'IMG') return;
  e.target.parentNode.classList.add('gf');
  e.target.outerHTML = regalo;
}, true);

strip.onclick = e => {
  const g = e.target.closest('.gf[data-d]');
  if (!g) return;
  $('#gt').textContent = 'Regalo ' + g.dataset.d;
  open('#m-gift');
};

let dia = 0;
strip.innerHTML = [['Masculinos', ADVIENTO.masculinos], ['Femeninos', ADVIENTO.femeninos]].map(([t, l]) =>
  `<h2 class="sec"><span>${t}</span></h2>` + (l || []).map(n => {
    const d = ++dia, b = BL.find(x => norm(x.nombre) === norm(n));
    return sinBot(b)
      ? `<button class="bt gf" type="button" data-d="${d}" aria-label="Regalo ${d}: llegará pronto">${regalo}<b>${d}</b><span>Pronto</span></button>`
      : `<a class="bt" href="${esc(b.url)}" title="${esc(b.nombre)}"><img src="${esc(b.imagen)}" alt="" loading="lazy"><b>${d}</b><span>${esc(b.nombre)}</span></a>`;
  }).join('')).join('');

/* estrellitas */
$('#sky').innerHTML = Array.from({ length: 18 }, () =>
  `<i class="sp" style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;font-size:${10 + Math.random() * 16}px;animation-delay:-${Math.random() * 3}s">✦</i>`).join('');

/* NUEVA: llenar grid de amigos */
const fg = $('#friendgrid');
if (FRIENDS && FRIENDS.length) {
  fg.innerHTML = FRIENDS.map(f =>
    `<a class="friendbox" href="${esc(f.url)}" target="_blank" rel="noopener">
      <div class="friendpic"><img src="${esc(f.pic)}" alt="${esc(f.name)}"></div>
      <p class="friendname">${esc(f.name)}</p>
      <p class="friendrole">${esc(f.role)}</p>
    </a>`
  ).join('');
}

/* reproductor + letra */
const au = $('#au'), S = BOT.songs || [], W = $('.win'), cv = $('#dimg'), LB = $('#lall');
let si = 0, li = -1;
const fm = t => isFinite(t) ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00';
const ly = () => ((S[si] && S[si].lyrics) || []).map(l => typeof l === 'string' ? { line: l } : l);

cv.onload = () => cv.classList.add('ok');
cv.onerror = () => cv.classList.remove('ok');
const setCover = src => {
  if (!src) { cv.classList.remove('ok'); cv.removeAttribute('src'); return; }
  if (cv.getAttribute('src') !== src) { cv.classList.remove('ok'); cv.src = src; }
};

function load(i) {
  si = (i + S.length) % S.length;
  const s = S[si], L = ly();
  au.src = s.src;
  $('#st').textContent = s.title;
  $('#sa').textContent = s.artist;
  setCover(s.cover);
  LB.innerHTML = L.length
    ? L.map(l => l.line ? `<p>${esc(l.line)}</p>` : '<p class="gap"></p>').join('')
    : '<p class="soon">La letra aparecerá aquí ♪</p>';
  LB.scrollTop = 0; li = -1;
  $('#fill').style.width = '0'; $('#cur').textContent = '0:00'; $('#dur').textContent = '0:00';
  $('#trk').setAttribute('aria-valuenow', 0);
}
const go = d => { load(si + d); au.play().catch(() => {}); };

if (S.length) {
  $('#pp').onclick = () => au.paused ? au.play().catch(() => {}) : au.pause();
  $('#prev').onclick = () => go(-1);
  $('#next').onclick = () => go(1);
  au.onplay = au.onpause = () => {
    const p = !au.paused;
    W.classList.toggle('playing', p);
    $('#pp i').className = 'fas fa-' + (p ? 'pause' : 'play');
  };
  au.onended = () => go(1);
  au.onloadedmetadata = () => $('#dur').textContent = fm(au.duration);
  au.ontimeupdate = () => {
    $('#cur').textContent = fm(au.currentTime);
    const pc = au.duration ? au.currentTime / au.duration * 100 : 0;
    $('#fill').style.width = pc + '%';
    $('#trk').setAttribute('aria-valuenow', Math.round(pc));
    let k = -1;
    ly().forEach((l, j) => { if (l.time != null && au.currentTime >= l.time) k = j; });
    if (k !== li) {
      li = k;
      [...LB.children].forEach((p, j) => p.classList.toggle('on', j === k));
      const p = LB.children[k];
      if (p) LB.scrollTo({ top: p.offsetTop - LB.clientHeight / 2 + p.offsetHeight / 2, behavior: 'smooth' });
    }
  };

  const trk = $('#trk');
  let drag = false;
  const seek = e => {
    if (!au.duration) return;
    const r = trk.getBoundingClientRect();
    au.currentTime = Math.min(Math.max(e.clientX - r.left, 0), r.width) / r.width * au.duration;
  };
  trk.onpointerdown = e => { drag = true; trk.setPointerCapture(e.pointerId); seek(e); };
  trk.onpointermove = e => { if (drag) seek(e); };
  trk.onpointerup = trk.onpointercancel = () => { drag = false; };
  trk.onkeydown = e => {
    const d = e.key === 'ArrowRight' ? 5 : e.key === 'ArrowLeft' ? -5 : 0;
    if (d && au.duration) { au.currentTime = Math.min(Math.max(au.currentTime + d, 0), au.duration); e.preventDefault(); }
  };
  load(0);
} else {
  $('.player').remove();
  $('#lyr').remove();
}

/* ventanas emergentes */
let last;
const open = id => {
  last = document.activeElement;
  const m = $(id);
  m.classList.add('open');
  document.documentElement.classList.add('lock');
  m.querySelector('.x').focus();
};
const close = () => {
  const m = document.querySelector('.modal.open');
  if (!m) return;
  m.classList.remove('open');
  document.documentElement.classList.remove('lock');
  if (last) last.focus();
};

$('#wb').onclick = () => open('#m-wel');
$('#fb').onclick = () => open('#m-friends');  // NUEVO: botón de amigos
document.querySelectorAll('.modal').forEach(m => m.onclick = e => { if (e.target === m || e.target.closest('.x')) close(); });
addEventListener('keydown', e => {
  if (e.key === 'Escape') return close();
  if (e.key !== 'Tab') return;
  const m = document.querySelector('.modal.open');
  if (!m) return;
  const f = [...m.querySelectorAll('button,a[href]')];
  if (!f.length) return;
  const a = f[0], z = f[f.length - 1];
  if (e.shiftKey && document.activeElement === a) { z.focus(); e.preventDefault(); }
  else if (!e.shiftKey && document.activeElement === z) { a.focus(); e.preventDefault(); }
});
