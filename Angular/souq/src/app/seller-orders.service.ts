import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {GlobalDataService} from './global-data.service'

@Injectable()
export class SellerOrdersService {
  uid;
    constructor(private http: HttpClient,private globalDataService: GlobalDataService) {
    this.globalDataService.currentuser.subscribe((res)=>{
      this.uid = res['_id'];
      console.log("loged user",res)
    });
  }

  getSellerOrders():Observable<any> {

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    return this.http.get<any>(`https://localhost:9090/items/sellerOrders/${this.uid}`);
  }

  getSellerOrderDetails(orderID):Observable<any> {

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    var uid=JSON.parse(localStorage.getItem('SouqloginUser'))._id;
    return this.http.get<any>(`https://localhost:9090/items/sellerOrders/${uid}/${orderID}`);
  }

}
