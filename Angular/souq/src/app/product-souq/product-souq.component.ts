import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-product-souq',
  templateUrl: './product-souq.component.html',
  styleUrls: ['./product-souq.component.css'],
})

export class ProductSouqComponent implements OnInit {

  productsData= { docs:[], total:" ", limit:"", page: "", pages: "" };
  pages;
  showDetail=false;
  selectedItem;
  alert=false;
  IsAdded=false;
  Isexist=false;
  i=1;
  constructor(private productService: ProductService,private loginService: LoginService) {
   this.getFProductPage();

   }
  getFProductPage(){
    this.productService.getProducts(1).subscribe((res)=>{
      this.productsData=res.productsData;
      this.pages= new Array<Number>(parseInt(this.productsData.pages));
    });
  }
  ngOnInit() {

  }
  getProductPage(PageNum:number){
    console.log(PageNum)
    this.productService.getProducts(PageNum).subscribe((res)=>{
      this.productsData=res.productsData;
      console.log(this.productsData);
    });
  }

  viewDetail(event,item)
  {
    if(event.target.type=="button"){
        this.showDetail=true;
        this.selectedItem=item;
    }
    else{
        this.showDetail=false;
        this.alert=false;
    }
  }

  addTocart(){
    if(localStorage.getItem('SouqtokenKey')){

      this.loginService.verifyToken().subscribe((res)=>{
        console.log(res);
          if(res['success']='valid'){
                  this.productService.checkProductExistInCart(this.selectedItem._id).subscribe((exist_res)=>{
                      if(exist_res.mes=="notexist"){
                            this.productService.addProductTocaret(this.selectedItem._id).subscribe((add_res)=>{
                              console.log("sssssssssss",add_res);
                              if(add_res['success']){
                                console.log("item added to caret successfulyy")
                                this.IsAdded=true;
                                this.Isexist=false;

                              }
                            });
                      }
                      else
                           {  this.IsAdded=false;
                             this.Isexist=true;
                         }
                      console.log("ddd",exist_res)
                    });
            }
        else
          console.log("invalid token matching")
      });
    }
    else{
     console.log("not loged")
     this.alert=true;
   }
  }

  HidsAll(){
      this.IsAdded=false;
        this.showDetail=false;
          this.Isexist=false;
  }

}
