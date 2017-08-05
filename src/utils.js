/**
 * Function to transpose a 2D array (M x N dimensional)
 */
export function transpose(arr) {
  return arr[0].map((item, index) => arr.map((x) => x[index]));
}

/**
 * Function to flip a 2D array vertically (M x N dimensional)
 */
export function flipVertically(arr) {
  return arr.slice().reverse();
}

/**
 * Function to flip a 2D array horizonally (M x N dimensional)
 */
export function flipHorizonally(arr) {
  return arr.map(line => line.slice().reverse());
}

/**
 * Function to get the diagonals of 2D arrays (N x N dimensional)
 */
export function getDiagonals(arr) {
  return [
    arr[0].map((item, index) => arr[index][index]),
    arr[0].map((item, index) => flipVertically(arr)[index][index]),
  ];
}

/**
 * Function to flatten a 2D array to 1D
 */
export function flatten(arr) {
  return arr.reduce((result, line) => [...result, ...line], []);
}

/**
 * Function to keep only unique elements of an array
 */
export function getUnique(arr) {
  return arr.reduce((result, item) => {
    return result.includes(item) ? result : [...result, item];
  });
}

/**
 * Function to get a random element from an array
 */
export function getRandom(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

/**
 * Function to get the frequencies of an array
 */
export function frequency(arr) {
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
export function isFilled(arr) {
  return arr.every(item => item);
}

/**
 * Function to get the values of an object
 */
export function values(obj) {
  return Object.keys(obj).map(key => obj[key]);
}
