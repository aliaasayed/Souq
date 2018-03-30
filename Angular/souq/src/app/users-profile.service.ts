import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsersProfileService {

//for get and update user profile
  constructor(private http:HttpClient) { }
  getOffers(): Observable<any> {
    return this.http.get<any>("https://localhost:9090/products/top")
  }
  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders()
        .set('authorization', localStorage.getItem('SouqtokenKey'))
        .set('Content-Type', 'application/json');
    return this.http.get<any>("https://localhost:9090/users/profile",
       {headers: headers});
  }
  updateUser(update):Observable<any>{
   console.log(update)
   const headers = new HttpHeaders()
         .set('Content-Type', 'application/json');

       return this.http.post('https://localhost:9090/users/edit/'+
       JSON.parse(localStorage.getItem('SouqloginUser'))._id,update,
       {headers: headers});
  }
}
