# Destructuring Field Guide

Name: **Zeynep Sudem Aktaş**  
Student number: **2025502009**

Bonuses claimed: **Bonus 1: LaTeX; Bonus 2: Depth; Bonus 3: Real code**. Bonus 4 (Git repository) is not claimed yet.

## Run

```bash
npm install
npm run all      # runs the JavaScript and TypeScript examples
npm run check    # type-checks everything in strict mode
npm run all > output.txt
```

Use Node.js 20.19 or newer. Do not submit `node_modules`.

## What destructuring does

Destructuring takes values out of an array or an object and assigns them to variables with one pattern on the left side of an assignment. It is shorter than writing one property or index lookup for every variable. Array patterns use positions; object patterns use property names.

A useful way to understand any pattern is to rewrite it as ordinary assignments. For example, `const [x, y] = pair` is conceptually similar to `const x = pair[0]; const y = pair[1]`. Likewise, `const { title } = task` is similar to `const title = task.title`.

## Field guide

### Form 1: array values by position, `const [x, y] = f()`

**Syntax:** `const [first, second] = someArray`.

**Example** (`js/arrays.mjs`):

```js
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest)
```

**Output:** `form 1: 2 9`

**Use it when:** a function returns a small group of values whose positions have a clear meaning, such as a minimum and maximum.

**Watch out:** positions matter. If the returned array order changes, the variables receive different values. A missing position becomes `undefined` unless a default is supplied.

### Form 2: skip an item and collect the rest, `const [, second, ...others] = list`

**Syntax:** commas leave positions unused; `...name` in a pattern collects the remaining elements into a new array.

**Example** (`js/arrays.mjs`):

```js
const readingList = ['The Hobbit', 'Dune', 'Klara and the Sun', 'Piranesi']
const [, currentBook, ...laterBooks] = readingList
console.log('form 2:', currentBook, laterBooks)
```

**Output:** `form 2: Dune [ 'Klara and the Sun', 'Piranesi' ]`

**Use it when:** the first value is irrelevant, but later positions or all remaining values are useful.

**Watch out:** the rest element must be last in its pattern. It collects the remaining items; it does not include the skipped first item. Rest in a pattern collects, while spread in an expression expands.

### Form 3: swap two variables, `[a, b] = [b, a]`

**Syntax:** `[left, right] = [right, left]`.

**Example** (`js/arrays.mjs`):

```js
let firstStop = 'Oslo'
let secondStop = 'Copenhagen'
;[firstStop, secondStop] = [secondStop, firstStop]
console.log('form 3:', firstStop, secondStop)
```

**Output:** `form 3: Copenhagen Oslo`

**Use it when:** two already-declared variables need to exchange values.

**Watch out:** this is assignment destructuring, not a declaration, so the variables must already exist. Parentheses are needed when an object pattern starts an assignment statement; the leading semicolon here protects against automatic semicolon insertion after a preceding line.

### Form 4: array defaults, `const [a = 1, b = 2] = values`

**Syntax:** put `= defaultValue` after a pattern position.

**Example** (`js/arrays.mjs`):

```js
const [priority = 'normal', reminder = 'tomorrow'] = ['high']
console.log('form 4:', priority, reminder)
```

**Output:** `form 4: high tomorrow`

**Use it when:** an array may omit a position or contain `undefined`, and a useful fallback is needed.

**Watch out:** the default is used for `undefined`, including a missing array position. It is not used for `null`, `false`, `0`, or an empty string.

### Form 5: object properties by name, `const { a, b } = object`

**Syntax:** property names on the left match keys on the object.

**Example** (`js/objects.mjs`):

```js
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status)
```

**Output:** `form 5: Buy milk todo`

**Use it when:** several known properties of an object are needed in the current scope.

**Watch out:** unlike array destructuring, property order does not matter. The property names must match the object keys unless a rename is used. The source must not be `null` or `undefined`.

### Form 6: rename a property, `const { a: alpha } = object`

**Syntax:** `{ originalProperty: newVariableName }`.

**Example** (`js/objects.mjs`):

