// Zeynep Sudem Aktaş — 2025502009
// Things that surprise people. Run with `node js/pitfalls.mjs`.

// Pitfall 1: destructuring undefined or null throws a TypeError.
try {
  const { a } = undefined
  console.log(a)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name)
}

// Pitfall 2: a default applies to undefined, not null.
const { reminder: missingReminder = 'none' } = {}
const { reminder: nullReminder = 'none' } = { reminder: null }
console.log('pitfall 2:', missingReminder, nullReminder)

// Pitfall 3: assignment destructuring that starts with { needs parentheses.
const source = { count: 3 }
let count
;({ count } = source)
console.log('pitfall 3:', count)

// Pitfall 4: object destructuring is shallow; nested objects remain shared references.
const original = { settings: { theme: 'light' } }
const { settings: copiedSettings } = original
copiedSettings.theme = 'dark'
console.log('pitfall 4:', original.settings.theme)

// Pitfall 5: object properties are selected by name; array values are selected by position.
const person = { name: 'Mina', city: 'Istanbul' }
const { city, name } = person
const [firstValue, secondValue] = ['Mina', 'Istanbul']
console.log('pitfall 5:', city, name, '|', firstValue, secondValue)
