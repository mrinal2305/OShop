import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-update-qty',
  templateUrl: './update-qty.component.html',
  styleUrls: ['./update-qty.component.css']
})
export class UpdateQtyComponent implements OnInit {

  @Input ('product') product : Product;
  @Input ('show-actions') showActions = true;
  @Input ('shoppingCart') ShoppingCart;
  

  constructor(private cartService : ShoppingCartService) {

   }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  
  getQuantity() {
    if(!this.ShoppingCart) return 0;
  
    let item = this.ShoppingCart.items[this.product.id];
    return item ? item.quantity : 0;
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
  ngOnInit() {
  }

}
