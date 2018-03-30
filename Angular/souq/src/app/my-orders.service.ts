import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {GlobalDataService} from './global-data.service'


@Injectable()
export class MyOrdersService {
	uid
	constructor(private http: HttpClient,private globalDataService: GlobalDataService) {
	this.globalDataService.currentuser.subscribe((res)=>{
		this.uid = res['_id'];
		console.log("loged user",res)
	});
}
	getMyOrders(page): Observable<any>{
	// **TO edit aftr merge** private sellerProdUrl = 'http://localhost:9090/items/cOrders/clientId/page';
		return this.http.get<any>(`https://localhost:9090/items/cOrders/${this.uid}/${page}`);

	}

}
