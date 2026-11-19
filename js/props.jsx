// Zeynep Sudem Aktaş — 2025502009
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'

// P1: props is ONE object. Destructuring it is forms 5 and 11 together.
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('P1 A:', renderToStaticMarkup(<CardA title="Reading" >Book notes</CardA>))
console.log('P1 B:', renderToStaticMarkup(<CardB title="Reading" >Book notes</CardB>))

// P2: children is an ordinary prop supplied either by JSX content or explicitly.
console.log('P2 nested:', renderToStaticMarkup(<CardB title="Note">Remember the deadline</CardB>))
console.log('P2 prop:', renderToStaticMarkup(<CardB title="Note" children="Remember the deadline" />))

// P3: ReactNode values. A function is a render prop, so the component calls it.
function ChildShowcase({ children }) {
  return <div>{typeof children === 'function' ? children('Ada') : children}</div>
}
console.log('P3 string:', renderToStaticMarkup(<ChildShowcase>hello</ChildShowcase>))
console.log('P3 number:', renderToStaticMarkup(<ChildShowcase>{42}</ChildShowcase>))
console.log('P3 one element:', renderToStaticMarkup(<ChildShowcase><strong>bold</strong></ChildShowcase>))
console.log('P3 several:', renderToStaticMarkup(<ChildShowcase><i>one</i><b>two</b></ChildShowcase>))
console.log('P3 undefined:', renderToStaticMarkup(<ChildShowcase>{undefined}</ChildShowcase>))
console.log('P3 null:', renderToStaticMarkup(<ChildShowcase>{null}</ChildShowcase>))
console.log('P3 false:', renderToStaticMarkup(<ChildShowcase>{false}</ChildShowcase>))
console.log('P3 function:', renderToStaticMarkup(<ChildShowcase>{(name) => <em>Hello, {name}</em>}</ChildShowcase>))

// P4: remove children, forward the remaining props, and show spread precedence.
function Panel({ title, children, ...rest }) {
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
function PanelRestWins({ title, children, ...rest }) {
  return <section id="fixed-id" {...rest}><h2>{title}</h2>{children}</section>
}
function PanelExplicitWins({ title, children, ...rest }) {
  return <section {...rest} id="fixed-id"><h2>{title}</h2>{children}</section>
}
console.log('P4 forwarded:', renderToStaticMarkup(<Panel title="Agenda" id="agenda" className="panel">Items</Panel>))
console.log('P4 rest wins:', renderToStaticMarkup(<PanelRestWins title="Agenda" id="from-rest">Items</PanelRestWins>))
console.log('P4 explicit wins:', renderToStaticMarkup(<PanelExplicitWins title="Agenda" id="from-rest">Items</PanelExplicitWins>))

// P5: named slots communicate fixed structure; children supports flexible composition.
function NamedLayout({ header, footer }) {
  return <article><header>{header}</header><main>Shared content</main><footer>{footer}</footer></article>
}
function ComposedLayout({ children }) {
  return <article>{children}</article>
}
console.log('P5 named:', renderToStaticMarkup(<NamedLayout header="Course" footer="2026" />))
console.log('P5 children:', renderToStaticMarkup(<ComposedLayout><header>Course</header><main>Shared content</main><footer>2026</footer></ComposedLayout>))

// P6: a default handles undefined; null is an explicit value and does not trigger it.
function Greeting({ name = 'Guest' }) {
  return <p>Hello, {name ?? 'nobody'}!</p>
}
console.log('P6 missing:', renderToStaticMarkup(<Greeting />))
console.log('P6 undefined:', renderToStaticMarkup(<Greeting name={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Greeting name={null} />))

// P7 runtime counterpart: JavaScript forwards native button props but has no static prop checker.
function PlainButton({ children, type = 'button', ...rest }) {
  return <button type={type} {...rest}>{children}</button>
}
console.log('P7 JavaScript:', renderToStaticMarkup(<PlainButton type="submit" aria-label="Send">Send</PlainButton>))
