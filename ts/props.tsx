// Zeynep Sudem Aktaş — 2025502009
// Props and children in TypeScript. Run with `npx tsx ts/props.tsx`.
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// P1: the type describes the one props object; the pattern is destructured after typing.
type CardProps = { title: string; children?: ReactNode }
function CardA(props: CardProps) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('P1 A:', renderToStaticMarkup(<CardA title="Reading">Book notes</CardA>))
console.log('P1 B:', renderToStaticMarkup(<CardB title="Reading">Book notes</CardB>))

// P2: children is part of the props object, whichever JSX spelling supplies it.
console.log('P2 nested:', renderToStaticMarkup(<CardB title="Note">Remember the deadline</CardB>))
console.log('P2 prop:', renderToStaticMarkup(<CardB title="Note" children="Remember the deadline" />))

// P3: ReactNode includes renderable values; a function is handled as a render prop.
type ChildShowcaseProps = { children?: ReactNode | ((name: string) => ReactNode) }
function ChildShowcase({ children }: ChildShowcaseProps) {
  return <div>{typeof children === 'function' ? children('Ada') : children}</div>
}
console.log('P3 string:', renderToStaticMarkup(<ChildShowcase>hello</ChildShowcase>))
console.log('P3 number:', renderToStaticMarkup(<ChildShowcase>{42}</ChildShowcase>))
console.log('P3 one element:', renderToStaticMarkup(<ChildShowcase><strong>bold</strong></ChildShowcase>))
console.log('P3 several:', renderToStaticMarkup(<ChildShowcase><i>one</i><b>two</b></ChildShowcase>))
console.log('P3 undefined:', renderToStaticMarkup(<ChildShowcase>{undefined}</ChildShowcase>))
console.log('P3 null:', renderToStaticMarkup(<ChildShowcase>{null}</ChildShowcase>))
console.log('P3 false:', renderToStaticMarkup(<ChildShowcase>{false}</ChildShowcase>))
console.log('P3 function:', renderToStaticMarkup(<ChildShowcase>{(name: string) => <em>Hello, {name}</em>}</ChildShowcase>))

// P4: omit children from the forwarded props and demonstrate last-spread-wins.
type PanelProps = { title: string; children?: ReactNode; id?: string; className?: string }
function Panel({ title, children, ...rest }: PanelProps) {
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
function PanelRestWins({ title, children, ...rest }: PanelProps) {
  return <section id="fixed-id" {...rest}><h2>{title}</h2>{children}</section>
}
function PanelExplicitWins({ title, children, ...rest }: PanelProps) {
  return <section {...rest} id="fixed-id"><h2>{title}</h2>{children}</section>
}
console.log('P4 forwarded:', renderToStaticMarkup(<Panel title="Agenda" id="agenda" className="panel">Items</Panel>))
console.log('P4 rest wins:', renderToStaticMarkup(<PanelRestWins title="Agenda" id="from-rest">Items</PanelRestWins>))
console.log('P4 explicit wins:', renderToStaticMarkup(<PanelExplicitWins title="Agenda" id="from-rest">Items</PanelExplicitWins>))

// P5: named slot props versus a flexible children composition.
type NamedLayoutProps = { header: ReactNode; footer: ReactNode }
function NamedLayout({ header, footer }: NamedLayoutProps) {
  return <article><header>{header}</header><main>Shared content</main><footer>{footer}</footer></article>
}
function ComposedLayout({ children }: PropsWithChildren) {
  return <article>{children}</article>
}
console.log('P5 named:', renderToStaticMarkup(<NamedLayout header="Course" footer="2026" />))
console.log('P5 children:', renderToStaticMarkup(<ComposedLayout><header>Course</header><main>Shared content</main><footer>2026</footer></ComposedLayout>))

// P6: default values replace undefined, while null remains null.
type GreetingProps = { name?: string | null }
function Greeting({ name = 'Guest' }: GreetingProps) {
  return <p>Hello, {name ?? 'nobody'}!</p>
}
console.log('P6 missing:', renderToStaticMarkup(<Greeting />))
console.log('P6 undefined:', renderToStaticMarkup(<Greeting name={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Greeting name={null} />))

// P7: three common ways to describe component props.
type ManualButtonProps = { children?: ReactNode; disabled?: boolean }
type WrappedButtonProps = PropsWithChildren<{ disabled?: boolean }>
type NativeButtonProps = ComponentProps<'button'>
function ManualButton({ children, disabled = false }: ManualButtonProps) {
  return <button disabled={disabled}>{children}</button>
}
function WrappedButton({ children, disabled = false }: WrappedButtonProps) {
  return <button disabled={disabled}>{children}</button>
}
function NativeButton({ children, type = 'button', ...rest }: NativeButtonProps) {
  return <button type={type} {...rest}>{children}</button>
}
console.log('P7 manual:', renderToStaticMarkup(<ManualButton disabled>Save</ManualButton>))
console.log('P7 PropsWithChildren:', renderToStaticMarkup(<WrappedButton>Cancel</WrappedButton>))
console.log('P7 ComponentProps:', renderToStaticMarkup(<NativeButton type="submit" aria-label="Send">Send</NativeButton>))
