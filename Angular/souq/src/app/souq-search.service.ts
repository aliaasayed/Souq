import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Headers,RequestOptions } from '@angular/http';

@Injectable()
export class SouqSearchService {

  constructor(private http:HttpClient) { }


  getSearchProducts(keyword,subcat,priceRange,page): Observable<any> {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
         console.log(keyword,subcat,page)
      return this.http.get(`https://localhost:9090/products/search/${keyword}/${subcat} / ${priceRange} /${page}`, {
        headers: headers
      });
  }

}
