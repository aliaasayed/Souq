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
  max: number = 5;
  rate: number = 2;
  isReadonly: boolean = true;
  constructor(private sellerOrdersService: SellerOrdersService) {
   this.sellerOrdersService.getSellerOrders().subscribe((res)=>{
   this.sellerOrders=res;
   console.log("res"+res)
  });
}
  ngOnInit() {
  }
  showOrderDetails(id)
  {
    //console.log(id)
    this.sellerOrdersService.getSellerOrderDetails(id).subscribe((res)=>{
      this.orderDetails=res;
      console.log(this.orderDetails)
    });
  }
}
