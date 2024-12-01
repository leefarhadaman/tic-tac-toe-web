const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.dataset.index);
  
    if (boardState[index] !== null || !gameActive) {
      return;
    }
  
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");
  
    if (checkWin()) {
      statusDiv.textContent = `${currentPlayer} wins! Yeeh 🎉`;
      gameActive = false;
      return;
    }
  
    if (boardState.every(cell => cell !== null)) {
      statusDiv.textContent = "It's a tie! 🤝";
      gameActive = false;
      return;
    }
  
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
  
  

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      boardState[a] === currentPlayer &&
      boardState[b] === currentPlayer &&
      boardState[c] === currentPlayer
    );
  });
}

function restartGame() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  currentPlayer = "X";
  gameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
