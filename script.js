/* ============ EDITA SOLO ESTA PARTE ============ */
const BOT = {
  name: "Felipe Moreno Gonzaga",
  url: "Calendario de Adviento I",            // texto de la barra de arriba
  img: "stellan.png",                         // foto del personaje (va sola, sin nombre debajo)
  data: [
    ["Nombre", "Felipe Alonso Moreno Gonzaga"],
    ["Edad", "25 años"],
    ["Ocupación", "Hacendado"],
    ["Altura", "1.82 m"],
    ["Última actualización", "18/11/2026"]    // esta fila sale a la derecha, junto a la foto
  ],
  // letrero con flechas que señala hacia arriba, al calendario ("" para ocultarlo)
  note: "Calendario de Adviento",
  quote: "¿Cómo puede el corazón albergar un sentimiento *tan profundo* y, al mismo tiempo, *tan prohibido*?",

  /* ----- OPCIONALES (déjalos vacíos si no los necesitas) ----- */
  desc: [],       // sinopsis: un texto o varios en lista ["párrafo 1", "párrafo 2"]
  role: "",       // por ejemplo "Tu rol: ..."
  side: [],       // filas extra junto a la foto, por ejemplo [["Versión 2.1", "Adición de escenarios."]]
  inspired: "",   // por ejemplo "César Borgia" → "Bot inspirado en César Borgia."

  // [icono, nombre, estrellas de 0 a 5 (acepta medios: 0.5, 2.5, 4.5...)]
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
    // LETRA (se ve debajo del reproductor). Pégala aquí de una de estas dos formas:
    //   con tiempos → [{ time: 0, line: "Primera línea" }, { time: 8, line: "Segunda línea" }]   (time = segundos; la línea que suena se ilumina sola)
    //   sin tiempos → ["Primera línea", "Segunda línea", "", "Otra estrofa"]                      ("" = espacio entre estrofas)
    lyrics: []
  }]
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
/* BIENVENIDA (botón de la cartita): tu presentación */
const BIENVENIDA = {
  saludo: "Bienvenidos",
  intro: "Disfruté muchísimo hacer este calendario para ustedes. Ojalá disfruten todas estas tramas tan distintas, y todo lo que todavía está por venir.",
  foto: "",                 // ← pega aquí el LINK de la foto de tu personaje (vacío = se ve un corazón)
  nombre: "Bachira",        // título de la tarjeta y firma
  alias: "RoostBach",       // va debajo de la foto
  tags: ["procrastinador", "creador de bots", "He/Him/Él"],
  porque: "¿Por qué hago bots?",
  mensaje: "Porque tengo mucha ensoñación excesiva y siempre me la paso imaginando historias. Me encanta convertirlas en bots para que los demás puedan disfrutarlas, aunque muchas sean proyectadas.",
  si: "leer, charla casual, natación, caminar, drama, batidos, The Neighbourhood",
  no: "mucha gente, anuncios, batería baja, comida caliente, ansiedad, TOC, prisas",
  cierre: "Gracias por quedarse, por leer y por darle vida a cada personaje."
};

/* AMIGOS CREADORES (botón morado de arriba, junto a la cartita)
   Cada amigo: [nombre, rol, link de su FOTO, link de su página o sitio]
   - foto "" o que no cargue → se ve su inicial dentro del círculo.
   - página "" → la tarjeta se ve igual, pero no abre nada. */
const AMIGOS = {
  titulo: "amigos creadores",
  texto: "Gente talentosa que admiro. ¡Pasa a ver sus bots!",
  lista: [
    ["Dorethey", "Creadora de bots", "", ""],
    ["Annetts",  "Creadora de bots", "", ""],
    ["Isa",      "Creadora de bots", "", ""],
    ["Nero",     "Creador de bots",  "", ""]
  ],
  gracias: "Los quiero mucho ♡",
  mensaje: "Admiro su talento y el cariño que le ponen a cada personaje. Gracias por ser mis amigos, ¡son lo mejor!"
};
/* ============================================= */

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = s => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');   // *palabra* → rosa
const list = v => [].concat(v || []).filter(Boolean);

