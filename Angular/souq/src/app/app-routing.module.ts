import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginSouqComponent }   from './login-souq/login-souq.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { ForgetPasswordComponent }   from './forget-password/forget-password.component';
import { UserProfileDetailComponent }   from './user-profile-detail/user-profile-detail.component';
import { ProductSouqComponent }   from './product-souq/product-souq.component';
import { SellerProComponent } from './seller-pro/seller-pro.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { MycartDetailComponent } from './mycart-detail/mycart-detail.component';
import { AddProductComponent }   from './addproduct/addproduct.component';
import { EditProductComponent } from './editproduct/editproduct.component';
import { AllCategoriesComponent }   from './all-categories/all-categories.component';
import { SouqSearchComponent }   from './souq-search/souq-search.component';
import { SellerOrdersComponent }   from './seller-orders/seller-orders.component';
import { OrderDetailsComponent }   from './order-details/order-details.component';
import { AppComponent } from './app.component';
import { ProductDetailsComponent }   from './product-details/product-details.component';

import {ErrorPageComponent} from './error-page/error-page.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';


const routes: Routes = [
  //{path: '', component: AppComponent},

  { path: 'souq/login', component: LoginSouqComponent },
  { path: 'souq/forgetPw', component: ForgetPasswordComponent},
  { path: 'souq/userRegister', component: UserRegisterComponent },
  { path: 'souq/sellerRegister', component: SellerRegisterComponent },

  { path: 'souq/home', component: UserHomeComponent},
  { path: 'souq/home/profile', component: UserProfileDetailComponent},

  {path: "userRegister", component: UserRegisterComponent},
  {path: "souq/product/:subCatName", component:   ProductSouqComponent},
  // {path: "souq/product/:page?", component:   ProductSouqComponent},
  { path: 'sellerHome', component: SellerProComponent},

  { path: 'souq/myCart', component: MycartDetailComponent},
  { path: 'souq/search', component: SouqSearchComponent},

  { path: 'addproduct', component: AddProductComponent},

  { path: 'editproduct', component: EditProductComponent},

  { path: 'editproduct/:id', component: EditProductComponent},
  { path: 'productdetails/:id', component: ProductDetailsComponent},

  { path: 'AllCategories', component: AllCategoriesComponent},
  { path: 'sellerOrders', component: SellerOrdersComponent},
  { path: 'myOrders', component: MyOrdersComponent},

  { path: 'orderDetails/:id/:page', component: OrderDetailsComponent},
  { path: '404', component : ErrorPageComponent},
  { path: '', redirectTo: '/souq/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
