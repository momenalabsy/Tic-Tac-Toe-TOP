# Tic Tac Toe Game

## Introduction
This code implements a simple Tic Tac Toe game with a basic user interface. The game consists of a gameboard, players, and a game controller that manages the game logic. The user interface is handled by a screen controller that allows players to interact with the game.

## Pseudocode
1. **Create a gameboard**
   - Initialize a 3x3 gameboard with empty cells.

2. **Create players**
   - Define two players with names "X" and "O" by default.

3. **Create game loop**
   - Implement a game loop that allows players to take turns until there is a winner or a draw.

4. **Create win conditions**
   - Check for win conditions by examining rows, columns, and diagonals.

5. **Create draw condition**
   - Check for a draw when all cells are filled without a winner.

6. **Add functionality**
   - Allow players to mark cells, switch turns, and check for the game's status.

7. **Create reset button**
   - Implement a reset button to restart the game.

8. **Add styling**
   - Add basic styling to the user interface.

## Code Overview

### `TicTacToeGameboard` Function
- Creates and manages the gameboard.
- Provides methods to mark a cell and retrieve the current state of the board.

### `GameController` Function
- Manages the game logic.
- Tracks players, the active player, game status, and winner.
- Checks for win and draw conditions.
- Provides methods for playing rounds, resetting the game, and getting game information.

### `ScreenController` Function
- Handles the user interface.
- Displays the gameboard, player turns, and game status.
- Implements event listeners for player moves and the reset button.

## How to Use
1. Run the code in a suitable JavaScript environment (e.g., a browser console).
2. The initial game state and player turns will be displayed.
3. Click on the gameboard cells to make a move.
4. The game status, player turns, and the winner will be updated in real-time.
5. Use the reset button to start a new game.

## Note
This code provides a console-based user interface along with a minimal HTML representation for the game. Further enhancements can be made for a more polished and interactive user experience.
