import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductService } from './../../product.service';
import  'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../shared/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  product : Product[];

  subscription : Subscription;
  tableResource : DataTableResource<Product>;
  items: Product[] = [];
  itemCount : number;

  constructor(private productService:ProductService) {
    this.subscription = productService.getAll().subscribe(product => {
      this.product = product;
      this.initializeTable(product);      
    })
    }

    private initializeTable(product : Product[]){
      this.tableResource = new DataTableResource(product);
      this.tableResource.query({offset : 0})
      .then(items => this.items= items);
      this.tableResource.count()
      .then(count => this.itemCount = count);
    }

    reloadItems(params){
      if (!this.tableResource) return;
      this.tableResource.query(params)
      .then(items => this.items= items);
    }

    filter(data){
      let filteredProduct = (data) ? 
      this.product.filter(p => p.title.toLowerCase().includes(data.toLowerCase())) : //filtering logic
      this.product;

      this.initializeTable(filteredProduct); 
    }
    
   ngOnDestroy() {
     this.subscription.unsubscribe();
   }

   ngOnInit() {
  }

}
