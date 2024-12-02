
class PitStop {

    constructor() {
        this.draggedWheel = null
    }

    getWheels() {
        this.wheels = document.querySelectorAll("div[draggable]")
        this.slots = document.querySelectorAll("section:first-of-type>div")

        this.addDragEventsToWheels()
        this.addDropEventsToSlots()
    }

    addDragEventsToWheels() {
        var game = this

        this.wheels.forEach(wheel => {
            wheel.addEventListener('dragstart', (event) => {
                game.draggedWheel = event.target; // Guardar el elemento arrastrado
            });
        
            wheel.addEventListener('dragend', () => {
                game.draggedWheel = null; // Limpiar al terminar
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
                }
            });
        })
    } 
}

pitStop = new PitStop()