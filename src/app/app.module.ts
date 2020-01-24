import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image'; 
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireModule } from 'angularfire2';
import { environment } from "./../environments/environment";
import { AngularFireDatabaseModule } from 'angularfire2/database'; 
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from  '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { ShoppingCartService } from './shopping-cart.service';
import { OrderService } from './order.service';


import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { DataTableModule } from 'angular5-data-table';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCartComponent } from "./products/product-cart/product-cart.component";
import { UpdateQtyComponent } from './update-qty/update-qty.component';
import { CheckOutService } from './check-out.service';
import { DetailsComponent } from './my-orders/details/details.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    ProductFilterComponent,
    ProductCartComponent,
    UpdateQtyComponent,
    DetailsComponent,
    AdminDetailComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LazyLoadImageModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    CheckOutService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
