import { Component, OnInit } from '@angular/core';
import { SellerOrdersService } from '../seller-orders.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {
  sellerOrders;
  orderDetails;
  pagesArr=[];
  max: number = 5;
  rate: number = 2;
  isReadonly: boolean = true;
  constructor(private sellerOrdersService: SellerOrdersService) {}

  getSellerOrders(p){
     this.sellerOrdersService.getSellerOrders(p).subscribe((res)=>{
     this.sellerOrders=res[1];
     this.pagesArr = new Array <Number>(Math.ceil(res[0]/3));
     console.log(res[0])
      });
  }

  ngOnInit() {
    this.getSellerOrders(1);
  }

}