```js
const book = { title: 'Dune', year: 1965 }
const { title: bookName } = book
console.log('form 6:', bookName)
```

**Output:** `form 6: Dune`

**Use it when:** the property name is unclear in the current context or conflicts with an existing variable name.

**Watch out:** `title` is the source property and `bookName` is the variable created. There is no new variable called `title` in this example. Read the colon as “take `title` and call it `bookName`.”

### Form 7: object defaults, `const { a = 1 } = object`

**Syntax:** add a default after the property variable.

**Example** (`js/objects.mjs`):

```js
const event = { name: 'MIS study session' }
const { location = 'Library', duration = 60 } = event
console.log('form 7:', location, duration)
```

**Output:** `form 7: Library 60`

**Use it when:** an object property is optional and the code needs a fallback value.

**Watch out:** the default applies when the property is missing or its value is `undefined`. If the property is explicitly `null`, the result stays `null`.

### Form 8: object rest, `const { a, ...others } = object`

**Syntax:** extract selected properties first; `...others` collects the remaining enumerable own properties into a new object.

**Example** (`js/objects.mjs`):

```js
const profile = { id: 'u7', username: 'zey', department: 'MIS', year: 2 }
const { id, ...profileDetails } = profile
console.log('form 8:', id, profileDetails)
```

**Output:** `form 8: u7 { username: 'zey', department: 'MIS', year: 2 }`

**Use it when:** one or more properties should be separated from the remaining object, for example before forwarding the remaining props.

**Watch out:** the rest object is a shallow copy of the remaining properties. Nested objects inside it are still shared references. Rest must be the last item in the object pattern.

### Form 9: nested patterns, `{ owner: { name }, milestones: [first] }`

**Syntax:** put another object or array pattern inside a property pattern.

**Example** (`js/objects.mjs`):

```js
const project = {
  owner: { name: 'Ada', role: 'lead' },
  milestones: ['prototype', 'testing', 'launch']
}
const { owner: { name: ownerName }, milestones: [firstMilestone, ...remainingMilestones] } = project
console.log('form 9:', ownerName, firstMilestone, remainingMilestones)
```

**Output:** `form 9: Ada prototype [ 'testing', 'launch' ]`

**Use it when:** the required values are nested inside an object or an array stored in an object property.

**Watch out:** every intermediate object or array must exist. If `owner` is `undefined`, trying to destructure `name` from it throws a `TypeError`. Deep patterns can become difficult to read; split them into steps when necessary.

### Form 10: computed property key, `const { [key]: value } = object`

**Syntax:** put an expression in square brackets to select the property dynamically.

**Example** (`js/objects.mjs`):

```js
const selectedField = 'status'
const ticket = { id: 't9', status: 'in-progress', title: 'Fix login' }
const { [selectedField]: selectedValue } = ticket
console.log('form 10:', selectedField, selectedValue)
```

**Output:** `form 10: status in-progress`

**Use it when:** the property to extract is stored in a variable or computed at runtime.

**Watch out:** the brackets evaluate the key expression. The colon still renames the selected property into a local variable; it does not create a variable named after the expression.

### Form 11: destructured function parameters, `function f({ a = 1 } = {})`

**Syntax:** destructure the options object in the parameter list. The type annotation in TypeScript belongs after the complete pattern.

**Example** (`js/params.mjs`):

```js
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' }))
```

**Output:** `form 11: { title: 'Read', status: 'todo' }`

**Use it when:** a function accepts named options, especially when callers may omit some options.

**Watch out:** the `= {}` defaults the whole parameter when the argument is `undefined`; it does not protect against `null`. A default on an individual property is a separate default. The array-parameter variation in the source is Form 11b.

### Form 12: destructuring in loops, `for (const [key, value] of entries)`

**Syntax:** each iteration can destructure the pair yielded by `Object.entries(object)` or a `Map`.

**Example** (`js/params.mjs`):

```js
const settings = { theme: 'dark', notifications: true }
const settingSummary = []
for (const [key, value] of Object.entries(settings)) {
  settingSummary.push(`${key}=${value}`)
}
console.log('form 12a:', settingSummary.join(', '))
```

