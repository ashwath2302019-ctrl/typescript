function getFirstWord(sentence: string|null) {
  if(sentence===null){
    return "";
} 
console.log(sentence.split(" ")[0]); 
     //null cant be split so the error is handled using if else statement
}    // 'sentence' is possibly 'null'.

// Function 2
function getUserAge(user: { name: string; age?: number }): string { //? means number or undefined
  if (user.age === undefined) {
    return `${user.name}'s age is unknown`;
  } 

  return `${user.name} is ${user.age.toString()} years old`;
} //'user.age' is possibly 'undefined'

// Function 3
const config = {
  database: {
    host: "localhost",
    port: 5432
  }
};

function getDbPort(): number {
  return config.database.port;
}
const users = ["aswa","ram","ragul"];

function findUser(name: string): string {
  const found = users.find(u => u === name);

  if (found === undefined) {
    return "USER NOT FOUND";
  }

  return found.toUpperCase();
}