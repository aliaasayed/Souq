import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Headers,RequestOptions } from '@angular/http';
import {GlobalDataService} from './global-data.service'


@Injectable()
export class LoginService {
  user:any;
  constructor(private http:HttpClient,private globalDataService:GlobalDataService) { }


  getUserLoginToken(email:String,password:String):Observable<any>{

  var body = {"email": email,"password": password};
   this.user=this.http.post<any>('https://localhost:9090/auth/userlogin', body);
   // console.log("service",this.user)
   this.globalDataService.setUserData(this.user);
   return this.user;

  }
  getUserLoginTokenforSocial(email:String):Observable<any>{

    console.log("ddddddddddddddddddd")

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    var body = {"email": email};

    return  this.user=this.http.post<any>('https://localhost:9090/auth/userloginSocailmedia', body,{
        headers: headers
      });
  }

  accessProtected(){
  const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('SouqtokenKey'))
      .set('Content-Type', 'application/json');

    return this.http.get('https://localhost:9090/auth/api/protected', {
      headers: headers
    });
  }

  verifyToken(){
  const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('SouqtokenKey'))
      .set('Content-Type', 'application/json');

    return this.http.get('https://localhost:9090/auth/verify', {
      headers: headers
    });
  }
  forgetPassword(Email:String): Observable<any> {
    var body = {"email": Email};
   return this.http.post<any>('https://localhost:9090/forgetPw/sendPw',body);
  }

  register(register):Observable<any>
      {
       console.log(register)
       const headers = new HttpHeaders()
             .set('Content-Type', 'application/json');

           return this.http.post('https://localhost:9090/auth/register',register ,{
             headers: headers
           });
      }
      socialLogin(register):Observable<any>
          {
           console.log(register)
           const headers = new HttpHeaders()
                 .set('Content-Type', 'application/json');

               return this.http.post('https://localhost:9090/auth/socialLogin',register ,{
                 headers: headers
               });
          }
  }
