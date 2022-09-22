import { Component, OnInit } from '@angular/core';
import { DataClient } from '../DataClient/DataClient';
import { IProduct } from '../Models/Iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public thumbnails:IProduct[] = [];
  private page:number = 0;
  private pageSize:number = 100;
  private apihelper:DataClient = new DataClient();
  public info:string = "Any info will be show here!"
  public date:Date = new Date();
  public upload:boolean = false;
  public file:any = null;
  public product:IProduct = {
    id:0,
    imageUrl: "../assets/food.jpg",
    name: "",
    description: "",
    price: 1
  };

  constructor() {  }
  ngOnInit(): void {
     this.apihelper.SetController("products");
     this.Paginate(); 
  }

  onChange(event:any) {
		this.file = event.target.files[0];
	}

  Paginate():void{
    this.apihelper.Pagination(this.page, this.pageSize).subscribe((response)=>{
      if(response.success)
      {
        this.thumbnails = response.data;
      }
    });
  }

  Validate():boolean{
    if(this.product.name.trim().length == 0 || this.product.price <= 0
    || this.product.description.trim().length == 0 || this.file == null)
    return false;

    return true;
  }
  New():void{
    this.product  = {
      id:0,
      imageUrl: "../assets/food.jpg",
      name: "",
      description: "",
      price: 1
    };
  }
   Save(){
    this.apihelper.Add(this.product).subscribe((response)=>{
      if(response.success){
        this.Paginate();
        this.New();
        this.info = "new plate added at :";
        this.date = new Date();
      }
    });
   }
  Add():void{
    if(this.Validate() && this.product.id == 0){
      this.apihelper.Upload(this.file).subscribe((r)=>{
        if(r.success){
           this.product.imageUrl = r.data.path;
           this.Save();
        }
        
      })
      
    }else if(this.Validate()){
      this.apihelper.Update(this.product).subscribe((response)=>{
        if(response.success){
          this.Paginate();
          this.New();
          console.log(response);
        }
      });
    }
  }
  
  Edit(product:IProduct){
    this.product = product;
    this.info = `The product ${product.id} has been edited at:`;
    this.date = new Date();
  }

  Delete(){
    if(this.product.id > 0){
      this.apihelper.Delete(this.product.id).subscribe((response)=>{
        this.Paginate();
        this.New();
        this.info = `The product ${this.product.id} has been deleted:`;
        this.date = new Date();
      });
      
    }
  }

}