**Output:** `form 12a: theme=dark, notifications=true`

The same pair pattern works with a `Map`:

```js
const seatAssignments = new Map([['A1', 'Mina'], ['A2', 'Eren']])
for (const [seat, student] of seatAssignments) {
  // seat is the key; student is the value
}
```

**Output:** `form 12b: A1:Mina, A2:Eren`

**Use it when:** iterating over key-value pairs and both parts are needed in the loop body.

**Watch out:** `Object.entries` returns string-keyed pairs for an object's own enumerable string properties. A `Map` iterator yields its key-value pairs directly. Do not confuse `for...of` (iterates values) with `for...in` (iterates enumerable property keys).

## Pitfalls

These examples are in `js/pitfalls.mjs`.

1. **Destructuring `undefined` or `null` throws.** Output: `pitfall 1: TypeError`. The right-hand value must be an object or array that can be read; check it or provide a safe default such as `= {}`.
2. **A default does not replace `null`.** Output: `pitfall 2: none null`. A destructuring default is triggered only by `undefined`, not by every falsy value.
3. **Object assignment patterns need parentheses at the start of a statement.** Output: `pitfall 3: 3`. Without parentheses, `{ count }` at the beginning of a statement can be parsed as a block instead of an object pattern.
4. **Destructuring is shallow, not a deep clone.** Output: `pitfall 4: dark`. The extracted `settings` variable refers to the same nested object, so mutating it also changes the nested object reached through `original`.
5. **Object patterns use names; array patterns use positions.** Output: `pitfall 5: Istanbul Mina | Mina Istanbul`. Reordering object properties in the pattern does not change which key is read, but reordering array positions changes the assigned values.

## Props and children (P1-P7)

A React function component receives one props object. JSX attributes become properties on that object. Content between the component's opening and closing tags is supplied through the special property named `children`. It is not a second argument.

### P1: props is one object

`CardA(props)` reads properties from the object. `CardB({ title, children })` destructures that same object. The second form combines Form 5 (object properties by name) with Form 11 (destructuring in a parameter list).

**Rendered output** (run `npm run all` to verify):

```text
P1 A: <section><h2>Reading</h2>Book notes</section>
P1 B: <section><h2>Reading</h2>Book notes</section>
```

### P2: children is a prop

`<CardB title="Note">Remember the deadline</CardB>` and `<CardB title="Note" children="Remember the deadline" />` provide the same `children` property in two different JSX spellings.

**Rendered output:**

```text
P2 nested: <section><h2>Note</h2>Remember the deadline</section>
P2 prop: <section><h2>Note</h2>Remember the deadline</section>
```

Do not provide both a `children` attribute and nested JSX content at once; that creates two competing ways to supply the same prop and React reports a warning.

### P3: what children can contain

React can render strings, numbers, elements, arrays of renderable nodes, and combinations of them. `undefined`, `null`, and booleans such as `false` render nothing. A function is not itself a normal renderable node; in this example it is a *render prop* and the component deliberately calls it to obtain a React node.

Expected server-rendered outputs from `renderToStaticMarkup`:

```text
P3 string: <div>hello</div>
P3 number: <div>42</div>
P3 one element: <div><strong>bold</strong></div>
P3 several: <div><i>one</i><b>two</b></div>
P3 undefined: <div></div>
P3 null: <div></div>
P3 false: <div></div>
P3 function: <div><em>Hello, Ada</em></div>
```

The function case works because `ChildShowcase` checks whether `children` is a function and invokes it. Passing a function as ordinary children without invoking it is not how React renders content.

### P4: separate children from the other props

The pattern `({ title, children, ...rest })` extracts the values the component needs and collects the remaining properties into `rest`. Spreading `rest` onto `<section>` forwards those values to the DOM element.

**Rendered output:**

```text
P4 forwarded: <section id="agenda" class="panel"><h2>Agenda</h2>Items</section>
P4 rest wins: <section id="from-rest"><h2>Agenda</h2>Items</section>
P4 explicit wins: <section id="fixed-id"><h2>Agenda</h2>Items</section>
```

