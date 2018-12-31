import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-userrooms',
  templateUrl: './userrooms.component.html',
  styleUrls: ['./userrooms.component.css']
})
export class UserroomsComponent implements OnInit {
   userid="";
   dbBooking;
   showtable="";
   userrooms=[]; 
   display=true;
   constructor(public db: AngularFireDatabase, public spinner: NgxSpinnerService) {
   // this.dbBooking = localStorage.getItem('registeredrooms');
  // console.log(this.dbBooking); 
   this.dbBooking=db.list('/Bookings')
   .valueChanges()
   .subscribe(res => {
     console.log(res);
     this.dbBooking = res;
     this.display==false;
   });
   console.log(this.dbBooking[0]);
  }

  ngOnInit() {
    this.userid = localStorage.getItem('token');
          
  }
  rbook(){
     if(this.dbBooking != null){
      this.showtable="true";
           for (var key in this.dbBooking) { // fetching bookings for the users
            if (this.userid == this.dbBooking[key].regid) {
                //this.book=this.dbBooking[key];
               //this.count=this.dbBooking[key].id++;
               this.userrooms.push(this.dbBooking[key]);   
              }
           }
          }
        else{
          this.showtable="false";
        }

  }

}
