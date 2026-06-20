
//union types 
let id:string|number;
id = "Ashwath";
id = 123;

function str(a:string|number):void{
  console.log(a);
}
str("ashwa");
str(2);

let isOnline: boolean | string;

isOnline = true;
isOnline = "yes";

function sendRequest(method: "GET" | "POST"): void {
    console.log(`Request Method: ${method}`);
}

sendRequest("GET");
sendRequest("POST");

//READONLY

const read : readonly string[]= [
    "ashwath","alan","akash"
]
//read.push("ashwa");
//read[0]="akil";

//strictnull 

//let a:string|null = null;
//a.toUpperCase();

