import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 

  constructor(private db:AngularFireDatabase){
   }

  getCategories(){
    return this.db.list("/categories").snapshotChanges();
  }
  
}
// ,(ref) => {
//   return ref.limitToLast(25).orderByChild(name); //doubt
// } // implicate sorting