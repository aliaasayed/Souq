import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts(page:Number): Observable<any> {

  console.log(`https://localhost:9090/products/Plist/${page}`);
    return this.http.get<any>(`https://localhost:9090/products/Plist/${page}`);
  }


  addProductTocaret(prodID:any):Observable<any> {
    var uid=JSON.parse(localStorage.getItem('SouqloginUser'))._id
    var body = {"clientId": uid,"prodId":prodID};
   return this.http.post<any>('https://localhost:9090/items/addToCart',body);

  }

}
