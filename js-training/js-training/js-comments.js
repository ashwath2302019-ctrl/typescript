//**1. Loose equality trap**

const input = "5"
const score = 5
if (input == score) {
  console.log("match")   // this prints — should it?
}
//using == equals also print the output match but in modern js triple (===) equalets is being used to compare
// value and data type without any conversion . whereas == convert the string to a number .


//**2. Missing return in arrow function**
const doubled = [1, 2, 3].map(n => {
  n * 2
})
console.log(doubled);
//In the above code , when curly  {} braces are used the keyword "return" must given  otherwise it will 
// return an empty array stating "undefined".This happens because javascript doesn't return a value 
// automatically . 

//**3. Mutating original array**

//const original = [1, 2, 3]
original.push(4)
console.log(original)   // original is now changed — avoid this

const original = [1, 2, 3] 
const update = [...original,4]; //spread 
console.log(update);

//**4. `const` object reassignment confusion**

const user = { name: "Alice", active: true }
user.active = false     // does this throw an error?
console.log(user)       // observe and explain in a comment

//no error will happens as const keyword is used for permanently assiging the variable and not the objects or 
//contents inside it so the user can able to change the contents inside

 //`user = { name: "Bob" }` — what happens now?

 //this return a typeError as once the user is declared using const keyowrd the user can't able to use it twice
const Username = "Alice"
const username = "Bob"
console.log(Username)   // which logs?
console.log(username)

// javascript usally log's the first variable name which is given in teh print function .This happens beacuse
// js is case-sensitive (both uppercase and lowercase) are allowable 

//**2. `undefined` vs `null`**

const a = null
const b = undefined
console.log(typeof a) // it logs as object 
console.log(typeof b) // logs as undefined  (undefined happens when variable is declared but not initialized
//so js logs "undefined")

//**3. Call order matters**

console.log(greet("Alice"))   // does this work?
const greet = (name) => `Hello, ${name}`
//Trying to call 'greet()' before that line causes a ReferenceError.


