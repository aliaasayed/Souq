import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular5-social-login";

import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LoginService } from './login.service';
import { UsersProfileService } from './users-profile.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginSouqComponent } from './login-souq/login-souq.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { AppRoutingModule } from './app-routing.module';
import { SouqhomeComponent } from './souqhome/souqhome.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserProfileDetailComponent } from './user-profile-detail/user-profile-detail.component';
import { EditInfoComponent } from './edit-info/edit-info.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1714698738591209")
        },
        // {
        //   id: GoogleLoginProvider.PROVIDER_ID,
        //   provider: new GoogleLoginProvider("294559565518-b4o6oi3a57782msinnbpvsjenquhjc0g.apps.googleusercontent.com")
        // },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    LoginSouqComponent,
    SouqhomeComponent,
    SellerHomeComponent,
    ForgetPasswordComponent,
    SellerRegisterComponent,
    EditInfoComponent,
    UserProfileDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
  ],
  providers: [
    {provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs},
      LoginService,
      UsersProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
