import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {GlobalDataService} from './global-data.service'

@Injectable()
export class UsersProfileService {

//for get and update user profile

  logedUser;
  constructor(private http:HttpClient,private globalDataService:GlobalDataService) {

  this.globalDataService.currentuser.subscribe((res)=>{
    this.logedUser=res;
   console.log("xxxxxxxxxxxxxxxxxxxxxx",res)
  });
}
  getOffers(): Observable<any> {
    return this.http.get<any>("https://localhost:9090/products/offers")
  }
  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders()
        .set('authorization', localStorage.getItem('SouqtokenKey'))
        .set('Content-Type', 'application/json');
    return this.http.get<any>("https://localhost:9090/users/profile",
       {headers: headers});
  }
  updateUser(update):Observable<any>{
    if(!this.logedUser.sociallogin){
         console.log(update)
         const headers = new HttpHeaders()
              .set('Content-Type', 'application/json');


             return this.http.post('https://localhost:9090/users/edit/'+
             this.logedUser._id,update,
             {headers: headers});
     }

  }


}
