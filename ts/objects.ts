// Zeynep Sudem Aktaş — 2025502009
// The same six object forms as js/objects.mjs, now typed.

type Task = { id: string; title: string; status: 'todo' | 'in-progress' | 'done' }

// Form 5: properties are selected by their names.
const task: Task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status)

// Form 6: the property title is assigned to a new variable called bookName.
const book: { title: string; year: number } = { title: 'Dune', year: 1965 }
const { title: bookName } = book
console.log('form 6:', bookName)

// Form 7: an optional property can receive a default value.
type EventInfo = { name: string; location?: string | null; duration?: number }
const event: EventInfo = { name: 'MIS study session' }
const { location = 'Library', duration = 60 } = event
console.log('form 7:', location, duration)

// Form 8: the rest object contains the remaining properties.
const profile: { id: string; username: string; department: string; year: number } = {
  id: 'u7', username: 'zey', department: 'MIS', year: 2
}
const { id, ...profileDetails } = profile
console.log('form 8:', id, profileDetails)

// Form 9: nested patterns can reach properties and array positions.
type Project = { owner: { name: string; role: string }; milestones: string[] }
const project: Project = {
  owner: { name: 'Ada', role: 'lead' },
  milestones: ['prototype', 'testing', 'launch']
}
const { owner: { name: ownerName }, milestones: [firstMilestone, ...remainingMilestones] } = project
console.log('form 9:', ownerName, firstMilestone, remainingMilestones)

// Form 10: the computed property key is a string known at runtime.
const selectedField: 'status' = 'status'
const ticket = { id: 't9', status: 'in-progress' as const, title: 'Fix login' }
const { [selectedField]: selectedValue } = ticket
console.log('form 10:', selectedField, selectedValue)
