import { Component, OnInit ,Input } from '@angular/core';
import { ShoppingCartService } from './../../shopping-cart.service';
import { Product } from './../../models/product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input ('product') product : Product;
  @Input ('show-actions') showActions = true;
  @Input ('shoppingCart') ShoppingCart;

  constructor(private cartService : ShoppingCartService) { }

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
