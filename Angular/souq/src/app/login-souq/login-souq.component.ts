import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import {GlobalDataService} from '../global-data.service'
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-login-souq',
  templateUrl: './login-souq.component.html',
  styleUrls: ['./login-souq.component.css']
})
export class LoginSouqComponent implements OnInit {
  FbookUrl:any;
  GmailUrl:any;
  UserLogTokem:any;
  logedUser:any;
  user={email:"",password:""};
  loginPage=false;

  constructor(private loginService: LoginService,
    private socialAuthService: AuthService,
    private route:Router,private globalDataService:GlobalDataService){

  //web servic take token then retrieve it's rule and info needed
    if(!localStorage.getItem('SouqtokenKey')){//user isnot logged
        this.loginPage=true;
        console.log("else")
      }
    else{
       this.route.navigate(['/'])
    }
  }

  public socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
        if(socialPlatform == "facebook"){
          socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }else if(socialPlatform == "google"){
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
            // console.log(socialPlatform+" sign in data : " , userData);


            this.globalDataService.setUserData(userData);
            this.globalDataService.currentuser.subscribe((res)=>{
              this.logedUser=res;
              console.log("loged userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",this.logedUser)
            });


            this.loginService.socialLogin(userData).subscribe((res)=>{
            console.log(res);
            if(res=="true" || res=="user email exist")
            {

               this.route.navigate(['/souq/home'])
            }else{}



          });
          }
        );
      }
  ngOnInit(): void {
    console.log("init")
  }

  getToken(): void {
    this.loginService.getUserLoginToken(this.user.email,this.user.password).subscribe((res)=>{
      console.log("login service",res);

      if(res.success){
        localStorage.setItem('SouqtokenKey', res.token);

        this.globalDataService.setUserData(res.user);
        this.globalDataService.currentuser.subscribe((res)=>{
          this.logedUser=res;
          console.log("loged user",this.logedUser)
        });

        if(this.logedUser.nationalID!=null)
        this.route.navigate(['/sellerHome'])
        else
        this.route.navigate(['/souq/home'])
       }
      else
      console.log(res);
    });
  }


  access():void{
    console.log("clicccc");
    this.loginService.accessProtected().subscribe((res)=>{
      console.log(res)
    });

  }
}
