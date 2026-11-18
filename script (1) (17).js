/* =====================================================
   ✏️ CONFIGURACIÓN — AQUÍ PONES TUS LINKS Y DATOS
   ===================================================== */
const CONFIG = {
  // Fondo de la tarjeta de portada (tu 1ª imagen). Pon el link entre las comillas.
  introBg: "",            // 👈 LINK imagen portada "Calendario de Adviento"

  // PNGs decorativos (si dejas vacío se ve un emoji de relleno)
  imgs: {
    gatitoArbol:  "",     // 👈 LINK gatito con árbol de Navidad
    gatitoMuneco: "",     // 👈 LINK gatito muñeco de nieve
    regalos:      "",     // 👈 LINK regalos de Navidad
    baston:       "",     // 👈 LINK bastón de caramelo
    gatitoSanta:  "",     // 👈 LINK gatito Santa
    santa:        "",     // 👈 LINK Santa Claus
    arbolito:     "",     // 👈 LINK arbolito
    muerdago:     ""      // 👈 LINK muérdago rojo
  },

  bot: {
    nombre: "Felipe Moreno Gonzaga",
    img: "",              // 👈 LINK imagen del bot
    edad: "25 años", ocupacion: "Hacendado", altura: "1.85 m",
    version: "Versión 1.0", actualizacion: "17/11/2026",
    desc: "Hacendado de la California del siglo XIX. Su corazón guarda un sentimiento <em>profundo y prohibido</em> por la supuesta hermana que regresó del convento.<br><b>Tu rol:</b> eres esa hermana, la dueña de sus <em>desvelos</em> y su mayor tentación.",
    plataformas: [
      { n: "SillyTavern", u: "#" },   // 👈 links de cada plataforma
      { n: "Janitor",     u: "#" },
      { n: "Caveduck",     u: "#" },
      { n: "Dokichat",     u: "#" }
    ],
    rating: [ ["🎭","Drama",100], ["💔","Angst",80], ["🚩","Red Flags",0],
              ["🌶️","Spicy",40], ["✨","Fantasía",0], ["💕","Amor",100] ],
    tags: ["🕰️ Siglo XIX","👢 Hacendado","🔥 Amor prohibido","⛪ Drama"],
    cancion: { titulo: "Una lágrima que dar", artista: "Danny Elfman", src: "song.mp3",
      lyrics: [ // { t: segundo, l: "línea" }
        {t:0,l:"♪ Aquí van los lyrics ♪"}, {t:10,l:"Segunda línea…"}, {t:20,l:"Tercera línea…"} ] }
  },

  // Días 2 a 24: { nombre, img, url }. Lo que no pongas dice "Pronto ✨"
  bots: {
    2:  { nombre: "Bot día 2", img: "", url: "#" },
    3:  { nombre: "Bot día 3", img: "", url: "#" }
  }
};

/* ===================== CÓDIGO ===================== */
const $ = id => document.getElementById(id), B = CONFIG.bot;

// Escala para que todo quepa en una sola pantalla
function fit(){ const s = Math.min(innerWidth/1280, innerHeight/720);
  $('stage').style.transform = `translate(-50%,-50%) scale(${s})`; }
addEventListener('resize', fit); fit();

// Nieve
for (let i = 0; i < 45; i++){ const f = document.createElement('i');
  f.textContent = '❄'; f.style.left = Math.random()*1280+'px';
  f.style.fontSize = 8+Math.random()*14+'px';
  f.style.animationDuration = 6+Math.random()*9+'s'; f.style.animationDelay = -Math.random()*12+'s';
  $('snow').appendChild(f); }

// Luces y esferas
const cols = ['#ff4d4d','#ffd54a','#5bd68a','#59b8ff','#ff8ad8']; let L = '', pts = [];
for (let x = 0; x <= 1280; x += 40) pts.push([x, 16 + 9*Math.sin(x/70)]);
L += `<path d="M${pts.map(p => p.join(',')).join(' L')}" stroke="#143d2a" stroke-width="3" fill="none"/>`;
pts.forEach((p,i) => L += `<g class="bulb" style="animation-delay:${-i*.3}s"><rect x="${p[0]-3}" y="${p[1]}" width="6" height="6" fill="#444"/><ellipse cx="${p[0]}" cy="${p[1]+15}" rx="7" ry="10" fill="${cols[i%5]}" stroke="#fff" stroke-width="1.5"/></g>`);
$('lights').innerHTML = `<svg width="1280" height="60">${L}</svg>`;
[[150,'#e03a3a'],[420,'#f0b429'],[700,'#3aa0e0'],[960,'#e03a3a'],[1130,'#5bd68a']].forEach(([x,c],i) => {
  const b = document.createElement('div'); b.className = 'bauble'; b.style.cssText = `left:${x}px;top:2px;width:30px;height:${44+i%2*10}px;animation-delay:${-i}s`;
  b.innerHTML = `<div style="width:2px;height:${14+i%2*10}px;background:#ffd54a;margin:0 auto"></div><div style="width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff,${c} 45%,#0006);border:1px solid #fff"></div>`;
  $('lights').appendChild(b); b.style.pointerEvents = 'none'; $('lights').appendChild(b); });

