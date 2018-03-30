import { Component, OnInit } from '@angular/core';
import {OrderDetailsService} from '../order-details.service';
import {Router,ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})


export class OrderDetailsComponent implements OnInit {
	productData = {name: "", image:""};
	userInfo = {name:"", email:"", address: ""};
	OId;

	constructor(private orderDetailsService: OrderDetailsService,
				private router: Router,private activatedRoute: ActivatedRoute
				) {
				}

	getUserInfo(uId){
		this.orderDetailsService.getUserInfo(uId)
		.subscribe(userInfoo => {
			this.userInfo = userInfoo[0];
		});
	}

	checkOrder(OId){
		this.orderDetailsService.checkOrder(OId)
		.subscribe(orderData => {
			this.productData = orderData.prodId;
			this.getUserInfo(orderData.clientId);

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





	ngOnInit() {
		this.OId = this.activatedRoute.snapshot.paramMap.get('id');
		this.checkOrder(this.OId);

	}

}
