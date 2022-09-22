import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { UrlService } from './services/url.service';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    LoginComponent,
    ProductsComponent,
    ProductThumbnailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UrlService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) 
  {
    InjectorInstance = this.injector;
  }

 }
export let InjectorInstance: Injector;

