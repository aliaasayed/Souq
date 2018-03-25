import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';
  isHidden=true;
  url;
  constructor(private loginService: LoginService){
    console.log("const");
    this.url= this.loginService.getGmailURL().subscribe((res)=>{
      console.log(res);
      this.url=res;
    });
    this.url= this.loginService.getFacebookURL().subscribe((res)=>{
      console.log(res);
      this.url=res;
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
  ngOnInit(): void {
    console.log("init")
  }

}
