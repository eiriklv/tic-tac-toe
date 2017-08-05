Tic Tac Toe
===========

Full example of modeling problems with data and functions using JavaScript / React. [Try it out here](https://eiriklv.github.io/tic-tac-toe).

### How to run

- `yarn install`
- `yarn start`

### Boiled down essentials

```js
/**
 * Example of empty game using 2D representation
 */
const exampleGame2D = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

/**
 * Example of empty game using 1D representation
 */
const exampleGame1D = ['', '', '', '', '', '', '', '', ''];
const width = 3;

/**
 * Example of game in progress (2D)
 */
const exampleGameInProgress2D = [
  ['o', '', 'x'],
  ['', 'o', 'x'],
  ['', '', ''],
];

/**
 * Example of game in progress (1D)
 */
const exampleGameInProgress1D = ['o', '', 'x', '', 'o', 'x', '', '', ''];

/**
 * Function to transpose a 2D array (M x N dimensional)
 */
function transpose(arr) {
  return arr[0].map((item, index) => arr.map((x) => x[index]));
}

/**
 * Function to flip a 2D array vertically (M x N dimensional)
 */
function flipVertically(arr) {
  return arr.slice().reverse();
}

/**
 * Function to flip a 2D array horizonally (M x N dimensional)
 */
function flipHorizonally(arr) {
  return arr.map(line => line.slice().reverse());
}

/**
 * Function to get the diagonals of 2D arrays (N x N dimensional)
 */
function getDiagonals(arr) {
  return [
    arr[0].map((item, index) => arr[index][index]),
    arr[0].map((item, index) => flipVertically(arr)[index][index]),
  ];
}

/**
 * Function to flatten a 2D array to 1D
 */
function flatten(arr) {
  return arr.reduce((result, line) => [...result, ...line], []);
}

/**
 * Function to keep only unique elements of an array
 */
function getUnique(arr) {
  return arr.reduce((result, item) => {
    return result.includes(item) ? result : [...result, item];
  });
}

/**
 * Function to get a random element from an array
 */
function getRandom(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

/**
 * Function to get the frequencies of an array
 */
function frequency(arr) {
  return arr.reduce((result, item) => {
    return {
      ...result,
      [item]: (result[item] || 0) + 1
    };
  }, {});
}

/**
 * Function to check if an array is only filled with truthy values
 */
function isFilled(arr) {
  return arr.every(item => item);
}

/**
 * Function to get the values of an object
 */
function values(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

/**
 * Constructor function to create a new game
 */
function createGame() {
  return [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
}

/**
 * Selector function to get the winner
 */
function getWinner(game) {
  /**
   * Generate all lines of the game
   */
  const lines = [
    ...game,
    ...transpose(game),
    ...getDiagonals(game),
  ];

  /**
   * Get any filled lines
   */
  const filledLines = lines.filter(isFilled);

  /**
   * Return if the game is finished
   */
  return filledLines.reduce((winner, line) => {
    return winner || (getUnique(line).length === 1 ? getUnique(line)[0] : null);
  }, null);
}

/**
 * Selector function to check if game has finished
 */
function isFinished(game) {
  /**
   * Check if board is filled
   */
  const everyLineInGameIsFilled = game.every(isFilled);

  /**
   * Check if there is a winner
   */
  const hasWinner = !!getWinner(game);

  /**
   * The game is finished either if all the
   * tiles are filled or we have winner
   */
  return everyLineInGameIsFilled || hasWinner;
}

/**
 * Selector function to get who's turn it is (we'll assume that 'x' always start)
 */
function getNextPlayer(game) {
  /**
   * Flatten the game board to a 1D array for easier processing
   */
  const tiles = flatten(game);

  /**
   * Get the frequency of each player on the board
   */
  const {
    x = 0,
    o = 0,
  } = frequency(tiles);

  /**
   * Create e representation of the player frequencies for further processing
   */
  const players = { o, x };

  /**
   * Return the symbol of the next player
   */
  return Object.keys(players)
  .filter(x => x)
  .reduce((nextPlayer, player) => {
    const count = players[player];
    return count <= nextPlayer.count ? { player, count } : nextPlayer;
  }, { player: 'none', count: Infinity }).player;
}

/**
 * Selector function to get the available tiles (indices of a 1D array)
 */
function getAvailableTiles(game) {
  return flatten(game)
  .reduce((result, tile, index) => tile ? result : [...result, index], []);
}

/**
 * Update function to fill a tile on the game board
 */
export function fillTile({ player, index }, game) {
  /**
   * Flatten the game board to a 1D array
   */
  const flattenedGame = flatten(game);

  /**
   * Update the indexed tile
   */
  const updatedFlattenedGame = [
    ...flattenedGame.slice(0, index),
    player,
    ...flattenedGame.slice(index + 1)
  ];

  /**
   * Return an updated game board transformed back to a 2D array
   */
  return game[0].map((_, index) => {
    return updatedFlattenedGame.slice(index * game.length, (index + 1) * game.length);
  });
}

/**
 * Game simulation
 */
const testGame = [
  ['x', 'o', 'x'],
  ['o', 'x', 'o'],
  ['x', 'x', 'o'],
];

/**
 * Results
 *
 * NOTE: We only have a single data structure (the 2D representation of the game board),
 * but many functions that operate on it independently (stratified design)
 * - constructor
 * - selectors
 * - update functions
 */
console.log(getNextPlayer(testGame))
console.log(isFinished(testGame))
console.log(getWinner(testGame))

/**
 * Update example
 */
const updatedGame = fillTile({ player: 'x', index: 4 }, [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]);

/**
 * Result
 */
console.log(updatedGame);

/**
 * Now we can create a complete game loop that plays the game automatically until someone wins
 */
let myGame = createGame();

while (!isFinished(myGame)) {
  const nextPlayer = getNextPlayer(myGame);
  const availableTiles = getAvailableTiles(myGame);

  myGame = fillTile({
    player: nextPlayer,
    index: getRandom(availableTiles)
  }, myGame);
}

/**
 * Result
 */
console.log(myGame);
console.log('The winner is', getWinner(myGame));
```
