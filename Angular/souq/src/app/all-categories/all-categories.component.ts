import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  AllCategories;
  constructor(private categoriesService: CategoriesService) {

    this.categoriesService.getCategories().subscribe((res)=>{
      this.AllCategories=res;

      console.log(this.AllCategories[0].subcategories)
    });
   }

  ngOnInit() {
  }

}
