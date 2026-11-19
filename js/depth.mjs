// Zeynep Sudem Aktaş — 2025502009
// Bonus 2: depth experiments in JavaScript.

console.log('--- B2.1: strings are iterable ---')
const [firstLetter, secondLetter, ...remainingLetters] = 'Ada Lovelace'
console.log('first two:', firstLetter, secondLetter)
console.log('remaining:', remainingLetters.join('|'))

console.log('\n--- B2.2: Set and Map are iterable ---')
const [firstColor, ...otherColors] = new Set(['teal', 'coral', 'navy'])
console.log('Set:', firstColor, otherColors.join(', '))
const [[firstId, firstName], ...otherEntries] = new Map([
  ['A1', 'Mina'],
  ['A2', 'Eren'],
])
console.log('Map first entry:', firstId, firstName)
console.log('Map remaining entries:', JSON.stringify(otherEntries))

console.log('\n--- B2.3: destructuring consumes an iterator ---')
function* taskIds() {
  yield 'T-01'
  yield 'T-02'
  yield 'T-03'
}
const idIterator = taskIds()
const [firstTaskId, secondTaskId] = idIterator
console.log('destructured:', firstTaskId, secondTaskId)
console.log('next value after destructuring:', idIterator.next().value)

console.log('\n--- B2.4: defaults run only for undefined, from left to right ---')
let fallbackCalls = 0
const fallback = () => {
  fallbackCalls += 1
  return 'Untitled'
}
const { title = fallback(), status = 'todo' } = { title: 'Read' }
console.log('values:', title, status)
console.log('fallback calls:', fallbackCalls)
const { label = fallback() } = { label: null }
console.log('null keeps its value:', label)
console.log('fallback calls after null:', fallbackCalls)

const { width = 10, height = width * 2 } = {}
console.log('later default can use earlier binding:', width, height)
try {
  const { height: reversedHeight = reversedWidth * 2, width: reversedWidth = 10 } = {}
  console.log(reversedHeight, reversedWidth)
} catch (error) {
  console.log('reversed order:', error instanceof ReferenceError ? 'ReferenceError (temporal dead zone)' : 'unexpected error')
}

console.log('\n--- B2.5: destructuring assignment can target object properties ---')
const point = { x: 0, y: 0 }
;({ x: point.x, y: point.y } = { x: 3, y: 7 })
console.log('updated point:', point.x, point.y)

console.log('\n--- B2.6: for...of can destructure entry pairs ---')
const task = { title: 'Read', status: 'todo' }
for (const [key, value] of Object.entries(task)) {
  console.log(`${key}=${value}`)
}
console.log('for...in yields property names, not [key, value] pairs:')
for (const key in task) {
  console.log(key)
}
