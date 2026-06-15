// Variables

//Factory
function urlBuilder(number) {
    //Turning the number into a string
    number += "";
    //Adding 0 to the left of small numbers
    number = number.padStart(2, '0');

    return `images/heros/card${number}.jpeg`;
}

// Object instances
let card = new CardManager(urlBuilder);
let board = new BoardManager("board", 50, card);

// Dom elements
let menu = document.getElementById('menu');
let select = document.getElementById('numCards');
let start = document.getElementById('start');
let victory = document.getElementById('victory');
let playAgain = document.getElementById('playAgain');
let attempts = document.getElementById('attempts');
let defeat = document.getElementById('defeat');
let playAgainDefeat = document.getElementById('playAgainDefeat');

// configuring the background sound
window.flipSound = document.getElementById("flipSound");
window.winSound = document.getElementById("winSound");
window.loseSound = document.getElementById("loseSound");

const bgMusic = document.getElementById("bgMusic");

bgMusic.loop = true;
bgMusic.volume = 0.3;


// Configuring the menu
for (let i = 4; i <= 10; i += 2) { //From 4 to 10
    let n = i * i; //Get i²
    // Create a new option for the select
    let op = document.createElement('option');

    // Set both value and content to i²
    op.value = n;
    op.innerHTML = n;

    // Add the new option to the page
    select.appendChild(op);
}

// Event listeners
start.addEventListener('click', () => {
    bgMusic.play();
    menu.classList.add('hidden');
    board.node.classList.remove('hidden');

    attempts.classList.remove('hidden');

    board.fill(select.value);
});

board.node.addEventListener('click', () => {
    if (card.flippedCards.size === 0) {

        const matchedCards = document.getElementsByClassName('matched').length;

        if (board.check()) {
            winSound.currentTime = 0;
            winSound.play();
            bgMusic.pause();
            
            setTimeout(() => {
                board.node.classList.add('hidden');
                attempts.classList.add('hidden');
                victory.classList.remove('hidden');
            }, 500);
        }
    }
})

playAgain.addEventListener('click', () => {
    card.flippedCards.clear();
    board.clear();

    victory.classList.add('hidden');
    menu.classList.remove('hidden');
});

document.addEventListener('wrongMatch', () => {

    if (board.loseAttempt()) {
        bgMusic.pause();
        loseSound.currentTime = 0;
        loseSound.play();

        board.node.classList.add('hidden');
        attempts.classList.add('hidden');

        defeat.classList.remove('hidden');
    }

});

playAgainDefeat.addEventListener('click', () => {

    card.flippedCards.clear();
    board.clear();

    defeat.classList.add('hidden');
    menu.classList.remove('hidden');

});