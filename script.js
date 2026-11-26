/* ============ EDITA SOLO ESTA PARTE ============ */
const BOT = {
  name: "Felipe Moreno Gonzaga",
  url: "Calendario de Adviento I",            // texto de la barra de arriba
  img: "stellan.png",                         // foto del personaje (va sola, sin nombre debajo)
  data: [
    ["Nombre", "Felipe Alonso Moreno Gonzaga"],   // cada fila sale con su icono (nombre, edad, ocupación, altura, género, MBTI, ambientación...)
    ["Edad", "25 años"],                          // puedes poner un icono propio como tercer dato: ["Edad", "25 años", "fa-cake-candles"]
    ["Ocupación", "Hacendado"],
    ["Altura", "1.82 m"],
    ["Última actualización", "18/11/2026"]    // esta fila sale a la derecha, junto a la foto
  ],
  // título del calendario de abajo ("" para ocultarlo)
  note: "Calendario de Adviento",
  quote: "¿Cómo puede el corazón albergar un sentimiento *tan profundo* y, al mismo tiempo, *tan prohibido*?",

  /* ----- OPCIONALES (déjalos vacíos si no los necesitas) ----- */
  desc: [],       // sinopsis: un texto o varios en lista ["párrafo 1", "párrafo 2"]
  role: "",       // por ejemplo "Tu rol: ..."
  side: [],       // filas extra junto a la foto, por ejemplo [["Versión 2.1", "Adición de escenarios."]]
  inspired: "",   // por ejemplo "César Borgia" → "Bot inspirado en César Borgia."

  // [emoji, nombre, valor de 0 a 5]  → puede ser 0.5, 2.5, 4...  (cada barra tiene su color y su emoji se mueve solo)
  // Opcional: un cuarto dato con tus colores, por ejemplo ["🎭", "Drama", 5, ["#d6b4ff", "#8f5bff"]]
  rating: [["🎭", "Drama", 5], ["🥀", "Angst", 4], ["🚩", "Red Flags", 0], ["🌶️", "Spicy", 2], ["✨", "Fantasía", 0], ["💌", "Amor", 5]],
  // [nombre, icono FontAwesome, link]   (los iconos están ocultos en el CSS; el nombre y el link sí cuentan)
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
    cover: "",    // portada de la CANCIÓN (opcional), por ejemplo "portada.jpg". Vacío = se ve el disco decorado
    // LETRA (se ve a la derecha del reproductor). Pégala aquí de una de estas dos formas:
    //   con tiempos → [{ time: 0, line: "Primera línea" }, { time: 8, line: "Segunda línea" }]   (time = segundos; la línea que suena se ilumina sola)
    //   sin tiempos → ["Primera línea", "Segunda línea", "", "Otra estrofa"]                      ("" = espacio entre estrofas)
    lyrics: []
  }]
};

/* LA CARTITA (bienvenida y presentación) Y LOS AMIGOS CREADORES
   Aquí va todo lo tuyo: tu foto, tus etiquetas y los links de tus amigos. */
const AUTOR = {
  saludo: "¡Bienvenidos!",
  nombre: "Bachira",
  alias: "RoostBach",                                   // sale debajo de la foto
  foto: "",                                             // ← PEGA AQUÍ el link de la foto de tu personaje (o "foto.png" si la subes a tu carpeta)
  ventana: "presentación",                              // título de la ventanita
  etiquetas: ["procrastinador", "creador de bots", "He/Him/Él"],
  intro: "Disfruté muchísimo hacer este calendario para ustedes.",   // "" para ocultarlo
  porque: {
    titulo: "¿Por qué hago bots?",
    texto: "Porque tengo mucha ensoñación excesiva y siempre me la paso imaginando historias. Las convierto en bots para que los demás puedan disfrutarlas, aunque muchas sean *proyectadas*."
  },
  // el "sí" y el "no" (de ejemplo: cámbialos por lo tuyo; deja la lista vacía [] para ocultar uno)
  si: ["Imaginar historias sin parar", "Hacer cada bot con cariño", "Leer lo que opinan"],
  no: ["Entregar todo a tiempo", "Dejar de imaginar", "Hacer bots sin cariño"],
  firma: "con mucho amor,",

  amigos: {
    titulo: "amigos creadores",
    intro: "Gente talentosa que admiro. ¡Pasa a ver sus bots!",
    // foto = link de su foto · url = link a su página o sitio (al tocar la tarjeta se abre)
    lista: [
      { nombre: "Dorethey", rol: "Creadora de bots", foto: "", url: "" },
      { nombre: "Annetts",  rol: "Creadora de bots", foto: "", url: "" },
      { nombre: "Isa",      rol: "Creadora de bots", foto: "", url: "" },
      { nombre: "Nero",     rol: "Creador de bots",  foto: "", url: "" }
    ],
    mensaje: "Los quiero mucho",
    mensaje2: "Gracias por ser mis amigos, ¡son lo mejor!"
  }
};

