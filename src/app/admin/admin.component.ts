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
                    roomno:this.dbBooking[booked].roomNo,
                    paymentStatus:this.dbBooking[booked].paymentStatus,
                    regid:this.dbBooking[booked].regid,
                    id:this.dbBooking[booked].id
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
                        id:this.dbBooking[booked].id
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
  roomchange(roomno){
    for (var bookedroom in this.userpaidrooms) { // fetching bookings for the users
      console.log(this.userpaidrooms[bookedroom].roomno);
      if(this.userpaidrooms[bookedroom].roomno==roomno && this.userpaidrooms[bookedroom].paymentStatus=="Paid"){
          this.available=false;
          this.pbutton=false;
          break; 
        }
      if(roomno == "Not Assigned" || roomno==""){
          this.inputroom=false;
          break
        }
        else{
        this.available=true;  
        this.pbutton=true;
        this.inputroom=true;
        
      }  
    }  
  }
  
}
