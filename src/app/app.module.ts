import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyserviceService } from './myservice.service';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),AngularFireDatabaseModule,
    RouterModule.forRoot([{
      path: '',
      component: HomeComponent
    }
    ,{
      path: 'login',
      component: LoginComponent
    },{
      path: 'register',
      component: RegisterComponent
    },{
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'user',
      component: UserComponent
    }
  ])
  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