/* CALENDARIO DE ADVIENTO
   Escribe el nombre del bot de cada puerta (igual que en bots.js; los acentos no importan).
   Los números 1 al 24 se ponen solos: primero van los Masculinos y después los Femeninos.
   "" = regalo sorpresa. Si un bot no está en bots.js o no tiene foto, también sale el regalo. */
const ADVIENTO = {
  masculinos: ["Alejandro", "Altherian", "Bowser", "Brahms", "Drexler", "Elisha", "Evress", "Freterhard", "Haru",
               "Ichirou", "Ismen", "Ivaren", "Jack Heart", "Jaufré", "Jessamy", "Juan", "Kardi", "Lenny"],
  femeninos: ["Altheris", "Ismene", "Jessamell", "Oka", "Valentina", ""]
};
/* ============================================= */

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = s => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');   // *palabra* → rosa
const list = v => [].concat(v || []).filter(Boolean);
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const pick = (tabla, nombre) => (tabla.find(([re]) => re.test(norm(nombre))) || [])[1];

/* ---------- contenido ---------- */
document.title = BOT.name + ' · Bachira';
$('#url').textContent = BOT.url;
$('#name').textContent = BOT.name;

const im = $('#img');
im.alt = 'Retrato de ' + BOT.name;
im.src = BOT.img;
im.onerror = () => im.style.opacity = 0;

/* ---------- ficha de datos: cada fila con su icono ---------- */
const isUpd = k => /actualiz/i.test(k);
const ICONOS = [
  [/nombre|name/, 'fa-signature'],
  [/edad|age/, 'fa-cake-candles'],
  [/ocupaci|trabajo|profesi|oficio|cargo|rol/, 'fa-briefcase'],
  [/altura|estatura|height/, 'fa-ruler-vertical'],
  [/genero|sexo/, 'fa-venus-mars'],
  [/mbti|personalidad/, 'fa-brain'],
  [/ambient|epoca|siglo|era\b/, 'fa-hourglass-half'],
  [/lugar|ciudad|pais|origen|residencia|ubicaci/, 'fa-location-dot'],
  [/cumple|nacimiento|fecha/, 'fa-calendar-days'],
  [/preferencia|orientaci|pareja/, 'fa-heart'],
  [/nacionalidad/, 'fa-flag'],
  [/apodo|alias/, 'fa-quote-left'],
  [/habilidad|poder|arma/, 'fa-wand-magic-sparkles'],
  [/idioma|lengua/, 'fa-language']
];
const iconoDe = (k, ic) => ic || pick(ICONOS, k) || 'fa-star';
const tarjeta = ([k, v, ic], span) =>
  `<div class="fc" style="--s:${span}"><span class="fi"><i class="fas ${esc(iconoDe(k, ic))}" aria-hidden="true"></i></span>` +
  `<div class="ft"><small>${esc(k)}</small><b>${fmt(v)}</b></div></div>`;
/* reparte las tarjetas en filas de 3 o 2 para que nunca quede una sola huérfana; las de texto largo ocupan toda la fila */
const filas = n => { const r = []; while (n > 0) { const t = n === 4 ? 2 : Math.min(3, n); r.push(t); n -= t; } return r; };
const info = (BOT.data || []).filter(([k]) => !isUpd(k));
if (info.length) {
  let html = '', tanda = [];
  const vaciar = () => { let i = 0; filas(tanda.length).forEach(t => { for (let j = 0; j < t; j++) html += tarjeta(tanda[i++], 6 / t); }); tanda = []; };
  info.forEach(f => String(f[1]).length > 22 ? (vaciar(), html += tarjeta(f, 6)) : tanda.push(f));
  vaciar();
  $('#fgrid').innerHTML = html;
} else $('#ficha').remove();

