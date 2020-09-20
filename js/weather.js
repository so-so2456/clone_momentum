const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEYS = "c9bd910b05c06741e62910681de8b874";


function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
    ).then(function(data) {
     return data.json();
    }).then(function(json) {
     const temperature = Math.ceil(json.main.temp);
     const place = json.name;
     weather.innerText = `${temperature}℃ AT ${place}`;
    });
}

function saveCoords(coords) {
  localStorage.setItem(COORDS, JSON.stringify(coords));
}

function getFailure() {
  console.log("failed getting your coords");
}

function getSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const userCoordsObj = {
    latitude,
    longitude
  };
  saveCoords(userCoordsObj);
  getWeather(latitude, longitude);
}

function getCoords() {
  navigator.geolocation.getCurrentPosition(getSucess, getFailure);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    getCoords();
  } else {
    const userCoords = JSON.parse(loadedCoords);
    getWeather(userCoords.latitude, userCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
