// Pseudocode
// 1. Create a gameboard
// 2. Create players
// 3. Create game loop
// 4. Create win conditions
// 5. Create draw condition
// 6. Add functionality
// 7. Create reset button
// 8. Add styling

function TicTacToeGameboard() {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const markCell = (row, column, player) => {
    if (board[row][column] === "") {
      board[row][column] = `${player}`;
    }
  };

  const getBoard = () => board;

  return {
    getBoard,
    markCell,
  };
}

////////////////////////////////////////////////////////////////////////

function GameController(playerOneName = "X", playerTwoName = "O") {
  const board = TicTacToeGameboard();

  const players = [
    {
      name: playerOneName,
      mark: "X",
    },
    {
      name: playerTwoName,
      mark: "O",
    },
  ];

  let activePlayer = players[0];

  // Game status
  let gameOngoing = true;
  const getGameStatus = () => gameOngoing;

  // Game winner
  let winner = false;
  const getWinner = () => winner;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.getBoard();
    console.log(`${getActivePlayer().name} turn. `);
  };

  const printBoard = () => console.log(board.getBoard());

  function checkWin(board, player) {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (
        (board[i][0] === player &&
          board[i][1] === player &&
          board[i][2] === player) ||
        (board[0][i] === player &&
          board[1][i] === player &&
          board[2][i] === player)
      ) {
        console.log(`${player} wins!`);

        winner = player;
        gameOngoing = false;
        return true;
      }
    }

    // Check diagonals
    if (
      (board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player) ||
      (board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player)
    ) {
      console.log(`${player} wins!`);

      winner = player;
      gameOngoing = false;
      return true;
    }

    return false; // No win condition
  }

  function checkDraw(board) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          return false;
        }
      }
    }
    console.log("Draw!");

    gameOngoing = false;
    return true;
  }

  const playRound = (row, column) => {
    if (board.getBoard()[row][column] === "") {
      console.log(
        `Marking ${
          getActivePlayer().name
        } mark into row ${row} and column ${column}... `
      );
      board.markCell(row, column, getActivePlayer().mark);
      printBoard();

      if (checkWin(board.getBoard(), getActivePlayer().mark)) return;
      if (checkDraw(board.getBoard())) return;

      switchPlayerTurn();
      printNewRound();
    } else {
      console.log(`Already marked, please mark another cell`);
      return false;
    }
    // board.getBoard().forEach(() => row);
  };

  // reset the game function
  const resetTheGame = () => {
    for (let i = 0; i < board.getBoard().length; i++) {
      for (let j = 0; j < board.getBoard()[i].length; j++) {
        board.getBoard()[i][j] = "";
      }
    }
    gameOngoing = true;
    winner = false;
  };

  // print first Round
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    resetTheGame,
    getBoard: board.getBoard,
    getGameStatus,
    getWinner,
  };
}

////////////////////////////////////////// UI
function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const gameStatusDiv = document.querySelector(".gameStatus");
  const resetButton = document.querySelector("#reset");

  function updateGameStatusDiv() {
    const gameStatus = game.getGameStatus();

    if (gameStatus && !game.getWinner()) {
      gameStatusDiv.textContent = "";
    } else if (game.getWinner()) {
      playerTurnDiv.textContent = "";
      gameStatusDiv.textContent = `${game.getActivePlayer().name} wins!`;
    } else {
      playerTurnDiv.textContent = "";
      gameStatusDiv.textContent = "Draw, no winner :(";
    }
  }
  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name} turn...`;

    // Display game status
    updateGameStatusDiv();

    // Render board squares
    board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create data attributes to identify the rows and columns
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = board[rowIndex][columnIndex];
        boardDiv.appendChild(cellButton);
      });
    });
  };
  // Add event listener for the board
  function clickHandlerBoard(e) {
    // Get the selected row and column
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a row or column and not the gaps in between
    if (!selectedColumn || !selectedRow) return;

    // Make sure the game is still going
    if (!game.getGameStatus()) return;

    // Play round
    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // reset the game function
  const resetTheGameOnScreen = () => {
    // Reset the game state
    game.resetTheGame();

    // Reset the UI
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => (cell.textContent = ""));

    // Update the screen
    updateScreen();
  };

  // Add functionality to reset button
  resetButton.addEventListener("click", resetTheGameOnScreen);

  // Initial render
  updateScreen();
}

ScreenController();