In `<section id="fixed-id" {...rest}>`, a later `id` from `rest` overwrites the earlier explicit value. In `<section {...rest} id="fixed-id">`, the later explicit value wins. The order of spread and explicit props therefore matters.

### P5: named header/footer props or children?

A component with `header` and `footer` props communicates that it owns those two slots and keeps the middle structure fixed. A component that accepts `children` lets the caller compose the whole internal layout. Choose named props when the slots are fixed and clearly named; choose children when flexible composition is the point.

**Rendered output:**

```text
P5 named: <article><header>Course</header><main>Shared content</main><footer>2026</footer></article>
P5 children: <article><header>Course</header><main>Shared content</main><footer>2026</footer></article>
```

### P6: defaults and null

A parameter default such as `{ name = 'Guest' }` applies when `name` is `undefined` (including when the prop is omitted). It does not apply when `name` is `null`. The example uses `name ?? 'nobody'` in the rendered expression to make the explicit `null` case visible.

**Rendered output:**

```text
P6 missing: <p>Hello, Guest!</p>
P6 undefined: <p>Hello, Guest!</p>
P6 null: <p>Hello, nobody!</p>
```

### P7: typing props and children

The JavaScript runtime counterpart in `js/props.jsx` forwards `type` and `aria-label` to a native button, but JavaScript itself does not statically reject an unknown or missing prop. Three common TypeScript choices are shown in `ts/props.tsx`:

- `children?: ReactNode` explicitly adds an optional children property to a custom props type. This allows text, numbers, elements, arrays and the other renderable React node values.
- `PropsWithChildren<{ disabled?: boolean }>` adds an optional `children` property to the supplied props shape. It is convenient when a component accepts normal React children.
- `ComponentProps<'button'>` reuses the props type of the native button element. It includes button attributes such as `type`, `disabled`, and `aria-label`, as well as children.

**Rendered output:**

```text
P7 JavaScript: <button type="submit" aria-label="Send">Send</button>
P7 manual: <button disabled="">Save</button>
P7 PropsWithChildren: <button>Cancel</button>
P7 ComponentProps: <button type="submit" aria-label="Send">Send</button>
```

If a custom props type does not declare `children`, TypeScript rejects JSX content for that component. Add `children?: ReactNode` or use `PropsWithChildren` when children are intended. Do not use `any` to silence a missing prop type.

## TypeScript topics T1-T5

These examples are in `ts/types.ts`.

- **T1 — rename is not a type annotation.** In `const { x: horizontal } = point`, `x` is the source property and `horizontal` is the new variable. To type the pattern, put the annotation after the closing brace: `const { y: vertical }: { y: number } = point`.
- **T2 — tuple return and `as const`.** A return type such as `[number, string]` says the first position is a number and the second is a string. `as const` makes an array literal a readonly tuple with literal types, rather than a general array whose elements may have a union type.
- **T3 — `noUncheckedIndexedAccess`.** With this compiler option, an array item may be missing. Therefore `const [firstItem] = items` has type `string | undefined` when `items` is `string[]`. Use a check or a fallback such as `firstItem ?? 'fallback item'`.
- **T4 — optional fields and defaults.** An optional `nickname?: string | null` can be `string`, `null`, or `undefined`. Destructuring without a default preserves all three possibilities. A default removes `undefined` from the local variable type, but it does not remove `null`.
- **T5 — a type error and its fix.** `square` requires a number, so `square('4')` produces TS2345: `Argument of type 'string' is not assignable to parameter of type 'number'.` The example marks this one intentional line with `@ts-expect-error`; the corrected call is `square(4)`.

## JavaScript versus TypeScript

