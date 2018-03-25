import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
import {config} from './config';
import { LoginService } from './login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'app';
  isHidden=true;
  url;
  configData=config;
  logedUser={};
  ngOnInit(): void {
  }
  constructor(private loginService: LoginService){
    this.configData.login=localStorage.getItem('Souqlogin');
    let logU = JSON.parse(localStorage.getItem('SouqloginUser'));
    if(logU!=null)
     this.logedUser=logU;
    console.log("ctor",this.configData)
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
