
function getUserLabel(user) {
  return user.fullNme.toUpperCase();
}

const user = { fullName: "Alice Smith" };
console.log(getUserLabel(user));

//key difference : when a bug is discovered in js file it shows undefined because the variable name mismatches
//in both function definition and calling . But the typesecript file keep track of the type error and also 
// shows the difference in name 

// Where did the type annotations go in the output `.js` file?

// The type annotations are removed during TypeScript compilation.
// They do not exist in the generated JavaScript file.

// What does this tell you about where TypeScript's type safety lives?

//Typescript helps in looking for an error in the compile time itself so we can able to rectify it before 
// the runtime . This helps in easier debugging and error analysis