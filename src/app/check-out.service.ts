import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
   
  userId;
  constructor(private db : AngularFireDatabase,private authService : AuthService) { 
    this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      console.log(this.userId);
    })
  }

  saveOrder(order){
    return this.db.list('/orders/'+ this.userId).push(order);
  }
}
