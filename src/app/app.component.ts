import { Component } from '@angular/core';
import {MyserviceService} from './myservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fyp';
  user={};
  name="";
  constructor(public authService:MyserviceService){
    this.user=this.authService.getUser();
    this.name=this.user["email"];
    console.log(this.name);
  }
}
