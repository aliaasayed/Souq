import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GlobalDataService} from './global-data.service'

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class OrderDetailsService {

	sellerId;
		constructor(private http: HttpClient,private globalDataService: GlobalDataService) {
		this.globalDataService.currentuser.subscribe((res)=>{
			this.sellerId = res['_id'];
			console.log("loged user",res)
		});
	}

	getUserInfo(uId): Observable<any>{
		return this.http.get<any>(`https://localhost:9090/users/usrInfo/${uId}`);
	}


	checkOrder(OId,page): Observable<any>{
		const headers = new HttpHeaders()
		.set('Content-Type', 'application/json');
		return this.http.get<any>(`https://localhost:9090/items/sellerOrders/${this.sellerId}/${page}/${OId}`);
	}


	setAsReceived(OId): Observable<any>{
		return this.http.put(`https://localhost:9090/items/deliver/${OId}`, OId);
	}





}
