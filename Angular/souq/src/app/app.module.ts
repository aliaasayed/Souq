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

import { EditProductComponent } from './editproduct/editproduct.component';

import { UsersProfileService } from './users-profile.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginSouqComponent } from './login-souq/login-souq.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { AppRoutingModule } from './app-routing.module';
import { SouqhomeComponent } from './souqhome/souqhome.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserProfileDetailComponent } from './user-profile-detail/user-profile-detail.component';

import { ProductService } from './product.service';
import { ProductSouqComponent } from './product-souq/product-souq.component';
import { SellerProComponent } from './seller-pro/seller-pro.component';
import { SellerProductsService } from './seller-products.service';

import { OrderDetailsComponent } from './order-details/order-details.component';
import {OrderDetailsService} from './order-details.service';



import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from 'angular5-social-login';

import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { CategoriesService } from './categories.service';
import { AllCategoriesComponent } from './all-categories/all-categories.component';


import { MycartDetailComponent } from './mycart-detail/mycart-detail.component';

import { AddProductComponent } from './addproduct/addproduct.component';



export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1714698738591209")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("354714650297-41vs1jbd0kr4dgvk1i1o1635no10vnfi.apps.googleusercontent.com")
        },
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

    UserProfileDetailComponent,
    ProductSouqComponent,
    SellerProComponent,
    SellerOrdersComponent,
    AllCategoriesComponent,

    MycartDetailComponent,

    AddProductComponent,
    EditProductComponent,

    OrderDetailsComponent
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
      CategoriesService,
      OrderDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
