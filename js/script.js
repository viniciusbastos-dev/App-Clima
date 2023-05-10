// Relogio
const horas = document.querySelector("#horas");
const minutos = document.querySelector("#minutos");
const segundos = document.querySelector("#segundos");
// Data
const dia = document.querySelector("#dia");
const mes = document.querySelector("#mes");
const ano = document.querySelector("#ano");
// Entrada de texto
const cidadeNome = document.querySelector(".input-texto");
// API OpenWeatherMap
const chaveAPI = "23152605cb2a145350eca4480117919a";

const background = document.querySelector("body");

const iconCode = "";

cidadeNome.addEventListener("keydown", function () {
    if (event.key == 'Enter') {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidadeNome.value}&appid=${chaveAPI}&units=metric`)
            .then(response => response.json())
            .then(data => {

                const city = data.name;
                const temperature = Math.round(data.main.temp);
                const iconCode = data.weather[0].icon;

                document.getElementById("temperatura").textContent = `${temperature}°C`;
                document.getElementById("cidade").textContent = `${city}`;
                document.getElementById("icone");

                icone.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                let codigoCortado = ""
                // Slice checa se a ultima parte da variavel iconCode é == a n ou d e depois com slice 0, -1 ele pega tudo apartir do 0 e exclui o ultimo caracter
                if (iconCode.slice(-1) == "n" || "d") {
                    codigoCortado = iconCode.slice(0, -1);
                }
                // Chama a função com o codigo modificado
                var corFundo = mudarBackground(codigoCortado);
                // Aplica o retorno da função ao background
                background.style.background = corFundo;

            })
            .catch(error => {
                console.log(error);

            });
    };
});

function mudarBackground(codigoClima) {
    // Testa as condições e retorna uma cor para cada uma, no caso a condição é o começo do codigo que indica o clima
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
    };
};

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