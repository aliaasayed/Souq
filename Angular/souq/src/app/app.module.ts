import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginService } from './login.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginSouqComponent } from './login-souq/login-souq.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupSouqComponent } from './signup-souq/signup-souq.component';
import { SouqhomeComponent } from './souqhome/souqhome.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    LoginSouqComponent,
    SignupSouqComponent,
    SouqhomeComponent,
    SellerHomeComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
