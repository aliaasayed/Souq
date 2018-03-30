import { Component, OnInit } from '@angular/core';
import { UsersProfileService } from '../users-profile.service';

@Component({
  selector: 'app-user-profile-detail',
  templateUrl: './user-profile-detail.component.html',
  styleUrls: ['./user-profile-detail.component.css']
})
export class UserProfileDetailComponent implements OnInit {
  formhidden = true;
  infohidden = false;
  image;
 user={};
  constructor(private usersProfileService:UsersProfileService) {
    if(localStorage.getItem('SouqtokenKey')){//there token exist in localS
      this.usersProfileService.getUserProfile().subscribe((res)=>{
        this.user=res.user;
      });
    }
  }
  edit()
  {
    this.formhidden=false;
    this.infohidden=true;
  }
  submitIt(form) {
    console.log(form.valid);
    form.value.image=this.image;
    console.log(form.value)
    this.usersProfileService.updateUser(form.value).subscribe((res)=>{
    console.log(res);
  });
  }
  fileUpload(files)
  {
  //console.log(files[0]);
  this.image = files[0];
  var myReader:FileReader = new FileReader();
  myReader.readAsDataURL(this.image);
  myReader.onloadend = (e) => {
    this.image = myReader.result;
    //console.log(this.image)
  }
  }
  ngOnInit() {
  }

}
