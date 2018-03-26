import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class ProductService {
  product:any;
  constructor(private http:HttpClient) { }

  getProducts(page:Number): Observable<any> {

  console.log(`https://localhost:9090/products/Plist/${page}`);
    return this.http.get<any>(`https://localhost:9090/products/Plist/${page}`);
  }


  addProductTocaret(prodID:any):Observable<any> {

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    var uid=JSON.parse(localStorage.getItem('SouqloginUser'))._id;
    var body = {"clientId": uid,"prodId":prodID};
    console.log("sssssssss",body);
   return this.http.post<any>('https://localhost:9090/items/addToCart',body,{
     headers: headers
   });

  }

  addproduct(form):Observable<any>
  {
    const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');
  form.SellerID = JSON.parse(localStorage.getItem('SouqloginUser'))._id;
  console.log(form);

  return this.http.post<any>('https://localhost:9090/products/add', form,
  {headers:headers});
  //console.log("service",this.product)
  }

  updateproduct(form):Observable<any>
  {
    const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');
  form.SellerID = JSON.parse(localStorage.getItem('SouqloginUser'))._id;
  console.log(form);

  return this.http.post<any>('https://localhost:9090/products/update', form,
  {headers:headers});
  }

  getUpdateData(prodID:any):Observable<any> 
  {
    const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');
  
  return this.http.get<any>('https://localhost:9090/items/'+prodID,{
     headers: headers
   });
  }

}
