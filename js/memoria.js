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
                    "source": "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
                },
                {
                    "element": "RedBull",
                    "source": "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
                },
                {
                    "element": "McLaren",
                    "source": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
                },
                {
                    "element": "McLaren",
                    "source": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
                },
                {
                    "element": "Alpine",
                    "source": "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
                },
                {
                    "element": "Alpine",
                    "source": "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
                },
                {
                    "element": "AstonMartin",
                    "source": "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
                },
                {
                    "element": "AstonMartin",
                    "source": "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
                },
                {
                    "element": "Ferrari",
                    "source": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
                },
                {
                    "element": "Ferrari",
                    "source": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
                },
                {
                    "element": "Mercedes",
                    "source": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
                },
                {
                    "element": "Mercedes",
                    "source": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
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
        this.firstCard.setAttribute("data-state", "hidden")
        this.secondCard.setAttribute("data-state", "hidden")

        setTimeout(() => this.resetBoard(), 1000);
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
            setTimeout(() => game.checkForMatch(), 1000);
        }
        console.log(game)
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
    }
}