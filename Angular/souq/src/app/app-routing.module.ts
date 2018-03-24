
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSouqComponent }   from './login-souq/login-souq.component';
import { SignupSouqComponent }   from './signup-souq/signup-souq.component';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { SouqhomeComponent }   from './souqhome/souqhome.component';
import { SellerHomeComponent }   from './seller-home/seller-home.component';
import { ForgetPasswordComponent }   from './forget-password/forget-password.component';


const routes: Routes = [
  { path: 'souq/login', component: LoginSouqComponent },
  { path: 'souq/signup', component: SignupSouqComponent },
  { path: 'souq/home', component: SouqhomeComponent},
  { path: 'souq/seller/home', component: SellerHomeComponent},
  { path: 'souq/forgetPw', component: ForgetPasswordComponent}
  ,
  {path: "login", component: LoginComponent},
  {path: "userRegister", component: UserRegisterComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ,CommonModule],
  exports: [ RouterModule ]
})

export class AppRoutingModule {


}
