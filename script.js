// ---------- AUDIO SETUP ----------

const sounds = [
  new Audio("sample1.mp3"),
  new Audio("sample2.mp3"),
  new Audio("sample3.mp3"),
  new Audio("sample4.mp3")
];

const fluteImages = [
  "flute 1.png",
  "flute 2.png",
  "flute 3.png",
  "flute 4.png"
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

let lastDrum = -1;

function playRandomDrum(){

  let random;

  do{
    random = Math.floor(Math.random() * drums.length);
  }
  while(random === lastDrum);

  lastDrum = random;

  drums[random].currentTime = 0;
  drums[random].play();

}

// ---------- GLOW ----------

function glow(index) {
  if (!fluteOverlay) return;
  if (typeof index !== "undefined") {
    fluteOverlay.src = fluteImages[index];
  }
}

function activateFlute(index) {

  const flutes = document.querySelectorAll(".flute");

  flutes.forEach(f => f.classList.remove("active"));

  if (flutes[index]) {

    flutes[index].classList.add("active");

    setTimeout(() => {
      flutes[index].classList.remove("active");
    }, 180);

  }
}

// ---------- CLICK FLUTES (HOME) ----------

document.addEventListener("click", (e) => {

  if (e.target.id === "logo") return;

  // evita click su about overlay
  if (document.body.classList.contains("about-open")) return;

  if (instruction) instruction.style.opacity = "0";

  const screenWidth = window.innerWidth;
  const clickX = e.clientX;

  let index;

  if (clickX < screenWidth * 0.25) {
    index = 0;
  } else if (clickX < screenWidth * 0.5) {
    index = 1;
  } else if (clickX < screenWidth * 0.75) {
    index = 2;
  } else {
    index = 3;
  }

  if (sounds[index]) {
    sounds[index].currentTime = 0;
    sounds[index].play();
  }

  activateFlute(index);

});

// ---------- CLICK LOGO ----------

if (logo) {
  logo.addEventListener("click", () => {
    playRandomDrum();

    logo.classList.add("active");
    setTimeout(() => {
      logo.classList.remove("active");
    }, 180);
  });
}

// ---------- KEYBOARD ----------

document.addEventListener("keydown", (e) => {

  const key = e.key.toLowerCase();

  if (instruction) instruction.style.opacity = "0";

  // flute keys
if (key === "a") { sounds[0].currentTime = 0; sounds[0].play(); activateFlute(0); }
if (key === "s") { sounds[1].currentTime = 0; sounds[1].play(); activateFlute(1); }
if (key === "d") { sounds[2].currentTime = 0; sounds[2].play(); activateFlute(2); }
if (key === "f") { sounds[3].currentTime = 0; sounds[3].play(); activateFlute(3); }

  // drum keys
  if (key === "g" && logo) {
  playRandomSample();
  logo.classList.add("active");
  setTimeout(() => {
    logo.classList.remove("active");
  }, 180);
}
  if (["1","2","3","4","5","6"].includes(key)) {
  const index = parseInt(key) - 1;

  if (drums[index]) {
    drums[index].currentTime = 0;
    drums[index].play();
    glow();

    if (logo) {
      logo.classList.add("active");
      setTimeout(() => {
        logo.classList.remove("active");
      }, 180);
    }
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

  playRandomDrum();
  glow();

  hideEmail();   // reset email

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

document.querySelectorAll(".about-social a").forEach(link => {

  link.addEventListener("click", (e) => {
    e.preventDefault();
    playRandomDrum();   // suono drums
    glow();

    const href = link.getAttribute("href");
    if (href) window.open(href, "_blank");
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

  hideEmail();

  emailVisible = false;
  emailElement = null;

  document.body.classList.remove("about-open");
  document.getElementById("aboutOverlay").classList.remove("active");

});

// ---------- ABOUT RANDOM PNG ON CLICK ----------

const aboutOverlayElement = document.getElementById("aboutOverlay");
const aboutImages = [
  "object.png",
  "money.png",
  "santino.png",
  "octopus.png"
];
if (aboutOverlayElement) {

  aboutOverlayElement.addEventListener("click", (e) => {

  if (e.target.id === "homeLink") return;

  // CLICK SU PNG -> link social
  if (e.target.classList.contains("about-full-image")) {

    const img = e.target;
    const rect = img.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const pixel = ctx.getImageData(
      Math.floor(x * (img.naturalWidth / rect.width)),
      Math.floor(y * (img.naturalHeight / rect.height)),
      1,
      1
    ).data;

    const alpha = pixel[3];

    if (alpha > 0) {
      const link = img.dataset.link;
      if (link) window.open(link, "_blank");
    }

    return; // NON genera random image
  }

  // CLICK ALTRO -> random image
const randomImage = aboutImages[Math.floor(Math.random() * aboutImages.length)];

const image = document.createElement("img");
image.src = randomImage;
image.className = "about-floating-img";

// crea layer una sola volta
let layer = document.querySelector(".about-floating-layer");
if (!layer) {
  layer = document.createElement("div");
  layer.className = "about-floating-layer";
  document.body.appendChild(layer);
}

// posizione ESATTA del click
image.style.left = e.clientX + "px";
image.style.top = e.clientY + "px";

layer.appendChild(image);

// attiva animazione nel frame successivo (evita micro shift)
requestAnimationFrame(() => {
  image.classList.add("show");
});

// dissolvenza dopo 2.2 secondi
setTimeout(() => {
  image.classList.add("fade-out");

  setTimeout(() => {
    image.remove();
  }, 500);

}, 5000);
});

}

// CONTACT CLICK -> EMAIL

const contact = document.querySelector(".about-contact");

let emailVisible = false;
let emailElement = null;

/* funzione che chiude email */
function hideEmail(){

  if (!emailElement) return;

  emailElement.classList.remove("show");

  setTimeout(()=>{

    if (emailElement){
      emailElement.remove();
      emailElement = null;
    }

    emailVisible = false;

  },800);

}

if (contact){

  contact.addEventListener("click",(e)=>{

  playRandomDrum();

  e.stopPropagation();

    if (!emailVisible){

      emailElement = document.createElement("img");
      emailElement.src = "email.png";
      emailElement.className = "email-popup";

      document.body.appendChild(emailElement);

      requestAnimationFrame(()=>{
        emailElement.classList.add("show");
      });

      emailVisible = true;

    } else {

      hideEmail();

    }

  });

}

// PORTFOLIO SLIDESHOW (CROSSFADE LOOP)

const portfolio = document.querySelector(".about-portfolio");

let portfolioVisible = false;
let portfolioLayer = null;
let slides = [];
let portfolioInterval = null;

const portfolioImages = [
  "linecheck.jpg",
  "brighton.jpg",
  "overground.jpg",
  "tsloe.jpg"
];

let currentSlide = 0;

function hidePortfolio(){

  if (!portfolioLayer) return;

  clearInterval(portfolioInterval);

  portfolioLayer.remove();

  portfolioLayer = null;
  slides = [];
  portfolioVisible = false;
  currentSlide = 0;

}

function nextSlide(){

  const next = (currentSlide + 1) % portfolioImages.length;

  slides[next].classList.add("show");
  slides[currentSlide].classList.remove("show");

  currentSlide = next;

}

if (portfolio){

  portfolio.addEventListener("click",(e)=>{

    playRandomDrum();
    e.stopPropagation();

    if (!portfolioVisible){

      portfolioLayer = document.createElement("div");
      portfolioLayer.className = "portfolio-layer";

      document.body.appendChild(portfolioLayer);

      portfolioImages.forEach((src,i)=>{

        const img = document.createElement("img");
        img.src = src;
        img.className = "portfolio-slide";

        if(i===0) img.classList.add("show");

        portfolioLayer.appendChild(img);
        slides.push(img);

      });

      portfolioVisible = true;

      portfolioInterval = setInterval(nextSlide,2000);

    } else {

      hidePortfolio();

    }

  });

}

// LUDO VIDEO FORWARD / REVERSE LOOP

const ludoVideo = document.getElementById("ludoVideo");

if (ludoVideo){

  let reversed = false;

  function playForward(){
    reversed = false;
    ludoVideo.playbackRate = 1;
    ludoVideo.play();
  }

  function playReverse(){

    reversed = true;

    const reverseInterval = setInterval(()=>{

      if (ludoVideo.currentTime <= 0.05){
        clearInterval(reverseInterval);
        playForward();
      } else {
        ludoVideo.currentTime -= 0.03;
      }

    },30);

  }

  ludoVideo.addEventListener("ended", ()=>{
    playReverse();
  });

  playForward();

}

// CLICK OVUNQUE -> CHIUDI EMAIL

document.addEventListener("click", () => {

  if (emailVisible){
    hideEmail();
  }

  if (portfolioVisible){
    hidePortfolio();
  }

});