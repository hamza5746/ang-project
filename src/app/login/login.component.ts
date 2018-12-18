import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
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
   user;
   constructor(public authService:MyserviceService,public db: AngularFireDatabase, private router: Router) { 
    
    this.dbUser = db.list('/registerations')
    .valueChanges()
    .subscribe(res => {
      //console.log(res)//should give you the array of percentage. 
      this.dbUser = res;
      console.log(this.dbUser);
    });
    console.log(this.dbUser);
   // console.log(this.login.email);
  }
  
  ngOnInit() {
    localStorage.clear();
    
    //location.reload();
  }
  async loginClick(){
    try {
      var r = await firebase.auth().signInWithEmailAndPassword(
        this.login.email,
        this.login.password
      );
    
      if(r){
        
        for (var key in this.dbUser) {
           console.log(this.dbUser[key].id); 
          if (firebase.auth().currentUser.uid == this.dbUser[key].id) {
           
            if (this.dbUser[key].role == 'User') {
              alert("user Login");
              this.authService.loginUser(this.dbUser[key]);
              localStorage.setItem('isLoggedIn', "true");
              localStorage.setItem('token', this.dbUser[key].id);
              localStorage.setItem('fname', this.dbUser[key].fname);

              //this.router.navigate(['/app']);
              //location.reload();
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
  } 
}
