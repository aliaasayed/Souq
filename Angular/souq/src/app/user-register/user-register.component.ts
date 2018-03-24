import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {
  myFile; /* property of File type */
  submitIt(form) {
    console.log(form.valid);
    form.value.myFile=this.myFile;
    this.loginService.register(form.value).subscribe((res)=>{
    console.log(res);
  });
}
fileUpload(files)
{
  console.log(files[0]);
  this.myFile = files[0];
  var myReader:FileReader = new FileReader();
  myReader.readAsDataURL(this.myFile);
  myReader.onloadend = (e) => {
    this.myFile = myReader.result;
    console.log(this.myFile)
  }
}
  constructor(private loginService: LoginService) {

   }

  ngOnInit() {
  }

}
