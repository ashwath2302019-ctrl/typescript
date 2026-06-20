function add(a:number,b:number):string{
    return a+b;
}

function formatname(firstname:string,lastname:string):string{
    return `${firstname} ${lastname}`
}

function isAdult(age:number):boolean{
    return age>=18;
}

function getFirstElement(arr:Array<string>):string{
  return arr[0];
}