import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

displaySellerHome=false;
  constructor(private loginService: LoginService) {
    if(localStorage.getItem('Souqlogin')){//there token exist in localS
      this.loginService.verifyToken().subscribe((res)=>{
        if(res['success']&&localStorage.getItem('Souqlogin')=="true"){
        if(!JSON.parse(localStorage.getItem('SouqloginUser')).nationalID)
          window.location.href = 'http://localhost:4200/souq/home';
        else
          this.displaySellerHome=true;
        }
      });
    }
  }

  ngOnInit() {
  }

}
