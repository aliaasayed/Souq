import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {NgForm} from '@angular/forms';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})

export class AddProductComponent implements OnInit
{
  image;
  categories;
  subcategories;
  constructor(private ProductService: ProductService,private categoriesService: CategoriesService) {
    this.categoriesService.getCategories().subscribe((res)=>{
      this.categories=res
      console.log(res)
    });

  }

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

getsubCategory(name){
  this.categoriesService.getsubCategory(name).subscribe((res)=>{
    this.subcategories=res.subcategories

  });
}
}
