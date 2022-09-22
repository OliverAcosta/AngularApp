import { Injectable, Injector, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RequestResponse } from '../Models/response';
import { Observable } from 'rxjs/internal/Observable';
import {InjectorInstance} from '../app.module';
import { catchError, observable, of, timeout } from 'rxjs';
import { WebToken } from '../Models/Token';
import { AuthService } from '../services/auth.service';
import { UrlService } from '../services/url.service';


export class DataClient  {
  private http : HttpClient;
  private urlbase:string ="";
  private authService:AuthService;
  private urlService:UrlService;

  constructor() 
  {  
    this.http = InjectorInstance.get<HttpClient>(HttpClient);
    this.urlService = InjectorInstance.get<UrlService>(UrlService);
    this.authService = InjectorInstance.get<AuthService>(AuthService);
    this.urlbase = this.urlService.API_URL;
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
 
  SetController(endpoint:string):void{
    this.urlbase = this.urlbase + endpoint;
  }

  GetData():Observable<RequestResponse>{
    return this.http.get<RequestResponse>(this.urlbase + `/data`);
  }

  Pagination(page:number = 0, pageSize:number = 100):Observable<RequestResponse>{
    return this.http.get<RequestResponse>(this.urlbase + `/pagination/${page}/${pageSize}`);
  }

  GetSingle(index:number):Observable<RequestResponse>{
    return this.http.get<RequestResponse>(this.urlbase + `/get/${index}`);
  }

  Add(data:any):Observable<RequestResponse>{
     return this.http.post<RequestResponse>(this.urlbase + `/add`, data);
  }

  Update(data:any){
    return this.http.put<RequestResponse>(this.urlbase + `/update`, data);
  }

  Delete(id:number){
    return this.http.delete<RequestResponse>(this.urlbase + `/delete/${id}`);
  }

  DownloadImage(path:string){
    return this.http.get(this.urlbase + "/getimage" + path);
  }

  Upload(file:File):Observable<any> {

		// Create form data
		const formData = new FormData();
			
		// Store form name as "file" with file data
		formData.append("file", file, file.name);
			
		// Make http post request over api
		// with formData as req
		return this.http.post(this.urlService.FILE_API, formData);
	}

}
