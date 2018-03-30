import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class MyOrdersService {
	getMyOrders(page): Observable<any>{
	// **TO edit aftr merge** private sellerProdUrl = 'http://localhost:9090/items/cOrders/clientId/page';
		return this.http.get<any>(`http://localhost:9090/items/cOrders/5ababc774ac6980f66e97ed5/${page}`);
		
	}
	constructor(private http: HttpClient) { }

}
