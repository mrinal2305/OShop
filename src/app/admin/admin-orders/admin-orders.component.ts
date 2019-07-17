import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../order.service';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  
  orderAll : any ;
  order : any[] = [];
  
  constructor(private orderService : OrderService) { 
    this.orderService.getAll().subscribe((x : any ) => {
      this.orderAll = x;
      for(let p in x){
        for(let d in x[p]){
          let obj = {};
        obj['uId']           = p;
        obj['pId']           = d;
        obj['datePlaced']    = x[p][d].datePlaced;
        obj['product']       = x[p][d].product;
        obj['shipping']      = x[p][d].shipping;
        this.order.push(obj);
        }
      }
     
    
    });
  }

  ngOnInit() {
  }

}
