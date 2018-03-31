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
    page;
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

	checkOrder(OId,page){
		this.orderDetailsService.checkOrder(OId,page)
		.subscribe(orderData => {
			this.productData = orderData.prodId;
			console.log("pageNum",this.page)
			
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
		this.router.navigate(['sellerOrders']);
	}





	ngOnInit() {
		this.OId = this.activatedRoute.snapshot.paramMap.get('id');
		this.page = this.activatedRoute.snapshot.paramMap.get('page');
		this.checkOrder(this.OId,this.page);

	}

}
