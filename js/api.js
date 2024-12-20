
class PitStop {

    constructor() {
        this.draggedWheel = null
    }

    getWheels() {
        this.wheels = document.querySelectorAll("div[draggable]")
        this.slots = document.querySelectorAll("section>section:first-of-type>div")

        this.addDragEventsToWheels()
        this.addDropEventsToSlots()
    }

    addDragEventsToWheels() {
        var game = this

        this.wheels.forEach(wheel => {
            /* Evento para arrastre con click de raton */
            wheel.addEventListener('dragstart', (event) => {
                game.draggedWheel = event.target; // Guardar el elemento arrastrado
            });

            /* Evento para arrastre con toque en pantalla táctil */
            wheel.addEventListener('touchstart', (event) => {
                game.draggedWheel = event.target; // Guardar el elemento arrastrado
            });

            /* Evento para finalizar el arrastre con ratón */
            wheel.addEventListener('dragend', () => {
                game.draggedWheel = null; // Limpiar al terminar
            });

            /* Evento para finalizar el arrastre con toque en pantalla táctil */
            wheel.addEventListener('touchend', (event) => {
                var touch = event.changedTouches[0]; // Obtener la posición final del toque
                var touchX = touch.clientX;
                var touchY = touch.clientY;

                game.slots.forEach(slot => {
                    var slotRectangle = slot.getBoundingClientRect();
                    // Comprobar si el draggable está dentro de la zona de drop
                    if (
                        touchX >= slotRectangle.left &&
                        touchX <= slotRectangle.right &&
                        touchY >= slotRectangle.top &&
                        touchY <= slotRectangle.bottom
                    ) {
                        // Si está dentro, añadirlo al slot
                        slot.appendChild(game.draggedWheel);
                        game.draggedWheel.removeAttribute('draggable');
                        game.playSound(); // Reproducir sonido
                    }
                })
            });
        });
    }

    addDropEventsToSlots() {
        var game = this

        this.slots.forEach(slot => {
            slot.addEventListener('dragover', (event) => {
                event.preventDefault(); // Permitir el "drop"
            });
            slot.addEventListener('drop', (event) => {
                event.preventDefault();
                if (!slot.hasChildNodes()) { // Asegurar que el slot no esté ocupado
                    slot.appendChild(game.draggedWheel); // Cambiar estado visual
                    game.draggedWheel.removeAttribute('draggable'); // Deshabilitar el arrastre
                    game.playSound(); // Reproducir sonido
                }
            });
        })
    }

    setFullScreen() {
        var car = document.querySelector("section:first-of-type")
        if (document.fullscreenElement === null) {
            car.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    playSound() {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Cargar un archivo de audio
        var audioElement = new Audio('multimedia/audios/sonidoCambioNeumatico.mp3');
        var audioSource = audioContext.createMediaElementSource(audioElement);

        // Crear un nodo de ganancia para controlar el volumen
        var gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Reducir el volumen al 10%

        // Conectar a los altavoces
        audioSource.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Reproducir el audio
        audioElement.play();
    }

    addEventListeners() {
        var button = document.querySelector("section>button:first-of-type")
        button.onclick = this.setFullScreen.bind(this)
    }
}

pitStop = new PitStop()