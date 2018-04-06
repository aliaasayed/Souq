import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import {GlobalDataService} from './global-data.service'

@Injectable()
export class ProductService {
  product:any;
  sellId;
	constructor(private http: HttpClient,private globalDataService: GlobalDataService) {
	this.globalDataService.currentuser.subscribe((res)=>{
		this.sellId = res['_id'];
		console.log("loged user",res)
	});
}
  getProducts(name,page:Number): Observable<any> {

  console.log(`https://localhost:9090/products/Plist/${page}`);
    return this.http.get<any>(`https://localhost:9090/products/Plist/${name}/${page}`);
  }

  checkProductExistInCart(prodID:any):Observable<any> {
      console.log("service check existenxe")
      const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('authorization', localStorage.getItem('SouqtokenKey'));

      var body = {"prodId":prodID};
     return this.http.post<any>('https://localhost:9090/items/checkCart',body,{
       headers: headers
     });
  }

addProductTocaret(prodID:any):Observable<any> {


     const headers = new HttpHeaders()
         .set('Content-Type', 'application/json')
         .set('authorization', localStorage.getItem('SouqtokenKey'));

     var body = {"prodId":prodID};
    return this.http.post<any>('https://localhost:9090/items/addToCart',body,{
      headers: headers
    });
  }

  getmyCartProductcount(){
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('authorization', localStorage.getItem('SouqtokenKey'));

    return this.http.get<any>(`https://localhost:9090/items/mycartCount`,{
      headers: headers
    });
  }

  getmyCartProducts(page:Number){
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('authorization', localStorage.getItem('SouqtokenKey'));

    return this.http.get<any>(`https://localhost:9090/items/mycart/${page}`,{
      headers: headers
    });
  }

  removemyCartProduct(orderId):Observable<any>{
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('authorization', localStorage.getItem('SouqtokenKey'));
        var body = {"orderId":orderId};
            return this.http.post<any>("https://localhost:9090/items/myCart/delete",body,{
              headers: headers
            });
  }

  updatemyCartProductQuan(quan,orderId):Observable<any>{
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('authorization', localStorage.getItem('SouqtokenKey'));
    var body = {"orderId":orderId,"newQuan":quan};
        return this.http.post<any>("https://localhost:9090/items/myCart/updateQuan",body,{
          headers: headers
        });
  }


  checkOutmyCart():Observable<any>{

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('authorization', localStorage.getItem('SouqtokenKey'));
        var body = {"task":"checkout"};
        return this.http.post<any>("https://localhost:9090/items/mycart/checkout",body,{
          headers: headers
        });
  }


  addproduct(form):Observable<any>{
    const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');
  form.SellerID = this.sellId
  console.log(form);

  return this.http.post<any>('https://localhost:9090/products/add', form,
  {headers:headers});
  //console.log("service",this.product)
  }

  updateproduct(form,id):Observable<any>{
    const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');

  return this.http.post<any>('https://localhost:9090/products/update/'+id, form,
  {headers:headers});
  }

  getUpdateData(prodID:any):Observable<any>{
    console.log(prodID)
    const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');

  return this.http.get<any>('https://localhost:9090/products/update/'+prodID,{headers: headers
   });

  }
  updateProductRate(pId,myRating):Observable<any>
  {
    // console.log("prodID"+pId);
    // console.log("newrate"+myRating);
    var body={"pId":pId,"uId":this.sellId,"myRating":myRating};
    
    // console.log("body"+JSON.stringify(body));
    const headers = new HttpHeaders()
           .set('Content-Type', 'application/json')
           .set('authorization', localStorage.getItem('SouqtokenKey'));
    // console.log("UpdateRate");
  return this.http.post<any>('https://localhost:9090/products/updaterating',body,{headers: headers
   });
  }
 getTopTrendingProducts():Observable<any>
 {
  const headers = new HttpHeaders()
  .set('authorization', localStorage.getItem('SouqtokenKey'))
  .set('Content-Type', 'application/json');
      console.log("Top Trending Service");
      return this.http.get<any>('https://localhost:9090/products/toptrending',{headers: headers});
 }

}
