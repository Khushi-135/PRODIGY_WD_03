const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const winnerMessage = document.getElementById('winner-message');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for winner
function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winnerMessage.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!gameState.includes("")) {
        winnerMessage.textContent = "It's a Draw!";
        gameActive = false;
    }
}

// Reset the game
function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = 'X';
    gameActive = true;
    winnerMessage.textContent = "";
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
