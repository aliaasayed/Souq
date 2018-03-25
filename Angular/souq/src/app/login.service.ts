import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Headers,RequestOptions } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }
  getUserLoginToken(email:String,password:String):Observable<any>{

  var body = {"email": email,"password": password};
  return this.http.post<any>('https://localhost:9090/auth/userlogin', body);
  }


  accessProtected(){
  const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('SouqtokenKey'))
      .set('Content-Type', 'application/json');

    return this.http.get('https://localhost:9090/auth/api/protected', {
      headers: headers
    })
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
  }
