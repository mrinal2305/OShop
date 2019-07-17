import { Injectable } from '@angular/core';
import {  AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){ //Creating a cart
    return this.db.list('/shopping-cart').push({
      dateCreated : new Date().getTime()
    });
  }

  async getCart() : Promise<AngularFireObject<ShoppingCart>>  { //Getting the shopping cart
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+ cartId);
  } 

  getTotalItemCount(cart) : number{
   
    let count = 0; 
      for(let productId in cart.items){
        count += cart.items[productId].quantity;
      } 
    return count;
  }

  private getItem(productId : string , cartId : string){ //Getting the item of particular id
    return this.db.object('/shopping-cart/'+cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() : Promise<string>{ //Getting or creating the cart
    let cartId = localStorage.getItem("cartId");
    if(cartId) return cartId;
    

      // this.create().then(result => { WE USE ASYNC AWAIT METHOD FOR MORE READABLE CODE
      //   localStorage.setItem('cartId',result.key);

      //   return this.getCart(result.key);
      // });
      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;
  }

  async removeItemAll(){
    let cardId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+cardId).remove();
  }

  async addToCart(product : Product){ //Adding product to cart
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(product.id,cartId);
    item$.valueChanges().take(1).subscribe((item :any) => {
      let p = {
        title : product.title,
        price : product.price,
        category : product.category,
        imageUrl : product.imageUrl
      }
      if(item == null) {
        item$.set({product : p,quantity : 1});
      }
      else{
        item$.update({quantity : item.quantity + 1});
      }
    })
  
  }

   async removeFromCart(product : Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(product.id,cartId);
    item$.valueChanges().take(1).subscribe((item :any) => {
      let p = {
        title : product.title,
        price : product.price,
        category : product.category,
        imageUrl : product.imageUrl
      }
      if(item == null) {
        item$.set({product : p,quantity : 1});
      }
      else{
        item$.update({quantity : item.quantity - 1});
      }
    })
   }

}
