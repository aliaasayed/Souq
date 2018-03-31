import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  displayForgetPw=false
  userEmail="";
  constructor(private loginService: LoginService) {
   if(!localStorage.getItem('Souqloginkey')){
   this.displayForgetPw=true;
   }

  }

  ngOnInit() {
  }

  sendEmailfn(){
    console.log(this.userEmail);
    this.loginService.forgetPassword(this.userEmail).subscribe((res)=>{
      console.log(res)
    });
  }

}
