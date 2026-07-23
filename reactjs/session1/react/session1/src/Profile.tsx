function Profile() {
  const name:     string = 'Rahul'
  const role:     string = 'Intern'
  const score:    number = 92
  const joinDate: string = '2026-06-30'
  const avatarUrl: string = 'https://i.pravatar.cc/100'
const altText:   string = `Avatar of ${name}`

  return (
    <div>
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score} / 100</p>
      <p>Name uppercase: {name.toUpperCase()}</p>
      <p>Score doubled: {score * 2}</p>
      <p>Joined: {new Date(joinDate).toDateString()}</p>
      <img src={avatarUrl} alt={altText} width={100} />
    </div>
  )
}

export default Profile

// Curly braces {} in TSX are used to evaluate JavaScript/TypeScript expressions
// (such as variables, function calls, or calculations) and display their result.
// Statements like if, for, and while cannot be written directly inside TSX because
// they control the flow of the program instead of producing a value.

// In TSX, width="100" passes the value as a string, while width={100}
// passes it as a number. Curly braces {} allow JavaScript/TypeScript
// expressions, so numeric properties should be passed as numbers.