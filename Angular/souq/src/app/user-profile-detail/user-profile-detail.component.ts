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
 user={};
  constructor(private usersProfileService:UsersProfileService) {

    if(localStorage.getItem('SouqtokenKey')){//there token exist in localS
      this.usersProfileService.getUserProfile().subscribe((res)=>{
       console.log(res.user);
       this.user=res.user;
      });
    }
  }
  edit()
  {
    this.formhidden=false;
    this.infohidden=true;
  }
  submitIt(loginForm){
    console.log(loginForm.value)
  }
  ngOnInit() {
  }

}
