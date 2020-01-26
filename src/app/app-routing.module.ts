import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shared/component/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin_/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin_/components/admin-orders/admin-orders.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AdminAuthGuardService } from './admin_/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin_/components/product-form/product-form.component';
import { DetailsComponent } from './my-orders/details/details.component';
import { AdminDetailComponent } from './admin_/components/admin-detail/admin-detail.component';

const routes: Routes = [
  {path : "",               component : ProductsComponent},
  {path : "products",       component : ProductsComponent      },
  {path : "shopping-cart",  component : ShoppingCartComponent },
  {path : "login",          component : LoginComponent         },

  {path : "check-out",      component : CheckOutComponent  ,  canActivate : [AuthGuard]  },
  {path : "my/orders",      component : MyOrdersComponent  , canActivate : [AuthGuard]  },
  {path : "my/orders/:id" ,      component : DetailsComponent  , canActivate : [AuthGuard]  },
  {path : "order-success",    component : OrderSuccessComponent, canActivate : [AuthGuard]  },
  {path : "order-success/:id",  component : OrderSuccessComponent, canActivate : [AuthGuard]  },
  
  {path : "admin/products", component : AdminProductsComponent , canActivate : [AuthGuard,AdminAuthGuardService]},
  {path : "admin/products/new", component :ProductFormComponent , canActivate : [AuthGuard,AdminAuthGuardService]},
  {path : "admin/products/new/:id", component :ProductFormComponent , canActivate : [AuthGuard,AdminAuthGuardService]},
  {path : "admin/orders",   component : AdminOrdersComponent , canActivate : [AuthGuard,AdminAuthGuardService] },
  {path : "admin/orders/:uId/:pId",   component : AdminDetailComponent , canActivate : [AuthGuard,AdminAuthGuardService] }
];
// There is no diff bw using "" and '' in declaring variables,both are same

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminAuthGuardService
  ]
})
 
export class AppRoutingModule { }
export const routingComponents =
 [ 
  HomeComponent,
  ProductsComponent,
  ShoppingCartComponent,
  CheckOutComponent,
  OrderSuccessComponent,
  MyOrdersComponent,
  AdminProductsComponent,
  AdminOrdersComponent, 
  LoginComponent,
  ProductFormComponent
];