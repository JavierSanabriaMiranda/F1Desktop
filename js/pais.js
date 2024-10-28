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

    getNombrePais() {
        return this.nombrePais;
    }

    getNombreCapital() {
        return this.nombreCapital;
    }

    getSecondaryInfo() {
        return "<ul><li>" + this.circuit + "</li><li>" + this.population+ "</li><li>" + this.government +
            "</li><li>" + this.religion + "</li>";
    }

    writeFinishingLineCoords() {
        document.write("<p>" + this.finishingLine + "</p>");
    }
}