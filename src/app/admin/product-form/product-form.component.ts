import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id;
  categories;
  product : any = {} ;

  constructor(
    private categoryService : CategoryService,
    private productService : ProductService,
    private router:Router,
    private route : ActivatedRoute)
    { 
       categoryService.getCategories().subscribe(user => {
       this.categories = user;
      });
  
     this.id=this.route.snapshot.paramMap.get('id');
     if(this.id) {
        productService.get(this.id).take(1).subscribe(p => {
        this.product = p.payload.val();
      });
      }
    
    }

  save(product){  //Saving and updating together -- AMAZING CONCEPT
    if(this.id) this.productService.update(this.id,product);
    else this.productService.createProduct(product);
    this.router.navigate(['/admin/products']);
  } 

  delete(){
    if(!confirm('Are you sure you want to delete')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
