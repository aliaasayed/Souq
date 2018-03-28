import { Component, OnInit } from '@angular/core';
import {OrderDetailsService} from '../order-details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})


export class OrderDetailsComponent implements OnInit {
	productData = {name: "", image:""};
	userInfo = {name:"", email:"", address: ""};
	OId="5aba750296f8251ad0c7198d";	/// TO BE MODIFIED AFTER MERGE

	constructor(private orderDetailsService: OrderDetailsService,
				private router: Router
				) {}

	getUserInfo(uId){
		this.orderDetailsService.getUserInfo(uId)
		.subscribe(userInfoo => {
			this.userInfo = userInfoo[0];
		});
	}

	checkOrder(sellerId, OId){
		this.orderDetailsService.checkOrder(sellerId, OId)
		.subscribe(orderData => {
			this.productData = orderData.prodId;
		});
	}


	showMsg(){
		document.getElementById("msg").style.display="";
	}

	hideMsg(){
		document.getElementById("msg").style.display="none";
	}


	deliver(){
		this.orderDetailsService.setAsReceived(this.OId)
		.subscribe((res)=>console.log(res));
		console.log('delivered');
		this.router.navigate(['']);
	}




/////////INPUTS TO BE REPLACED AFTER MERGE/////
	ngOnInit() {
		this.checkOrder(50, "5aba750296f8251ad0c7198d");   	//(Seller loggedIn ID,  item_ID)
		this.getUserInfo("5abaa1bf4ac6980f66e97ed0");		//(userID)
	}

}
