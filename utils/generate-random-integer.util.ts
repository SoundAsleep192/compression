export function generateRandomInteger(min = 1, max = 300): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
