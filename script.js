// ---------- AUDIO SETUP ----------

const sounds = [
  new Audio("sample1.mp3"),
  new Audio("sample2.mp3"),
  new Audio("sample3.mp3"),
  new Audio("sample4.mp3")
];

const drums = [
  new Audio("kicks.mp3"),
  new Audio("bass.mp3"),
  new Audio("boh.mp3"),
  new Audio("hat.mp3"),
  new Audio("shaker.mp3"),
  new Audio("telephone.mp3")
];

// preload
[...sounds, ...drums].forEach(s => {
  s.preload = "auto";
  s.volume = 1;
});

// ---------- ELEMENTS ----------

const fluteOverlay =
  document.getElementById("fluteOverlay") ||
  document.getElementById("aboutFlute");

const logo = document.getElementById("logo");
const instruction = document.getElementById("instruction");

// ---------- RANDOM FUNCTIONS ----------

function playRandomSample() {
  const random = Math.floor(Math.random() * sounds.length);
  sounds[random].currentTime = 0;
  sounds[random].play();
}

function playRandomDrum() {
  const random = Math.floor(Math.random() * drums.length);
  drums[random].currentTime = 0;
  drums[random].play();
}

// ---------- GLOW ----------

function glow() {
  if (!fluteOverlay) return;

  fluteOverlay.classList.add("active");

  setTimeout(() => {
    fluteOverlay.classList.remove("active");
  }, 150);
}

// ---------- CLICK FLUTE ----------

if (fluteOverlay) {
  fluteOverlay.addEventListener("click", () => {

    if (instruction) instruction.style.opacity = "0";

    playRandomSample();
    glow();
  });
}

// ---------- CLICK LOGO ----------

if (logo) {
  logo.addEventListener("click", () => {

    playRandomDrum();
    glow();
  });
}

// ---------- KEYBOARD ----------

document.addEventListener("keydown", (e) => {

  const key = e.key.toLowerCase();

  if (instruction) instruction.style.opacity = "0";

  // flute keys
  if (key === "a") { sounds[0].currentTime = 0; sounds[0].play(); glow(); }
  if (key === "s") { sounds[1].currentTime = 0; sounds[1].play(); glow(); }
  if (key === "d") { sounds[2].currentTime = 0; sounds[2].play(); glow(); }
  if (key === "f") { sounds[3].currentTime = 0; sounds[3].play(); glow(); }

  // drum keys
  if (["1","2","3","4","5","6"].includes(key)) {
    const index = parseInt(key) - 1;

    if (drums[index]) {
      drums[index].currentTime = 0;
      drums[index].play();
      glow();
    }
  }
});

// ---------- SOCIAL + ABOUT LINKS SOUND ----------

document.querySelectorAll(".social-support a").forEach(link => {

  link.addEventListener("click", (e) => {

    const text = link.textContent.trim().toLowerCase();

    // ABOUT
if (text === "about") {
  e.preventDefault();

  playRandomSample();
  glow();

  document.body.classList.add("about-open");
  document.getElementById("aboutOverlay").classList.add("active");
}
    // SOCIAL LINKS
    else {
      playRandomDrum();
      glow();
    }
  });

});

const aboutLogo = document.getElementById("aboutLogo");
const aboutOverlay = document.getElementById("aboutOverlay");

if (aboutLogo) {
  aboutLogo.addEventListener("click", () => {

    playRandomSample();

    document.body.classList.remove("about-open");
    aboutOverlay.classList.remove("active");
  });
}

const homeLink = document.getElementById("homeLink");

homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.remove("about-open");
  document.getElementById("aboutOverlay").classList.remove("active");
});