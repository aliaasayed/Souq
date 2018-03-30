import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';///Observable
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class GlobalDataService {

    public user=new BehaviorSubject<Object>({});
    currentuser=this.user.asObservable();

    public userCart=new BehaviorSubject<Object>({});
    currentuserCart=this.userCart.asObservable();

    constructor() { }

    setUserData(userinfo){
      this.user.next(userinfo);
    }

    setUserCart(userinfo){
      this.userCart.next(userinfo);
    }

}
