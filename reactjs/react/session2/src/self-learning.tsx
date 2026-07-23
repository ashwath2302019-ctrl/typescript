import type {
  FC,
  JSX,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react'

/*
1. React.FC research

React.FC means Function Component.

Using React.FC:

const MyComponent: FC<MyProps> = ({ name }) => {
  return <p>{name}</p>
}

Typing the props parameter directly:

function MyComponent({ name }: MyProps) {
  return <p>{name}</p>
}

Difference:

React.FC types the entire component variable as a React function component.
It checks the props accepted by the component and its valid React return value.

Typing the parameter directly only applies the type to the props parameter.
TypeScript then automatically infers the component's return type.

Both approaches are valid. Directly typing the props parameter is often simpler
and works naturally with normal function declarations. React.FC can be useful
when we specifically want to declare that a variable is a React component.

In current React types, React.FC does not automatically add a children prop.
Children must still be included explicitly when the component accepts children.
*/

interface WelcomeProps {
  name: string
}

const Welcome: FC<WelcomeProps> = ({ name }: WelcomeProps) => {
  return <p>Welcome, {name}!</p>
}

/*
2. PropsWithChildren research

PropsWithChildren adds an optional children property to another props type.

PropsWithChildren<MyProps> is similar to:

MyProps & {
  children?: ReactNode
}

The main difference from manually writing children: ReactNode is that
PropsWithChildren makes children optional.

Manual required children:

interface BoxProps {
  title: string
  children: ReactNode
}

PropsWithChildren version:

type BoxProps = PropsWithChildren<{
  title: string
}>

Use PropsWithChildren when a component may receive nested content.
Manually define children when you want children to be required or when you need
a narrower type such as ReactElement.
*/

interface ChildrenBoxBaseProps {
  title: string
}

type ChildrenBoxProps = PropsWithChildren<ChildrenBoxBaseProps>

function ChildrenBox({
  title,
  children,
}: ChildrenBoxProps): ReactElement {
  return (
    <section className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  )
}

/*
3. key prop research

The key prop is a special React prop. It is not passed to the component like
normal props, so the component cannot read props.key.

React uses key while comparing lists between renders. A stable key helps React
match an item from the previous render with the corresponding item in the next
render. This is especially important when items are inserted, deleted, moved,
or reordered.

When the component also needs the same value, pass it separately:

<InternRow key={intern.id} internId={intern.id} />

The component can read internId, but it cannot read key.
*/

interface KeyExampleProps {
  internId: number
  name: string
}

function KeyExample({
  internId,
  name,
}: KeyExampleProps): ReactElement {
  return (
    <p>
      Intern ID: {internId} | Name: {name}
    </p>
  )
}

/*
4. children compared with named ReactNode slots

children is the content placed between a component's opening and closing tags:

<PageLayout>
  <p>Main content</p>
</PageLayout>

A named slot is passed through a normal prop:

<PageLayout header={<h1>Heading</h1>} />

children is best for the primary content of a component.

Named slots are useful when a component has several separate content regions,
such as header, sidebar, actions, body, and footer. Named slots make it clear
which content belongs in each area and allow the layout component to position
each region independently.
*/

interface PageLayoutProps {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
}

function PageLayout({
  header,
  children,
  footer,
}: PageLayoutProps): ReactElement {
  return (
    <div className="page-layout">
      <header
        style={{
          background: '#f0f0f0',
          padding: '12px',
        }}
      >
        {header}
      </header>

      <main style={{ padding: '16px' }}>{children}</main>

      <footer
        style={{
          background: '#f0f0f0',
          padding: '12px',
        }}
      >
        {footer}
      </footer>
    </div>
  )
}

/*
5. ReactNode, ReactElement and JSX.Element

ReactNode:
The widest type for content React can render. It accepts strings, numbers,
booleans, null, undefined, JSX elements, fragments, and arrays of React nodes.
It is suitable for children, fallback content, and layout slots.

ReactElement:
Represents a real React element object produced by JSX or createElement.
Use it when a prop must receive an actual element instead of plain text or a
number.

JSX.Element:
The type TypeScript uses for a JSX expression. It is also used when a value
must be a JSX element. It does not accept plain strings, numbers, null, or
undefined.

In this project, JSX is imported as a type from React because the global JSX
namespace is not available in the current TypeScript configuration.
*/

interface WrapperProps {
  content: ReactNode
}

function Wrapper({ content }: WrapperProps): ReactElement {
  return <div>{content}</div>
}

interface IconButtonProps {
  icon: ReactElement
  label: string
}

function IconButton({
  icon,
  label,
}: IconButtonProps): ReactElement {
  return (
    <button type="button">
      {icon} {label}
    </button>
  )
}

interface TooltipProps {
  trigger: JSX.Element
  tip: string
}

function Tooltip({
  trigger,
  tip,
}: TooltipProps): ReactElement {
  return <span title={tip}>{trigger}</span>
}

function SelfLearning(): ReactElement {
  const internNames: string[] = ['Rahul', 'Priya', 'Amit']

  return (
    <div>
      <h1>React TypeScript Self-Learning</h1>

      <section className="card">
        <h2>1. React.FC Example</h2>
        <Welcome name="Rahul" />
      </section>

      <ChildrenBox title="2. PropsWithChildren Example">
        <p>This content is received through the children prop.</p>
      </ChildrenBox>

      <section className="card">
        <h2>3. Key Prop Example</h2>

        {internNames.map(
          (name: string, index: number): ReactElement => (
            <KeyExample
              key={name}
              internId={index + 1}
              name={name}
            />
          )
        )}
      </section>

      <section className="card">
        <h2>4. Multiple ReactNode Slots</h2>

        <PageLayout
          header={<h1>Intern Dashboard</h1>}
          footer={<p>© 2026 Aarvihsolutions</p>}
        >
          <p>Main content goes here as children.</p>
          <p>
            Any JSX works — text, elements, or other components.
          </p>
        </PageLayout>
      </section>

      <section className="card">
        <h2>5. Renderable React Types</h2>

        <h3>ReactNode</h3>

        <Wrapper content="Plain string content" />

        <Wrapper content={100} />

        <Wrapper
          content={
            <strong>This is a JSX element.</strong>
          }
        />

        <h3>ReactElement</h3>

        <IconButton
          icon={<span aria-hidden="true">★</span>}
          label="Favourite"
        />

        {/*
          Uncommenting this causes a TypeScript error because icon expects
          ReactElement, but a plain string is not a ReactElement.

          <IconButton icon="★" label="Favourite" />
        */}

        <h3>JSX.Element</h3>

        <Tooltip
          trigger={<button type="button">Hover over me</button>}
          tip="This is a tooltip"
        />

        {/*
          Uncommenting this causes a TypeScript error because trigger expects
          JSX.Element, but null is not a JSX element.

          <Tooltip trigger={null} tip="This will fail" />
        */}
      </section>
    </div>
  )
}

export default SelfLearning