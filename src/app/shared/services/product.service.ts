import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db :AngularFireDatabase) {
   }

  createProduct(product){
    this.db.list('/products').push(product);
  }

  getAll():Observable<Product[]>{
    return this.db.list('/products').snapshotChanges().pipe(
      map((actions : AngularFireAction<DatabaseSnapshot<Product>>[]) => actions.map(a => {
        const data = a.payload.val();
        const id =   a.key;
        return { id, ...data };
      }))
    );
  }
  
  get(productId){
    return this.db.object('/products/'+productId).snapshotChanges();
  }

  update(productId,product){
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }
}
