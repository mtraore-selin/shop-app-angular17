import { Routes } from '@angular/router';

import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-detail/product-detail.component';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'detail/:id', component: ProductDetailsComponent },
  { path: 'edit/:id', component: ProductFormComponent },
  { path: 'new', component: ProductFormComponent },
];
