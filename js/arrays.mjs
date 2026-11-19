// Zeynep Sudem Aktaş — 2025502009
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

// Form 1: take values out of an array by position.
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest)

// Form 2: skip the first item; collect the remaining items after the second.
const readingList = ['The Hobbit', 'Dune', 'Klara and the Sun', 'Piranesi']
const [, currentBook, ...laterBooks] = readingList
console.log('form 2:', currentBook, laterBooks)

// Form 3: swap two existing variables without a temporary variable.
let firstStop = 'Oslo'
let secondStop = 'Copenhagen'
;[firstStop, secondStop] = [secondStop, firstStop]
console.log('form 3:', firstStop, secondStop)

// Form 4: defaults are used when an array position is undefined or missing.
const [priority = 'normal', reminder = 'tomorrow'] = ['high']
console.log('form 4:', priority, reminder)
