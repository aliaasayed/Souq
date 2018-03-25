import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {
  max: number = 5;
  rate: number = 2;
  isReadonly: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
