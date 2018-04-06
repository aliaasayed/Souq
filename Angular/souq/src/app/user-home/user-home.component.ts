import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from '../global-data.service'
import { UsersProfileService } from '../users-profile.service';
import { ProductService } from '../product.service';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  max: number = 5;
  rate: number = 2;
  isReadonly: boolean = true;
  isModified: boolean = false;
  products;
  toptrending;
  loggedUser;
  constructor(private globalDataService:GlobalDataService,
  private usersProfileService:UsersProfileService,
  private productService:ProductService) {

    this.globalDataService.currentuser.subscribe((res)=>{
      this.loggedUser=res;
     });
    this.usersProfileService.getOffers().subscribe((res)=>{
       console.log("products"+res)
      this.products=res;
    });


    this.productService.getTopTrendingProducts().subscribe((result)=>{
      
      this.toptrending=result;
    });

   
  }

  updateRating(id,newrate)
  {

    this.productService.updateProductRate(id,newrate).subscribe((result)=>{
      
     console.log(result+"user home update rate");
    });
  }

  ngOnInit() {
  }

}
