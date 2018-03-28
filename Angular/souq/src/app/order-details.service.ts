import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class OrderDetailsService {
	
	getUserInfo(uId): Observable<any>{
		return this.http.get<any>(`http://localhost:9090/users/usrInfo/${uId}`);
	}


	checkOrder(sellerId, OId): Observable<any>{
		return this.http.get<any>(`http://localhost:9090/items/sellerOrders/${sellerId}/${OId}`);
	}


	setAsReceived(OId): Observable<any>{
		return this.http.put(`http://localhost:9090/items/deliver/${OId}`, OId);
	}

	constructor(private http: HttpClient) { }



}
