import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class SellerOrdersService {

  constructor(private http:HttpClient) { }

  getSellerOrders():Observable<any> {

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    var uid=JSON.parse(localStorage.getItem('SouqloginUser'))._id;
    return this.http.get<any>(`https://localhost:9090/items/sellerOrders/${uid}`);
  }

  getSellerOrderDetails(orderID):Observable<any> {

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    var uid=JSON.parse(localStorage.getItem('SouqloginUser'))._id;
    return this.http.get<any>(`https://localhost:9090/items/sellerOrders/${uid}/${orderID}`);
  }
  
}
