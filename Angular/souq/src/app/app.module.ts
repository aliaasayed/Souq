import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginService } from './login.service';
import { LoginSouqComponent } from './login-souq/login-souq.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupSouqComponent } from './signup-souq/signup-souq.component';
import { SouqhomeComponent } from './souqhome/souqhome.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSouqComponent,
    SignupSouqComponent,
    SouqhomeComponent,
    SellerHomeComponent,
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
