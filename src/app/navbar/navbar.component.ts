import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../myservice.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user={fname:"",email:"",password:"",city:"",country:"",cnic:""};
  name=null;
  userid='1';
  constructor(public authService:MyserviceService,private router:Router) {
    this.user=this.authService.getUser();
    this.name=this.user["email"];
    console.log(this.name);
    console.log(this.userid);
    console.log(this.user);
  }

  ngOnInit() {

    this.userid = localStorage.getItem('fname');
    console.log(this.userid);
  }
  logout(){
    localStorage.clear();
    location.reload();
    this.router.navigate(['/home']);
  }

}
