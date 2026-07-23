// interface ProfileCardProps {
//   name?:   string
//   role?:   string
//   score?:  number
// }

// function ProfileCard({
//   name  = 'Unknown',
//   role  = 'Intern',
//   score = 0,
// }: ProfileCardProps) {
//   return (
//     <div className="card">
//       <h2>{name}</h2>
//       <p>Role: {role}</p>
//       <p>Score: {score}</p>
//     </div>
//   )
// }
interface ProfileCardProps {
  name?:   string
  role?:   string
  score?:  number
  skills?: string[]
}

function ProfileCard({
  name   = 'Unknown',
  role   = 'Intern',
  score  = 0,
  skills = [],
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>
      {skills.length > 0 && (
        <ul>
          {skills.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileCard

/*
The ? symbol makes a property optional.

For example:

name?: string

means that the component can be used with a name or without a name.

When an optional prop is not supplied, its value is undefined. Default
parameter values replace that undefined value with a safe fallback.

For example:

function ProfileCard({ name = 'Unknown' }: ProfileCardProps)

If name is supplied, the component uses the supplied value.
If name is omitted or undefined, it uses 'Unknown'.

The ? allows the prop to be omitted, while the default value decides what the
component should use when it is omitted.
*/