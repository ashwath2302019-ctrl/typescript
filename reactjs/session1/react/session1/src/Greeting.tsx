function Greeting() {
  return (
    <div>
      <h2>Welcome to React</h2>
      <p>This is a separate component.</p>
    </div>
  )
}

export default Greeting

// **Write a comment** explaining why reusing components is better than copying and pasting HTML.
// Because by declaring the functions we can able to call it  back whenever it is needed in the program instead
// of copying the whole part and pasting it (this can lead to the violation DRY Principle)