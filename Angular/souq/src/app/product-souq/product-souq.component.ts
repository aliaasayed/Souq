import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import {GlobalDataService} from '../global-data.service';

@Component({
  selector: 'app-product-souq',
  templateUrl: './product-souq.component.html',
  styleUrls: ['./product-souq.component.css'],
})

export class ProductSouqComponent implements OnInit {

  productsData= { docs:[], total:" ", limit:"", page: "", pages: "" };
  pages;
  i=1;
  subCatName;
  max=5;
  ReadOnly: boolean =true;
  loggedUser;
  constructor(private globalDataService:GlobalDataService,private productService: ProductService,
    private loginService: LoginService,private route : ActivatedRoute) {
   this.route.params.subscribe((params) => {this.subCatName=params['subCatName']
   this.getFProductPage();
   console.log(params)});

   this.globalDataService.currentuser.subscribe((res)=>{
     this.loggedUser=res;
      console.log("global oooooooooooooooooooooooservice ",JSON.stringify(res))
    });
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

  UpdateRating(id,newrate:number)
	{
	  this.productService.updateProductRate(id,newrate).subscribe( res => console.log("result" + res));
	}
}
