class Noticias {

    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob)
            this.apiFile = true;
        else
            this.apiFile = false;
    }

    readInputFile(files) {
        var self = this;
        var file = files[0];

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

        $("main>section:first").append(news)
    }
}

var noticias = new Noticias()