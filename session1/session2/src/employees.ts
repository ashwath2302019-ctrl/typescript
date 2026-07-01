interface person {
    firstname : string;
    lastname : string;
    email:string;
};
interface employee extends person {
   readonly employeeid: string;
department: string;
startdate :Date;
};

interface manager extends employee{
    teamsize : number;
    directreports :string[];
};
function getfullname(p:person):string{
let display1 = `Full name:${p.firstname} ${p.lastname}`;
return display1;
}

const p: person = {
    firstname: "Ashwa",
    lastname: "Kumar",
    email: "ashwa@gmail.com"
};

const e: employee = {
    firstname: "Aswin",
    lastname: "Raj",
    email: "aswin@gmail.com",
    employeeid: "EMP001",
    department: "Engineering",
    startdate: new Date()
};

const m: manager = {
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice@gmail.com",
    employeeid: "MGR001",
    department: "Engineering",
    startdate: new Date(),
    teamsize: 5,
    directreports: ["EMP001", "EMP002"]
};

console.log(getfullname(p));
console.log(getfullname(e));
console.log(getfullname(m));

//this works because it run's with the help of extend keyword where the new property can be added to the exisiting property so that
//it works fine.
