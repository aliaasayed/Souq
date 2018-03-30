import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from '../global-data.service'
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  max: number = 5;
  rate: number = 2;
  isReadonly: boolean = true;
  constructor(private globalDataService:GlobalDataService) {

    this.globalDataService.currentuser.subscribe((res)=>{
      console.log("global service ",res)
    });

  }

  ngOnInit() {
  }

}
