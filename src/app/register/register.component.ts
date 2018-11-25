import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators} from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register={fname:"",email:"",password:"",repassword:"",city:"",country:"",cnic:"",gender:""};
  id=0;
  list: Observable<any[]>;
  fetchlist={};
constructor(public db: AngularFireDatabase,public authService:MyserviceService,private router:Router) { }
formdata;  
note=false;
  ngOnInit() {
    this.formdata = new FormGroup({
      emailid: new FormControl("",Validators.compose(
        [
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
      ]))
     
      });

  }
async  registerClick(){
    

    if(this.register.fname !='' && this.register.email !='' && this.register.password !='' && this.register.repassword !=''
        && this.register.city !='' && this.register.country !='' && this.register.cnic !=''){
            if(this.register.password==this.register.repassword)
              {
                try{
                      var r = firebase.auth().createUserWithEmailAndPassword(
                        this.register.email,
                        this.register.password
                      );
                      if(r){  
                      this.db.list('/registerations').push({
                         id:firebase.auth().currentUser.uid,
                         fname:this.register.fname,
                         email:this.register.email,
                         password:this.register.password,
                         city:this.register.city,
                         country:this.register.country,
                         cnic:this.register.cnic,
                         gender:this.register.gender,
                         role:"User" 
                        });
                        alert("Successfully registered");
                        //this.authService.registerUser(this.register);
                        this.router.navigate(['/login']);
                      }
              }catch(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message);
               
              } 
              }
              else{
                alert("Password does not match");
              }
        }
        else{
          alert("Your field is empty");
        }
  }
  validatepassword(){
    if(this.register['password']==this.register['repassword']){
      this.note=true;
    }
  }
  onClickSubmit(data){

  }

}
