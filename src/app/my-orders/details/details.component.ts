import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../../order.service';
import { Order } from 'src/app/models/order-item';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
 
  id;
  pId;
  data : Order ;
  totalPrice : number = 0;
  constructor(private route : ActivatedRoute,private orderService : OrderService) {
    this.id=this.route.snapshot.paramMap.get('id');
    this.orderService.getDetails(this.id).subscribe((data : Order) => {
      if(!data) return;
      else 
      {
        this.data = data;
      
      if(this.data.product == null){
        return;
      }
      else this.pId = Object.keys(this.data.product); 
      for(let d in data.product){
        this.totalPrice += ((this.data.product[d].quantity) * (this.data.product[d].product.price));
      }
    }
    });  
   }

  ngOnInit() {
  }

}
