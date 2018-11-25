import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   login={email:"",password:""};
   list:Observable<any[]>;
   dbUser;
  constructor(public authService:MyserviceService,public db: AngularFireDatabase, private router: Router) { 
    this.dbUser = db.list('/registrations')
    .valueChanges()
    .subscribe(res => {
      //console.log(res)//should give you the array of percentage. 
      this.dbUser = res;
    });
        console.log(this.dbUser);
  }
  
  ngOnInit() {
    
  }
  async loginClick(){
    try {
      var r = await firebase.auth().signInWithEmailAndPassword(
        this.login.email,
        this.login.password
      );
      if(r){
        for (var id in this.dbUser) {
          if (firebase.auth().currentUser.uid == this.dbUser[id].id) {
            if (this.dbUser[id].role == 'User') {
              this.router.navigate(['/user']);
            }
            else{
              //admin login
            alert("Admin Login");
            }
          }
        }
        localStorage.setItem('password', (this.login.password));
          //console.log(localStorage.getItem('password'));
      }
    }catch(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message);
     
    }
   this.list=this.db.list("/registrations").valueChanges();//continue
   this.authService.loginUser(this.login);
  } 
}
