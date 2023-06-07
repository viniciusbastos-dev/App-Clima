// API OpenWeatherMap
const CHAVE_API = "23152605cb2a145350eca4480117919a";
// Relogio
const horas = document.querySelector("#horas");
const minutos = document.querySelector("#minutos");
const segundos = document.querySelector("#segundos");
// Data
const dia = document.querySelector("#dia");
const mes = document.querySelector("#mes");
const ano = document.querySelector("#ano");

const inputCidade = document.querySelector(".input-texto");
const background = document.querySelector("body");
const displayTemp = document.querySelector("#cidade-icone");
// Latitude e Longitude
var lat;
var lon;

var city;
var temp;
var iconCode;

function mostraClima(cidade) {
  if (cidade) {
    // Requisição da API de clima pelo nome da cidade
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${CHAVE_API}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        city = data.name;
        temp = Math.round(data.main.temp);
        iconCode = data.weather[0].icon;

        alteraElementos(city, temp, iconCode);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (navigator.geolocation) {
    // Obtém a localização geográfica se a cidade não foi fornecida
    obterLocalizacao()
      .then((position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        // Requisição da API de clima pelas coordenadas geográficas
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CHAVE_API}&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            city = data.name;
            temperature = Math.round(data.main.temp);
            iconCode = data.weather[0].icon;

            alteraElementos(city, temperature, iconCode);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function alteraElementos(nomeCidade, tempCidade, iconeClima) {
  document.getElementById("temperatura").textContent = `${tempCidade}°C`;
  document.getElementById("cidade").textContent = `${nomeCidade}`;

  const icone = document.getElementById("icone");
  icone.src = `https://openweathermap.org/img/wn/${iconeClima}@2x.png`;
  displayTemp.style.display = "flex";

  let codigoCortado = "";
  if (iconeClima.slice(-1) == "n" || iconeClima.slice(-1) == "d") {
    codigoCortado = iconeClima.slice(0, -1);
  }
  var corFundo = mudarBackground(codigoCortado);
  background.style.background = corFundo;
}

function mudarBackground(codigoClima) {
  switch (codigoClima) {
    case "01":
      return "linear-gradient(180deg, #87ceeb, #00bfff)";
    case "02":
      return "linear-gradient(180deg, #f5deb3, #ffe4b5)";
    case "03":
      return "linear-gradient(180deg, #d3d3d3, #a9a9a9)";
    case "04":
      return "linear-gradient(180deg, #778899, #808080)";
    case "09":
      return "linear-gradient(180deg, #add8e6, #6495ed)";
    case "10":
      return "linear-gradient(180deg, #1e90ff, #000080)";
    case "11":
      return "linear-gradient(180deg, #483d8b, #8b008b)";
    case "13":
      return "linear-gradient(180deg, #f0ffff, #fffacd)";
    case "50":
      return "linear-gradient(180deg, #b0c4de, #d8bfd8)";
    default:
      return "";
  }
}

function obterLocalizacao() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
}

const relogio = setInterval(function time() {
  let dateToday = new Date();

  let hr = dateToday.getHours();
  let min = dateToday.getMinutes();
  let sec = dateToday.getSeconds();

  let day = dateToday.getDate();
  let month = dateToday.getUTCMonth();
  let year = dateToday.getFullYear();

  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  horas.textContent = hr;
  minutos.textContent = min;
  segundos.textContent = sec;

  dia.textContent = day;
  mes.textContent = month;
  ano.textContent = year;
});

inputCidade.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    var cidadeNom = inputCidade.value;
    mostraClima(cidadeNom);
  }
});

mostraClima();
