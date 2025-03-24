let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let playWithAI = false; // Default to two-player mode

document
  .querySelector("#mode-selection")
  .addEventListener("change", (event) => {
    playWithAI = event.target.value === "ai";
    resetGame();
  });

boxes.forEach((e) => {
  e.innerHTML = "";
  e.addEventListener("click", () => {
    if (!isGameOver && e.innerHTML === "") {
      e.innerHTML = turn;
      checkWin();
      checkDraw();
      if (!isGameOver) {
        changeTurn();
        if (playWithAI && turn === "O") {
          setTimeout(computerMove, 500);
        }
      }
    }
  });
});

function changeTurn() {
  turn = turn === "X" ? "O" : "X";
  document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
}

function checkWin() {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let condition of winConditions) {
    let [a, b, c] = condition;
    if (
      boxes[a].innerHTML &&
      boxes[a].innerHTML === boxes[b].innerHTML &&
      boxes[a].innerHTML === boxes[c].innerHTML
    ) {
      isGameOver = true;
      document.querySelector("#results").innerHTML = turn + " wins!";
      document.querySelector("#play-again").style.display = "inline";
      [boxes[a], boxes[b], boxes[c]].forEach((box) => {
        box.style.backgroundColor = "#08D9D6";
        box.style.color = "#000";
      });
      return;
    }
  }
}

function checkDraw() {
  if (!isGameOver && [...boxes].every((e) => e.innerHTML !== "")) {
    isGameOver = true;
    document.querySelector("#results").innerHTML = "Draw";
    document.querySelector("#play-again").style.display = "inline";
  }
}

function computerMove() {
  let emptyBoxes = [...boxes].filter((e) => e.innerHTML === "");
  if (emptyBoxes.length === 0) return;
  let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  randomBox.innerHTML = "O";
  checkWin();
  checkDraw();
  if (!isGameOver) changeTurn();
}

document.querySelector("#play-again").addEventListener("click", resetGame);

function resetGame() {
  isGameOver = false;
  turn = "X";
  document.querySelector(".bg").style.left = "0";
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#play-again").style.display = "none";
  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "#fff";
  });
}