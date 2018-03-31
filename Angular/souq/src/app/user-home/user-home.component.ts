import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from '../global-data.service'
import { UsersProfileService } from '../users-profile.service';

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
  constructor(private globalDataService:GlobalDataService,
  private usersProfileService:UsersProfileService) {

    // this.globalDataService.currentuser.subscribe((res)=>{
    //   console.log("global oooooooooooooooooooooooservice ",res)
    // });
    this.usersProfileService.getOffers().subscribe((res)=>{
      // console.log(res)
      this.products=res;
    });

  }

  ngOnInit() {
  }

}
