import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  userid="";
  book=[{regid:"",startDate:"",endDate:"",payment:0,roomNo:"Not Assigned",paymentStatus:"",pic:"",quantity:0}];
  count=0;
 
  totalPayment=0;
  userDetail={fname:"",email:"",password:"",city:"",country:"",cnic:""};
  constructor(public authService:MyserviceService,private router:Router) {
    this.userDetail=this.authService.getUser();
  }

  ngOnInit() {
    this.userid = localStorage.getItem('token');
    this.userDetail.fname = localStorage.getItem('fname');
    
    console.log(this.userid +" "+this.userDetail.fname );
  }
  roomBook(room){
    
    let parts = room.startDate.match(/(\d+)/g);
    let parts2 = room.endDate.match(/(\d+)/g);
    let stdate= new Date(parts[0], parts[1]-1, parts[2]);
    let enddate= new Date(parts2[0], parts2[1]-1, parts2[2]);
    console.log(this.book[0].startDate);
    var diff = Math.abs(enddate.getTime() -  stdate.getTime());
   var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
   // var diff = room.enddate.valueOf() -.valueOf();
   this.totalPayment=room.payment*diffDays;
   let bookroom={regid:this.userid,startDate:room.startDate,endDate:room.endDate,payment:this.totalPayment,roomNo:"Not Assigned",paymentStatus:"Not Paid",pic:"",quantity:1};
   if(this.count==0){
    this.book[0]= bookroom;
    this.count++;
    }
   else{
    this.book.push(bookroom)
   }
  }
}
