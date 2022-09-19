import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RequestResponse } from '../Models/response';
import { Observable } from 'rxjs/internal/Observable';
import {InjectorInstance} from '../app.module';
import { catchError, observable, of, timeout } from 'rxjs';
import { UrlService } from '../services/url.service';


export class AuthenticationClient  {
  private http : HttpClient;
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private UrlBase:string ="";
  private urlService:UrlService;
  constructor() 
  {  
    this.http = InjectorInstance.get<HttpClient>(HttpClient);
    this.urlService = InjectorInstance.get<UrlService>(UrlService);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
     // console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
    //  console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 

  Login(username:string, password:string):Observable<RequestResponse>{
    let data =  {
      "Username": username,
      "Password": password
    };
    return this.http.post<RequestResponse>(this.UrlBase + `/login`, data);
  }

  Pagination(page:number = 0, pageSize:number = 100):Observable<RequestResponse>{
    return this.http.get<RequestResponse>(this.UrlBase + `/pagination/${page}/${pageSize}`);
  }

  GetSingle(index:number):Observable<RequestResponse>{
    return this.http.get<RequestResponse>(this.UrlBase + `/get/${index}`);
  }

  Add(data:any):Observable<RequestResponse>{
     return this.http.post<RequestResponse>(this.UrlBase + `/add`, data, this.headers);
  }

  Update(data:any){
    return this.http.post<RequestResponse>(this.UrlBase + `/update`, data, this.headers);
  }

  Delete(id:number){
    return this.http.delete<RequestResponse>(this.UrlBase + `/delete/${id}`);
  }

}
