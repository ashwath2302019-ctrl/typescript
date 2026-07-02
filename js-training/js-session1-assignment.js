
console.log("Hello World");
const name = "ASHWATH S K";
const id = 71812302019;
const role = "trainee";
const isavailable = true;
let a = 10;
let b = 20;
let len = "ashwath";
console.log(a+b);
console.log("the name is "+typeof(name));
console.log("the id is "+typeof(id)); 
//const name = "PREM";//shows the name has already declared
const greet = (name) => {
    console.log(`Hi, ${name}`);
};
const print = (isavailable)=> 
{
    console.log(`Available:${isavailable}`);
}


greet("I'm ashwath and I'm dev");
print("true");
const charac = (len)=>{
    console.log(`My name has ${len.length}`+" characters");
}
charac("ashwath");
const full = (first,last)=>
{
    console.log(`first name is ${first} and last name is ${last}`);
}
full("ashwath","sk");
const age = (vote)=>
{
    if(`${vote}`>=18){
        console.log("true");
    }else {
        console.log("false");
    }
}
age(18);
const user = [
{username:"Ashwath",id:71812302019,role:"trainee"},
{username:"Dev",id:71812302018,role:" seniour trainee"}
];
const use=user.map(u=u=>u.id);
console.log(use);
const details = {
    id :19,
    nameid : "ashwath",
    roleid : "trainee",
    available : true,
    area : {
        city : "coimbatore",
        pincode : 64105,
    }
};
const{nameid,roleid}=details;
console.log(name,id);
const{area:{city}}= details;
console.log(city);
const updatesir = { //Destructring
    id :19,
    nameid : "ashwath",
    roleid : "trainee",
    available : true,
    areaa : {
        city : "coimbatore",
        pincode : 64105,
    }
};
const update = { //spread
    ...updatesir,
    available:false
};
console.log(update);
const devs = ["alice","carol"];
const design = ["bob","dan"];
const combine = [...devs,...design]; //merge
console.log(combine);
const team =[...devs,...design,"Eve"];
console.log(team);
const users = [
  { id: 1, name: "Alice", role: "dev",    active: true  },
  { id: 2, name: "Bob",   role: "design", active: false },
  { id: 3, name: "Carol", role: "dev",    active: true  },
  { id: 4, name: "Dan",   role: "design", active: true  },
  { id: 5, name: "Eve",   role: "dev",    active: false },
];
const usern = users.map(u=>u.name);
console.log(usern);
const filt = users.filter(u=>u.role==='dev');
console.log(filt);
const g = users.map(u=>`${u.name} is a ${u.role}`);
console.log(g);
const i = users.filter(u=>u.role==='dev' && u.active).map(u=>u.name);
console.log(i);
const k = users.reduce((acc,user) => {
    const m = user.role;
    if(!acc[m]){
        acc[m]=0;
    }
    acc[m]++;
    return acc;
},{});
console.log(k);
const q = users.find(user=>user.role==='design' && user.active===true);
console.log(q);
const ac = users.some(user=> user.active===false);
console.log(ac);
const ever = users.every(user=>user.role);
console.log(ever);
  console.log(greets("Alice"))   // does this work?
const greets = (name) => `Hello, ${name}`
