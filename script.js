/* ═══════ EDITA AQUÍ ═══════ */

// PNGs decorativos: pega el link de cada uno entre las comillas ("" = usa un emoji mientras tanto)
const PNGS = {
  gatitoArbol:  "",  // gatito con árbol de Navidad
  gatitoSanta:  "",  // gatito Santa
  gatitoMuneco: "",  // gatito muñeco de nieve
  arbolito:     "",  // arbolito
  baston:       "",  // bastón de caramelo
  muerdago:     "",  // muérdago rojo
  regalos:      "",  // regalos de Navidad
  santa:        ""   // Santa
};
// Dónde va cada PNG (en las orillas de la ventana) + emoji de relleno
const POS = {
  muerdago:     ["🌿", "left:.4vw;top:1vh"],
  arbolito:     ["🎄", "left:0;top:14vh"],
  gatitoSanta:  ["🐱", "left:0;top:40vh"],
  regalos:      ["🎁", "left:0;bottom:6vh"],
  santa:        ["🎅", "right:0;top:9vh"],
  gatitoMuneco: ["⛄", "right:0;top:36vh"],
  baston:       ["🍬", "right:0;top:58vh"],
  gatitoArbol:  ["🎄", "right:0;bottom:5vh"]
};

// Imagen del bot (retrato) y canción
const BOT_IMG = "";                       // link de la imagen del bot
const SONG = { title: "Una lágrima que dar", artist: "Danny Elfman",
  src: "",                                // link del audio (mp3)
  lyrics: "Pega aquí la letra de la canción.\nUna línea por renglón." };

// Rating (0-100)
const RATING = [["🎭","Drama",100],["💔","Angst",80],["🚩","Red Flags",0],["🌶️","Spicy",40],["✨","Fantasía",0],["💕","Amor",100]];

// Calendario: puerta 1 al 24. n = nombre, u = link, i = imagen (opcional)
const BOTS = [{n:"Felipe", u:"", i:""}];
for (let k = 2; k <= 24; k++) BOTS.push({ n: "Próximamente", u: "", i: "" });

/* ═══════ LÓGICA ═══════ */
const $ = id => document.getElementById(id);

// Nieve
for (let k = 0; k < 40; k++) {
  const s = document.createElement("span");
  s.className = "sf"; s.textContent = k % 3 ? "❄" : "✦";
  s.style.cssText = `left:${Math.random()*100}vw;font-size:${8+Math.random()*14}px;animation-duration:${7+Math.random()*9}s;animation-delay:-${Math.random()*14}s`;
  $("snow").appendChild(s);
}
// Lucecitas
$("lights").innerHTML = "<i></i>".repeat(44);

// Portada → New Bot → sitio
$("open").onclick = () => {
  $("card").classList.add("hide"); $("newbot").classList.remove("hide");
  setTimeout(() => { $("newbot").classList.add("hide"); $("site").classList.remove("hide"); }, 2600);
};
$("newbot").onclick = () => { $("newbot").classList.add("hide"); $("site").classList.remove("hide"); };

// Bienvenida
$("home").onclick = () => $("welcome").classList.remove("hide");
$("wx").onclick = () => $("welcome").classList.add("hide");

// Imagen, rating, stickers
if (BOT_IMG) $("botimg").src = BOT_IMG;
$("rating").innerHTML = RATING.map(([e,n,v]) => `<div class="rt"><b>${e} ${n}</b><em>${v}%</em><i style="--v:${v}%"></i></div>`).join("");
$("stk").innerHTML = Object.entries(POS).map(([k,[emo,css]]) =>
  PNGS[k] ? `<img src="${PNGS[k]}" alt="" style="${css}">` : `<span style="${css}">${emo}</span>`).join("");

// Calendario
$("cal").innerHTML = BOTS.map((b, k) => {
  const bg = b.i ? `style="background-image:url('${b.i}')"` : "";
  return `<a class="d" ${b.u ? `href="${b.u}" target="_blank"` : ""} ${bg}><b>${k+1}</b><small>${b.n}</small></a>`;
}).join("");

// Reproductor
const au = $("au"); $("st").textContent = SONG.title; $("sa").textContent = SONG.artist; $("lt").textContent = SONG.lyrics;
if (SONG.src) au.src = SONG.src;
const fmt = t => `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`;
$("pp").onclick = () => {
  if (!SONG.src) return alert("Agrega el link del audio en SONG.src (script.js)");
  au.paused ? au.play() : au.pause();
};
au.onplay = () => { $("pp").textContent = "❚❚"; document.querySelector(".player").classList.add("playing"); };
au.onpause = () => { $("pp").textContent = "▶"; document.querySelector(".player").classList.remove("playing"); };
au.ontimeupdate = () => { $("fl").style.width = (au.currentTime / au.duration * 100 || 0) + "%"; $("cu").textContent = fmt(au.currentTime); };
$("trk").onclick = e => { if (au.duration) au.currentTime = e.offsetX / e.currentTarget.clientWidth * au.duration; };
$("lb").onclick = () => $("lyr").classList.remove("hide");
$("lx").onclick = () => $("lyr").classList.add("hide");
