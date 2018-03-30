import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {GlobalDataService} from './global-data.service'

@Injectable()
export class SellerOrdersService {
  sellerId;
    constructor(private http: HttpClient,private globalDataService: GlobalDataService) {
    this.globalDataService.currentuser.subscribe((res)=>{
      this.sellerId = res['_id'];
      console.log("loged user",res)
    });
  }

  getSellerOrders(page):Observable<any> {

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    return this.http.get<any>(`https://localhost:9090/items/sellerOrders/${this.sellerId}/${page}`);
  }

  getSellerOrderDetails(orderID):Observable<any> {

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    var uid=JSON.parse(localStorage.getItem('SouqloginUser'))._id;
    return this.http.get<any>(`https://localhost:9090/items/sellerOrders/${uid}/1/${orderID}`);
  }

}
