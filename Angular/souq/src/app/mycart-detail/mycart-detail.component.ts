import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

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

  constructor(private productService: ProductService) {
    this.getmyCartProductcount();
    this.getmyCartProductsFp();
   }

  ngOnInit() {
  }

  getmyCartProductcount(){
    this.productService.getmyCartProductcount().subscribe((res)=>{
      console.log(res);
      this.CartProductCount=res;
    });
  }

  getmyCartProductsFp(){

     this.productService.getmyCartProducts(1).subscribe((res)=>{
      this.CartProducts=res.resultArr;
      console.log("hhhh",JSON.stringify(res.resultArr));
      this.pages= new Array<Number>(parseInt(res.pages));
      this.totalPrice=res.totalprice;
    });

  }

  getProductCartPage(PageNum:number){
    this.productService.getmyCartProducts(PageNum).subscribe((res)=>{
     this.CartProducts=res.resultArr;
     console.log("hhhh",JSON.stringify(res.resultArr));;
   });
  }

}
