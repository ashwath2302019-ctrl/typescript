function add(a:number,b:number):void{
    console.log(a*b);
}

const result = add(5, 3);
console.log(result); // what is the value of result?

function logEvent(event: string): void {
  console.log(`[LOG] ${event}`);
}

const result1 = logEvent("user_login");
console.log(result1); // what is the value of result?

//Result : Undefined because the function does not return any value.

function fail(message: string): never {
  throw new Error(message);
}
// The 'never' type is used to indicate that a function never returns a value.
// Task C — try to return a value from a void function
function doSomething(): void {
  return //"hello"; // what error do you get?
} // Error: Type 'string' is not assignable to type 'void'.

// Research one more scenario where a function has a return type of `never` other than throwing an error.  
// Write the example in your file with a comment explaining why it is `never`.

function so():never{
    while(true){
        console.log("hello");
    }
}
// The function `so` has a return type of `never` because it contains an infinite loop and
//  will never reach a return statement 