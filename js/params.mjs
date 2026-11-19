// Zeynep Sudem Aktaş — 2025502009
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11: destructure an options object in the parameter list; default the whole parameter.
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' }))

// Form 11b: destructure an array parameter. The parameter itself must be supplied.
const formatCoordinate = ([latitude, longitude]) => `${latitude}, ${longitude}`
console.log('form 11b:', formatCoordinate([41.0, 29.0]))

// Form 12a: Object.entries returns [key, value] pairs, which can be destructured in a loop.
const settings = { theme: 'dark', notifications: true }
const settingSummary = []
for (const [key, value] of Object.entries(settings)) {
  settingSummary.push(`${key}=${value}`)
}
console.log('form 12a:', settingSummary.join(', '))

// Form 12b: Map iteration also yields [key, value] pairs.
const seatAssignments = new Map([['A1', 'Mina'], ['A2', 'Eren']])
const seatSummary = []
for (const [seat, student] of seatAssignments) {
  seatSummary.push(`${seat}:${student}`)
}
console.log('form 12b:', seatSummary.join(', '))
