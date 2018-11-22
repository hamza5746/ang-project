import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators} from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

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
  registerClick(){
     try{
        this.list = this.db.list('/registerations').valueChanges();
        this.list.forEach(function (data){
          this.id=data.lastIndexOf;
          this.id=this.id.id++;
        });
      }catch(Exception){
        this.id=0;
     }
        if(this.register.fname !='' && this.register.email !='' && this.register.password !='' && this.register.repassword !=''
        && this.register.city !='' && this.register.country !='' && this.register.cnic !=''){
            if(this.register.password==this.register.repassword)
              {
                 this.db.list('/registerations').push({ id:this.id ,fname:this.register.fname,email:this.register.email,password:this.register.password,city:this.register.city,country:this.register.country,cnic:this.register.cnic});
                //this.authService.registerUser(this.register);
                this.router.navigate(['/login']);
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