/* ---------- contenido ---------- */
document.title = BOT.name + ' · Bachira';
$('#url').textContent = BOT.url;
$('#name').textContent = BOT.name;

const im = $('#img');
im.alt = 'Retrato de ' + BOT.name;
im.src = BOT.img;
im.onerror = () => im.style.opacity = 0;

/* letrero con flechas hacia abajo (apunta al calendario) */
const up = '<i class="fas fa-angles-down" aria-hidden="true"></i>';
if (BOT.note) $('#note').innerHTML = up + '<span>' + fmt(BOT.note) + '</span>' + up; else $('#note').remove();

/* datos en tarjetas con icono (la fila "Última actualización" va junto a la foto).
   El icono sale solo según el nombre del dato; para elegir otro agrega un 3.er valor:
   ["Hobby", "Montar a caballo", "fa-horse"]   (iconos gratis: fontawesome.com/search?o=r&m=free) */
const isUpd = k => /actualiz/i.test(k);
const ICO = [[/nombre/i, 'fa-signature'], [/edad/i, 'fa-cake-candles'], [/ocupaci|trabajo|oficio/i, 'fa-hat-cowboy'],
  [/altura|estatura/i, 'fa-ruler-vertical'], [/g[eé]nero|sexo/i, 'fa-venus-mars'], [/cumple|nacimiento/i, 'fa-gift'],
  [/origen|pa[ií]s/i, 'fa-earth-americas'], [/preferencia|orientaci/i, 'fa-heart']];
const info = (BOT.data || []).filter(([k]) => !isUpd(k));
if (info.length) $('#dat').innerHTML = info.map(([k, v, c]) =>
  `<div class="d"><span class="di"><i class="fas ${esc(c || (ICO.find(([r]) => r.test(k)) || [0, 'fa-star'])[1])}" aria-hidden="true"></i></span><div><em>${esc(k)}</em><b>${fmt(v)}</b></div></div>`).join('');
else $('#dat').remove();

/* frase / sinopsis */
const paras = list(BOT.desc).concat(list(BOT.role));
$('#desc').innerHTML =
  (BOT.quote ? `<p class="q">${fmt(BOT.quote)}</p>` : '') +
  paras.map(p => `<p>${fmt(p)}</p>`).join('');

/* novedades junto a la foto */
const upd = (BOT.data || []).find(([k]) => isUpd(k));
$('#ver').innerHTML =
  [...(BOT.side || []), ...(upd ? [upd] : [])].map(([k, v]) => `<p><b>${fmt(k)}</b> <span>${fmt(v)}</span></p>`).join('') +
  (BOT.inspired ? `<p class="mark"><span>Bot inspirado en ${fmt(BOT.inspired)}.</span></p>` : '');

/* rating: de 0 a 5 (acepta medios), barritas de colores distintos y el emoji se mueve.
   Si pones números de 0 a 100 también funcionan (100 = 5). */
const PAL = [['#c4b5fd', '#7c5cf0'], ['#ff9bb5', '#e0346c'], ['#ff8a80', '#d62828'], ['#ffc078', '#f76707'],
             ['#9bf0ff', '#1c9ee0'], ['#ffc2e0', '#f0629a'], ['#c0f0a0', '#37b24d'], ['#ffe58a', '#e8a323']];
