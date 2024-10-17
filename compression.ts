const plus100prefix = String.fromCharCode(110)
const plus200prefix = String.fromCharCode(115)
const plus300prefix = String.fromCharCode(120)

export function serialize(array: number[]): string {
  return array
    .map((n) => {
      const value = String.fromCharCode(n % 100)
      if (n >= 100 && n < 200) {
        return plus100prefix + value
      }

      if (n >= 200 && n < 300) {
        return plus200prefix + value
      }

      if (n === 300) {
        return plus300prefix + value
      }

      return value
    })
    .join('')
}

export function deserialize(text: string): number[] {
  const result: number[] = []

  let num = 0
  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (char === plus100prefix) {
      num += 100
      continue
    }

    if (char === plus200prefix) {
      num += 200
      continue
    }

    if (char === plus300prefix) {
      num += 300
      continue
    }

    num += char.charCodeAt(0)
    result.push(num)
    num = 0
  }

  return result
}
