const symbols = ["😀", "😎", "😜", "😍", "🥳", "🚀", "🎉", "🌈", "😀", "😎", "😜", "😍", "🥳", "🚀", "🎉", "🌈"];
const maxMoves = 12;

let moves = 0;
let shuffledSymbols = [];
let originalCards = [];
let openCards = [];

function updateMoveCounter() {
    document.getElementById('moveCounter').textContent = moves;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards() {
    shuffledSymbols = shuffle(symbols.slice()); 
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = ''; 
    originalCards = []; 
    shuffledSymbols.forEach(symbol => {
        let card = document.createElement("div");
        card.className = "item";
        card.innerHTML = symbol;
        originalCards.push(card.cloneNode(true)); 
        card.onclick = handleCardClick;
        cardContainer.appendChild(card);
    });
}

function handleCardClick() {
    if (this.classList.contains('open') || this.classList.contains('cardMatch') || moves >= maxMoves) {
        return;
    }

    this.classList.add('open');
    openCards.push(this);

    if (openCards.length === 2) {
        moves++;
        updateMoveCounter();

        const [firstCard, secondCard] = openCards;
        if (firstCard.innerHTML === secondCard.innerHTML) {
            setTimeout(() => {
                openCards.forEach(card => card.classList.add('cardMatch'));
                openCards = [];
                if (document.querySelectorAll('.cardMatch').length === symbols.length) {
                    document.getElementById('winMessage').style.display = 'block';
                }
            }, 500);
        } else {
            setTimeout(() => {
                openCards.forEach(card => card.classList.remove('open'));
                openCards = [];
                if (moves === maxMoves) {
                    document.getElementById('loseMessage').style.display = 'block';
                    document.querySelectorAll('.item').forEach(card => {
                        card.style.visibility = 'hidden';
                    });
                }
            }, 500);
        }
    }
}

function resetGame() {
    moves = 0;
    updateMoveCounter();
    document.getElementById('winMessage').style.display = 'none';
    document.getElementById('loseMessage').style.display = 'none';
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = ''; 
    createCards(); 
    openCards = []; 
}

createCards();
