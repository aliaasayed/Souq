import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup-souq',
  templateUrl: './signup-souq.component.html',
  styleUrls: ['./signup-souq.component.css']
})
export class SignupSouqComponent implements OnInit {

 signUpPage=false;
  constructor(private loginService: LoginService) {
    if(localStorage.getItem('Souqlogin')){//there token exist in localS
      this.loginService.verifyToken().subscribe((res)=>{
        if(res['success']&&localStorage.getItem('Souqlogin')=="true"){
          window.location.href = 'http://localhost:4200/souq/home';
        }
      });
    }
    else
        this.signUpPage=true;
    }

  ngOnInit() {
  }

}
