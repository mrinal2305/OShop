import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase } from 'angularfire2/database';
import {  ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product : Product[];
  filteredProduct : Product[];
  cart : any;

  category : string;

  constructor(
    private productService : ProductService,
    private db : AngularFireDatabase,
    private route : ActivatedRoute,
    private shoppingCartService : ShoppingCartService) 
    { 

      // this.shoppingCartService.getCart()
      // .then(cart => {
      //   cart.snapshotChanges().subscribe(c => {
      //     let a  = c.payload.val();
      //     console.log(a);
      //   });
      // })
    // productService.getAll()
    // .subscribe(p => {
    //   this.product = p;

    //   route.queryParamMap.subscribe(params => {
    //   this.category = params.get('category'); //getting parameter category & We cannot use "this.id=this.route.snapshot.paramMap.get('id');" to get id.
                      
    //   this.filteredProduct = (this.category) ?  // filtering login
    //   this.product.filter(p => p.category === this.category) :
    //   this.product;
    // });
    
    // }); *this logic dealing with two observable by using two times subscibe method , looking to nested ,so we use 'SWITCH MAP' operator
    productService.getAll()
    .switchMap(p =>{
      if(!p) return;
      else {
      this.product = p;
      return route.queryParamMap;}
    })
    .subscribe(params => {
      this.category = params.get('category'); 
      
      this.filteredProduct = (this.category) ?  // filtering logic
      this.product.filter(p => p.category === this.category) :
      this.product;
    });
    
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart())
    .valueChanges().subscribe(cart =>{
      if(!cart) return;
      else{
      this.cart = cart;}

    });
  }

}
