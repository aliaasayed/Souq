import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {GlobalDataService} from '../global-data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycart-detail',
  templateUrl: './mycart-detail.component.html',
  styleUrls: ['./mycart-detail.component.css']
})
export class MycartDetailComponent implements OnInit {

CartProductCount:any;
CartProducts:any;
totalPrice:any;
pages;
removeItem=false;
futurelist=false;
selectedItem;

  constructor(private productService: ProductService
    ,private globalDataService:GlobalDataService,private route:Router) {
    this.getmyCartProductcount();
    this.getmyCartProductsFp();
   }

  ngOnInit() {
  }

  getmyCartProductcount(){
    this.productService.getmyCartProductcount().subscribe((res)=>{
      console.log(res);
      this.CartProductCount=res;
      this.globalDataService.setUserCart(res);
      // this.globalDataService.setUserCart(res);
    });
  }

  compouse_arr(res){
    console.log(res)
    for(let i=0;i<res.length;i++){
    this.CartProducts[i].pcountArr=new Array <Number>(parseInt(res[i].prodId.stock));
   }
  }
  getmyCartProductsFp(){

     this.productService.getmyCartProducts(1).subscribe((res)=>{
      this.CartProducts=res.resultArr;
      this.pages= new Array<Number>(parseInt(res.pages));
      this.totalPrice=res.totalprice;
      this.compouse_arr(res.resultArr)
    });

  }

  getProductCartPage(PageNum:number){
    this.productService.getmyCartProducts(PageNum).subscribe((res)=>{
     this.CartProducts=res.resultArr;
     this.compouse_arr(res.resultArr)
  });
}

 action(event,item){
   if(event=="remove"){
    this.removeItem=true;
    this.futurelist=false;
  }
  else{
   this.futurelist=true;
   this.removeItem=false;
  }
    this.selectedItem=item;
 }

 preventfun(){
   this.futurelist=false;
   this.removeItem=false;
 }
 confirm(){//confirm user action delete or add to wish list
   if(this.removeItem)
   this.futurelist=false;
   this.removeItem=false;
  this.productService.removemyCartProduct(this.selectedItem._id).subscribe((res)=>{
        console.log(res)
        this.getmyCartProductcount();
        this.getmyCartProductsFp();//reload data again after deleting
    });

 }

 updateQan(newValue,item){
   this.productService.updatemyCartProductQuan(newValue,item._id).subscribe((res)=>{
         console.log(res)
         this.getmyCartProductcount();
         this.getmyCartProductsFp();//reload data again after deleting
     });
 }

 checkout(){
   this.productService.checkOutmyCart().subscribe((res)=>{
         // if(res.success=="true")
          console.log("update result ",res)
          this.getmyCartProductcount();
          this.getmyCartProductsFp();//reload data again after deleting
          this.route.navigate(['/myOrders'])

     });
 }
}
