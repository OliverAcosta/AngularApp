
import { Component, OnInit } from '@angular/core';
import { AuthenticationClient } from '../DataClient/AuthenticationClient';
import { WebToken } from '../Models/Token';
import { AuthService } from '../services/auth.service';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
public username:string = "";
public password:string = "";
private auth:AuthenticationClient = new AuthenticationClient();
  constructor(private authservice:AuthService){ }

 public login(){
    if(this.username.trim().length == 0 || this.password.trim().length == 0)
    {
      return;
    } 
   this.auth.Login(this.username, this.password).subscribe((response)=>{
      if(response.success){
        let token = response.data as WebToken;
        this.authservice.Save(this.username, token);
        this.authservice.IsActive();
      }
   });
 }
}