| Form/topic | What stays the same | What TypeScript adds | What can go wrong |
|---|---|---|---|
| Array positions (1) | `[a, b]` reads positions 0 and 1 | Tuple return type such as `[number, number]` | Wrong tuple position type or possible `undefined` |
| Skip and rest (2) | `[, second, ...rest]` | Tuple and rest element types | Incorrect tuple shape or a rest type that is too narrow |
| Swap (3) | `[a, b] = [b, a]` | Variables must have compatible declared types | Incompatible assignment types |
| Array defaults (4) | Defaults apply to `undefined` | Optional tuple positions and inferred fallback types | A value can still be `undefined` if no fallback is provided |
| Object properties (5) | `{ title }` reads the `title` property | An object type must contain a compatible property | Missing property or incompatible property type |
| Rename (6) | `{ title: heading }` creates `heading` | The source property and new variable receive inferred/declared types | Mistaking `title` for the new variable; invalid source key |
| Object defaults (7) | `{ location = 'Library' }` uses a fallback for `undefined` | Optional property types and a narrowed local type | `null` remains possible if included in the type |
| Object rest (8) | `{ id, ...rest }` collects other properties | Rest receives the remaining inferred object type | Using a property that was removed by the pattern |
| Nested patterns (9) | Nested object/array shape is read | Nested property types are checked | Possibly missing nested property or `undefined` array item |
| Computed key (10) | `{ [key]: value }` evaluates a property key | Key type can be narrowed to known keys | A broad string key may not identify a known property |
| Parameters (11) | A parameter pattern extracts options | Type annotation follows the whole pattern | Wrong annotation placement or missing required argument fields |
| Loops (12) | Entry pairs can be destructured | `Object.entries` and `Map<K, V>` provide key/value types | Values may be wider than expected; unchecked array indexing remains possible |

## Output and verification

The JavaScript-only files were run during development and produced the outputs shown in the field guide and pitfalls section. The full `output.txt` must be generated on your own machine after dependencies are installed and after `npm run all` succeeds:

```bash
npm install
npm run all
npm run check
npm run all > output.txt
```

Do not treat a partial run as the final `output.txt`. Confirm that the React output and TypeScript examples also appear in the completed file.

## My own log

These are the issues and surprises I actually encountered while setting up and running this project on my Mac.

1. **The Node.js version selected by my Terminal was too old.** Exact output: `node -v` returned `v20.17.0`, while the project instructions require Node.js 20.19 or newer. I initially expected the installed Node version to be used automatically. I checked `which node` and found `/opt/anaconda3/bin/node`. I learned that the order of folders in `PATH` determines which executable the Terminal finds first.
2. **Anaconda was taking priority over the newer Node installation.** Exact output: `which node` returned `/opt/anaconda3/bin/node`; running `/usr/local/bin/node -v` returned `v26.13.1`. I ran `export PATH="/usr/local/bin:$PATH"` and checked again; `node -v` then returned `v26.13.1`. I learned how to temporarily change `PATH` for the current Terminal session and why `which node` is useful for diagnosing version problems.
3. **I entered a Terminal command while I was in the Node.js REPL.** Exact error: `ReferenceError: ls is not defined`. I expected `ls` to list the files, but the Node REPL interpreted it as JavaScript. I exited the REPL and ran the command at the normal shell prompt. I learned to distinguish the Node prompt from the Terminal shell prompt.
4. **I tried to use shell syntax inside the Node.js REPL.** Exact error: `SyntaxError: Unexpected identifier '$PATH'`. I expected `$PATH` to be understood as a shell variable, but the REPL parses JavaScript. I moved the `export PATH=...` command to the normal Terminal prompt. I learned that shell commands and JavaScript expressions belong in different environments.
5. **`npm install` displayed install-script warnings, but the installation completed.** Exact warning named `esbuild@0.28.2` and `fsevents@2.3.3` as packages with install scripts not yet covered by `allowScripts`; npm still reported that packages were added and `found 0 vulnerabilities`. I initially was unsure whether this meant installation had failed. I continued by running the project and confirmed that `npm run all` worked. I learned to distinguish a warning from a failed command and to verify by running the required scripts.
6. **React renders some different JavaScript child values as empty output.** Actual outputs: `P3 undefined: <div></div>`, `P3 null: <div></div>`, and `P3 false: <div></div>`. I expected these values might appear in the markup, but `renderToStaticMarkup` produced an empty `<div>`. I learned that these values are valid React children but do not produce visible text or elements in the rendered HTML.
7. **A destructuring default handles `undefined`, but not `null`.** Actual outputs: `P6 undefined: <p>Hello, Guest!</p>` and `P6 null: <p>Hello, nobody!</p>`. I expected the default value to cover both cases. The output showed that an omitted or `undefined` property activates the default, while explicit `null` remains a separate value. I learned to handle `null` explicitly when the application needs a fallback for it.

