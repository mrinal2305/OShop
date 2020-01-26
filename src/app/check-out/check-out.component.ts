import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { CheckOutService } from '../shared/services/check-out.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  shipping : any= {};
  cart : ShoppingCart;
  cartSubscription : Subscription;
  userSubscription : Subscription;
  order: any;
  userId : string;
  totalQty : number = 0;
  id ;
  totalPrice : number =0;

  constructor(
    private shoppingCartService : ShoppingCartService,
    private checkOutService : CheckOutService,
    private router : Router) {
 
   }
  
  async placeOrder(x){
    this.shipping = x;
    let order = {
      
        datePlaced : new Date().getTime(),
        shipping   : this.shipping,
        product    : this.cart.items
      
    }
    let result = await this.checkOutService.saveOrder(order);
    this.shipping = {};
    this.shoppingCartService.removeItemAll();
    this.router.navigate(['/order-success',result.key]);
  }
  
  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe(cart => {
      this.cart = cart;
      this.totalQty = this.shoppingCartService.getTotalItemCount(this.cart);
      this.id = Object.keys(this.cart.items);
      for(let productId in this.cart.items){
        this.totalPrice += (this.cart.items[productId].quantity) * (this.cart.items[productId].product.price);
      } 
    })
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
   
  }

}
