import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  dbBooking;
  showtable=""; 
  userid="";
  unpaidrooms=[];
  display=true;
  constructor(public db: AngularFireDatabase) {
    this.dbBooking=db.list('/Bookings')
    .valueChanges()
    .subscribe(res => {
      console.log(res);
      this.dbBooking = res;
      this.display=false;
    });
   }

  ngOnInit() {    this.userid = localStorage.getItem('token');
}
  rbook(){
    if(this.dbBooking != null){
       this.showtable="true";
           for (var key in this.dbBooking) { // fetching bookings for the users
            
            if (this.userid == this.dbBooking[key].regid) {
                //this.book=this.dbBooking[key];
               //this.count=this.dbBooking[key].id++;
                if(this.dbBooking[key].pic == ''){
                    this.unpaidrooms.push(this.dbBooking[key]); 
                }
              }
           }
       }
       else{
         this.showtable="false";
       }

 }
  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);  
  }

}
