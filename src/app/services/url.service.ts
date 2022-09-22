import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  public PORT:number = 7169;
  private URLBASE:string = "https://localhost:";
  public API_URL:string = `${this.URLBASE}${this.PORT}/api/`;
  public FILE_API:string = `${this.URLBASE}${this.PORT}/api/file/upload`;
  public API_IMG:string = `${this.URLBASE}${this.PORT}/api/file/images/`;
}
