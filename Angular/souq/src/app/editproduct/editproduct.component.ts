import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router'
import {NgForm} from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditProductComponent implements OnInit
{
  product={};
  image;
  id;
  categories;
  subcategories;
  constructor(private ProductService: ProductService,
    private route : ActivatedRoute,
    private categoriesService: CategoriesService  ,private rou:Router)
  {
    this.categoriesService.getCategories().subscribe((res)=>{
      this.categories=res
      console.log(res)
    });
    this.route.params.subscribe((params) => {this.id=params['id']
    console.log(params)});
    this.ProductService.getUpdateData(this.id).subscribe((res)=>{
      console.log(res);
      this.product = res;
    })

  }
  update(form) {
    console.log(form.valid);
    form.value.image=this.image;
    console.log(form.value);

    this.ProductService.updateproduct(form.value,this.id).subscribe((res)=>{
    console.log(res);
    this.rou.navigate(['/sellerHome'])
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
}}
