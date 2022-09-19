import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { UrlService } from '../services/url.service';

@Injectable({
providedIn: 'root'
})
export class FileUploadService {

// API url
private baseApiUrl:string = "";
	
constructor(private urlservice: UrlService, private http:HttpClient) { }

// Returns an observable
	upload(file:File):Observable<any> {

		// Create form data
		const formData = new FormData();
			
		// Store form name as "file" with file data
		formData.append("file", file, file.name);
			
		// Make http post request over api
		// with formData as req
		return this.http.post(this.urlservice.FILE_API, formData)
	}
}
