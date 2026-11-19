// Zeynep Sudem Aktaş — 2025502009
// Object destructuring (forms 5 to 10). Run with `node js/objects.mjs`.

// Form 5: take properties out of an object by name.
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status)

// Form 6: rename a property while extracting it.
const book = { title: 'Dune', year: 1965 }
const { title: bookName } = book
console.log('form 6:', bookName)

// Form 7: use a default when the property is absent/undefined (not null).
const event = { name: 'MIS study session' }
const { location = 'Library', duration = 60 } = event
console.log('form 7:', location, duration)

// Form 8: collect the remaining own enumerable properties into a new object.
const profile = { id: 'u7', username: 'zey', department: 'MIS', year: 2 }
const { id, ...profileDetails } = profile
console.log('form 8:', id, profileDetails)

// Form 9: nested object and array patterns.
const project = {
  owner: { name: 'Ada', role: 'lead' },
  milestones: ['prototype', 'testing', 'launch']
}
const { owner: { name: ownerName }, milestones: [firstMilestone, ...remainingMilestones] } = project
console.log('form 9:', ownerName, firstMilestone, remainingMilestones)

// Form 10: use the value of a variable as the property name.
const selectedField = 'status'
const ticket = { id: 't9', status: 'in-progress', title: 'Fix login' }
const { [selectedField]: selectedValue } = ticket
console.log('form 10:', selectedField, selectedValue)
