/**
 * Copy from Lodash/shuffle(https://github.com/lodash/lodash/blob/master/shuffle.js)
 */

function shuffle(array) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  let index = -1;
  const lastIndex = length - 1;
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = array[rand];
    array[rand] = array[index];
    array[index] = value;
  }
  return array;
}

export default shuffle;
