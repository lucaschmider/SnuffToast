/* eslint-disable */
export const firstArrayIndex = 0;
export function shuffle<T>(input: T[]): T[] {
  let currentIndex = input.length; let temporaryValue; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== firstArrayIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = input[currentIndex];
    input[currentIndex] = input[randomIndex];
    input[randomIndex] = temporaryValue;
  }

  return input;
}

export function removeFirstElement<T>(input: T[]): T[] {
  return input.filter((_, index) => index > firstArrayIndex);
}