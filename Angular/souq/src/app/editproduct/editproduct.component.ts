import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditProductComponent implements OnInit
{
  product;
  image;
  productid: any;
  constructor(private ProductService: ProductService)
  {
    this.ProductService.getUpdateData(this.productid).subscribe((res)=>{
      console.log(res);
      this.product = res;
    })
  }
  update(form) {
    console.log(form.valid);
    form.value.image=this.image;
    console.log(form.value);

    this.ProductService.updateproduct(form.value).subscribe((res)=>{
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
