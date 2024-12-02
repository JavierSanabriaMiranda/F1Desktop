
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
        wheels.forEach(wheel => {
            wheel.addEventListener('dragstart', (event) => {
                draggedWheel = event.target; // Guardar el elemento arrastrado
            });
        
            wheel.addEventListener('dragend', () => {
                draggedWheel = null; // Limpiar al terminar
            });
        });
    }

    addDropEventsToSlots() {
        slots.forEach(slot => {
            slot.addEventListener('dragover', (event) => {
                event.preventDefault(); // Permitir el "drop"
            });
            slot.addEventListener('drop', (event) => {
                event.preventDefault();
                const wheelId = event.dataTransfer.getData('text/plain'); // Obtener ID del neumático
                if (!slot.classList.contains('completed')) { // Asegurar que el slot no esté ocupado
                    slot.classList.add('completed'); // Cambiar estado visual
                    slot.style.backgroundColor = draggedWheel.style.backgroundColor;
                    draggedWheel.style.display = 'none'; // Ocultar el neumático
                }
            });
        })
    } 
}

pitStop = new PitStop()