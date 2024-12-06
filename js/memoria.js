class Memoria {

    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.instanceCards();
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    instanceCards() {
        this.elements = {
            "cards": [
                {
                    "element": "RedBull",
                    "source": "multimedia/imagenes/red_bull_logo.svg"
                },
                {
                    "element": "RedBull",
                    "source": "multimedia/imagenes/red_bull_logo.svg"
                },
                {
                    "element": "McLaren",
                    "source": "multimedia/imagenes/mclaren_logo.svg"
                },
                {
                    "element": "McLaren",
                    "source": "multimedia/imagenes/mclaren_logo.svg"
                },
                {
                    "element": "Alpine",
                    "source": "multimedia/imagenes/alpine_logo.svg"
                },
                {
                    "element": "Alpine",
                    "source": "multimedia/imagenes/alpine_logo.svg"
                },
                {
                    "element": "AstonMartin",
                    "source": "multimedia/imagenes/aston_martin_logo.svg"
                },
                {
                    "element": "AstonMartin",
                    "source": "multimedia/imagenes/aston_martin_logo.svg"
                },
                {
                    "element": "Ferrari",
                    "source": "multimedia/imagenes/ferrari_logo.svg"
                },
                {
                    "element": "Ferrari",
                    "source": "multimedia/imagenes/ferrari_logo.svg"
                },
                {
                    "element": "Mercedes",
                    "source": "multimedia/imagenes/mercedes_logo.svg"
                },
                {
                    "element": "Mercedes",
                    "source": "multimedia/imagenes/mercedes_logo.svg"
                },
            ]
        }
    }

    shuffleElements() {
        // Creamos una copia del array para no modificar el original
        let shuffledCards = [...this.elements.cards];

        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }

        // Asignamos el array barajado al original
        this.elements.cards = shuffledCards;
    }

    unflipCards() {
        this.lockBoard = true;

        setTimeout(() => {
            this.firstCard.setAttribute("data-state", "hidden")
            this.secondCard.setAttribute("data-state", "hidden")

            this.resetBoard();
        }, 1000)

    }

    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
        this.hasFlippedCard = false;
    }

    checkForMatch() {
        if (this.firstCard.getAttribute("data-element") === this.secondCard.getAttribute("data-element"))
            this.disableCards();
        else
            this.unflipCards();
    }

    disableCards() {
        this.firstCard.setAttribute("data-state", "revealed")
        this.secondCard.setAttribute("data-state", "revealed")
        this.resetBoard();
    }

    flipCard(game) {
        console.log(game)
        if (this.getAttribute("data-state") === "revealed") {
            return;
        } if (game.lockBoard) {
            return;
        } if (game.firstCard === this) {
            return;
        }

        this.setAttribute("data-state", "flip")
        if (!game.hasFlippedCard) {
            game.hasFlippedCard = true
            game.firstCard = this
        } else {
            game.secondCard = this
            game.checkForMatch()
        }
    }

    createElements() {
        for (let i = 0; i < this.elements.cards.length; i++) {
            var card = this.elements.cards[i];

            var article = document.createElement("article");
            article.setAttribute("data-element", card.element);
            article.setAttribute("data-state", "hidden")

            var h3 = document.createElement("h3");
            var h3content = document.createTextNode("Memory Card");
            h3.appendChild(h3content);

            var img = document.createElement("img");
            img.setAttribute("src", card.source);
            img.setAttribute("alt", card.element);

            article.appendChild(h3);
            article.appendChild(img);

            var section = document.querySelector("body > section:first-of-type")
            section.appendChild(article);
        }
    }

    addEventListeners() {
        var game = this
        var articles = document.querySelectorAll("body>section:first-of-type>article");

        for (let article of articles) {
            article.onclick = this.flipCard.bind(article, game)
        }
        // Añadir acción al botón que muestra el panel de reglas del juego
        document.querySelector("section>header>section>button:first-of-type").onclick = this.showGameRules.bind(this)
        // Añadir acción al botón que muestra el panel de reglas del juego
        document.querySelector("section>header>section>button:nth-of-type(2)").onclick = this.resetGame.bind(this)

        // Añadir acción al botón que cierra el panel de reglas
        document.querySelector("section>section>header>button").onclick = this.hideGameRules.bind(this)
    }

    showGameRules() {
        var rulesPanel = document.querySelector("section>section")
        rulesPanel.removeAttribute("hidden")
    }

    hideGameRules() {
        var rulesPanel = document.querySelector("section>section")
        rulesPanel.setAttribute("hidden", '')
    }

    resetGame() {
        var section = document.querySelector("body > section:first-of-type");
        var articles = document.querySelectorAll("body > section:first-of-type > article");

        // Remove all child articles from the section
        articles.forEach(article => section.removeChild(article));

        this.resetBoard();
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }
}

