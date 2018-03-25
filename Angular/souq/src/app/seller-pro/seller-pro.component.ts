import { Component, OnInit } from '@angular/core';

import {SellerProductsService} from '../seller-products.service'
@Component({
  selector: 'app-seller-pro',
  templateUrl: './seller-pro.component.html',
  styleUrls: ['./seller-pro.component.css']
})
export class SellerProComponent implements OnInit {
	products;

	constructor(private sellerProductService: SellerProductsService) {
	}

	getProducts(){
		this.sellerProductService.getProducts()
		.subscribe(products => this.products = products);
	}

	ngOnInit() {
		this.getProducts();
	}

}
