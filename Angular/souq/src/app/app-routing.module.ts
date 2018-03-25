import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginSouqComponent }   from './login-souq/login-souq.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { SouqhomeComponent }   from './souqhome/souqhome.component';
import { SellerHomeComponent }   from './seller-home/seller-home.component';
import { ForgetPasswordComponent }   from './forget-password/forget-password.component';
import { UserProfileDetailComponent }   from './user-profile-detail/user-profile-detail.component';
import { ProductSouqComponent }   from './product-souq/product-souq.component';

const routes: Routes = [
  { path: 'souq/login', component: LoginSouqComponent },
  { path: 'souq/userRegister', component: UserRegisterComponent },
  { path: 'souq/sellerRegister', component: SellerRegisterComponent },
  { path: 'souq/home', component: SouqhomeComponent},
  { path: 'souq/seller/home', component: SellerHomeComponent},

  { path: 'souq/forgetPw', component: ForgetPasswordComponent},
  { path: 'souq/home/profile', component: UserProfileDetailComponent},

  {path: "userRegister", component: UserRegisterComponent},
  {path: "souq/product", component:   ProductSouqComponent},
  // {path: "souq/product/:page?", component:   ProductSouqComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