## Bonus 2: Depth

The depth experiments are implemented in `js/depth.mjs` and `ts/depth.ts`. They extend the basic forms with iterable protocols, evaluation order, assignment targets, and TypeScript type-level patterns. Run them together with the main examples using `npm run all`.

### B2.1 Strings are iterable

JavaScript strings are iterable, so an array pattern can consume their characters in iteration order. In this example, the first two characters are assigned to `first` and `second`, while the rest pattern collects the remaining characters into an array.

Actual output:

```text
first two: A d
remaining: a| |L|o|v|e|l|a|c|e
```

### B2.2 Set and Map are iterable

A `Set` yields its values in insertion order. A `Map` yields entry pairs, where each entry is a two-element array containing a key and its value. This makes nested destructuring useful: `[key, value]` extracts each pair's two parts.

Actual output:

```text
Set: teal coral, navy
Map first entry: A1 Mina
Map remaining entries: [["A2","Eren"]]
```

### B2.3 Destructuring consumes an iterator

Array destructuring reads from an iterator; it does not merely inspect an existing array. A generator is a one-use iterator. The pattern requests two values, and because the pattern finishes before the generator is naturally exhausted, iterator closing occurs. The generator is then closed, so a later `next()` does not produce another task.

Actual output:

```text
destructured: T-01 T-02
next value after destructuring: undefined
```

### B2.4 Defaults run only for `undefined`, from left to right

A destructuring default initializer is used only when the incoming value is `undefined`. It does not replace `null`. Initializers are evaluated when needed and in left-to-right order. A later binding can refer to an earlier binding, but referring to a later `let` binding before it has initialized causes a temporal-dead-zone `ReferenceError`.

Actual output:

```text
values: Read todo
fallback calls: 0
null keeps its value: null
fallback calls after null: 0
later default can use earlier binding: 10 20
reversed order: ReferenceError (temporal dead zone)
```

The zero fallback-call count demonstrates that the fallback function was not evaluated when a value was already present. The `null` example demonstrates why `??` or an explicit null check may be needed when both `null` and `undefined` should trigger a fallback.

### B2.5 Destructuring assignment can target object properties

A destructuring assignment pattern can assign directly to existing object properties rather than declaring new variables. When an object pattern is used as an assignment statement, wrap the pattern in parentheses so JavaScript does not parse the opening brace as a block.

Actual output:

```text
updated point: 3 7
```

### B2.6 `for...of` can destructure entry pairs; `for...in` does not

`Object.entries(object)` returns an array of `[key, value]` pairs. `for...of` iterates those pairs, so `for (const [key, value] of Object.entries(object))` can extract both values. By contrast, `for...in` iterates enumerable property keys; it does not automatically produce `[key, value]` pairs.

Actual output:

```text
title=Read
status=todo
for...in yields property names, not [key, value] pairs:
title
status
```

### TypeScript type-level destructuring

TypeScript conditional types can use `infer` to extract parts of tuple types. `First<T>` infers the first tuple element, while `Rest<T>` infers the remaining elements. The built-in `Parameters<F>` utility type extracts a function's parameter types as a tuple.

Actual output:

```text
type-level First: 41
type-level Rest: [ 'MIS', true ]
Parameters<F>: [ 'T-01', false ]
```

### Verification

On my Mac, `npm run all` completed and printed all six B2 JavaScript experiments and the TypeScript type-level results. I then ran `npm run all > output.txt` to save the complete output and `npm run check`; the TypeScript compiler completed without reporting errors. I also used `grep` to confirm that `output.txt` contains the B2.1-B2.6 headings, `type-level First`, `type-level Rest`, and `Parameters<F>`.

