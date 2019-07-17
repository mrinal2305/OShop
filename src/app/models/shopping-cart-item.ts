interface Product {
    category : string,
    imageUrl : string,
    price    : number,
    title    : string
}

export interface ShoppingCartItem{
    quantity : number,
    product  : Product
}