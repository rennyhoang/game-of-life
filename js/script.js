// setup
const container = document.querySelector("#container");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const randomButton = document.querySelector("#random");
const clearButton = document.querySelector("#clear");
const numOfRows = 100;
const numOfCols = 100;
const mat = [];
let state = [];
let gameID = 0;

for (let i = 0; i < numOfRows; i++) {
  const rowCells = [];

  const newRow = document.createElement("div");
  newRow.classList.add("row");

  for (let j = 0; j < numOfCols; j++) {
    const newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.classList.add("dead");
    newCell.addEventListener("click", () => {
      if (newCell.classList.contains("dead")) {
        newCell.classList.remove("dead");
        newCell.classList.add("alive");
      } else {
        newCell.classList.remove("alive");
        newCell.classList.add("dead");
      }
    });
    newRow.appendChild(newCell);
    rowCells.push(newCell);
  }

  container.append(newRow);
  mat.push(rowCells);
}

startButton.onclick = () => {
  runGameOfLife(mat);
};

stopButton.onclick = () => {
  clearInterval(gameID);
  startButton.style.border = "0px";
};

randomButton.onclick = () => {
  randomizeCells(mat);
};

clearButton.onclick = () => {
  clearCells(mat);
};

function runGameOfLife(cells) {
  gameID = setInterval(updateFrame, 200, cells);
  startButton.style.border = "1px solid #a6e3a1";
}

function randomizeCells(cells) {
  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[0].length; col++) {
      const randomNum = Math.round(Math.random());
      if (randomNum == 1) {
        cells[row][col].classList.remove("alive");
        cells[row][col].classList.add("dead");
      } else {
        cells[row][col].classList.remove("dead");
        cells[row][col].classList.add("alive");
      }
    }
  }
}

function clearCells(cells) {
  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[0].length; col++) {
      cells[row][col].classList.remove("alive");
      cells[row][col].classList.add("dead");
    }
  }
}

function updateFrame(cells) {
  state = saveState(cells);
  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[0].length; col++) {
      const currCell = cells[row][col];
      const neighbors = getNeighbors(state, row, col);
      const numAlive = getNumAlive(neighbors);
      if (currCell.classList.contains("alive")) {
        if (numAlive < 2) {
          currCell.classList.remove("alive");
          currCell.classList.add("dead");
        }
        if (numAlive > 3) {
          currCell.classList.remove("alive");
          currCell.classList.add("dead");
        }
      } else {
        if (numAlive == 3) {
          currCell.classList.remove("dead");
          currCell.classList.add("alive");
        }
      }
    }
  }
}

function getNeighbors(cells, row, col) {
  const maxRow = cells.length - 1;
  const maxCol = cells[0].length - 1;
  const neighbors = [];

  for (let i = row - 1; i < row + 2; i++) {
    for (let j = col - 1; j < col + 2; j++) {
      if (
        i >= 0 &&
        i <= maxRow &&
        j >= 0 &&
        j <= maxCol &&
        (i != row || j != col)
      ) {
        neighbors.push(cells[i][j]);
      }
    }
  }

  return neighbors;
}

function getNumAlive(cells) {
  let count = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == "alive") {
      count += 1;
    }
  }
  return count;
}

function saveState(cells) {
  const newState = [];
  for (let i = 0; i < cells.length; i++) {
    const newRow = [];
    for (let j = 0; j < cells[0].length; j++) {
      if (cells[i][j].classList.contains("dead")) {
        newRow.push("dead");
      } else {
        newRow.push("alive");
      }
    }
    newState.push(newRow);
  }

  return newState;
}
