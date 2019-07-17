import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {

uId;
data;
pId;  
productId;
totalPrice : number = 0;
constructor(private route : ActivatedRoute,private orderService : OrderService,private router:Router) { 
  this.uId=this.route.snapshot.paramMap.get('uId');
  this.pId=this.route.snapshot.paramMap.get('pId');

  ;

  this.orderService.getAdminDetails(this.uId,this.pId).subscribe(x => {
    
    this.data = x;
    
    
    if(this.data.product == null){
      return;
    }
    else {
    this.productId = Object.keys(this.data.product); 
    for(let d in this.data.product){
      this.totalPrice += ((this.data.product[d].quantity) * (this.data.product[d].product.price));
    }
    
  }
  });
  
  
}
 remove(){
  if(!confirm('Are you sure you want to delete')) return;
  
   this.orderService.remove(this.uId,this.pId);
   this.router.navigate(['/admin/orders']);
 }

  ngOnInit() {
  }

}
