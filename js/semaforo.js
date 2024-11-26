class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8]
        this.lights = 4
        this.unload_moment = null
        this.clic_moment = null
        this.createStructure()
    }

    createStructure() {
        var main = document.querySelector("body>main:first-of-type")
        
        var h2 = document.createElement("h2")
        var h2Content = document.createTextNode("Juego de Tiempo de Reacción")
        h2.appendChild(h2Content)
        main.appendChild(h2)

        for (let i = 0; i < this.lights; i++) {
            var light = document.createElement("div")
            main.appendChild(light)
        }
        
        var btStart = document.createElement("button")
        var btStartContent = document.createTextNode("Arranque")
        btStart.appendChild(btStartContent)
        btStart.onclick = this.initSequence.bind(this)
        
        main.appendChild(btStart)
       
        var btGetTime = document.createElement("button")
        var btGetTimeContent = document.createTextNode("Reacción")
        btGetTime.appendChild(btGetTimeContent)
        btGetTime.disabled = true

        main.appendChild(btGetTime)
    }

    initSequence() {
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
        var main = document.querySelector("body>main:first-of-type")
        main.classList.add("load")

        var p = document.querySelector("body>main>p")
        if (p != null)
            main.removeChild(p)

        var btStart = document.querySelector("body>main:first-of-type>button:first-of-type")
        btStart.disabled = true
        
        var game = this

        setTimeout(() => {
            game.unload_moment = new Date()
            game.endSequence()
        }, 2000 + game.difficulty * 100)
    }

    endSequence() {
        var btGetTime = document.querySelector("body>main:first-of-type>button:last-of-type")
        btGetTime.disabled = false
        var main = document.querySelector("body>main:first-of-type")
        main.classList.add("unload")

        btGetTime.onclick = this.stopReaction.bind(this)
    }

    stopReaction() {
        this.clic_moment = new Date()
        var timeDifference = this.clic_moment.getTime() - this.unload_moment.getTime();
        timeDifference = timeDifference.toFixed(3)/1000

        var p = document.createElement("p")
        var pReactionTime = document.createTextNode("Tiempo de reacción: " + timeDifference + "s")
        p.appendChild(pReactionTime)

        var main = document.querySelector("body>main:first-of-type")
        main.appendChild(p);
        
        main.classList.remove("load")
        main.classList.remove("unload")
        

        var btGetTime = document.querySelector("body>main:first-of-type>button:last-of-type")
        btGetTime.disabled = true

        var btStart = document.querySelector("body>main:first-of-type>button:first-of-type")
        btStart.disabled = false

        this.createRecordForm()
    }

    createRecordForm() {
        var body = document.querySelector("body")

        var section = document.createElement("section")
        var h3 = document.createElement("h3")
        var h3Form = document.createTextNode("Registrar Resultados")
        h3.appendChild(h3Form)
        section.appendChild(h3)

        var form = document.createElement("form")
        var inputName = document.createElement("input")
        inputName.setAttribute("type", "text")
        inputName.setAttribute("name", "nombre")
        var inputSurname = document.createElement("input")
        inputSurname.setAttribute("type", "text")
        inputSurname.setAttribute("name", "apellido")
        var inputReactionTime = document.createElement("input")
        inputReactionTime.setAttribute("type", "text")
        inputReactionTime.setAttribute("name", "tiempo de reaccion")
        var inputDifficulty = document.createElement("input")
        inputDifficulty.setAttribute("type", "text")
        inputDifficulty.setAttribute("name", "dificultad")
        var button = document.createElement("input")
        button.setAttribute("type", "submit")
        button.setAttribute("name", "enviar resultados")

        form.appendChild(inputName)
        form.appendChild(inputSurname)
        form.appendChild(inputReactionTime)
        form.appendChild(inputDifficulty)
        form.appendChild(button)
        section.appendChild(form)
        body.appendChild(section)
    }

}