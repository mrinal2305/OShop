import { Product } from './../models/product';
export interface AdminOrder{
    uid : string,
    pid : string,
    product : Product,
    shipping : {
        adress : string,
        city   : string
        name   : string
    }
}