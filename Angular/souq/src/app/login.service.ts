import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  getGmailURL(){
  return this.http.get("https://localhost:9090/auth/login/GooglePlusLogin")
              .map((res)=>res.json())
  }
  getFacebookURL(){
  return this.http.get("https://localhost:9090/auth/facebook/login")
              .map((res)=>res.json())
  }
}
