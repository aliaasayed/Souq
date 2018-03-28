import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {config} from './config';
import { LoginService } from './login.service';
import { CategoriesService } from './categories.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  categories;
  title = 'app';
  url;
  configData=config;
  logedUser={};



  ngOnInit(): void {
  }
  constructor(private categoriesService: CategoriesService,private loginService: LoginService){
    this.configData.login=localStorage.getItem('Souqlogin');
    let logU = JSON.parse(localStorage.getItem('SouqloginUser'));
    if(logU!=null)
     this.logedUser=logU;
    console.log("ctor",this.configData);
    
    
      this.categoriesService.getCategories().subscribe((res)=>{
        this.categories=res;
        // console.log(res);
        // console.log(this.categories);
      });
  
  
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

  logout(){
     localStorage.clear();
     this.configData.login="false"
    }


}
