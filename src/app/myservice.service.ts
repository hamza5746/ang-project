import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
   users=[];
   name="";
   loginuser={fname:"",email:"",password:"",city:"",country:"",cnic:"",gender:""};
   constructor(private router:Router) { }
  registerUser(user){
    this.users.push({fname:user.fname,email:user.email,password:user.password,city:user.city,country:user.country,cnic:user.cnic});
    console.log(this.users);
  }
  loginUser(user){
      this.loginuser=user;
      console.log(this.loginuser);
      
    //   this.users.forEach(element=>{
  //   if(this.keepgoing==1){
  //     if(element.email==user.email && element.password==user.password){
  //       alert("Welcome");
  //       this.loginuser=element;
  //       this.router.navigate(['/user']);
  //       this.keepgoing=2;
  //     }
  //     else{
  //     this.keepgoing=3;
  //     }
  //   }
  //   else if(this.keepgoing==3){
  //     this.router.navigate(['/login']);
  //   }
  //  }) 
  }
  getUser(){
      return this.loginuser;
  }

}
