// Zeynep Sudem Aktaş — 2025502009
// The same four array forms as js/arrays.mjs, now typed.

// Form 1: a tuple return type records the type of each position.
function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest)

// Form 2: a tuple makes the positions and the rest element explicit.
const bookQueue: [string, string, ...string[]] = ['The Hobbit', 'Dune', 'Klara and the Sun', 'Piranesi']
const [, currentBook, ...laterBooks] = bookQueue
console.log('form 2:', currentBook, laterBooks)

// Form 3: destructuring assignment swaps values while preserving their types.
let firstStop: string = 'Oslo'
let secondStop: string = 'Copenhagen'
;[firstStop, secondStop] = [secondStop, firstStop]
console.log('form 3:', firstStop, secondStop)

// Form 4: annotate the tuple so each position has a known type.
const [priority = 'normal', reminder = 'tomorrow']: [string?, string?] = ['high']
console.log('form 4:', priority, reminder)
