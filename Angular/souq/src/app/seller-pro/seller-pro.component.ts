import { Component, OnInit } from '@angular/core';

import {SellerProductsService} from '../seller-products.service'
@Component({
  selector: 'app-seller-pro',
  templateUrl: './seller-pro.component.html',
  styleUrls: ['./seller-pro.component.css']
})
export class SellerProComponent implements OnInit {
	max: number = 5;
	rate: number = 2;
	isReadonly: boolean = true;
	products = { docs:[], total:" ", limit:"", page: "", pages: "" };
	pagesArr;
	constructor(private sellerProductService: SellerProductsService) {
	}

	getProducts(p){
		this.sellerProductService.getProducts(p)
		.subscribe(products => {
      console.log(products)
			this.products = products;
			this.pagesArr = new Array <Number>(parseInt(this.products.pages));
		});

		// while(this.i <= (parseInt(this.products.pages))){
			// this.pagesArr.new Array<Number>(parseInt(this.products.pages));
			// this.i++;
			// console.log(this.pagesArr);
		// }
		// console.log(parseInt(this.products.pages));
	}



	// getProducts(){
	// 	this.sellerProductService.getProducts()
	// 	.subscribe(products => {
	// 		this.products = products;
	// 		this.pages= new Array<Number>(parseInt(this.products.pages));
	// 	});
	// }

	ngOnInit() {
		this.getProducts(1);
	}

}
