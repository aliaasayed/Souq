import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSouqComponent }   from './login-souq/login-souq.component';
import { SignupSouqComponent }   from './signup-souq/signup-souq.component';
import { SouqhomeComponent }   from './souqhome/souqhome.component';
import { SellerHomeComponent }   from './seller-home/seller-home.component';
import { ForgetPasswordComponent }   from './forget-password/forget-password.component';
import { UserProfileDetailComponent }   from './user-profile-detail/user-profile-detail.component';


const routes: Routes = [
  { path: 'souq/login', component: LoginSouqComponent },
  { path: 'souq/signup', component: SignupSouqComponent },
  { path: 'souq/home', component: SouqhomeComponent},
  { path: 'souq/seller/home', component: SellerHomeComponent},
  { path: 'souq/forgetPw', component: ForgetPasswordComponent},
  { path: 'souq/home/profile', component: UserProfileDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {


}
