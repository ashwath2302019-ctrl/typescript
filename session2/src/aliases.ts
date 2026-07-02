type useriD = string;
type  ProductId = string;
type Timestamp = number;
type Status = "active" | "inactive" | "pending";
type Direction = "north" | "south" | "east" | "west";

function getUserById(id:useriD): void {
    
}
const id1 = "user123";
    getUserById(id1);


function updateStatus(id:useriD ,status:Status): void {

}
function move(direction:Direction,steps: number): void {

}

//TypeScript uses "structural typing" not "nominal typing". This means `UserId` and `ProductId` are both just `string` under the hood — TypeScript treats them as interchangeable. Research what this means and why it can be a limitation. Write your finding as a comment.
// This is because typescript only cares about the structure of the object in terms of types and properties and not about the name it is defined . 
