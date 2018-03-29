import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class OrderDetailsService {
	
	constructor(private http: HttpClient) { }
	
	getUserInfo(uId): Observable<any>{
		return this.http.get<any>(`https://localhost:9090/users/usrInfo/${uId}`);
	}


	checkOrder(OId): Observable<any>{
		const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    var sellerId=JSON.parse(localStorage.getItem('SouqloginUser'))._id;
		return this.http.get<any>(`https://localhost:9090/items/sellerOrders/${sellerId}/${OId}`);
	}


	setAsReceived(OId): Observable<any>{
		return this.http.put(`https://localhost:9090/items/deliver/${OId}`, OId);
	}

	



}
