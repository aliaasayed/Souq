import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {config} from './config';
import { LoginService } from './login.service';
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
  ngOnInit(): void {
  }
  constructor(private loginService: LoginService){
    console.log("const");
    this.configData.login=localStorage.getItem('Souqlogin');
    let logU = JSON.parse(localStorage.getItem('SouqloginUser'));
    if(logU!=null)
     this.logedUser=logU;
    console.log("ctor",this.configData)
  }

  logout(){
     localStorage.clear();
     this.configData.login="false"
    }
}
