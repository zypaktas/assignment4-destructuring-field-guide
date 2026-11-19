// Zeynep Sudem Aktaş — 2025502009
// TypeScript topics T1 to T5.

// T1: in a pattern, { x: horizontal } renames x; it is not a type annotation.
const point = { x: 1, y: 2 }
const { x: horizontal } = point
console.log('T1:', horizontal)
// Correct type placement: annotate the whole pattern after the closing brace.
const { y: vertical }: { y: number } = point
console.log('T1 type:', vertical)

// T2: tuple return types preserve the type of each position; `as const` makes a readonly tuple.
function getBookInfo(): [number, string] {
  return [1965, 'Dune']
}
const [publicationYear, bookTitle] = getBookInfo()
const fixedPair = [7, 'seven'] as const
const [luckyNumber, numberWord] = fixedPair
console.log('T2:', publicationYear, bookTitle, '|', luckyNumber, numberWord)

// T3: with noUncheckedIndexedAccess, reading an arbitrary array position may yield undefined.
const items: string[] = ['first item']
const [firstItem] = items // type: string | undefined
const safeFirstItem = firstItem ?? 'fallback item'
console.log('T3:', safeFirstItem)

// T4: an optional property may be undefined; a default removes undefined from the local variable type.
type Preferences = { nickname?: string | null }
const preferences: Preferences = {}
const { nickname } = preferences // string | null | undefined
const { nickname: displayName = 'Guest' } = preferences // string | null
console.log('T4:', nickname, displayName)

// T5: TypeScript rejects a string where a number is required. The expected error is intentional.
function square(value: number): number {
  return value * value
}
// @ts-expect-error T5: Argument of type 'string' is not assignable to parameter of type 'number'.
square('4')
console.log('T5:', square(4))
