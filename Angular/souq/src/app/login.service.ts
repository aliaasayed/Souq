import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

 getGmailURL(): Observable<any> {
   return this.http.get<any>("https://localhost:9090/auth/login/GooglePlusLogin");
 }

 getFacebookURL(): Observable<any> {
    return this.http.get<any>('https://localhost:9090/auth/facebook/login');
  }

  getUserLoginToken(email:String,password:String):Observable<any>{

    var body = {"email": email,"password": password};
    return this.http
   .post<any>('https://localhost:9090/auth/userlogin', body);
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


}
