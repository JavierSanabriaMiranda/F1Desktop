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
        switch(error.code) {
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
        var width = 1200
        var height = 600
        var accessToken = "sk.eyJ1IjoidW8yOTM3NTgiLCJhIjoiY20zZXk4YWppMGtjYjJtcXVsNWRpMnI3ZiJ9.CYjCu6qfXNy1dF6sn4cFug"

        var url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${this.longitude},${this.latitude},${zoom}/${width}x${height}?access_token=${accessToken}`

        $("main>section:first").append(`
            <p></p>    
            <img src=${url} alt="Mapa Ubicación del Usuario" />
            `)
        document.querySelector("main>button:first-of-type").disabled = true
    }

    getDynamicMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yOTM3NTgiLCJhIjoiY20zZXhneDFsMGVzNjJrcXR0aWl4a2x2NCJ9.Pp5UT-I4tLOFae7LBV9Fuw';
        var container = document.querySelector("div")
        $(container).css({
            "height": "70vh",
            "width": "100%"
        });

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
}
var viajes = new Viajes()