import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component';


const routes=[
  //  {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "userRegister", component: UserRegisterComponent},
    // {path: "**", component: NotFoundComponent},
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