## Bonus 1: LaTeX

This complete field guide is also provided as `destructuring-field-guide.tex` and the compiled `destructuring-field-guide.pdf`. The LaTeX source was generated from this full Markdown guide with Pandoc, including the field-guide entries, pitfalls, React props and children discussion, JavaScript-versus-TypeScript comparison table, and the Bonus 2 depth experiments. The PDF includes a table of contents and code listings.

Commands used to generate and compile the LaTeX source:

```bash
pandoc README.md --from=gfm --to=latex --standalone --toc --number-sections --listings -V geometry:margin=1in -o destructuring-field-guide.tex
xelatex -interaction=nonstopmode -halt-on-error destructuring-field-guide.tex
xelatex -interaction=nonstopmode -halt-on-error destructuring-field-guide.tex
```

The second XeLaTeX run updates the table of contents and cross-references. The `.tex` source and compiled PDF are submitted together so the document can be inspected and rebuilt from source.
## Bonus 3: Real code

This section examines destructuring in real projects rather than only in isolated teaching examples. Each case identifies the source location, the destructuring form, an equivalent version without destructuring, and why the pattern is useful or potentially less readable.

### R1 — Task Manager: `useReducer` result (array destructuring)

**Source:** Assignment 3, `src/App.tsx`, line 85.

```tsx
const [state, dispatch] = useReducer(taskReducer, initialState)
```

**Form:** Form 1 — array values by position.

`useReducer` returns a pair: the current state and the dispatch function. The two array positions have a stable, documented meaning, so positional destructuring gives each value a useful local name.

**Equivalent without destructuring:**

```tsx
const reducerResult = useReducer(taskReducer, initialState)
const state = reducerResult[0]
const dispatch = reducerResult[1]
```

### R2 — Task Manager: destructuring component props

**Source:** Assignment 3, `src/TaskRow.tsx`, line 15.

```tsx
export default function TaskRow({ task, onNext, onDelete }: TaskRowProps) {
```

**Form:** Form 5 + Form 11 — object properties by name, destructured in a function parameter.

React passes the component one props object. This parameter pattern extracts the three named properties directly. In this component, the declared props are `task`, `onNext`, and `onDelete`; the component does not declare or receive a `children` prop.

**Equivalent without destructuring:**

```tsx
export default function TaskRow(props: TaskRowProps) {
  const task = props.task
  const onNext = props.onNext
  const onDelete = props.onDelete
```

### R3 — Task Manager: extracting `dispatch` from props

**Source:** Assignment 3, `src/App.tsx`, line 17.

```tsx
function AddForm({ dispatch }: AddFormProps) {
```

**Form:** Form 5 + Form 11 — object property destructuring in a parameter.

Only one property is needed by `AddForm`, so destructuring avoids repeating `props.dispatch` throughout the component.

**Equivalent without destructuring:**

```tsx
function AddForm(props: AddFormProps) {
  const dispatch = props.dispatch
```

### R4 — TypeScript compiler: renaming object properties

**Source:** TypeScript 5.8.3 package, `node_modules/typescript/lib/typescript.js`. The corresponding readable upstream source is `src/compiler/program.ts`, lines 3452-3454, in the TypeScript `v5.8.3` tag: <https://github.com/microsoft/TypeScript/blob/v5.8.3/src/compiler/program.ts#L3452-L3454.

```ts
const { line: firstLine, character: firstLineChar } =
  getLineAndCharacterOfPosition(file, start)
const { line: lastLine, character: lastLineChar } =
  getLineAndCharacterOfPosition(file, start + length)
```

**Form:** Form 6 — object property renaming.

The function returns an object with `line` and `character` properties. The code renames them to `firstLine`, `firstLineChar`, `lastLine`, and `lastLineChar`, which makes their roles clear in the surrounding formatting logic.

**Equivalent without destructuring:**

```ts
const firstPosition = getLineAndCharacterOfPosition(file, start)
const firstLine = firstPosition.line
const firstLineChar = firstPosition.character
const lastPosition = getLineAndCharacterOfPosition(file, start + length)
const lastLine = lastPosition.line
const lastLineChar = lastPosition.character
```

