class Viajes {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this), this.handleErrors.bind(this))
    }

    getPosition(position) {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.accuracy = position.coords.accuracy;
        this.altitude = position.coords.altitude;
        this.altitudeAccuracy = position.coords.altitudeAccuracy;
        this.heading = position.coords.heading;
        this.speed = position.coords.speed;
    }

    handleErrors(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la peticion de geolocalizacion"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Informacion de geolocalizacion no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La peticion de geolocalizacion ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }

    getStaticMap() {
        var zoom = 14
        var width = 700
        var height = 350
        var widthTablet = 460
        var heightTablet = 230
        var widthMovil = 260
        var heightMovil = 130
        var accessToken = "sk.eyJ1IjoidW8yOTM3NTgiLCJhIjoiY20zZXk4YWppMGtjYjJtcXVsNWRpMnI3ZiJ9.CYjCu6qfXNy1dF6sn4cFug"

        var url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${this.longitude},${this.latitude},${zoom}/${width}x${height}?access_token=${accessToken}`
        var urlTablet = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${this.longitude},${this.latitude},${zoom}/${widthTablet}x${heightTablet}?access_token=${accessToken}`
        var urlMovil = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${this.longitude},${this.latitude},${zoom}/${widthMovil}x${heightMovil}?access_token=${accessToken}`

        $("main>section:first").append(`
            <p></p>    
            <picture>
                <source media="(max-width: 480px)" srcset="${urlMovil}" />
                <source media="(max-width: 800px)" srcset="${urlTablet}" />
                <source media="(min-width: 800px)" srcset="${url}" />
                <img src=${url} alt="Mapa Ubicación del Usuario" />
            </picture>
            `)
        document.querySelector("main>button:first-of-type").disabled = true
    }

    getDynamicMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yOTM3NTgiLCJhIjoiY20zZXhneDFsMGVzNjJrcXR0aWl4a2x2NCJ9.Pp5UT-I4tLOFae7LBV9Fuw';
        var container = document.querySelector("div")

        const map = new mapboxgl.Map({
            container: container,
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 14,
            center: [this.longitude, this.latitude]
        });
        new mapboxgl.Marker()
            .setLngLat([this.longitude, this.latitude])
            .addTo(map);
        document.querySelector("main>button:last-of-type").disabled = true
    }

    addListenersToCarrusel() {
        var slides = document.querySelectorAll("img");

        // select next slide button
        const nextSlide = document.querySelector("article>button:nth-of-type(1)");

        // current slide counter
        let curSlide = 9;
        // maximum number of slides
        let maxSlide = slides.length - 1;

        // add event listener and navigation functionality
        nextSlide.addEventListener("click", function () {
            // check if current slide is the last and reset current slide
            if (curSlide === maxSlide) {
                curSlide = 0;
            } else {
                curSlide++;
            }

            //   move slide by -100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });

        // select next slide button
        const prevSlide = document.querySelector("article>button:nth-of-type(2)");

        // add event listener and navigation functionality
        prevSlide.addEventListener("click", function () {
            // check if current slide is the first and reset current slide to last
            if (curSlide === 0) {
                curSlide = maxSlide;
            } else {
                curSlide--;
            }

            //   move slide by 100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
    }
}
var viajes = new Viajes()