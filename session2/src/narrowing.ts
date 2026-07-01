function describe(value: string | number | boolean | null):string {
    if(typeof value==="string"){
        return `${value.length} of length X :${value}`;
    }
    else if (typeof value==="number"){
        return `Number: ${value.toFixed(2)}`;
    }else if(typeof value ==="boolean"){
        return `boolean :${value}`;
    }else {
        return `No value provided`;
    }
}



interface Cat { 
    name:"cat";
    meow(): void; 
}
interface Dog {
    name:"dog";
     bark(): void; 
    }
    type inter = Cat|Dog;

    function makeSound(animal: inter): void {
    if ("meow" in animal) {
        animal.meow();
    } else {
        animal.bark();
    }
}

// function summarise(input: string | number[] | { label: string }): string {
//   // your implementation here
// }