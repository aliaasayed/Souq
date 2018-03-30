import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router'
import {GlobalDataService} from '../global-data.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // showDetail=false;
  // selectedItem;
  alert=false;
  IsAdded=false;
  Isexist=false;
  product_id;
  product={};
  logedUser;
  constructor(private productService: ProductService,
    private loginService: LoginService,
    private route : ActivatedRoute,
  private globalDataService:GlobalDataService) {
      this.globalDataService.currentuser.subscribe((res)=>{
        this.logedUser=res
        console.log(res)

      })
      this.route.params.subscribe((params) => {this.product_id=params['id']
      console.log(params)});
      this.productService.getUpdateData(this.product_id).subscribe((res)=>{
        console.log(res);
        this.product = res;
      })
    }
  // viewDetail(event,item)
  // {
  //   if(event.target.type=="button"){
  //       this.showDetail=true;
  //       this.selectedItem=item;
  //   }
  //   else{
  //       this.showDetail=false;
  //       this.alert=false;
  //   }
  // }
  addTocart(){
    if(localStorage.getItem('SouqtokenKey')){

      this.loginService.verifyToken().subscribe((res)=>{
        console.log(res);
          if(res['success']='valid'){
                  this.productService.checkProductExistInCart(this.product_id).subscribe((exist_res)=>{
                      if(exist_res.mes=="notexist"){
                            this.productService.addProductTocaret(this.product_id).subscribe((add_res)=>{
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

  // HidsAll(){
  //     this.IsAdded=false;
  //       this.showDetail=false;
  //         this.Isexist=false;
  // }



  hideMsg(){
    this.alert=false;
    this.IsAdded=false;
    this.Isexist=false;
	}

  ngOnInit() {
  }

}
