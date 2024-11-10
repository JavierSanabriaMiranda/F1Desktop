//Dentro del fichero creado en la tarea anterior crea la clase Agenda.
//Añade a esta clase un método constructor que inicialice en el objeto un atributo con la URL de la dirección que permitirá consultar la 
//información de las carreras de la temporada en curso.
//La información que devuelva la API debe estar en formato JSON.
class Agenda {

    constructor() {
        this.url = "https://ergast.com/api/f1/current.json"
    }

    setButtonAction() {
        var button = document.querySelector("main > button:first-of-type")

        button.onclick = this.getRaces.bind(this)
    }

    getRaces() {
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(data) {
                $.each(data.MRData.RaceTable.Races, function() {
                    var raceName = this.raceName
                    var circuit = this.Circuit.circuitName
                    var latCircuit = this.Circuit.Location.lat
                    var lonCircuit = this.Circuit.Location.long
                    var raceDate = this.date
                    var raceTime = this.time

                    var raceInfo = `
                    <article>
                        <h3>${raceName}</h3>
                        <h4>${circuit}</h4>
                        <p>Coordenadas: ${latCircuit}, ${lonCircuit}</p>
                        <p>Fecha: ${raceDate} - ${raceTime}</p>
                    </article>
                    `
                    $("main>section:first").append(raceInfo)
                    var button = document.querySelector("main > button:first-of-type")
                    button.disabled = true;
                })
                
            },
            error: function(data) {
                console.error(data)
                console.error(JSON.stringify(data))
            }
        })
    }
}

var agenda = new Agenda()
