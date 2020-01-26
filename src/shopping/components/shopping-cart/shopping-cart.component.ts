import { ShoppingCartService } from '../../../app/shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../app/shared/models/product';
import { ProductService } from '../../../app/shared/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalQty : number ;
  totalPrice : number = 0;
  id ;
  cart : any;
  product : Product[];
  constructor(private shoppingCartService : ShoppingCartService,private productService : ProductService) { }

  clearCart(){
    this.shoppingCartService.removeItemAll();
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart())
    .valueChanges().subscribe(cart => {
      
      if(!cart) {
        this.totalQty = 0;
        this.totalPrice = 0;
        this.cart = null;
      }
      else {
      this.totalQty = this.shoppingCartService.getTotalItemCount(cart);
      this.cart = cart;
      this.id = Object.keys(this.cart.items);
      for(let productId in this.cart.items){
        this.totalPrice += (this.cart.items[productId].quantity) * (this.cart.items[productId].product.price);
      } 
    }
    });
    
  }

}
