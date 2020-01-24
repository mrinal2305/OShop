import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { Order } from './shared/models/order-item';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService  {
  
  userId;
  constructor(private db : AngularFireDatabase,private authService : AuthService) { 
    
  }
  async getOrderOfLoginUser(){
    await this.authService.user$.subscribe(user => this.userId = user.uid);
    return this.db.list('/orders/'+this.userId).snapshotChanges().pipe(
      map((actions : AngularFireAction<DatabaseSnapshot<Order>>[]) => actions.map(a => {
        const data = a.payload.val();
        const id =   a.key;
        return { id, ...data };
      }))
    )
  }

  getDetails(id) {
    return this.db.object('/orders/'+this.userId+'/'+id).valueChanges();
  }

  getAdminDetails(uId,pId) {
    return this.db.object('/orders/'+uId+'/'+pId).valueChanges();
  }

  getAll(){
    return this.db.object('/orders').valueChanges();
  }

  remove(uId,pId){
    return this.db.object('/orders/'+uId+'/'+pId).remove();
  }

  
}
