let a:any="ashwath";
a.toUpperCase();      //any doesn't care about the type and hold any value
a.tofixed(2);

//let safeValue: unknown = "hello";
//console.log(safeValue.toUpperCase()); 
// what error do you get? :object has an unknown type value 

let b:unknown="ashwa";

if(typeof b === "string"){
    console.log(b.toUpperCase()); //unknown first check the type and then store the value
}