const RT = BOT.rating || [];
if (RT.length) {
  $('#rating').innerHTML = RT.map(([i, n, v], k) => {
    const x = Number(v) || 0, s = Math.max(0, Math.min(5, Math.round((x > 5 ? x / 20 : x) * 2) / 2)), [c1, c2] = PAL[k % PAL.length];
    const bars = [0, 1, 2, 3, 4].map(j => {
      const f = Math.max(0, Math.min(1, s - j));
      return `<i${f > 0 && f < 1 ? ' class="h"' : ''} style="--f:${f * 100}%;--d:${(.5 + (k * 5 + j) * .05).toFixed(2)}s"></i>`;
    }).join('');
    return `<div class="r a${k % 6}" style="--c1:${c1};--c2:${c2};--k:${k}" title="${esc(n)} ${s}/5">` +
      `<div class="rn"><span class="ri" aria-hidden="true">${i}</span><b>${esc(n)}</b><em><i class="fas fa-star" aria-hidden="true"></i> ${s}/5</em></div>` +
      `<div class="bars" role="img" aria-label="${esc(n)}: ${s} de 5">${bars}</div></div>`;
  }).join('');
} else { $('#rating').remove(); $('.rt').remove(); }

/* enlaces y etiquetas */
$('#plats').innerHTML = (BOT.plats || []).map(([n, i, u]) =>
  `<a class="pl" href="${esc(u)}" target="_blank" rel="noopener"><i class="fas ${esc(i)}"></i><span>${esc(n)}</span></a>`).join('');
$('#tags').innerHTML = (BOT.tags || []).map(t => `<span>${esc(t)}</span>`).join('');
if (!(BOT.tags || []).length) $('#tags').remove();

/* ---------- calendario de adviento (usa BOTS_LIST de tu bots.js) ---------- */
const BL = (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) ? BOTS_LIST : [];
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const sinBot = b => !b || !b.url || !b.imagen || /ejemplo|your_|pr[oó]ximamente/i.test(b.nombre + b.imagen);   // sin foto o sin información
const regalo = '<svg class="g" aria-hidden="true"><use href="#gift"/></svg>';
const strip = $('#strip');

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

/* estrellitas del fondo */
$('#sky').innerHTML = Array.from({ length: 18 }, () =>
  `<i class="sp" style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;font-size:${10 + Math.random() * 16}px;animation-delay:-${Math.random() * 3}s">✦</i>`).join('');

/* ---------- reproductor + letra ---------- */
const au = $('#au'), S = BOT.songs || [], W = $('.win'), cv = $('#dimg'), LB = $('#lall');
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
  $('#sa').textContent = s.artist;
  setCover(s.cover);
  LB.innerHTML = L.length
    ? L.map(l => l.line ? `<p>${esc(l.line)}</p>` : '<p class="gap"></p>').join('')
    : '<p class="soon">La letra aparecerá aquí ♪</p>';
  LB.scrollTop = 0; li = -1;
  $('#lyr').hidden = !L.length;     // sin letra no ocupa espacio
  $('#fill').style.width = '0'; $('#cur').textContent = '0:00'; $('#dur').textContent = '0:00';
  $('#trk').setAttribute('aria-valuenow', 0);
}
const go = d => { load(si + d); au.play().catch(() => {}); };

