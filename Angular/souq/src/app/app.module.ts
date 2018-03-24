import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginService } from './login.service';
import { UsersProfileService } from './users-profile.service';
import { UserRegisterComponent } from './user-register/user-register.component';27
import { LoginSouqComponent } from './login-souq/login-souq.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupSouqComponent } from './signup-souq/signup-souq.component';
import { SouqhomeComponent } from './souqhome/souqhome.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserProfileDetailComponent } from './user-profile-detail/user-profile-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    LoginSouqComponent,
    SignupSouqComponent,
    SouqhomeComponent,
    SellerHomeComponent,
    ForgetPasswordComponent,
    UserProfileDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
              LoginService,
              UsersProfileService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
