import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../auth.service";
import { AppUser } from '../models/app-user';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser : AppUser;
  shoppingCartCount : number  ;
  

  constructor(private auth : AuthService,private shoppingCartService : ShoppingCartService) {
    
  };

  logOut(){
    this.auth.logOut();
  }

  async ngOnInit(){
    this.auth.appUser$().subscribe(appUser => this.appUser = appUser);
    
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      if(!cart) {
        this.shoppingCartCount = 0;
      }
      else  this.shoppingCartCount = this.shoppingCartService.getTotalItemCount(cart);
      // this.shoppingCartCount = 0; 
      // for(let productId in cart.items){
      //   this.shoppingCartCount += cart.items[productId].quantity;
      // } 
    });
  }
}
