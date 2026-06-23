
type  Identifiable = {
readonly  id: string 
};
type  Timestamped =  {
      createdAt: Date;
      updatedAt: Date; 
    };
type SoftDeletable = 
{ deletedAt?: Date; 
    isDeleted: boolean; 

};
type BaseRecord = Identifiable & Timestamped;
type UserRecord = BaseRecord & {
    name:string;
    email:string;
} ;
 type AuditedUserRecord = UserRecord & SoftDeletable;

 function isDeleted(s:AuditedUserRecord):boolean{
        return s.deletedAt !==undefined;
 }

 const base: BaseRecord = {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date()
};

const user: UserRecord = {
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Ashwa",
    email: "ashwa@gmail.com"
};

const audited: AuditedUserRecord = {
    id: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Aswin",
    email: "aswin@gmail.com",
    isDeleted: false
};

type A = { value: string };
type B = { value: number };
type C = A & B;

// const cd:C ={
//     //value : "ashwa"
    
// };

//error : type string cannot be assignable to type never 
// When intersecting two types that contain the same property
// with incompatible types, TypeScript computes the property
// type as 'never'.
//
// Example:
// string & number = never
//