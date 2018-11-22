import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   login={};
   list:Observable<any[]>;
  constructor(public authService:MyserviceService,public db: AngularFireDatabase) { }
  
  ngOnInit() {
  }
  loginClick(){
   this.list=this.db.list("/registrations").valueChanges();//continue
   this.authService.loginUser(this.login);
  } 
}
