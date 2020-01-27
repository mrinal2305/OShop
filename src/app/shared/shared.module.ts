import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataTableModule } from 'angular5-data-table';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCartComponent } from './component/product-cart/product-cart.component';
import { ProductFilterComponent } from './component/product-filter/product-filter.component';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { CheckOutService } from './services/check-out.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { SharedRoutingModule ,routingComponents } from './shared-routing.module';

@NgModule({
  declarations: [
    ProductCartComponent,
    ProductFilterComponent,
    routingComponents
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DataTableModule,
    CustomFormsModule
  ],    
  providers : [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    CheckOutService,
    OrderService
  ],
  exports :[
    ProductCartComponent,
    ProductFilterComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,
  ]
})
export class SharedModule { }
