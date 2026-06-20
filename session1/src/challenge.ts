function throwError(message:string):never{
    throw new Error(message);
}

function calculateArea(p:number,d?:number):number{
        
        if(d===undefined){
            return p;
        } if(d>=100){
            throwError("Discount cannot be more than 100%");
        }
        const final =  p -(p*d)/100;
        return final;
}
const result = calculateArea(60, 70);
console.log(result);

function format(user:[string,number][]):string[]{
    return user.map(([users,ages])=>
         `${users} (${ages} years)`
    );
}
    const user:[string,number][]= [
        ["Alice",20],
        ["Bob",30],
        ["Carol",40]
    ]


const resu = format(user);
console.log(resu);


function findFirst(arr:string[],search:string):string|undefined{
 for (const item of arr) {
        if (item === search) {
            return item;
        }
    }

    return undefined;
}
const arr:string[]=[
    "Ashwath",
    "Ashwa",
    "Ashwath's"
]
const re = findFirst(arr,"ashwa");
console.log(re);