/* frase / sinopsis */
const paras = list(BOT.desc).concat(list(BOT.role));
$('#desc').innerHTML =
  (BOT.quote ? `<p class="q">${fmt(BOT.quote)}</p>` : '') +
  paras.map(p => `<p>${fmt(p)}</p>`).join('');

/* novedades junto a la foto */
const upd = (BOT.data || []).find(([k]) => isUpd(k));
$('#ver').innerHTML =
  [...(BOT.side || []), ...(upd ? [upd] : [])].map(([k, v]) =>
    `<p>${isUpd(k) ? '<i class="fas fa-clock-rotate-left" aria-hidden="true"></i>' : ''}<b>${fmt(k)}</b> <span>${fmt(v)}</span></p>`).join('') +
  (BOT.inspired ? `<p class="mark"><span>Bot inspirado en ${fmt(BOT.inspired)}.</span></p>` : '');

/* ---------- rating: barras de 5 casillas, cada una con su color y su emoji animado ---------- */
const COLORES = [
  [/drama/, ['#d6b4ff', '#8f5bff']],
  [/angst|tristeza|dolor/, ['#9db9ff', '#4b5fe0']],
  [/red ?flag|bandera/, ['#ff9a9a', '#e5243b']],
  [/spic|picante|cochin|hot|lemon/, ['#ffcb70', '#ff6a1a']],
  [/fantas|magia/, ['#a2f6f0', '#1fb6d6']],
  [/amor|love|romance/, ['#ffbddb', '#ff4f9a']],
  [/hdp|toxic|crueld|villan/, ['#ff9ea8', '#b81d3a']],
  [/locur|loco|obses|yandere/, ['#f3b8ff', '#b25cf2']]
];
const PALETA = [['#ffd1a0', '#ff8a3d'], ['#b8f2c1', '#2fbf71'], ['#bfe3ff', '#3a8ee6'], ['#ffe9a3', '#e8b923']];
const MOVS = [
  [/drama/, 'm-drama'], [/angst|tristeza|dolor/, 'm-angst'], [/red ?flag|bandera/, 'm-flag'],
  [/spic|picante|cochin|hot|lemon/, 'm-spicy'], [/fantas|magia/, 'm-fant'], [/amor|love|romance/, 'm-amor'],
  [/locur|loco|obses|yandere/, 'm-loco'], [/hdp|toxic|crueld|villan/, 'm-hdp']
];
const RT = BOT.rating || [];
if (RT.length) {
  $('#rating').innerHTML = RT.map(([em, n, v, col], k) => {
    let x = Number(v) || 0;
    if (x > 5) x /= 20;                                   // si pones 80 lo toma como 80 % (= 4 de 5)
    x = Math.max(0, Math.min(5, x));
    const txt = Number.isInteger(x) ? x : +x.toFixed(1);
    const c = (Array.isArray(col) ? col : col ? [col, col] : null) || pick(COLORES, n) || PALETA[k % PALETA.length];
    const mv = pick(MOVS, n) || 'm-float';
    const segs = [0, 1, 2, 3, 4].map(j => `<i style="--f:${Math.max(0, Math.min(1, x - j))};--k:${j}"></i>`).join('');
    return `<div class="r" title="${esc(n)} ${txt}/5" style="--c1:${esc(c[0])};--c2:${esc(c[1])};--i:${k}">` +
      `<span class="ri ${mv}" aria-hidden="true">${esc(em)}</span><b>${esc(n)}</b>` +
      `<div class="seg" role="img" aria-label="${esc(n)}: ${txt} de 5">${segs}</div>` +
      `<em><span class="st">★</span>${txt}/5</em></div>`;
  }).join('');
} else $('.rate').remove();

/* enlaces y etiquetas */
$('#plats').innerHTML = (BOT.plats || []).map(([n, i, u]) =>
  `<a class="pl" href="${esc(u)}" target="_blank" rel="noopener"><i class="fas ${esc(i)}"></i><span>${esc(n)}</span></a>`).join('');
