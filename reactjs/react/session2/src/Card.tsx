import type { ReactNode } from 'react'

interface CardProps {
  title:     string
  children?: ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {children && <div className="card-body">{children}</div>}
    </div>
  )
}

export default Card

/*
ReactNode represents anything that React can render.

It includes:
- strings
- numbers
- JSX elements
- arrays of renderable values
- fragments
- null
- undefined
- booleans

ReactNode is the correct type for children because content placed between a
component's opening and closing tags may contain many different renderable
values, not only one JSX element.
*/

/*
A required children prop is written as:

children: ReactNode

It means the component must receive content between its opening and closing
tags. Use required children when the component would not be meaningful without
content.

An optional children prop is written as:

children?: ReactNode

It means the component may be used with or without nested content. Use optional
children for containers that are allowed to be empty or display only their
title.
*/