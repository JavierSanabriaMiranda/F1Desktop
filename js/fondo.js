
class Fondo {

    constructor(countryName, capitalName, circuitName) {
        this.countryName = countryName
        this.capitalName = capitalName
        this.circuitName = circuitName
    }

    getImage() {
        var self = this

        var apiKey = "3caa7263ba15295bb518ee4864d92916"
        var API = "https://api.flickr.com/services/rest/?method=flickr.photos.search"
        $.getJSON(API,
            {
                api_key: apiKey,
                text: "F1 " + self.countryName + " " + self.circuitName,
                format: "json",
                per_page: 1,
                nojsoncallback: 1,
            })
            .done(function (data) {
                console.log(data)
                if (data.photos.photo.length > 0) {
                    var photo = data.photos.photo[0];
                    var imageUrl = "https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg"
                    $("body").css({
                        "background-image": "url(" + imageUrl + ")", 
                        "background-size": "cover",
                        "background-repeat": "no-repeat"
                });

                }

            })
            .fail(function (error) {
                console.error("Error en la solicitud:", error);
            });
    }
}

var fondo = new Fondo("Qatar", "Doha", "Losail")