type Grid = string[][]
 
function parse(input: string): Grid[] {
    return input
        .trim()
        .split(/\n{2,}/)
        .map((chunk) => {
            const lines = chunk.split('\n')
            const grid = Array.from({ length: lines.length }, (_, y) => {
                return Array.from(
                    { length: lines[0].length },
                    (_, x) => lines[y][x],
                )
            })
            return grid
        })
}
 
function intersect<T>(a: Set<T>, b: Set<T>): Set<T> {
    const intersection = new Set<T>()
    for (const v of a) {
        if (b.has(v)) intersection.add(v)
    }
    for (const v of b) {
        if (a.has(v)) intersection.add(v)
    }
    return intersection
}
 
function isReflection(line: readonly string[], a: number): boolean {
    // a goes backward, b goes forward
    let b = a + 1
    do {
        if (line[a] === line[b]) {
            b++
            a--
            continue
        } else {
            return false
        }
    } while (b < line.length && a >= 0)
    return true
}
 
// O(n^2) approach to find indexes where the line can be reflected.
function findLineReflections(line: readonly string[]): Set<number> {
    const indexes = new Set<number>()
    for (let i = 0; i < line.length; i++) {
        if (isReflection(line, i)) {
            indexes.add(i)
        }
    }
    return indexes
}
 
// Finds the common reflection index across all the lines
function findVerticalReflection(lines: Grid, exclude: number): number {
    let acc = findLineReflections(lines[0])
    for (const line of lines) {
        acc = intersect(acc, findLineReflections(line))
    }
 
    // In part 2, a grid's old reflection might still be valid
    acc.delete(exclude)
 
    // debug: acc should either be empty or have one value
    if (acc.size !== 0 && acc.size !== 1) {
        throw new Error(`unexpected acc: ${acc}`)
    }
 
    return acc.size === 1 ? acc.values().next().value : -1
}
 
function transpose(grid: Grid): Grid {
    return Array.from({ length: grid[0].length }, (_, y) =>
        Array.from({ length: grid.length }, (_, x) => grid[x][y]),
    )
}
 
function findHorizontalReflection(lines: Grid, exclude: number): number {
    return findVerticalReflection(transpose(lines), exclude)
}
 
// For part 1, we know we will only find either a vert or horiz reflection
function summarize(lines: Grid): number {
    const cols = findVerticalReflection(lines, -1) + 1
    const rows = findHorizontalReflection(lines, -1) + 1
    return cols + 100 * rows
}
 
function* smudgePermutations(grid: Grid): Generator<Grid> {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const copy = JSON.parse(JSON.stringify(grid))
            copy[y][x] = grid[y][x] === '#' ? '.' : '#'
            yield copy
        }
    }
}
 
function findSmudgeAlternateScore(grid: Grid): number {
    const v = findVerticalReflection(grid, -1)
    const h = findHorizontalReflection(grid, -1)
 
    for (const alt of smudgePermutations(grid)) {
        const av = findVerticalReflection(alt, v)
        const ah = findHorizontalReflection(alt, h)
        if (av !== v && av !== -1) {
            // vertical reflection changed, so score based on new vertical reflection
            return av + 1
        } else if (ah !== h && ah !== -1) {
            // horizontal reflection changed, so score based on new horizontal reflection
            return 100 * (ah + 1)
        }
    }
 
    return 0
}

let input = require('fs').readFileSync('input.txt', { encoding: 'utf8' })
 
function part2(input: string) {
    return parse(input).reduce(
        (acc, grid) => acc + findSmudgeAlternateScore(grid),
        0,
    )
}
 
console.log('part 2:', part2(input))