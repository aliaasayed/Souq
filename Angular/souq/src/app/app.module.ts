import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { CarouselModule } from 'ngx-bootstrap';
import { RatingModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LoginService } from './login.service';
import { UserHomeComponent } from './user-home/user-home.component';

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
import { ProductService } from './product.service';
import { ProductSouqComponent } from './product-souq/product-souq.component';
import { SellerProComponent } from './seller-pro/seller-pro.component';
import { SellerProductsService } from './seller-products.service';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from 'angular5-social-login';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { CategoriesService } from './categories.service';
import { AllCategoriesComponent } from './all-categories/all-categories.component';



export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1714698738591209")
        },
        //{
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
    UserHomeComponent,

    UserRegisterComponent,
    LoginSouqComponent,
    SouqhomeComponent,
    SellerHomeComponent,
    ForgetPasswordComponent,
    SellerRegisterComponent,
    EditInfoComponent,
    UserProfileDetailComponent,
    ProductSouqComponent,
    SellerProComponent,
    SellerOrdersComponent,
    AllCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
  ],
  providers: [
    {provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs},
      LoginService,
      UsersProfileService,
      ProductService,
      SellerProductsService,
      CategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
