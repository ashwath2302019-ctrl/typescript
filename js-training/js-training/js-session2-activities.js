
// Activity 1 — Understanding Async Behaviour
console.log("1")
setTimeout(() => console.log("2"), 1000)
console.log("3")

//this happens because in a asynchronous code the slower task needed to be run takes some time  in which js 
// doesn't wait so the other function get printed

// 2. Now change the timeout to 0ms — does "2" still log last? Explain why in a comment
console.log("1")
setTimeout(() => console.log("2"), 0)
console.log("3")
//yes the number 2 still logs in the last because of the asynchronous timer function so the js immediately
// start executing the next line and print callback function when timer expires.    

//3. Exercise 
console.log("fetching data");
setTimeout(()=>console.log("Data is recieved"),2000);

// ## Activity 2 — Promises
const getData = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5
  setTimeout(() => {
    if (success) resolve("Data loaded!")
    else reject("Something went wrong")
  }, 1000)
})
getData.then(message=>{
    console.log("data logged ");
    console.log("logged data is "+ message);
    }) 
getData.catch(error=>{
    console.log(error);
})

Promise.resolve(5)
  .then(num=>{
    console.log(num);
    return num*2;
})
.then(result=>{
    console.log(result);
    return result+10;
})
.then(final=>{
    console.log(final);
})

const startValue = new Promise((resolve) => resolve(5))
.then(a=>{
    console.log(a);
    return a*2;
})
.then(b=>{
    console.log(b);
    return b*7;
})
.then(c=>{
    console.log(c);
})
Promise.all([
    Promise.resolve("S"),
    Promise.resolve("b"),
])
.then(value=>{
    console.log(value);
})

const promise1 = new Promise((resolve) => setTimeout(() => resolve("User loaded"), 1000))
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Orders loaded"), 1500))
const pr3 = new Promise((resolve)=>setTimeout(()=>resolve("new value")),3000)
console.log(Promise.all);

// Activity 3 — async / await
const wait = async ()=>{
    try {
    const decode = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const re = await decode.json();
    console.log(re);
    console.log(re.name);
    }
  

    catch(error){
        console.log(error);
    }
}
wait();

const getUserById = async (id) => {
    
  const r = await fetch(`https://jsonplaceholder.typicode.com/users/${3}`);
  const c =  await r.json();
  console.log(c.name);
  console.log(c.email);
};
getUserById(3);

const getAllUsers = async () => {
  const g = await fetch("https://jsonplaceholder.typicode.com/users");
  const h = await g.json();
  const result = h.map(m => ({
    name: m.name,
    email: m.email
  }));

  console.log(result);
};

getAllUsers();

//## Activity 4 — Error Handling
const fetchUser = async () => {
    try {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      
  const data = await response.json()
  console.log(data)
    }
    catch(error){
        console.log("error");
    }
};
fetchUser();

const fetchMissing = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/99999"
    );

    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }

    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.log("Caught:", error.message);
  }
};

fetchMissing();



const title = document.getElementById("title");
title.textContent = "Hello, Intern!";

const query = document.querySelector("#subtitle");
query.style.color = 'blue';

const count = document.getElementById("counter");
const num = Number(count.textContent);
const result = num+1;
count.textContent = result;

const task = document.getElementById("user-list");
const names = ["Alex","Carol","Bob"];
names.forEach(name=>{
  const li = document.createElement("li");
  li.textContent = name;
  task.appendChild(li);
})

const t5 = document.getElementById("title");
t5.classList.toggle("highlight");

const but = document.getElementById("greet-btn");
but.addEventListener("click",dosome)
function dosome(){
  const read = document.getElementById("name-input").value;
  const greef = document.getElementById("greeting");
  if(read===""){
    greef.textContent = "please enter a name";
  }else {
    greef.textContent = "Hello," + read + "!";
  }

}
const color_btn = document.getElementById("change-color");
color_btn.addEventListener("click",colorchange);
function colorchange(){
  const c = document.querySelector("#col-change");
  c.style.color = "blue";
}

let ecount=0;
const inc = document.getElementById("add-btn");
inc.addEventListener("click",counter);
function counter(){
  ecount++;
  const get = document.getElementById("click-count");
  get.textContent = count;
   
}
const res = document.getElementById("reset-btn");
res.addEventListener('click',reset);
function reset(){
  ecount = 0;
  document.getElementById("click-count").textContent = count;
}
const updat = document.getElementById("name-input");
updat.addEventListener('input',updates);
function updates(){
   const read = document.getElementById("name-input").value;
  const q = document.getElementById("greeting");
  if(read===""){
    q.textContent = "please enter your name";
  }else {
    q.textContent = "Hello " + read + "!";
  }
}


//## Activity 7 — Fetch + DOM (Full Flow)

let users = [];

const click = document.getElementById("load-btn");

click.addEventListener("click", show);

async function show() {
  const status = document.getElementById("status");
  status.textContent = "Loading...";

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  users = await response.json();

  const container = document.getElementById("users-container");

  users.forEach((user) => {
    const div = document.createElement("div");

    div.textContent =
      "Name: " + user.name +
      ", Email: " + user.email +
      ", City: " + user.address.city;

    container.appendChild(div);
  });

  status.textContent = users.length + " users loaded";
}

const sea = document.getElementById("searchid");

sea.addEventListener("input", filter);

function filter() {
  const text = sea.value.toLowerCase();

  const container = document.getElementById("users-container");
  container.innerHTML = "";

  users.forEach((user) => {
    if (user.name.toLowerCase().includes(text)) {
      const div = document.createElement("div");

      div.textContent =
        "Name: " + user.name +
        ", Email: " + user.email +
        ", City: " + user.address.city;

      container.appendChild(div);
    }
  });
}

























// fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then(response => response.json()) //http format to java object
//   .then(user => {
//     console.log(user);
//   })
//   .catch(error => {
//     console.error(error);
//   });
//   const asy = async()=> {
//     const re = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//     const data = await re.json();
//     console.log(data);
//   }

// const p = new Promise((resolve,reject)=>{
//     const a = 5+7;
//     if(a===10){
//         console.log("succedd");
//     }else {
//         console.log("reject");
//     }

// });
// p.then(message =>{
//     console.log("message");
// }).catch(message=>{
//     console.log("error message");
// });