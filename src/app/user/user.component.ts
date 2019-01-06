import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  userid="";
  book=[{id:0,regid:"",startDate:"",endDate:"",payment:0,roomNo:"Not Assigned",paymentStatus:"",pic:"",checkout:""}];
  //roombook={pyment:0,stddate:"",};
  count=0;
  list:Observable<any[]>;
  totalPayment=0;
  dbBooking;
  userDetail={fname:"",email:"",password:"",city:"",country:"",cnic:""};
  date; //current date
  today;  // for format 
  stdate; // for valid that enddate should be greater than startdate
  name="";
  constructor(public datepipe: DatePipe,public db: AngularFireDatabase,public authService:MyserviceService,private router:Router) {
    // this.dbBooking=db.list('/Bookings')
    // .valueChanges()
    // .subscribe(res => {
    //   console.log(res);
    //   this.dbBooking = res;
    this.date=new Date();
    this.today =this.datepipe.transform(this.date, 'yyyy-MM-dd');
 
    // });
    // localStorage.setItem('registeredrooms', this.dbBooking);
    console.log(this.today);
    db.list('/Bookings')
    .valueChanges()
    .subscribe(res => {
      console.log(res);
      this.dbBooking = res;
      //this.rbook();
     // this.myVar = setTimeout(this.rbook, 3000);
     });
   

 
    this.userDetail=this.authService.getUser();
  }
  ngOnInit() {
    
    this.userid = localStorage.getItem('token');
    this.name = localStorage.getItem('fname');
    //console.log(this.userid +" "+this.userDetail.fname );
  
  }
  roomBook(room:NgForm){
   //console.log(room.value.startDate +""+this.today);
   if(room.value.startDate > this.today && room.value.startDate < room.value.endDate){
            if(this.dbBooking != null){
                
                    for (var key in this.dbBooking) { // fetching bookings for the users
                    
                          //this.book=this.dbBooking[key];
                        this.count=this.dbBooking[key].id;
                      //console.log(this.count);
                    }
                this.count++;
              }
              let parts = room.value.startDate.match(/(\d+)/g);
              let parts2 = room.value.endDate.match(/(\d+)/g);
              let stdate= new Date(parts[0], parts[1]-1, parts[2]);
              let enddate= new Date(parts2[0], parts2[1]-1, parts2[2]);
     //         console.log(this.book[0].startDate);
              var diff = Math.abs(enddate.getTime() -  stdate.getTime());
              var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
              
              this.totalPayment=room.value.payment*diffDays;
              let roomtype="";
              if(room.value.payment==10000){
                roomtype="Standard Room";
              }
              else if(room.value.payment==15000){
                roomtype="Sweet Room";
              } 
              else if(room.value.payment==20000){
                roomtype="VIP Room";
              } 
              
              let bookroom={id:this.count,regid:this.userid,startDate:room.value.startDate,endDate:room.value.endDate,payment:this.totalPayment,roomNo:"Not Assigned",paymentStatus:"Not Paid",pic:roomtype,checkout:""};
            if(this.book[0].id==0){
              this.book[0]= bookroom;
              this.count++;
              }
              else{
                this.book.push(bookroom);
                this.count++; 
              }
    }else{
      alert("Start date should greater than current date or end Date should greater then start date");
    }

    //console.log(this.count);
   }

  deleteroom(id){

      this.book = this.book.filter(function( obj ) {
        
        return obj.id !== id;
        });
        this.count--;
      if(this.book[0] === undefined){
         this.book=[{id:0,regid:"",startDate:"",endDate:"",payment:0,roomNo:"Not Assigned",paymentStatus:"",pic:"",checkout:""}];
        //this.count=0;
    }  
  }
  confirmBooking(){
    for (let room of this.book) {
      this.db.list('/Bookings').push({id:room.id,regid:room.regid,startDate:room.startDate,endDate:room.endDate,payment:room.payment,roomNo:"Not Assigned",paymentStatus:"Not Paid",pic:room.pic,checkout:""});
    }
    alert("Successfully registered");
    this.router.navigate(['/userrooms']);
    
  }
  // rbook(){
  //   if(this.dbBooking != null){
  //          for (var key in this.dbBooking) { // fetching bookings for the users
  //           console.log(key); 
  //          if (this.userid == this.dbBooking[key].regid) {
  //              this.book=this.dbBooking[key];
  //              this.count=this.dbBooking[key].id++;
  //              console.log(this.dbBooking[key]);
  //            }
  //          }
  //        }
  // }
}
