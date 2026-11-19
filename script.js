/* ============ EDITA SOLO ESTA PARTE ============ */
const BOT = {
  name: "Felipe Moreno Gonzaga",
  url: "www.bachira.bot/felipe",              // texto de la barra del navegador
  img: "stellan.png",                         // foto del personaje (va sola, sin nombre debajo)
  data: [
    ["Nombre", "Felipe Alonso Moreno Gonzaga"],
    ["Edad", "25 años"],
    ["Ocupación", "Hacendado"],
    ["Altura", "1.82 m"],
    ["Última actualización", "18/11/2026"]    // esta fila sale a la derecha, junto a la foto
  ],
  // caja bajo la tira de bots ("" para ocultarla). Con *asteriscos* resaltas en rosa.
  note: "Estos son los demás *bots* de Bachira. Toca uno para conocerlo.",
  quote: "¿Cómo puede el corazón albergar un sentimiento *tan profundo* y, al mismo tiempo, *tan prohibido*?",

  /* ----- OPCIONALES (déjalos vacíos si no los necesitas) ----- */
  desc: [],       // sinopsis: un texto o varios en lista ["párrafo 1", "párrafo 2"]. Si la usas, la frase pasa a verse cursiva arriba
  role: "",       // por ejemplo "Tu rol: ..."
  side: [],       // filas extra junto a la foto, por ejemplo [["Versión 2.1", "Adición de escenarios."]]
  inspired: "",   // por ejemplo "César Borgia" → "Bot inspirado en César Borgia."

  // [icono, nombre, porcentaje 0-100]
  rating: [["🎭", "Drama", 100], ["🥀", "Angst", 80], ["🚩", "Red Flags", 0], ["🌶️", "Spicy", 40], ["✨", "Fantasía", 0], ["💌", "Amor", 100]],
  // [nombre, icono FontAwesome, link]   (los iconos están ocultos en el CSS; el nombre y el link sí cuentan)
  plats: [
    ["SillyTavern", "fa-beer-mug-empty", "https://drive.google.com/file/d/1jG1AeGkG21d85K3GVyW4mvuj0R_URvVW/view?usp=drivesdk"],
    ["Janitor", "fa-robot", "https://janitorai.com/characters/e3ece49e-056a-4b69-ab26-966043738ba1_character-felipe"],
    ["Caveduck", "fa-dungeon", "https://caveduck.io/es/share/characters/ec8ec5ec-d03b-4fb3-9eb4-06ca9c1fc50b?_share_hash="],
    ["Dokichat", "fa-comments", "https://www.dokichat.club/es/chat/01a18efc-d70b-710e-bd9c-fe20d5a28dd9"]
  ],
  tags: ["🕰️ América del siglo XIX", "👢 Hacendado", "🔥 Amor Prohibido"],

  // botones grandes de abajo; cada uno abre una ventanita.
  //   text: un párrafo o varios en lista (con *palabra* resaltas en rosa)
  //   rows: "data" para mostrar la tabla de datos, o tu propia lista [["Etiqueta", "Valor"], ...]
  // Si no pones ni text ni rows, la ventana dice "Próximamente". Usa extras: [] para quitar los botones.
  extras: [
    { icon: "♥", label: "Lore", text: "" },
    { icon: "♥", label: "Relaciones", text: "" },
    { icon: "✦", label: "Datos Extra", rows: "data" }
  ],

  songs: [{
    title: "Far From Any Road",
    artist: "The Handsome Family",
    src: "song.mp3",
    cover: "",    // portada de la CANCIÓN (no la del personaje), por ejemplo "portada.jpg". Vacío = se ve una nota musical
    lyrics: []    // letra sincronizada (opcional). Ejemplo: [{ time: 0, line: "Primera línea" }, { time: 8, line: "Segunda línea" }]  (time = segundos)
  }]
};
const NOMBRE_EN_LISTA = "Felipe"; // se oculta de la tira de bots
/* ============================================= */

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = s => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');   // *palabra* → rosa
const list = v => [].concat(v || []).filter(Boolean);

/* ---------- contenido ---------- */
document.title = BOT.name + ' · Bachira';
$('#url').textContent = BOT.url || 'www.bachira.bot';
$('#name').textContent = BOT.name;

