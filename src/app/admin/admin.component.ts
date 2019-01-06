import { Component, OnInit, ViewChild } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userid="";
  fname="";
  dbBooking;
  userrooms=[];
  userpaidrooms=[];
  dbusers;
  display=false;
  totalPaid=0;
  available=true;
  pbutton=true;
  inputroom=false; 
  constructor(public db: AngularFireDatabase,public authService:MyserviceService,private router:Router) { 
    db.list('/Bookings')
    .valueChanges()
    .subscribe(res => {
      console.log(res);
      this.dbBooking = res;
      
      this.rbook();
      
      // this.myVar = setTimeout(this.rbook, 3000);
      
     });
  }

  ngOnInit() {
    this.userid = localStorage.getItem('token');
    this.fname = localStorage.getItem('fname');
  }
  rbook(){
    this.db.list('/registerations')
    .valueChanges()
    .subscribe(res => {
      //console.log(res);
      this.dbusers = res;
      for (var user in this.dbusers) { // fetching bookings for the users
        for (var booked in this.dbBooking) { // fetching bookings for the users
           if(this.dbusers[user].id ==this.dbBooking[booked].regid ){
             if(this.dbBooking[booked].paymentStatus=="Not Paid"){
            //console.log(this.dbBooking[booked].$key); 
                  this.userrooms.push({
                    userName:this.dbusers[user].fname,
                    startDate:this.dbBooking[booked].startDate,
                    endDate:this.dbBooking[booked].endDate,
                    payment:this.dbBooking[booked].payment,
                    roomno:"",
                    paymentStatus:this.dbBooking[booked].paymentStatus,
                    regid:this.dbBooking[booked].regid,
                    id:this.dbBooking[booked].id,
                    pic:this.dbBooking[booked].pic
                  });   
              }
              else if(this.dbBooking[booked].paymentStatus=="Paid"){
                //console.log(this.dbBooking[booked].$key); 
                this.totalPaid+=this.dbBooking[booked].payment;
                      this.userpaidrooms.push({
                        userName:this.dbusers[user].fname,
                        startDate:this.dbBooking[booked].startDate,
                        endDate:this.dbBooking[booked].endDate,
                        payment:this.dbBooking[booked].payment,
                        roomno:this.dbBooking[booked].roomNo,
                        paymentStatus:this.dbBooking[booked].paymentStatus,
                        regid:this.dbBooking[booked].regid,
                        id:this.dbBooking[booked].id,
                        pic:this.dbBooking[booked].pic
                      });   
                  }
           }
        }
      }
     // this.myVar = setTimeout(this.rbook, 3000);
      this.display=true;
     });
   }
   paidroom(rooms){
      
    var ref = firebase.database().ref("Bookings");
    ref.orderByChild("id").equalTo(rooms.id).once("value", function(snapshot) {
      snapshot.forEach(function(employee) {
        employee.ref.update({ roomNo: rooms.roomno,
                              paymentStatus:"Paid"
                            });
      });
    }); 
    // this..snapshot.params['id'];
    location.reload(); 
  }
  roomchange(room){
    for (var bookedroom in this.userpaidrooms) { // fetching bookings for the users
      console.log(this.userpaidrooms[bookedroom].roomno);
      if(this.userpaidrooms[bookedroom].roomno==room.roomno && this.userpaidrooms[bookedroom].paymentStatus=="Paid"
       && room.startDate >= this.userpaidrooms[bookedroom].startDate || room.endDate <= this.userpaidrooms[bookedroom].endDate){
          this.available=false;
          this.pbutton=false;
          break; 
        }
      if(room.roomno == "Not Assigned" || room.roomno==""){
          this.inputroom=false;
          this.pbutton=false;
          this.available=true;  
          
          break
        }
        else{
        this.available=true;  
        this.pbutton=true;
        this.inputroom=true;
        
      }  
    }  
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      //this.pbutton=false;
      return false;
    }
    return true;

  }
  
}
