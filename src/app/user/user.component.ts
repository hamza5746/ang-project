import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user={fname:"",email:"",password:"",repassword:"",city:"",country:"",cnic:""};
  constructor(public authService:MyserviceService,private router:Router) {
    this.user=this.authService.getUser();
    console.log(this.user);
   }

  ngOnInit() {
  
  }

}
