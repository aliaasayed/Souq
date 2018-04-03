import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {config} from './config';
import { LoginService } from './login.service';
import { CategoriesService } from './categories.service';
import {GlobalDataService} from './global-data.service'
import { ProductService } from './product.service';
import { Router } from '@angular/router';


declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  categories;
  url;
  configData=config;
  logedUser={ _id:null,email:null,image:"",name:"",hasNatId:false}
  cartCount:String="0";


  ngOnInit(): void {



  }
  constructor(private categoriesService: CategoriesService,private loginService: LoginService
    ,private productService: ProductService
    ,private route:Router,private globalDataService:GlobalDataService){


      //verify if he previous loged
         this.checklogging()

    //get global data from global storage
        this.globalDataService.currentuser.subscribe((res)=>{
          if(res.hasOwnProperty('provider'))
          {
            this.logedUser._id =res['id'];
            this.logedUser.name =res['name'];
            this.logedUser.image =res['image'];
              this.logedUser.email =res['email'];
          }
          else if(res.hasOwnProperty('name'))
              {
               this.logedUser._id =res['_id'];
               this.logedUser.name =res['name'];
               this.logedUser.image =res['image'];
              this.logedUser.email =res['email'];
                if(res['nationalID'])
                     this.logedUser.hasNatId=true;
              }

              this.globalDataService.currentuserCart.subscribe((res)=>{
                this.cartCount=JSON.stringify(res);
              });

        });


        // this.productService.getmyCartProductcount().subscribe((res)=>{
        //   this.globalDataService.setUserCart(res);
        // });

        // this.globalDataService.currentuserCart.subscribe((res)=>{
        //   this.cartCount=JSON.stringify(res);
        // });

      this.categoriesService.getCategories().subscribe((res)=>{
        this.categories=res


      });

      // $('#myLink').bind('click', false);
      $("#myLink").attr('disabled', true);
  }
  showSideMenu(){
    $('.sidenav').css('width',"250px");
    $('.header').css('margin-left',"250px");
    $('#content').css('margin-left',"250px");
  }

  HideSideMenu(){
    $('.sidenav').css('width',"0px");
    $('.header').css('margin-left',"0px");
    $('#content').css('margin-left',"0px");

  }


  checklogging(){
    if(localStorage.getItem('SouqtokenKey')){

            this.loginService.verifyToken().subscribe((res)=>{
              if(res['success']){
                this.globalDataService.setUserData(res['data'].userdata);
                  if(!res['data'].nationalID)
                     this.route.navigate([])
                  else
                   this.route.navigate(['/sellerHome'])

              }

            });
    }
  }

  logout(){

     console.log("dddddddddddddddclear")
     this.logedUser={ _id:null,email:null,image:"",name:"",hasNatId:false}
     this.globalDataService.setUserData( this.logedUser);
     localStorage.clear();
      this.route.navigate(["/"])


     // this.globalDataService.currentuserCart.subscribe((res)=>{
     //   this.cartCount=JSON.stringify(res);
     // });
    }


}
