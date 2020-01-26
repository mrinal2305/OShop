import { Component, OnInit,Input} from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
   category$;
   isActive = false;
  @Input ('category') category;

  constructor(categoryService : CategoryService) { 
    let x = categoryService.getCategories();
    if(!x) return;
    else this.category$ = x;
  }

  toggle(){
    //  if(this.isActive){
    //    this.isActive = false;
    //  }
     this.isActive = !this.isActive;
  }

  ngOnInit() {
  }

}
