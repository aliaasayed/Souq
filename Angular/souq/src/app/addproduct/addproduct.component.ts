import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent implements OnInit 
{
  image; 
  constructor(private ProductService: ProductService) {}
  submitted(form) {
    console.log(form.valid);
    form.value.image=this.image;
    console.log(form.value);
    
    this.ProductService.addproduct(form.value).subscribe((res)=>{
    console.log(res);
  });
}
fileUpload(files)
{
  console.log(files[0]);
  this.image = files[0];
  var myReader:FileReader = new FileReader();
  myReader.readAsDataURL(this.image);
  myReader.onloadend = (e) => {
    this.image = myReader.result;
    console.log(this.image)
  }
}

  ngOnInit() {
  }

}
