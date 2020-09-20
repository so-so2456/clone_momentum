const body = document.querySelector("body");

const IMAGE_NUM = 3;

function loadImage(num) {
  const image = new Image();
  image.src = `images/${num + 1}.jpg`;
  image.classList.add("background")
  body.appendChild(image);
}

function genNumber() {
  number = Math.floor(Math.random() * IMAGE_NUM);
  return number;
}

function init() {
  const randomNum = genNumber();
  loadImage(randomNum);
}

init();