$('#tags').innerHTML = (BOT.tags || []).map(t => `<span>${esc(t)}</span>`).join('');
if (!(BOT.tags || []).length) $('#tags').remove();

/* ---------- calendario de adviento (usa BOTS_LIST de tu bots.js) ---------- */
const BL = (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) ? BOTS_LIST : [];
const sinBot = b => !b || !b.url || !b.imagen || /ejemplo|your_|pr[oó]ximamente/i.test(b.nombre + b.imagen);   // sin foto o sin información
const regalo = '<svg class="g" aria-hidden="true"><use href="#gift"/></svg>';
const mini = '<svg class="mg" aria-hidden="true"><use href="#gift"/></svg>';
const strip = $('#strip');

if (BOT.note) $('#note').innerHTML = mini + '<span>' + fmt(BOT.note) + '</span>' + mini; else $('#note').remove();

/* si la foto de un bot no carga, se muestra el regalo (el enlace sigue funcionando) */
strip.addEventListener('error', e => {
  if (e.target.tagName !== 'IMG') return;
  e.target.parentNode.classList.add('gf');
  e.target.outerHTML = regalo;
}, true);

/* clic en un regalo sin bot → mensaje bonito */
strip.onclick = e => {
  const g = e.target.closest('.gf[data-d]');
  if (!g) return;
  $('#gt').textContent = 'Regalo ' + g.dataset.d;
  abrir('#m-gift');
};

/* Masculinos y Femeninos van lado a lado, siempre en 3 filas */
let dia = 0;
strip.innerHTML = [['Masculinos', ADVIENTO.masculinos], ['Femeninos', ADVIENTO.femeninos]]
  .filter(([, l]) => (l || []).length)
  .map(([t, l]) =>
    `<div class="blk" style="--c:${Math.max(1, Math.ceil(l.length / 3))}"><h3 class="sec"><span>${t}</span></h3><div class="cells">` +
    l.map(n => {
      const d = ++dia, b = BL.find(x => norm(x.nombre) === norm(n));
      return sinBot(b)
        ? `<button class="bt gf" type="button" data-d="${d}" aria-label="Regalo ${d}: llegará pronto">${regalo}<b>${d}</b><span>Pronto</span></button>`
        : `<a class="bt" href="${esc(b.url)}" title="${esc(b.nombre)}"><img src="${esc(b.imagen)}" alt="" loading="lazy"><b>${d}</b><span>${esc(b.nombre)}</span></a>`;
    }).join('') + `</div></div>`).join('');

/* ---------- la cartita: bienvenida y presentación ---------- */
{
  const A = AUTOR, P = A.porque || {};
  const yn = (cls, ic, tit, l) => list(l).length
    ? `<div class="${cls}"><h4><i class="fas ${ic}" aria-hidden="true"></i>${esc(tit)}</h4><ul>${list(l).map(t => `<li>${fmt(t)}</li>`).join('')}</ul></div>` : '';
  const ynHtml = yn('yes', 'fa-check', 'Sí', A.si) + yn('no', 'fa-xmark', 'No', A.no);
  $('#wel').innerHTML =
    `<div class="orn" aria-hidden="true">❄ ♡ ❄</div>` +
    (A.saludo ? `<h3 class="hello">${fmt(A.saludo)}</h3>` : '') +
    (A.intro ? `<p class="intro">${fmt(A.intro)}</p>` : '') +
    `<h2 class="who">${esc(A.nombre)}</h2>` +
    `<section class="mini"><header class="mh"><span class="md" aria-hidden="true"><i></i><i></i><i></i></span><span class="mt">${esc(A.ventana || '')} ✧</span></header>` +
      `<div class="mb"><div class="pf"><span class="ph" aria-hidden="true"><i class="fas fa-user"></i></span>` +
      (A.foto ? `<img src="${esc(A.foto)}" alt="Foto de ${esc(A.nombre)}">` : '') + `</div>` +
      (A.alias ? `<p class="nick"><span>${esc(A.alias)}</span></p>` : '') +
      `<div class="chips">${list(A.etiquetas).map(t => `<span>${esc(t)}</span>`).join('')}</div></div></section>` +
    (P.texto ? `<section class="why"><h4><i class="fas fa-star" aria-hidden="true"></i>${esc(P.titulo || '')}</h4><p>${fmt(P.texto)}</p></section>` : '') +
    (ynHtml ? `<div class="yn">${ynHtml}</div>` : '') +
    `<p class="sign">${esc(A.firma || '')}<br><span>${esc(A.nombre)}</span> ♡</p>`;
  $('#wel').addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.remove(); }, true);   // si la foto no carga, se queda el adorno
}

