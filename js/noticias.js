class Noticias {

    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob)
            this.apiFile = true;
        else
            this.apiFile = false;
    }

    getNewActionFromUserText() {
        var textAreas = document.getElementsByTagName("textarea")
        var titleArea = textAreas[0]
        var contentArea = textAreas[1]
        var authorArea = textAreas[2]

        if (titleArea.value.trim().length === 0 || contentArea.value.trim().length === 0 || authorArea.value.trim().length === 0) {
            alert("No se han rellenado todos los campos de la nueva noticia")
        } else {
            this.addNews(titleArea.value, contentArea.value, authorArea.value)
            titleArea.value = ""
            contentArea.value = ""
            authorArea.value = ""
        }
    }

    readInputFile(files) {
        var self = this;
        var file = files[0];

        if (this.apiFile == false) {
            $("main").append("<h3>No se ha podido leer el archivo pues su navegador no dispone de API File</h3>")
            return
        }
        if (file.type.match("text/plain"))    {
            // Se usa el then porque text() devuelve una promise y tenemos que esperar a que se resuelva
            file.text().then(text => { 
                var fileLines = text.split(/\r?\n/)
                $.each(fileLines, function(index, line) {
                    var lineContent = line.split("_")
                    var title = lineContent[0]
                    var content = lineContent[1]
                    var author = lineContent[2]
    
                    self.addNews(title, content, author)
                })
            })
        }
    }

    addNews(title, content, author) {
        var news = `
            <article>
                <h3>${title}</h3>
                <img src="multimedia/imagenes/imgNoticias.png" alt="Imagen de Noticia" />
                <p>${content}</p>
                <h4>${author}</h4>
            </article>
        `

        $("main>section:last-of-type").append(news)
    }
}

var noticias = new Noticias()
