import { deserialize, serialize } from './compression'
import { generateArray, generateRandomInteger } from './utils'
import { range } from './utils/range.util'

interface Samples {
  deserialized: number[]
  ratio: number
}

function getSamples(array: number[]): Samples {
  const simple = array.toString()
  const serialized = serialize(array)
  const ratio = ((simple.length - serialized.length) / simple.length) * 100
  const deserialized = deserialize(serialized)

  return { deserialized, ratio }
}

describe('Compress', () => {
  const ratios: number[] = []
  test('Простейшие короткие', () => {
    const array = generateArray(10).map(() => generateRandomInteger(1, 9))
    const { deserialized, ratio } = getSamples(array)

    ratios.push(ratio)

    expect(deserialized).toEqual(array)
  })

  test.each([50, 100, 500, 1000])('Случайные %s чисел', (length) => {
    const array = generateArray(length).map(() => generateRandomInteger(1, 300))
    const { ratio, deserialized } = getSamples(array)

    ratios.push(ratio)

    expect(deserialized).toEqual(array)
  })

  test.each([
    { from: 0, to: 10 },
    { from: 10, to: 100 },
    { from: 100, to: 300 },
  ])('Числа в диапазоне между $from и $to', ({ from, to }) => {
    const array = range(from, to)

    const { ratio, deserialized } = getSamples(array)

    ratios.push(ratio)

    expect(deserialized).toEqual(array)
  })

  test('Каждого числа из диапазона по 3 раза', () => {
    const array = new Array(3).fill(range(1, 300)).flat()
    const { ratio, deserialized } = getSamples(array)

    ratios.push(ratio)

    expect(deserialized).toEqual(array)
  })

  test('Степень сжатия в среднем должна быть >50%', () => {
    const averageRatio =
      ratios.reduce((acc, ratio) => acc + ratio, 0) / ratios.length

    expect(averageRatio).toBeGreaterThan(50)
  })
})
