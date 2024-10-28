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
        return "<ul><li>" + this.circuit + "</li><li>" + this.population+ "</li><li>" + this.government +
            "</li><li>" + this.religion + "</li>";
    }

    writeFinishingLineCoords() {
        document.write("<p>" + this.finishingLine + "</p>");
    }
}

var pais = new Pais("Qatar", "Doha", 3063000);
pais.fillAtributes();