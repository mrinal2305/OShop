import { Component, OnInit ,Input } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart.service';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  defaultImage = "https://firebasestorage.googleapis.com/v0/b/oshop-746be.appspot.com/o/Oshop%2Fdefault.jpg?alt=media&token=9e4f216f-7f5c-4b16-91d4-8bc587c15f17";
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
