class Pais {

    constructor(countryName, capitalName, population) {
        this.countryName = countryName;
        this.capitalName = capitalName;
        this.population = population;
    }

    fillAtributes() {
        this.circuit = "Losail";
        this.government = "Monarquía Absoluta";
        this.finishingLine = "25.488222,51.450222";
        this.religion = "Islam";
    }

    getCountryName() {
        return this.countryName;
    }

    getCapitalName() {
        return this.capitalName;
    }

    getSecondaryInfo() {
        return "<ul><li>Circuito: " + this.circuit + "</li><li>Población: " + this.population + "</li><li>Tipo de Gobierno: "
            + this.government + "</li><li>Religión Mayoritaria: " + this.religion + "</li></ul>";
    }

    writeFinishingLineCoords() {
        document.write("<p>Coordenadas Línea de Meta: " + this.finishingLine + "</p>");
    }

    getWeather() {
        var apikey = "ab329907cef3fedb69f3dcf2a236696e";
        var mode = "xml";
        var units = "metric";
        var lang = "es";
        var lat = this.finishingLine.split(",")[0]
        var lon = this.finishingLine.split(",")[1]

        var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=${units}&mode=${mode}&lang=${lang}`
        $.ajax({
            dataType: "xml",
            url: url,
            method: 'GET',
            success: function (data) {
                $("time", data).each(function () {
                    var initTime = $(this).attr("from");
                    var finalTime = $(this).attr("to");
                    var date = new Date(initTime);
                    var initHour = date.getHours();
                    var date = new Date(finalTime);
                    var finalHour = date.getHours();

                    if (initHour === 9) {
                        var day = date.toLocaleDateString();
                        var temperatureMin = $(this).find('temperature').attr("min");
                        var temperatureMax = $(this).find('temperature').attr("max");
                        var humidity = $(this).find('humidity').attr("value");
                        var symbol = $(this).find('symbol').attr("var");
                        var precipitation = $(this).find('precipitation').attr("value");

                        var weather = `
                        <article>
                            <h3>${day} - ${initHour}:00-${finalHour}:00</h3>
                            <img src=http://openweathermap.org/img/wn/${symbol}@2x.png />
                            <p>Temperatura: ${temperatureMin}/${temperatureMax}ºC</p>
                            <p>Humedad: ${humidity}%</p>
                            <p>Lluvias: ${precipitation}</p>
                        </article>
                        `

                        $("main").append(weather)
                    }
                })
            }
        });
    }
}

var pais = new Pais("Qatar", "Doha", 3063000);
pais.fillAtributes();