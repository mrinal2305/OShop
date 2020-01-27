import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './component/products.component';

const routes : Routes = [
  {path : "",               component : ProductsComponent},
  {path : "products",       component : ProductsComponent      },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports : [RouterModule]
})

export class SharedRoutingModule { }

export const routingComponents = [
  ProductsComponent
];
