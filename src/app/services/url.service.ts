import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  public API_URL:string = "https://localhost:7169/api/";
  public FILE_API:string = "https://localhost:7169/api/file/upload";

}
