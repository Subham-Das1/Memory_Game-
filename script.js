const symbols = ["😀", "😎", "😜", "😍", "🥳", "🚀", "🎉", "🌈", "😀", "😎", "😜", "😍", "🥳", "🚀", "🎉", "🌈"];
let cardArray = [];
let openedCards = [];
let moveCount = 0;
let maxMoves = 12;
let matchedCards = 0;
let gameOver = false; // Flag to track if the game is over

// Shuffle the symbols array using Fisher-Yates shuffle algorithm
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Initialize the game board
function initGame() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Clear previous cards

    cardArray = shuffle([...symbols]); // Shuffle the symbols

    cardArray.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('item');
        card.dataset.symbol = symbol;
        card.innerHTML = `<div class="card-front">${symbol}</div><div class="card-back"></div>`;
        card.addEventListener('click', () => flipCard(card));
        cardContainer.appendChild(card);
    });

    document.getElementById('moveCounter').innerText = moveCount = 0; // Reset move counter
    matchedCards = 0; // Reset matched cards
    gameOver = false; // Reset game over flag
    document.getElementById('winMessage').style.display = 'none'; // Hide win message
    document.getElementById('loseMessage').style.display = 'none'; // Hide lose message
}

// Flip the card and check for match
function flipCard(card) {
    if (gameOver || openedCards.length >= 2 || card.classList.contains('open') || card.classList.contains('cardMatch')) {
        return; // If game is over, prevent any further card clicks
    }

    card.classList.add('open');
    openedCards.push(card);

    if (openedCards.length === 2) {
        checkMatch();
    }
}

// Check if the two opened cards match
function checkMatch() {
    const [firstCard, secondCard] = openedCards;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('cardMatch');
        secondCard.classList.add('cardMatch');
        matchedCards += 2;
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
        }, 1000);
    }

    openedCards = [];
    updateMoveCount();
}

// Update the move counter and check if the game is lost
function updateMoveCount() {
    moveCount++;
    document.getElementById('moveCounter').innerText = moveCount;

    if (moveCount >= maxMoves && matchedCards < cardArray.length) {
        document.getElementById('loseMessage').style.display = 'block';
        gameOver = true; // Set game over flag to true when losing
    }
}

// Check if the game is won
function checkWin() {
    if (matchedCards === cardArray.length) {
        document.getElementById('winMessage').style.display = 'block';
        gameOver = true; // Set game over flag to true when winning
    }
}

// Reset the game
function resetGame() {
    initGame();
}

// Start the game on page load
window.onload = initGame;