const im = $('#img');
im.alt = 'Retrato de ' + BOT.name;
im.src = BOT.img;
im.onerror = () => im.style.opacity = 0;

/* aviso bajo la tira */
if (BOT.note) $('#note').innerHTML = fmt(BOT.note); else $('#note').remove();

/* datos en franja rosa (la fila "Última actualización" va a la derecha) */
const isUpd = k => /actualiz/i.test(k);
const info = (BOT.data || []).filter(([k]) => !isUpd(k));
if (info.length) $('#line').innerHTML = '<span>' + info.map(([k, v]) => `<b>${esc(k)}:</b> ${fmt(v)}`).join('<i> / </i>') + '</span>';
else $('#line').remove();

/* frase / sinopsis */
const paras = list(BOT.desc).concat(list(BOT.role));
$('#desc').innerHTML =
  (BOT.quote ? `<p${paras.length ? ' class="q"' : ''}>${fmt(BOT.quote)}</p>` : '') +
  paras.map(p => `<p>${fmt(p)}</p>`).join('');

/* novedades junto a la foto */
const upd = (BOT.data || []).find(([k]) => isUpd(k));
$('#ver').innerHTML =
  [...(BOT.side || []), ...(upd ? [upd] : [])].map(([k, v]) => `<p><b>${fmt(k)}</b> <span>${fmt(v)}</span></p>`).join('') +
  (BOT.inspired ? `<p class="mark"><span>Bot inspirado en ${fmt(BOT.inspired)}.</span></p>` : '');

/* rating: nombre arriba, porcentaje debajo y la barra ocupando todo el ancho */
const RT = BOT.rating || [];
if (RT.length) {
  $('#rating').innerHTML = RT.map(([i, n, v], k) => {
    const p = Math.max(0, Math.min(100, Number(v) || 0));
    return `<div class="r" title="${esc(n)} ${p}%"><div class="rn"><span class="ri" aria-hidden="true">${i}</span><b>${esc(n)}</b></div><em>${p}%</em>` +
      `<div class="meter" role="progressbar" aria-label="${esc(n)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}"><i style="--v:${p}%;--i:${k}"></i></div></div>`;
  }).join('');
} else { $('#rating').remove(); $('.rt').remove(); }

/* enlaces y etiquetas */
$('#plats').innerHTML = (BOT.plats || []).map(([n, i, u]) =>
  `<a class="pl" href="${esc(u)}" target="_blank" rel="noopener"><i class="fas ${esc(i)}"></i><span>${esc(n)}</span></a>`).join('');
$('#tags').innerHTML = (BOT.tags || []).map(t => `<span>${esc(t)}</span>`).join('');
if (!(BOT.tags || []).length) $('#tags').remove();

/* botones grandes de abajo */
const EX = BOT.extras || [];
if (EX.length) {
  $('#more').innerHTML = EX.map((e, k) =>
    `<button class="mb" type="button" data-k="${k}"><b aria-hidden="true">${esc(e.icon || '♥')}</b><span>${esc(e.label)}</span></button>`).join('');
} else $('#more').remove();

/* tira de bots (usa BOTS_LIST de tu bots.js) */
const L = (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST))
  ? BOTS_LIST.filter(b => !String(b.nombre).includes(NOMBRE_EN_LISTA)) : [];
$('#strip').innerHTML = L.length
  ? L.map(b => `<a class="bt" href="${esc(b.url)}" title="${esc(b.nombre)}"><img src="${esc(b.imagen)}" alt="" loading="lazy"><span>${esc(b.nombre)}</span></a>`).join('')
  : Array.from({ length: 14 }, () => '<a class="bt"><span>♡ pronto</span></a>').join('');

/* estrellitas del fondo */
$('#sky').innerHTML = Array.from({ length: 18 }, () =>
  `<i class="sp" style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;font-size:${10 + Math.random() * 16}px;animation-delay:-${Math.random() * 3}s">✦</i>`).join('');