/* ---------- amigos creadores ---------- */
{
  const F = (AUTOR.amigos || {}), L = list(F.lista);
  const tarj = a => {
    const ini = esc(String(a.nombre || '?').trim().charAt(0).toUpperCase());
    const cuerpo = `<span class="av"><b>${ini}</b>${a.foto ? `<img src="${esc(a.foto)}" alt="">` : ''}</span>` +
      `<strong>${esc(a.nombre)}</strong><small>${esc(a.rol || 'Creador de bots')}</small>` +
      (a.url ? '<i class="fas fa-arrow-up-right-from-square go" aria-hidden="true"></i>' : '');
    return a.url
      ? `<a class="fr" href="${esc(a.url)}" target="_blank" rel="noopener" aria-label="Ir a la página de ${esc(a.nombre)}">${cuerpo}</a>`
      : `<div class="fr">${cuerpo}</div>`;
  };
  $('#fri').innerHTML =
    `<span class="fl a" aria-hidden="true">✦</span><span class="fl b" aria-hidden="true">♡</span><span class="fl c" aria-hidden="true">✧</span>` +
    `<header class="fhead"><span class="fic"><svg class="ico" aria-hidden="true"><use href="#amigos"/></svg></span><h2>${esc(F.titulo || 'amigos creadores')}</h2><i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i></header>` +
    (F.intro ? `<p class="fintro">${fmt(F.intro)}</p>` : '') +
    `<div class="fgr">${L.map(tarj).join('')}</div>` +
    (F.mensaje || F.mensaje2 ? `<div class="fmsg">${F.mensaje ? `<p class="big">${esc(F.mensaje)} ♡</p>` : ''}${F.mensaje2 ? `<p>${esc(F.mensaje2)}</p>` : ''}</div>` : '');
  $('#fri').addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.remove(); }, true);
}

/* ---------- fondo: estrellitas y nieve ---------- */
const rnd = (a, b) => a + Math.random() * (b - a);
$('#sky').innerHTML =
  Array.from({ length: 14 }, () =>
    `<i class="sp" style="left:${rnd(0, 100)}%;top:${rnd(0, 100)}%;font-size:${rnd(10, 26)}px;animation-delay:-${rnd(0, 3)}s">✦</i>`).join('') +
  Array.from({ length: 22 }, () => {
    const z = rnd(3, 7);
    return `<i class="sn" style="left:${rnd(0, 100)}%;--z:${z}px;--dx:${rnd(-40, 40)}px;animation-duration:${rnd(9, 20)}s;animation-delay:-${rnd(0, 20)}s"></i>`;
  }).join('');

/* ---------- reproductor + letra ---------- */
const au = $('#au'), S = BOT.songs || [], WIN = $('.win'), cv = $('#dimg'), LB = $('#lall');
let si = 0, li = -1;
const fm = t => isFinite(t) ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00';
const ly = () => ((S[si] && S[si].lyrics) || []).map(l => typeof l === 'string' ? { line: l } : l);

/* portada de la canción: si no hay (o no carga) se queda el disco decorado */
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
  $('#sa').textContent = '♪ ' + s.artist;
  setCover(s.cover);
  LB.innerHTML = L.length
    ? '<div class="lpad"></div>' + L.map(l => l.line ? `<p>${esc(l.line)}</p>` : '<p class="gap"></p>').join('') + '<div class="lpad"></div>'
    : '<p class="soon">La letra aparecerá aquí ♪</p>';
  LB.scrollTop = 0; li = -1;
  $('#fill').style.width = '0'; $('#cur').textContent = '0:00'; $('#dur').textContent = '0:00';
  $('#trk').setAttribute('aria-valuenow', 0);
}
const go = d => { load(si + d); au.play().catch(() => {}); };

