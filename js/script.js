const horas = document.querySelector("#horas");
const minutos = document.querySelector("#minutos");
const segundos = document.querySelector("#segundos");

const dia = document.querySelector("#dia");
const mes = document.querySelector("#mes");
const ano = document.querySelector("#ano");

const cidadeNome = document.querySelector(".input-texto");

const API_KEY = "23152605cb2a145350eca4480117919a";

cidadeNome.addEventListener("keydown", function () {
    if (event.key == 'Enter') {

        const CITY = cidadeNome.value

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                const city = data.name;
                const temperature = Math.round(data.main.temp);
                const iconCode = data.weather[0].icon;

                document.getElementById("temperatura").textContent = `${temperature}°C`;
                document.getElementById("cidade").textContent = `${city}`;
                document.getElementById("icone");

                icone.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            })
            .catch(error => {
                console.log(error);

            });
    }
});


const relogio = setInterval(function time() {
    let dateToday = new Date();

    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();

    let day = dateToday.getDate();
    let month = dateToday.getUTCMonth();
    let year = dateToday.getFullYear();

    if (hr < 10) hr = '0' + hr;

    if (min < 10) min = '0' + min;

    if (sec < 10) sec = '0' + sec;

    if (day < 10) day = '0' + day;

    if (month < 10) month = '0' + month;

    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = sec;

    dia.textContent = day;
    mes.textContent = month;
    ano.textContent = year;

});