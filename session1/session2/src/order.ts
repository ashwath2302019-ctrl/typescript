interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

interface Product {
    readonly id: number;
    name: string;
    price: number;
    category: string;
}

interface OrderItem {
    product: Product;
    quantity: number;
}

interface Order {
    readonly id: number;
    customer: string;
    items: OrderItem[];

    shippingAddress: Address; //nesting interface

    status: "pending" | "shipped" | "delivered";

    createdAt: Date;
}

function calculateTotal(order: Order): number{
    let total = 0;
   for (const item of order.items) {
        total += item.product.price * item.quantity;
    }

    return total;
}

interface treenode {
    name:string;
    id:number;
    tree?:treenode;
}; //no error occured because a interface has the ability to call itself.