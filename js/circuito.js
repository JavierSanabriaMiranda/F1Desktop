class Circuito {

    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob)
            this.apiFile = true;
        else
            this.apiFile = false;
    }

    printXMLInfo(files) {
        if (this.apiFile == false) {
            $("main").append("<h3>No se ha podido leer el archivo pues su navegador no dispone de API File</h3>")
            return
        }
        var self = this

        var file = files[0]
        var name = file.name
        var size = file.size
        var type = file.type
        var lastMod = file.lastModifiedDate
        
        var fileInfo = `
            <h4>Nombre del archivo: ${name}</h4>
            <h4>Tamaño del archivo: ${size} bytes</h4>
            <h5>Tipo de archivo: ${type}</h5>
            <h5>Última modificación del archivo: ${lastMod}</h5>
        `
        $("main>section:first").append(fileInfo)
        if (type.match("text/xml")) {
            var reader = new FileReader()
            reader.onload = function(event) {
                self.processXMLContentAsHTML(reader.result)
            }
            $("main>section:first").append("<h3>Contenido XML</h3>")
            reader.readAsText(file)
        }
        else {
            $("main>section:first").append(`<h3>Contenido XML</h3>
                <h4>El archivo no es de tipo XML</h4>`)
        }
    }

    processXMLContentAsHTML(content) {
        $("circuito", content).each(function() {
            var name = $(this).find("nombre").text()
            var longitude = $(this).find("longitudCircuito").text() + 
                                $(this).find("longitudCircuito").attr("unidades")
            var width = $(this).find("anchura").text() + 
                                $(this).find("anchura").attr("unidades")
            var date = $(this).find("fecha").text()
            var time = $(this).find("hora").text()
            var turns = $(this).find("vueltas").text() + " vueltas"
            var locality = $(this).find("localidad").text()
            var country = $(this).find("pais").text()
            var links = $(this).find("referencia")
            var images = $(this).find("fotografia")
            var stretches = $(this).find("tramo")
            var finishiLineCoords = $(this).find("coordenadas")

            var mainContentAsHTML = `
                <h4>${name}</h6>
                <h5>${longitude}<h5>
                <h5>${width}<h5>
                <h5>${date} // ${time}<h5>
                <h5>${turns}<h5>
                <h5>${locality}<h5>
                <h5>${country}<h5>
            `

            $("main>section:first").append(mainContentAsHTML)
            $(links).each(function(index, link) {
                var linkContent = $(link).text()
                $("main>section:first").append(`
                    <a href=${linkContent}>${linkContent}</a>
                    <p></p>`
                )
            })
            $(images).each(function(index, image) {
                var imageSrc = $(image).text()
                $("main>section:first").append(`
                    <img src=xml/${imageSrc} alt="Imagen Circuito Losail"/>
                    <p></p>`
                )
            })
            // Hacer coords linea de meta
            $(finishiLineCoords).each(function(index, coords) {
                if (index == 0)  {
                    var long = $(coords).find("longitud").text()
                    var lat = $(coords).find("latitud").text()
                    var alt = $(coords).find("altitud").text()
                    $("main>section:first").append(`
                        <h5>Coordenadas Linea de Meta: ${lat}, ${long}, ${alt}</h5>
                        `
                    )
                }
            })
            // hacer coords de los tramos
            $(stretches).each(function(index, stretch) {
                var distance = $(stretch).find("distancia").text() + 
                                $(stretch).find("distancia").attr("unidades")
                var long = $(stretch).find("longitud").text()
                var lat = $(stretch).find("latitud").text()
                var alt = $(stretch).find("altitud").text()
                var sect = $(stretch).find("sector").text()
                $("main>section:first").append(`
                    <h4>Tramo ${index}</h4>
                    <h5>Coords: ${lat}, ${long}, ${alt}</h5>
                    <h5>Sector: ${sect}</h5>
                    `
                )
            })
        })
    }
}

var circuito = new Circuito()