import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class SellerProductsService {
	///to change after megrge-----
	sellId=JSON.parse(localStorage.getItem('SouqloginUser'))._id

	getProducts(page): Observable<any>{
		return this.http.get<any>(`https://localhost:9090/products/seller/${this.sellId}/${page}`)
		.pipe(
				catchError(this.handleError('getProducts', []))
			);
	}

	constructor(private http: HttpClient) { }


	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

		    // TODO: send the error to remote logging infrastructure
		    console.error(error); // log to console instead

		    // TODO: better job of transforming error for user consumption
		    // this.log(`${operation} failed: ${error.message}`);

		    // Let the app keep running by returning an empty result.
		    return of(result as T);
	  	};
	}

}
