import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  room=[{roomType:"",startDate:"",endDate:"",payment:"100000",roomNo:"Not Assigned"}];
 count=0;
  session=" ";
  payment=10000;
  totalPayment=0;
  userDetail={fname:"",email:"",password:"",city:"",country:"",cnic:""};
  constructor(public authService:MyserviceService,private router:Router) {
    this.userDetail=this.authService.getUser();
    if(this.userDetail.fname != ""){
      this.session="start";
    }

  }

  ngOnInit() {
        console.log(this.session);
  
  
  }
  roomBook(room){
    this.room[this.count].startDate=room.startDate;
    this.room[this.count].endDate=room.endDate;
    
    let parts = room.startDate.match(/(\d+)/g);
    let parts2 = room.endDate.match(/(\d+)/g);
    let stdate= new Date(parts[0], parts[1]-1, parts[2]);
    let enddate= new Date(parts2[0], parts2[1]-1, parts2[2]);
    console.log(this.room[0].startDate);
    var diff = Math.abs(enddate.getTime() -  stdate.getTime());
   var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
   // var diff = room.enddate.valueOf() -.valueOf();
   this.totalPayment=this.payment*diffDays;
   this.count++;  
  }
}
