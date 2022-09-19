
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { WebToken } from '../Models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private token:WebToken = new WebToken();
  private username:string = "";
  private KEY:string = "_KEY_AUTH_";

  get(){
    return this.token;
  }
 
  public Save(username:string, token:WebToken)
  {
    this.token = token;
    this.username = username;
    localStorage.setItem(this.KEY, JSON.stringify(token));
  }

  public Load(key:string){
    let item = localStorage.getItem(this.KEY);
    this.token = JSON.parse(item!) as WebToken;
    
  }

  public IsActive(){
    let date = Date.parse(this.token.duration);
    console.log(date);
  }

}
