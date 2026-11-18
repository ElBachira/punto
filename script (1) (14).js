/* ============================================================
   1) TUS PNGs: pega el link (o ruta) entre las comillas.
   Si dejas '' ese adorno simplemente no aparece.
   ============================================================ */
const IMG = {
  gatitoArbol:  '',  // gatito con árbol de navidad
  gatitoSanta:  '',  // gatito Santa
  gatitoMuneco: '',  // gatito muñeco de nieve
  arbolito:     '',  // arbolito
  baston:       '',  // bastón de caramelo
  muerdago:     '',  // muérdago rojo
  regalos:      '',  // regalos de navidad
  santa:        '',  // Santa
  retrato:      ''   // imagen principal del bot
};

/* 2) LINKS de las plataformas del bot */
const LINKS = { sillytavern: '#', janitor: '#', caveduck: '#', dokichat: '#' };

/* 3) CANCIÓN: src = link del mp3. lyrics = [segundo, 'línea'] */
const SONG = {
  src: '', title: 'Título de la canción', artist: 'Artista',
  lyrics: [[0, '♪'], [8, 'Primera línea de la letra'], [16, 'Segunda línea de la letra'], [24, 'Tercera línea de la letra']]
};

/* 4) LOS 24 BOTS del calendario */
const BOTS = Array.from({ length: 24 }, (_, i) => ({
  name: 'Bot del día ' + (i + 1),
  text: 'Aquí va una frase corta sobre la trama de este bot.',
  link: '#'
}));
// Ejemplo para editar uno: BOTS[0] = {name:'Felipe', text:'Amor prohibido...', link:'https://...'};

/* ------------------------------------------------------------ */
const $ = s => document.querySelector(s);
const show = el => el.classList.remove('hidden');
const hide = el => el.classList.add('hidden');

document.querySelectorAll('[data-img]').forEach(el => {
  const src = IMG[el.dataset.img];
  if (src) { el.src = src; el.onerror = () => el.remove(); } else el.remove();
});
document.querySelectorAll('[data-link]').forEach(a => a.href = LINKS[a.dataset.link] || '#');

// Luces, esferas colgantes y nieve
const colors = ['#ff4d6d', '#ffd166', '#5ee08f', '#5ec8ff', '#c77dff'];
for (let i = 0; i < 24; i++) {
  const b = document.createElement('b');
  b.style.color = colors[i % 5]; b.style.animationDelay = (i % 5) * .3 + 's';
  b.style.marginTop = (i % 2 ? 22 : 14) + 'px';
  $('#lights').appendChild(b);
}
const snow = $('#snow');
for (let i = 0; i < 38; i++) {
  const f = document.createElement('i');
  f.textContent = ['❄', '❅', '✦', '•'][i % 4];
  f.style.left = Math.random() * 100 + '%';
  f.style.fontSize = 10 + Math.random() * 16 + 'px';
  f.style.animationDuration = 7 + Math.random() * 9 + 's';
  f.style.animationDelay = -Math.random() * 12 + 's';
  f.style.opacity = .5 + Math.random() * .5;
  snow.appendChild(f);
}

// Tarjeta -> New Bot -> sitio
$('#open-card').onclick = () => {
  $('#card-intro').classList.add('out');
  setTimeout(() => $('#card-intro').remove(), 800);
  show($('#newbot'));
  setTimeout(() => $('#newbot').remove(), 3500);
  setTimeout(() => show($('#welcome')), 3500);
};
$('#home-btn').onclick = () => show($('#welcome'));
document.querySelectorAll('.close').forEach(b => b.onclick = () => hide(b.closest('.full')));

// Rating
setTimeout(() => document.querySelectorAll('.rating div').forEach(d => d.querySelector('u').style.width = d.dataset.v + '%'), 600);

// Puertitas
BOTS.forEach((bot, i) => {
  const d = document.createElement('button');
  d.className = 'door'; d.innerHTML = '<span>' + (i + 1) + '</span>';
  d.setAttribute('aria-label', 'Abrir día ' + (i + 1));
  d.onclick = () => {
    d.classList.add('open');
    $('#m-name').textContent = '🎁 Día ' + (i + 1) + ': ' + bot.name;
    $('#m-text').textContent = bot.text; $('#m-link').href = bot.link;
    show($('#modal'));
  };
  $('#doors').appendChild(d);
});

// Reproductor + letra
const audio = $('#audio'), playBtn = $('#play'), lyr = $('#lyrics');
$('#s-title').textContent = SONG.title; $('#s-artist').textContent = SONG.artist;
if (SONG.src) audio.src = SONG.src;
lyr.innerHTML = SONG.lyrics.map(l => '<p>' + l[1] + '</p>').join('');
const fmt = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
playBtn.onclick = () => {
  if (!SONG.src) return;
  if (audio.paused) audio.play().catch(() => {}); else audio.pause();
};
audio.onplay = audio.onpause = () => {
  playBtn.innerHTML = '<i class="fas fa-' + (audio.paused ? 'play' : 'pause') + '"></i>';
  $('.player').classList.toggle('on', !audio.paused);
};
audio.onloadedmetadata = () => $('#dur').textContent = fmt(audio.duration);
audio.ontimeupdate = () => {
  $('#cur').textContent = fmt(audio.currentTime);
  $('#fill').style.width = (audio.currentTime / audio.duration * 100 || 0) + '%';
  let idx = 0; SONG.lyrics.forEach((l, i) => { if (audio.currentTime >= l[0]) idx = i; });
  lyr.querySelectorAll('p').forEach((p, i) => p.classList.toggle('on', i === idx));
  const on = lyr.querySelector('.on'); if (on && !lyr.classList.contains('hidden')) lyr.scrollTop = on.offsetTop - 80;
};
$('#track').onclick = e => { if (audio.duration) audio.currentTime = e.offsetX / e.currentTarget.clientWidth * audio.duration; };
$('#lyr-btn').onclick = () => lyr.classList.toggle('hidden');