To record the exact line in the installed bundled file on this machine, run the following command from the Assignment 4 folder after `npm install`:

```bash
grep -n -F 'getLineAndCharacterOfPosition(file, start)' node_modules/typescript/lib/typescript.js | head
```

The upstream source line numbers above are pinned to TypeScript v5.8.3; the generated bundle may have different line numbering.

### R5 — React Navigation: a React component receives `children` as part of props

**Source:** React Navigation, `packages/stack/src/views/Stack/CardContainer.tsx`, lines 931 and 935-998: <https://github.com/react-navigation/react-navigation/blob/main/packages/stack/src/views/Stack/CardContainer.tsx#L931-L998.

The `Props` type declares `children: React.ReactNode` at line 931. `CardContainerInner` then destructures `children` alongside the other properties of the same props object:

```tsx
function CardContainerInner({
  interpolationIndex,
  index,
  active,
  // ...other props
  scene,
  children,
}: Props) {
```

**Form:** Form 5 + Form 11 — object properties destructured in a function parameter.

This is a concrete example of the distinction between ordinary props and `children`: `children` is itself a property on the props object. In JSX, nested content is supplied through that property; it is not passed as a second function argument.

**Equivalent without destructuring:**

```tsx
function CardContainerInner(props: Props) {
  const interpolationIndex = props.interpolationIndex
  const index = props.index
  const active = props.active
  // Read other values as props.someProperty when needed.
  const scene = props.scene
  const children = props.children
```

This component has a large props shape, but that does not mean every component should destructure every property. It is useful to extract the values used frequently while keeping the relationship to `props` explicit when that improves clarity.

### R6 — React Navigation: when destructuring many options can make code harder to scan

**Source:** React Navigation, `packages/stack/src/views/Stack/CardContainer.tsx`, lines 1105-1135: <https://github.com/react-navigation/react-navigation/blob/main/packages/stack/src/views/Stack/CardContainer.tsx#L1105-L1135.

```tsx
const {
  presentation,
  animation,
  cardOverlay,
  cardOverlayEnabled,
  cardShadowEnabled,
  cardStyle,
  cardStyleInterpolator,
  gestureDirection,
  gestureEnabled,
  gestureResponseDistance,
  gestureVelocityImpact,
  headerMode,
  headerShown,
  transitionSpec,
} = scene.descriptor.options
```

**Form:** Form 5 — object property destructuring.

**Why this can be worse:** extracting a long list of similarly named options creates many local variables and makes it harder to see that they all come from `scene.descriptor.options`. If only a few values are needed in a section, or if the source object is important context, the long list can add visual noise. This is a trade-off, not a rule that destructuring is always bad.

**Equivalent without destructuring:**

```tsx
const options = scene.descriptor.options
// Use options.presentation, options.animation, options.cardStyle, etc.
```

Keeping the object grouped can make the origin of each setting more obvious. Destructuring is most helpful when the extracted names improve local readability; it is not automatically better just because it is shorter.

### Real-code comparison summary

| Case | Source | Form | Main lesson |
|---|---|---|---|
| R1 | Assignment 3 `src/App.tsx:85` | Form 1 | A tuple-like return value has meaningful positions. |
| R2 | Assignment 3 `src/TaskRow.tsx:15` | Forms 5 and 11 | A React component receives one props object. |
| R3 | Assignment 3 `src/App.tsx:17` | Forms 5 and 11 | Extract only the prop a component needs. |
| R4 | TypeScript 5.8.3 `program.ts:3452-3454` / installed package bundle | Form 6 | Renaming gives generic property names a local meaning. |
| R5 | React Navigation `CardContainer.tsx:931, 935-998` | Forms 5 and 11 | `children` is a property of the props object. |
| R6 | React Navigation `CardContainer.tsx:1105-1135` | Form 5 | A long destructuring list can reduce readability. |

The Task Manager examples refer to the Assignment 3 source files. The TypeScript and React Navigation examples link to their public source repositories so the code can be checked independently.

