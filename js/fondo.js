
class Fondo {

    constructor(countryName, capitalName, circuitName) {
        this.countryName = countryName
        this.capitalName = capitalName
        this.circuitName = circuitName
    }

    getImage() {
        (function () {
            var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            $.getJSON(flickrAPI,
                {
                    tags: [this.countryName, this.capitalName, this.circuitName],
                    tagmode: "all",
                    format: "json"
                })
                .done(function (data) {
                    $.each(data.items, function (i, item) {
                        $("body").css("background-image", url(item.media.m))
                        if (i === 1) {
                            return false;
                        }
                    });
                });
        })();
    }


}