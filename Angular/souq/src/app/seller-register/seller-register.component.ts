import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit {
  image; /* property of File type */
  constructor(private loginService: LoginService) {}
  submitIt(form) {
    console.log(form.valid);
    form.value.image=this.image;
    this.loginService.register(form.value).subscribe((res)=>{
    console.log(res);
  });
}
fileUpload(files)
{
  console.log(files[0]);
  this.image = files[0];
  var myReader:FileReader = new FileReader();
  myReader.readAsDataURL(this.image);
  myReader.onloadend = (e) => {
    this.image = myReader.result;
    console.log(this.image)
  }
}


  ngOnInit() {
  }

}
