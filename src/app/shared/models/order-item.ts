import { Product } from './product';

interface product {
    product : Product,
    quantity : number
}

export interface Order {
    id : string,
    datePlaced : Date;
    product : product[],
    shipping : {
        adress : string,
        city   : string,
        name   : string
    }
}