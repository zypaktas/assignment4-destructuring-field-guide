// Zeynep Sudem Aktaş — 2025502009
// Bonus 2: type-level destructuring with infer and Parameters.

type First<T extends readonly unknown[]> =
  T extends readonly [infer Head, ...unknown[]] ? Head : never

type Rest<T extends readonly unknown[]> =
  T extends readonly [unknown, ...infer Tail] ? Tail : readonly []

type TaskTuple = readonly [number, string, boolean]
const firstTaskValue: First<TaskTuple> = 41
const remainingTaskValues: Rest<TaskTuple> = ['MIS', true]

type SaveHandler = (taskId: string, completed: boolean) => void
type SaveArguments = Parameters<SaveHandler>
const savedArguments: SaveArguments = ['T-01', false]

console.log('type-level First:', firstTaskValue)
console.log('type-level Rest:', remainingTaskValues)
console.log('Parameters<F>:', savedArguments)