// Decoraciones PNG (izquierda / derecha)
[['gatitoArbol','🐱',-8,80],['gatitoMuneco','⛄',-8,200],['regalos','🎁',-8,330],['baston','🍭',-8,460],
 ['gatitoSanta','🎅',1212,80],['santa','🎅',1212,200],['arbolito','🎄',1212,330],['muerdago','🌿',1212,460]].forEach(([k,e,x,y],i) => {
  const d = document.createElement('div'); d.className = 'deco';
  d.style.cssText = `left:${x}px;top:${y}px;width:78px;height:78px;animation-delay:${-i*.5}s`;
  d.innerHTML = CONFIG.imgs[k] ? `<img src="${CONFIG.imgs[k]}" alt="${k}">` : `<span>${e}</span>`;
  $('decos').appendChild(d); });

// Ficha del bot
if (B.img) $('botImg').src = B.img; else $('botImg').style.background = 'linear-gradient(#ffe6d0,#f7b5a0)';
$('nm').textContent = B.nombre;
$('chips').innerHTML = `<span><b>Edad:</b> ${B.edad}</span><span><b>Ocupación:</b> ${B.ocupacion}</span><span><b>Altura:</b> ${B.altura}</span>`;
$('desc').innerHTML = B.desc;
$('upd').innerHTML = `${B.version}<br>Última actualización<br><b>${B.actualizacion}</b>`;
$('plats').innerHTML = B.plataformas.map(p => `<a href="${p.u}" target="_blank">${p.n}</a>`).join('');
$('rating').innerHTML = B.rating.map(r => `<div class="rt">${r[0]} ${r[1]} ${r[2]}%<div class="b"><i data-w="${r[2]}"></i></div></div>`).join('');
setTimeout(() => document.querySelectorAll('.b i').forEach(i => i.style.width = i.dataset.w + '%'), 600);
$('tags').innerHTML = B.tags.map(t => `<span>${t}</span>`).join('');

// Calendario 1–24
const grads = [['#d94536','#8e1f14'],['#2e9a63','#0f5535'],['#f0b429','#b87a00']];
for (let n = 1; n <= 24; n++){
  const g = grads[n % 3], bot = n === 1 ? { nombre: B.nombre.split(' ')[0], img: B.img, url: '#' } : CONFIG.bots[n];
  const d = document.createElement('div'); d.className = 'door' + (n === 1 ? ' cur open' : '');
  d.style.setProperty('--c1', g[0]); d.style.setProperty('--c2', g[1]);
  d.innerHTML = `<div class="f">${n}<small>❄</small></div><div class="bk">${bot ? (bot.img ? `<img src="${bot.img}" alt="">` : '') + `<span>${bot.nombre}</span>` : '<span>Pronto ✨</span>'}</div>`;
  d.onclick = () => { d.classList.toggle('open'); if (bot && bot.url && bot.url !== '#' && n !== 1 && d.classList.contains('open')) setTimeout(() => open(bot.url, '_blank'), 700); };
  $('doors').appendChild(d); }

// Reproductor
const a = $('aud'), S = B.cancion, fmt = s => Math.floor(s/60) + ':' + String(Math.floor(s%60)).padStart(2,'0');
a.src = S.src; $('sT').textContent = S.titulo; $('sA').textContent = S.artista;
$('lyrics').innerHTML = S.lyrics.map(l => `<p>${l.l}</p>`).join('');
$('play').onclick = () => a.paused ? a.play().catch(() => {}) : a.pause();
a.onplay = () => { $('play').innerHTML = '<i class="fas fa-pause"></i>'; $('disc').classList.add('spin'); };
a.onpause = () => { $('play').innerHTML = '<i class="fas fa-play"></i>'; $('disc').classList.remove('spin'); };
a.onloadedmetadata = () => $('dur').textContent = fmt(a.duration);
a.ontimeupdate = () => { $('cur').textContent = fmt(a.currentTime); $('fill').style.width = a.currentTime/a.duration*100 + '%';
  let k = -1; S.lyrics.forEach((l,i) => { if (a.currentTime >= l.t) k = i; });
  [...$('lyrics').children].forEach((p,i) => p.classList.toggle('on', i === k));
  const on = $('lyrics').children[k]; if (on) $('lyrics').scrollTop = on.offsetTop - 40; };
$('track').onclick = e => { const r = $('track').getBoundingClientRect(); a.currentTime = (e.clientX - r.left)/r.width*a.duration || 0; };
$('lyBtn').onclick = () => { const s = $('lyrics').classList.toggle('show'); $('lyBtn').innerHTML = s ? '<i class="fas fa-xmark"></i> Ocultar lyrics' : '<i class="fas fa-music"></i> Ver lyrics'; };

// Overlays
if (CONFIG.introBg) $('introCard').style.setProperty('--introbg', `url(${CONFIG.introBg})`);
$('intro').classList.add('show');
$('homeBtn').onclick = () => $('welcome').classList.add('show');
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => $(b.dataset.close).classList.remove('show'));
$('welcome').onclick = e => { if (e.target.id === 'welcome') $('welcome').classList.remove('show'); };
$('enter').onclick = () => {
  $('introCard').classList.add('out');
  setTimeout(() => { $('intro').classList.remove('show'); $('newbot').classList.add('show');
    const t = setTimeout(() => $('newbot').classList.remove('show'), 4500);
    $('newbot').onclick = () => { clearTimeout(t); $('newbot').classList.remove('show'); }; }, 750); };
