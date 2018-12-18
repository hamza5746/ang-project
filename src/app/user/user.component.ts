import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  userid="";
  book=[{id:0,regid:"",startDate:"",endDate:"",payment:0,roomNo:"Not Assigned",paymentStatus:"",pic:"",checkout:""}];
  count=0;
  list:Observable<any[]>;
  totalPayment=0;
  dbBooking; 
  userDetail={fname:"",email:"",password:"",city:"",country:"",cnic:""};
  
  constructor(public db: AngularFireDatabase,public authService:MyserviceService,private router:Router) {
    this.dbBooking=db.list('/Bookings')
    .valueChanges()
    .subscribe(res => {
      console.log(res);
      this.dbBooking = res;
    });
    console.log(this.dbBooking);
    if(this.dbBooking != null){
      for (var key in this.dbBooking) { // fetching bookings for the users
        console.log(key); 
      if (this.userid == this.dbBooking[key].regid) {
          this.book=this.dbBooking[key];
          this.count=this.dbBooking[key].id++;
          console.log(this.dbBooking[key]);
        }
      }
    }
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
   let bookroom={id:this.count,regid:this.userid,startDate:room.startDate,endDate:room.endDate,payment:this.totalPayment,roomNo:"Not Assigned",paymentStatus:"Not Paid",pic:"",checkout:""};
   if(this.count==0){
    this.book[0]= bookroom;
    this.count++;
    }
   else{
    this.book.push(bookroom)
    this.count++; 
  }
  }

  deleteroom(id){
      console.log(id);
      this.book = this.book.filter(function( obj ) {
        return obj.id !== id;
        });
        console.log(this.book[0]);
      if(this.book[0] === undefined){
         this.book=[{id:0,regid:"",startDate:"",endDate:"",payment:0,roomNo:"Not Assigned",paymentStatus:"",pic:"",checkout:""}];
        this.count=0;
    }  
  }
  confirmBooking(){
    for (let room of this.book) {
      this.db.list('/Bookings').push({id:room.id,regid:room.regid,startDate:room.startDate,endDate:room.endDate,payment:room.payment,roomNo:"Not Assigned",paymentStatus:"Not Paid",pic:"",checkout:""});
    }
    alert("Successfully registered");
    
  }
}
