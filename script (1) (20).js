/* ============ EDITA SOLO ESTA PARTE ============ */
const BOT = {
  name: "Felipe Moreno Gonzaga",
  img: "stellan.png",
  cap: "Felipe ♡",
  data: [
    ["Nombre", "Felipe Alonso Moreno Gonzaga"],
    ["Edad", "25 años"],
    ["Ocupación", "Hacendado"],
    ["Altura", "1.82 m"],
    ["Última actualización", "18/11/2026"]
  ],
  quote: "¿Cómo puede el corazón albergar un sentimiento tan profundo y, al mismo tiempo, tan prohibido?",
  // [icono, nombre, porcentaje 0-100]
  rating: [["🎭", "Drama", 100], ["🥀", "Angst", 80], ["🚩", "Red Flags", 0], ["🌶️", "Spicy", 40], ["✨", "Fantasía", 0], ["💌", "Amor", 100]],
  // [nombre, icono FontAwesome, link]
  plats: [
    ["SillyTavern", "fa-beer-mug-empty", "https://drive.google.com/file/d/1jG1AeGkG21d85K3GVyW4mvuj0R_URvVW/view?usp=drivesdk"],
    ["Janitor", "fa-robot", "https://janitorai.com/characters/e3ece49e-056a-4b69-ab26-966043738ba1_character-felipe"],
    ["Caveduck", "fa-dungeon", "https://caveduck.io/es/share/characters/ec8ec5ec-d03b-4fb3-9eb4-06ca9c1fc50b?_share_hash="],
    ["Dokichat", "fa-comments", "https://www.dokichat.club/es/chat/01a18efc-d70b-710e-bd9c-fe20d5a28dd9"]
  ],
  tags: ["🕰️ América del siglo XIX", "👢 Hacendado", "🔥 Amor Prohibido"],
  songs: [{
    title: "Far From Any Road",
    artist: "The Handsome Family",
    src: "song.mp3",
    lyrics: [
      { time: 0, line: "Escribe aquí la primera línea de la letra" },
      { time: 8, line: "Aquí la segunda línea" },
      { time: 16, line: "Y así sucesivamente (tiempo en segundos)" }
    ]
  }]
};
const NOMBRE_EN_LISTA = "Felipe"; // se oculta de la tira de bots
/* ============================================= */

const $ = s => document.querySelector(s);

/* contenido */
$('#name').textContent = BOT.name;
$('#quote').textContent = BOT.quote;
$('#cap').textContent = BOT.cap;
const im = $('#img'); im.src = BOT.img; im.onerror = () => im.style.opacity = 0;
$('#data').innerHTML = BOT.data.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
$('#rating').innerHTML = BOT.rating.map(([i, n, v], k) =>
  `<div class="r"><span>${i}</span><b>${n}</b><em>${v}%</em><div class="meter"><i style="--v:${v}%;--i:${k}"></i></div></div>`).join('');
$('#plats').innerHTML = BOT.plats.map(([n, i, u]) =>
  `<a class="pl" href="${u}" target="_blank" rel="noopener"><i class="fas ${i}"></i>${n}</a>`).join('');
$('#tags').innerHTML = BOT.tags.map(t => `<span>${t}</span>`).join('');

/* tira de bots (usa BOTS_LIST de tu bots.js) */
const L = (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST))
  ? BOTS_LIST.filter(b => !b.nombre.includes(NOMBRE_EN_LISTA)) : [];
$('#strip').innerHTML = L.length
  ? L.map(b => `<a class="bt" href="${b.url}" title="${b.nombre}"><img src="${b.imagen}" alt="" loading="lazy"><span>${b.nombre}</span></a>`).join('')
  : Array.from({ length: 12 }, () => '<a class="bt"><span>♡ pronto</span></a>').join('');

/* decoración */
const C = ['#f29bbd', '#f0b84b', '#bdd8b8', '#d8b4fe', '#fff3c9'];
$('#picado').innerHTML = Array.from({ length: 48 }, (_, i) =>
  `<i style="--c:${C[i % 5]};animation-delay:-${(i % 7) * .45}s"></i>`).join('');
$('#sky').innerHTML = Array.from({ length: 18 }, () =>
  `<i class="sp" style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;font-size:${10 + Math.random() * 16}px;animation-delay:-${Math.random() * 3}s">✦</i>`).join('');

/* reproductor + letras */
const au = $('#au'), S = BOT.songs, W = $('.win');
let si = 0, li = -1;
const fm = t => isFinite(t) ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00';
const ly = () => S[si].lyrics || [];

function show(k) {
  const L = ly(), g = j => L[j] ? L[j].line : '', p = $('#ly').children;
  p[0].textContent = g(k - 1);
  p[1].textContent = g(k) || '♪';
  p[2].textContent = g(k + 1);
  p[1].style.animation = 'none'; void p[1].offsetWidth; p[1].style.animation = '';
}
function load(i) {
  si = (i + S.length) % S.length;
  const s = S[si];
  au.src = s.src;
  $('#st').textContent = s.title;
  $('#sa').textContent = s.artist;
  $('#dimg').src = BOT.img;
  $('#lt').textContent = s.title;
  $('#lall').innerHTML = ly().map(l => `<p>${l.line}</p>`).join('');
  li = -1; show(0);
  $('#fill').style.width = '0'; $('#cur').textContent = '0:00'; $('#dur').textContent = '0:00';
}
const go = d => { load(si + d); au.play().catch(() => {}); };

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
  $('#fill').style.width = (au.duration ? au.currentTime / au.duration * 100 : 0) + '%';
  let k = -1;
  ly().forEach((l, j) => { if (au.currentTime >= l.time) k = j; });
  if (k !== li) {
    li = k; show(Math.max(k, 0));
    [...$('#lall').children].forEach((p, j) => p.classList.toggle('on', j === k));
  }
};
$('#trk').onclick = e => {
  if (!au.duration) return;
  const r = e.currentTarget.getBoundingClientRect();
  au.currentTime = (e.clientX - r.left) / r.width * au.duration;
};
load(0);

/* ventanas emergentes: bienvenida y letra completa */
let last;
const open = id => { last = document.activeElement; const m = $(id); m.classList.add('open'); m.querySelector('.x').focus(); };
const close = () => { document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open')); if (last) last.focus(); };
$('#wb').onclick = () => open('#m-wel');
$('#lyb').onclick = () => open('#m-lyr');
document.querySelectorAll('.modal').forEach(m => m.onclick = e => { if (e.target === m || e.target.closest('.x')) close(); });
addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
