const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const openBtn = document.getElementById("openBtn");

// Browsers may block sound autoplay. We try immediately,
// then start on the first tap/click if the browser requires interaction.
audio.volume = 0.42;
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  audio.play().then(() => {
    musicStarted = true;
    musicBtn.textContent = "♫";
  }).catch(() => {});
}

startMusic();
document.addEventListener("pointerdown", startMusic, {once:true});
openBtn.addEventListener("click", () => {
  startMusic();
  document.querySelector(".intro").scrollIntoView({behavior:"smooth"});
});

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    musicBtn.textContent = "♫";
  } else {
    audio.pause();
    musicBtn.textContent = "🔇";
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, {threshold:0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const hearts = document.querySelector(".hearts");
function makeHeart(){
  const h=document.createElement("span");
  h.className="floating-heart";
  h.textContent=Math.random()>.35?"♥":"♡";
  h.style.left=(Math.random()*100)+"vw";
  h.style.fontSize=(10+Math.random()*18)+"px";
  h.style.animationDuration=(7+Math.random()*8)+"s";
  h.style.animationDelay=(Math.random()*2)+"s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),17000);
}
setInterval(makeHeart,900);
for(let i=0;i<6;i++) setTimeout(makeHeart,i*400);
