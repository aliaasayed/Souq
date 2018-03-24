import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Headers,RequestOptions } from '@angular/http';
@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }
  getGmailURL(){
  return this.http.get("https://localhost:9090/auth/login/GooglePlusLogin")
              //.map((res)=>res.json())
  }
  getFacebookURL(){
  return this.http.get("https://localhost:9090/auth/facebook/login")
              //.map((res)=>res.json())
  }
  register(register):Observable<any>
  {
    console.log(register)
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');

        return this.http.post('https://localhost:9090/auth/register',register ,{
          headers: headers
        })
  }
}
