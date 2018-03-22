import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';
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
  ngOnInit(): void {
    console.log("init")
  }
}
