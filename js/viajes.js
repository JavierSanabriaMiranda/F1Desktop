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
        var zoom = 12
        var width = 600
        var height = 600
        var accesToken = "sk.eyJ1IjoidW8yOTM3NTgiLCJhIjoiY20zZXk4YWppMGtjYjJtcXVsNWRpMnI3ZiJ9.CYjCu6qfXNy1dF6sn4cFug"

        var url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${this.longitude},${this.latitude},${zoom}/${width}x${height}?access_token=${accesToken}`

        $("main").append(`
            <p></p>    
            <img src=${url} alt="Mapa Ubicación del Usuario" />
            `)    
    }
}
var viajes = new Viajes()