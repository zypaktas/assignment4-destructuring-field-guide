// Zeynep Sudem Aktaş — 2025502009
// Forms 11 and 12 in TypeScript, with types on the complete parameter pattern.

type TaskInput = { title?: string; status?: 'todo' | 'done' }

// Form 11: the type annotation follows the entire destructuring pattern.
function createTask({ title = 'Untitled', status = 'todo' }: TaskInput = {}) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' }))

// Form 11b: tuple parameter types describe the array positions.
const formatCoordinate = ([latitude, longitude]: [number, number]): string => `${latitude}, ${longitude}`
console.log('form 11b:', formatCoordinate([41.0, 29.0]))

// Form 12a: Object.entries returns string-keyed pairs; values are string | boolean here.
const settings: { theme: string; notifications: boolean } = { theme: 'dark', notifications: true }
const settingSummary: string[] = []
for (const [key, value] of Object.entries(settings)) {
  settingSummary.push(`${key}=${value}`)
}
console.log('form 12a:', settingSummary.join(', '))

// Form 12b: Map is generic over its key and value types.
const seatAssignments = new Map<string, string>([['A1', 'Mina'], ['A2', 'Eren']])
const seatSummary: string[] = []
for (const [seat, student] of seatAssignments) {
  seatSummary.push(`${seat}:${student}`)
}
console.log('form 12b:', seatSummary.join(', '))
