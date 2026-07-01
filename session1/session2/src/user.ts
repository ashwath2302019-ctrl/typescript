interface user {
    readonly id:number;
    name : string;
    email : string;
    age?:number;
    role: "admin" | "editor" | "viewer";
};
const a:user = {
     id:1,
     name:"ashwa",
     email : "ashwa@123",
     role : "admin"
}
//a.id = 2;  // Cannot assign to 'id' because it is a read-only propert
const b:user = {
    id:2, 
    name:"aswin",
    email:"aswin@123",
    role : "admin",
    //role: "supervisor" //Type '"supervisor"' is not assignable to type '"admin" | "editor" | "viewer"'
}

// **Write a comment explaining** why `readonly` on `id` is better than just trusting developers not to change it.
//Readonly on 'id' is better because it help the developer to have only one type instead of having multiple data types. It also 
//restrict for any kind of modification or changing. This property can be used in profile building where the user can allowed to type 
//only their personal id number at only once instaed of multiple attempts.