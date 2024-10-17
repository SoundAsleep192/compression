export function range(from: number, to: number): number[] {
  return Array.from({ length: to - from }, (_, i) => from + i)
}