if (S.length) {
  $('#pp').onclick = () => au.paused ? au.play().catch(() => {}) : au.pause();
  $('#prev').onclick = () => go(-1);      // con una sola canción, vuelve a empezarla
  $('#next').onclick = () => go(1);
  $('#lk').onclick = e => e.currentTarget.classList.toggle('on');
  au.onplay = au.onpause = () => WIN.classList.toggle('playing', !au.paused);
  au.onended = () => go(1);
  au.onloadedmetadata = () => $('#dur').textContent = fm(au.duration);
  au.ontimeupdate = () => {
    $('#cur').textContent = fm(au.currentTime);
    const pc = au.duration ? au.currentTime / au.duration * 100 : 0;
    $('#fill').style.width = pc + '%';
    $('#trk').setAttribute('aria-valuenow', Math.round(pc));
    /* letra con tiempos: ilumina la línea que suena y la centra dentro de su caja */
    let k = -1;
    ly().forEach((l, j) => { if (l.time != null && au.currentTime >= l.time) k = j; });
    if (k !== li) {
      li = k;
      const ps = [...LB.querySelectorAll('p')];
      ps.forEach((p, j) => p.classList.toggle('on', j === k));
      const p = ps[k];
      if (p) LB.scrollTo({ top: p.offsetTop - LB.clientHeight / 2 + p.offsetHeight / 2, behavior: 'smooth' });
    }
  };
  /* tocar una línea de la letra con tiempos salta a ese momento */
  LB.onclick = e => {
    const p = e.target.closest('p'), t = p && ly()[[...LB.querySelectorAll('p')].indexOf(p)];
    if (t && t.time != null && au.duration) au.currentTime = t.time;
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

/* ---------- ventanas emergentes: bienvenida, amigos y regalo ---------- */
let last;
function abrir(id) {
  last = document.activeElement;
  const m = $(id);
  m.classList.add('open');
  document.documentElement.classList.add('lock');
  m.querySelector('.x').focus();
}
function cerrar() {
  const m = document.querySelector('.modal.open');
  if (!m) return;
  m.classList.remove('open');
  document.documentElement.classList.remove('lock');
  if (last) last.focus();
}

$('#wb').onclick = () => abrir('#m-wel');
$('#wf').onclick = () => abrir('#m-fri');
document.querySelectorAll('.modal').forEach(m => m.onclick = e => { if (e.target === m || e.target.closest('.x')) cerrar(); });
addEventListener('keydown', e => {
  if (e.key === 'Escape') return cerrar();
  if (e.key !== 'Tab') return;
  const m = document.querySelector('.modal.open');
  if (!m) return;
  const f = [...m.querySelectorAll('button,a[href]')];            // el foco se queda dentro de la ventana
  if (!f.length) return;
  const a = f[0], z = f[f.length - 1];
  if (e.shiftKey && document.activeElement === a) { z.focus(); e.preventDefault(); }
  else if (!e.shiftKey && document.activeElement === z) { a.focus(); e.preventDefault(); }
});

/* ---------- que TODO quepa en una sola pantalla ----------
   La tarjeta se dibuja siempre con el mismo ancho y aquí se achica (o se agranda un poco en
   pantallas grandes) para que se vea completa sin bajar. Si la pantalla es diminuta, ya no se
   achica más y entonces sí se puede bajar. */
const FIT = $('.fit');
function ajustar() {
  const w = WIN.offsetWidth, h = WIN.offsetHeight;                // tamaño natural, sin escala
  const cs = getComputedStyle(document.body);
  const aw = document.documentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const ah = innerHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 8;
  const s = Math.max(.55, Math.min(1.35, aw / w, ah / h));
  FIT.style.width = w * s + 'px';
  FIT.style.height = h * s + 'px';
  WIN.style.transform = 'scale(' + s + ')';
}
ajustar();
addEventListener('resize', ajustar);
addEventListener('load', ajustar);
if (window.ResizeObserver) new ResizeObserver(ajustar).observe(WIN);   // se reajusta solo cuando cargan las fuentes y las fotos
if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustar);
