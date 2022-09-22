import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../Models/Iproduct';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html'
})
export class ProductThumbnailComponent {
  @Input() product: IProduct = {
    id:0,
    imageUrl: "../assets/food.jpg",
    name: "Grilled Beef with potatoes",
    description: "Meat, Potatoes, Rice, Tomatoe",
    price: 25.45
  };

    public url:string = "";
    
    constructor(private urlservice:UrlService) {  this.url = urlservice.API_IMG; }

}


