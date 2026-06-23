interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  discount?: number;
}


// Bug 1
// Without TypeScript, if discount is undefined,
// product.price - product.discount would evaluate to NaN.
function applyDiscount(product: Product): number {
    if(product.discount === undefined){
        return product.price;
    }
  return product.price - product.discount;  
}

// Bug 2
// Without TypeScript, if tags were not an array,
// calling join() would throw:
// "TypeError: product.tags.join is not a function"

function getTagSummary(product: Product): string {
  return product.tags.join(", ").toUpperCase();
}

// Bug 3
// Without TypeScript, createProduct could return an object
function createProduct(name:string, price:number): Product {
  return {
    id: Math.random().toString(),
    name: name,
    price: price,
    tags: []
  };
}

// Bug 4
// Without TypeScript, if products contains objects without
// a numeric price, the comparison could produce NaN
function findCheapest(products: Product[]): Product {
     if (products.length === 0) {
    throw new Error("No products provided");
  }
  return [...products].sort((a, b) => a.price - b.price)[0]!;
}


// Bug 5
// Without TypeScript, if product.price or product.name
// were missing/undefined, the output would be incorrect
function printProduct(product: Product): void {
  console.log(`${product.name} costs ${product.price}`);
  
}

 //This catches TypeScript type errors early without
// generating build files, helping prevent runtime bugs.