import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from '../global-data.service'
import { UsersProfileService } from '../users-profile.service';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  max: number = 5;
  rate: number = 2;
  isReadonly: boolean = true;
  products;
  toptrending;
  constructor(private globalDataService:GlobalDataService,
  private usersProfileService:UsersProfileService,
  private productService:ProductService) {

    // this.globalDataService.currentuser.subscribe((res)=>{
    //   console.log("global oooooooooooooooooooooooservice ",res)
    // });
    this.usersProfileService.getOffers().subscribe((res)=>{
      // console.log(res)
      this.products=res;
    });


    this.productService.getTopTrendingProducts().subscribe((result)=>{
      
      this.toptrending=result;
      console.log("toptrending"+result)
      console.log("toptrending"+this.toptrending);
    });
  }

  ngOnInit() {
  }

}