/* los nombres del rating comparten el mismo tamaño y se achican juntos si alguno no cabe */
const fit = () => {
  const bs = [...document.querySelectorAll('.r b')];
  if (!bs.length) return;
  const put = v => bs.forEach(b => b.style.fontSize = v + 'px');
  let s = parseFloat(getComputedStyle($('#rating')).fontSize) * 1.12;   // tamaño máximo
  put(s);
  while (s > 8 && bs.some(b => b.scrollWidth > b.clientWidth + 1)) put(s -= .5);
};
let rz;
addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(fit); });
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(fit);
fit();

/* ---------- reproductor + letras ---------- */
const au = $('#au'), S = BOT.songs || [], W = $('.win'), cv = $('#dimg');
let si = 0, li = -1;
const fm = t => isFinite(t) ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00';
const ly = () => (S[si] && S[si].lyrics) || [];

/* portada de la canción: si no hay (o no carga) se queda la nota musical */
cv.onload = () => cv.classList.add('ok');
cv.onerror = () => cv.classList.remove('ok');
const setCover = src => {
  if (!src) { cv.classList.remove('ok'); cv.removeAttribute('src'); return; }
  if (cv.getAttribute('src') !== src) { cv.classList.remove('ok'); cv.src = src; }
};

/* letra: una sola línea, con animación cada vez que cambia */
function show(k) {
  const L = ly(), p = $('#ly');
  p.textContent = (L[k] && L[k].line) || '♪';
  p.style.animation = 'none'; void p.offsetWidth; p.style.animation = '';
}
function load(i) {
  si = (i + S.length) % S.length;
  const s = S[si];
  au.src = s.src;
  $('#st').textContent = s.title;
  $('#sa').textContent = s.artist;
  setCover(s.cover);
  $('#lt').textContent = s.title;
  $('#lall').innerHTML = ly().map(l => `<p>${esc(l.line)}</p>`).join('');
  $('#lyr').hidden = !ly().length;
  li = -1; show(-1);
  $('#fill').style.width = '0'; $('#cur').textContent = '0:00'; $('#dur').textContent = '0:00';
  $('#trk').setAttribute('aria-valuenow', 0);
}
const go = d => { load(si + d); au.play().catch(() => {}); };

if (S.length) {
  if (S.length < 2) $('#prev').hidden = $('#next').hidden = true;   // con una sola canción no hacen falta
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
    ly().forEach((l, j) => { if (au.currentTime >= l.time) k = j; });
    if (k !== li) {
      li = k; show(k);
      [...$('#lall').children].forEach((p, j) => p.classList.toggle('on', j === k));
    }
  };

  /* barra de progreso: clic, arrastre con el dedo y flechas del teclado */
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

/* ---------- ventanas emergentes: bienvenida, letra completa y botones de abajo ---------- */
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
const openExtra = k => {
  const e = EX[k];
  const rows = e.rows === 'data' ? (BOT.data || []) : (e.rows || []);
  const html =
    (rows.length ? '<dl class="rows">' + rows.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${fmt(b)}</dd></div>`).join('') + '</dl>' : '') +
    list(e.text).map(p => `<p>${fmt(p)}</p>`).join('');
  $('#ext').textContent = e.title || e.label;
  $('#exb').innerHTML = html || '<p class="soon">Próximamente ♡</p>';
  open('#m-ex');
};

$('#wb').onclick = () => open('#m-wel');
if ($('#lyb')) $('#lyb').onclick = () => open('#m-lyr');
document.querySelectorAll('.mb').forEach(b => b.onclick = () => openExtra(+b.dataset.k));
document.querySelectorAll('.modal').forEach(m => m.onclick = e => { if (e.target === m || e.target.closest('.x')) close(); });
addEventListener('keydown', e => {
  if (e.key === 'Escape') return close();
  if (e.key !== 'Tab') return;
  const m = document.querySelector('.modal.open');
  if (!m) return;
  const f = [...m.querySelectorAll('button,a[href]')];            // el foco se queda dentro de la ventana
  if (!f.length) return;
  const a = f[0], z = f[f.length - 1];
  if (e.shiftKey && document.activeElement === a) { z.focus(); e.preventDefault(); }
  else if (!e.shiftKey && document.activeElement === z) { a.focus(); e.preventDefault(); }
});
