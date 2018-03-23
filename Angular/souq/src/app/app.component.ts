import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {config} from './config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  configData=config;
  logedUser={};

  constructor(){
    this.configData.login=localStorage.getItem('Souqlogin');
    let logU = JSON.parse(localStorage.getItem('SouqloginUser'));
    if(logU!=null)
     this.logedUser=logU;
    console.log("ctor",this.configData)
  }
  ngOnInit(): void {
  }


  logout(){
     localStorage.clear();
     this.configData.login="false"
    }
}
