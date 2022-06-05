export class LinesAndColumns {
  private readonly lineStartIndices: number[]

  public constructor(code: string) {
    const len = code.length
    const lineStartIndices = [0]
    for (let index = 0; index < len; index++) {
      const c = code[index]
      if (c === "\r") {
        const next = code[index + 1] || ""
        if (next === "\n") {
          index++
        }
        lineStartIndices.push(index + 1)
      } else if (c === "\n") {
        lineStartIndices.push(index + 1)
      }
    }
    this.lineStartIndices = lineStartIndices
  }

  public getLocFromIndex(index: number): { line: number; column: number } {
    const lineNumber = sortedLastIndex(this.lineStartIndices, index)
    return {
      line: lineNumber,
      column: index - this.lineStartIndices[lineNumber - 1],
    }
  }

  public getIndexFromLoc(loc: { line: number; column: number }): number {
    const lineStartIndex = this.lineStartIndices[loc.line - 1]
    const positionIndex = lineStartIndex + loc.column

    return positionIndex
  }
}

/**
 * Uses a binary search to determine the highest index at which value should be inserted into array in order to maintain its sort order.
 */
function sortedLastIndex(array: number[], value: number): number {
  let lower = 0
  let upper = array.length

  while (lower < upper) {
    const mid = Math.floor(lower + (upper - lower) / 2)
    const target = array[mid]
    if (target < value) {
      lower = mid + 1
    } else if (target > value) {
      upper = mid
    } else {
      return mid + 1
    }
  }

  return upper
}
