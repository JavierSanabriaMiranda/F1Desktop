class Pais {

    constructor (countryName, capitalName, population) {
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
        return "<ul><li>Circuito: " + this.circuit + "</li><li>Población: " + this.population+ "</li><li>Tipo de Gobierno: " 
        + this.government + "</li><li>Religión Mayoritaria: " + this.religion + "</li></ul>";
    }

    writeFinishingLineCoords() {
        document.write("<p>Coordenadas Línea de Meta: " + this.finishingLine + "</p>");
    }
}

var pais = new Pais("Qatar", "Doha", 3063000);
pais.fillAtributes();