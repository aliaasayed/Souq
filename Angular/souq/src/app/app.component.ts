import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {config} from './config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'app';
  url;
  configData=config;
  logedUser={};
  constructor(private loginService: LoginService){
    console.log("const");
    this.url= this.loginService.getGmailURL().subscribe((res)=>{
      console.log(res);
      //this.url=res;
    });
    this.url= this.loginService.getFacebookURL().subscribe((res)=>{
      console.log(res);
      this.url=res;
    });


    this.configData.login=localStorage.getItem('Souqlogin');
    let logU = JSON.parse(localStorage.getItem('SouqloginUser'));
    if(logU!=null)
     this.logedUser=logU;
    console.log("ctor",this.configData)
  }
  ngOnInit(): void {
  }
  fun(cb)
  {
    cb(true);
    console.log("gvhb")
  }


  logout(){
     localStorage.clear();
     this.configData.login="false"
    }
}
