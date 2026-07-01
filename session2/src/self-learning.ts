//partial type - > make all the object property as an optional parameter

interface user {
    id:number;
    name:string;
    email:string;
};
type part = Partial<user>;
function updateuser(User:user,pa:part):user{
    return {
        ...User, // returns all of the user properties
        ...pa // return only the update email

}
}
const us:user = {
    id:1,
    name:"asheath",
    email:"ashwa@123",
};
    const a = updateuser(us,{
        email:"ashwathsk"
    })
console.log(a);

//2) pick properties : pick<T,K> - select only specifi properities from the object

type a = Pick<user,"name"|"email">;

function pic(pi:a){
    return `welcome ${pi.name} your email is ${pi.email}`;
}
    
//OMIT -> Removes a specific properties from a type

type re = Omit<user,"id">;  //contains all the elemnt without the property id.
function omitt(r:re){
    return {
        id:Math.floor(Math.random()*1000)
    };
}

const re = omitt({
    name : "ashwa",
    email:"ashwa@123"
});
console.log(re);
// usage : when creating a user the database generates the id automatically.

// Record <k,v> create a object with type key and value 
type Role = "admin" | "editor" | "viewer";
type rec = Record<Role,string[]>;



