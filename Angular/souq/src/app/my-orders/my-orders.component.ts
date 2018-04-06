import { Component, OnInit } from '@angular/core';
import { MyOrdersService } from '../my-orders.service';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})

export class MyOrdersComponent implements OnInit {
	products = [];
	pagesNo;
	pagesArr;
	max: number = 5;
	rate: number = 2;
	isReadonly: boolean = false;
	colArr=['s1','s2','s3','s4','s5'];
	i=0;
	constructor(private myOrdersService: MyOrdersService,private productService: ProductService) {
	}

	getMyOrders(p){
		this.myOrdersService.getMyOrders(p)
		.subscribe(products => {
			this.products = products;
			this.pagesNo = Math.ceil(this.products.length/3);
			this.pagesArr = new Array <Number>(parseInt(this.pagesNo));
			console.log("qqqq",p);
			console.log(this.pagesNo);
			console.log(this.pagesArr);
		});

	}
	UpdateRate(id,newrate:number)
	{
	  this.productService.updateProductRate(id,newrate).subscribe( res => console.log("result" + res));
	}

	ngOnInit() {
		this.getMyOrders(1);

	}

}