if (S.length) {
  $('#pp').onclick = () => au.paused ? au.play().catch(() => {}) : au.pause();
  $('#prev').onclick = () => go(-1);      // con una sola canción, vuelve a empezarla
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
    /* letra con tiempos: ilumina la línea que suena y la centra dentro de su caja */
    let k = -1;
    ly().forEach((l, j) => { if (l.time != null && au.currentTime >= l.time) k = j; });
    if (k !== li) {
      li = k;
      [...LB.children].forEach((p, j) => p.classList.toggle('on', j === k));
      const p = LB.children[k];
      if (p) LB.scrollTo({ top: p.offsetTop - LB.clientHeight / 2 + p.offsetHeight / 2, behavior: 'smooth' });
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

/* ---------- ventanas emergentes: bienvenida y regalo ---------- */
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

/* amigos creadores: se arma con AMIGOS y se abre con el botón morado */
$('#ft').textContent = AMIGOS.titulo; $('#fs').textContent = AMIGOS.texto;
$('#fh').textContent = AMIGOS.gracias; $('#fm').textContent = AMIGOS.mensaje;
$('#fl').innerHTML = (AMIGOS.lista || []).map(([n, r, f, u]) => {
  const t = u ? 'a' : 'div';
  return `<${t} class="fc"${u ? ` href="${esc(u)}" target="_blank" rel="noopener" aria-label="Visitar a ${esc(n)}"` : ''}>` +
    `<span class="av"><b aria-hidden="true">${esc(String(n).charAt(0).toUpperCase())}</b>${f ? `<img src="${esc(f)}" alt="" onerror="this.remove()">` : ''}</span>` +
    `<strong>${esc(n)}</strong><small>${esc(r)}</small></${t}>`;
}).join('');
$('#fb').onclick = () => open('#m-fr');

/* bienvenida (cartita): se arma con BIENVENIDA */
const BV = BIENVENIDA;
$('#wbody').innerHTML =
  `<div class="orn" aria-hidden="true">❄ ♡ ❄</div><h3 class="hello">${esc(BV.saludo)}</h3><p class="intro">${fmt(BV.intro)}</p>` +
  `<section class="pres"><div class="ptb"><span aria-hidden="true"><i class="fas fa-xmark"></i><i class="fas fa-rotate"></i><i class="fas fa-calendar-days"></i></span><b>${esc(BV.nombre)} ✧</b></div>` +
  `<figure class="pf"><span aria-hidden="true">♡</span>${BV.foto ? `<img src="${esc(BV.foto)}" alt="${esc(BV.nombre)}" onerror="this.remove()">` : ''}</figure>` +
  `<h2 class="alias">${esc(BV.alias)}</h2><div class="ptags">${list(BV.tags).map(t => `<span>${esc(t)}</span>`).join('')}</div></section>` +
  `<section class="why"><h4><i class="fas fa-heart" aria-hidden="true"></i>${esc(BV.porque)}</h4><p>${fmt(BV.mensaje)}</p></section>` +
  `<div class="sn"><section><h4>(ˊ▽ˋ)! sí</h4><p>${esc(BV.si)}</p></section><section class="no"><h4>(;ˊ∀ˋ) no</h4><p>${esc(BV.no)}</p></section></div>` +
  `<p class="intro cierre">${fmt(BV.cierre)}</p><p class="sign">con mucho amor,<br><span>${esc(BV.nombre)}</span> ♡</p>`;

/* ---------- ajuste a la pantalla ----------
   En vertical (celular, o "sitio de escritorio" en el celular) todo el diseño crece o se achica
   para llenar la pantalla sin tener que bajar. Cambia FIT.min / FIT.max si quieres la letra más chica o más grande. */
const FIT = { min: 11.5, max: 21, maxCel: 17 };
function fit() {
  const w = $('.win'), b = getComputedStyle(document.body);
  w.style.fontSize = ''; w.style.minHeight = '0';
  if (innerWidth > innerHeight) { w.style.minHeight = ''; return; }          // horizontal: tamaño normal
  const room = innerHeight - parseFloat(b.paddingTop) - parseFloat(b.paddingBottom), top = innerWidth < 760 ? FIT.maxCel : FIT.max;
  let f = parseFloat(getComputedStyle(w).fontSize);
  for (let n = 0; n < 6; n++) {
    const g = Math.min(top, Math.max(FIT.min, f * room / w.offsetHeight));
    if (Math.abs(g - f) < .15) break;
    w.style.fontSize = (f = g) + 'px';
  }
  w.style.minHeight = room + 'px';
}
let ft;
const refit = () => { clearTimeout(ft); ft = setTimeout(fit, 120); };
addEventListener('resize', refit); addEventListener('orientationchange', refit); addEventListener('load', fit);
if (document.fonts) document.fonts.ready.then(fit);
fit();
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
