import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsersProfileService {

//for get and update user profile
  constructor(private http:HttpClient) { }

  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders()
        .set('authorization', localStorage.getItem('SouqtokenKey'))
        .set('Content-Type', 'application/json');
    return this.http.get<any>("https://localhost:9090/users/profile",
       {headers: headers});
  }

}
