interface details {
    page : number;
    pagesize : number;
    total : number;
    data : [];
}

// Here i had used interface because many object consisting of similar data types can be much easier to handle and call back.

type task = string | Array<string>;
const a:task = "ashwath";
const b:task = ["hari","ram"];  

interface Notification {
    id: string;
    message: string;
    createdAt: Date;
}
interface noti extends Notification {
    update : Date;
}  //this allows to add some new properties to the existing properties without modifying the original.

type num = (t:number)=>void;
const ab:num = (n)=>console.log(n);  // it helps to directly assign the input and output type within a single line which helps in code readability

type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH";

    const method:HttpMethod = "GET"; 