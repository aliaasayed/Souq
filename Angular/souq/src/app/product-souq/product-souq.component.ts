import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { LoginService } from '../login.service';
<<<<<<< HEAD
import {GlobalDataService} from '../global-data.service'
=======
import { ActivatedRoute } from '@angular/router'
>>>>>>> 8a1bfba206a9fb190e0303e902af988a539c4bce

@Component({
  selector: 'app-product-souq',
  templateUrl: './product-souq.component.html',
  styleUrls: ['./product-souq.component.css'],
})

export class ProductSouqComponent implements OnInit {

  productsData= { docs:[], total:" ", limit:"", page: "", pages: "" };
  pages;
  i=1;

  constructor(private productService: ProductService,private loginService: LoginService,private globalDataService:GlobalDataService) {

  subCatName;
  constructor(private productService: ProductService,
    private loginService: LoginService,private route : ActivatedRoute) {
   this.route.params.subscribe((params) => {this.subCatName=params['subCatName']

   this.getFProductPage();
   console.log(params)});
   }
  getFProductPage(){
    this.productService.getProducts(this.subCatName,1).subscribe((res)=>{
      this.productsData=res.productsData;
      this.pages= new Array<Number>(parseInt(this.productsData.pages));
    });
  }
  ngOnInit() {

  }
  getProductPage(PageNum:number){
    console.log(PageNum)
    this.productService.getProducts(this.subCatName,PageNum).subscribe((res)=>{
      this.productsData=res.productsData;
      console.log(this.productsData);
    });
  }
}


//   viewDetail(event,item)
//   {
//     if(event.target.type=="button"){
//         this.showDetail=true;
//         this.selectedItem=item;
//     }
//     else{
//         this.showDetail=false;
//         this.alert=false;
//     }
//   }
// }

//   addTocart(){
//     if(localStorage.getItem('SouqtokenKey')){
//
//       this.loginService.verifyToken().subscribe((res)=>{
//         if(res['success']='valid'){
//                 this.productService.checkProductExistInCart(this.selectedItem._id).subscribe((exist_res)=>{
//                 if(exist_res.mes=="notexist"){
//                 this.productService.addProductTocaret(this.selectedItem._id).subscribe((add_res)=>{
//                     if(add_res['success']){
//                         console.log("item added to caret successfulyy")
//                         this.IsAdded=true;
//                         this.Isexist=false;
//                     }
//                    }
//                   }
//                 }
//            }
//         });
//     }
//
// }
