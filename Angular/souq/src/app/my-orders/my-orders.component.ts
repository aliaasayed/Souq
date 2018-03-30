import { Component, OnInit } from '@angular/core';
import { MyOrdersService } from '../my-orders.service'

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})

export class MyOrdersComponent implements OnInit {
	products = [];
	pagesNo;
	pagesArr;
	colArr=['s1','s2','s3','s4','s5'];
	i=0;
	constructor(private myOrdersService: MyOrdersService) {
	}

	getMyOrders(p){
		this.myOrdersService.getMyOrders(p)
		.subscribe(products => {
			this.products = products;
			this.pagesNo = Math.ceil(this.products.length/3);
			this.pagesArr = new Array <Number>(parseInt(this.pagesNo));
		});

	}


	ngOnInit() {
		this.getMyOrders(1);
		
	}

}
