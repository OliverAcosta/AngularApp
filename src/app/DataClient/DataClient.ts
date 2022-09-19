import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RequestResponse } from '../Models/response';
import { Observable } from 'rxjs/internal/Observable';
import {InjectorInstance} from '../app.module';
import { catchError, observable, of, timeout } from 'rxjs';
import { WebToken } from '../Models/Token';
import { AuthService } from '../services/auth.service';


export class DataClient  {
  private http : HttpClient;
  
  private UrlBase:string = "http://localhost:7169/api/account";
  private authService:AuthService;
  constructor(endpoint:string) 
  {  
    this.http = InjectorInstance.get<HttpClient>(HttpClient);
    
    this.authService = InjectorInstance.get<AuthService>(AuthService);
    this.UrlBase = this.UrlBase + `/${endpoint}`
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
 


  GetData():Observable<RequestResponse>{
    return this.http.get<RequestResponse>(this.UrlBase + `/data`);
  }

  Pagination(page:number = 0, pageSize:number = 100):Observable<RequestResponse>{
    return this.http.get<RequestResponse>(this.UrlBase + `/pagination/${page}/${pageSize}`);
  }

  GetSingle(index:number):Observable<RequestResponse>{
    return this.http.get<RequestResponse>(this.UrlBase + `/get/${index}`);
  }

  Add(data:any):Observable<RequestResponse>{
     return this.http.post<RequestResponse>(this.UrlBase + `/add`, data);
  }

  Update(data:any){
    return this.http.post<RequestResponse>(this.UrlBase + `/update`, data);
  }

  Delete(id:number){
    return this.http.delete<RequestResponse>(this.UrlBase + `/delete/${id}`);
  }

}
