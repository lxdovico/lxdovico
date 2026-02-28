const samples = [
  new Audio("sample1.mp3"),
  new Audio("sample2.mp3"),
  new Audio("sample3.mp3"),
  new Audio("sample4.mp3"),
  new Audio("sample5.mp3")
];

const extraSounds = [
  new Audio("kicks.mp3"),
  new Audio("bass.mp3"),
  new Audio("boh.mp3"),
  new Audio("hat.mp3"),
  new Audio("shaker.mp3"),
  new Audio("telephone.mp3")
];

const fluteOverlay = document.getElementById("fluteOverlay");
const instruction = document.getElementById("instruction");
const video = document.getElementById("cornerVideo");

let reverse = false;

/* CLICK */
document.addEventListener("click", function(e) {

  if (e.target.tagName === "A") {
    const random = Math.floor(Math.random() * extraSounds.length);
    extraSounds[random].play();
    return;
  }

  if (e.target === fluteOverlay) {
    const random = Math.floor(Math.random() * samples.length);
    samples[random].play();
  } else {
    const random = Math.floor(Math.random() * extraSounds.length);
    extraSounds[random].play();
  }

  glow();
});

/* GLOW */
function glow() {
  fluteOverlay.classList.add("active");
  setTimeout(() => {
    fluteOverlay.classList.remove("active");
  }, 180);
}

/* TASTIERA */
document.addEventListener("keydown", function(e) {
  const key = e.key.toLowerCase();
  instruction.style.opacity = "0";

  if (key === "a") samples[0].play();
  if (key === "s") samples[1].play();
  if (key === "d") samples[2].play();
  if (key === "f") samples[3].play();
  if (key === "g") samples[4].play();

  if (["a","s","d","f","g"].includes(key)) {
    glow();
  }

  if (["1","2","3","4","5","6"].includes(key)) {
    const random = Math.floor(Math.random() * extraSounds.length);
    extraSounds[random].play();
    glow();
  }
});

/* VIDEO LOOP FORWARD → REVERSE */
video.src = "ludo.mov";
video.loop = false;

video.addEventListener("timeupdate", () => {
  if (!reverse && video.currentTime >= 10) {
    video.currentTime = 10;
    reverse = true;
  } else if (reverse && video.currentTime <= 0) {
    reverse = false;
  }
});

setInterval(() => {
  if (video.paused) {
    video.play();
  }

  if (reverse) {
    video.currentTime = Math.max(0, video.currentTime - 0.03);
  } else {
    video.currentTime = Math.min(10, video.currentTime + 0.03);
  }
}, 33);

/* START */
video.currentTime = 0;
video.play();

video.addEventListener("click", () => {
  document.body.classList.add("desaturate");

  setTimeout(() => {
    document.body.classList.remove("desaturate");
  }, 600);
});

document.getElementById("logo").addEventListener("click", () => {
  // suono o effetto qui
});