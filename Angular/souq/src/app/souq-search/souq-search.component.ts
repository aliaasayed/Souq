import { Component, OnInit } from '@angular/core';
import { SouqSearchService } from '../souq-search.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-souq-search',
  templateUrl: './souq-search.component.html',
  styleUrls: ['./souq-search.component.css']
})
export class SouqSearchComponent implements OnInit {

  serachRes;
  checked=false;
  pages;
  reslen;
  SearchWord="";
  minVal=0;
  maxVal=100000;
  priceRange=this.minVal+":"+0
  options = []
  //   {name:'Bags & Wallets', value:'1', checked:false},
  //   {name:'shoes', value:'2', checked:false},
  //   {name:'OptionC', value:'3', checked:false}
  // ];
  categories;


  constructor(private souqSearchService: SouqSearchService,private categoriesService: CategoriesService) {

    this.categoriesService.getCategories().subscribe((res)=>{
      this.categories=res;
      for(var i=0;i<this.categories.length;i++)
      {
        for(var j=0;j<this.categories[i].subcategories.length;j++)
        {
          var option={name:'',value:0,checked:false};

          console.log(this.categories[i].subcategories[j]);

        option.name=this.categories[i].subcategories[j]
        option.value=j+1
        option.checked=false
        this.options.push(option);
      }
      }
      console.log(this.categories.length);
      console.log(this.options);

    });



    // for(var i=0;i<this.categories.length;i++)
    // {
    //   for(var j=0;i<this.categories[i].subcategories.length;j++)
    //   var subcategory=this.categories[i].subcategories;
    //   this.options.push({name:subcategory,value:subcategory,checked:false});
    // }
    // console.log(this.options)

   }


  ngOnInit() {
    console.log(this.categories)
  }
//check boxes


get selectedOptions() { // right now: ['1','3']
  return this.options
            .filter(opt => opt.checked)
            .map(opt => opt.name.trim())
}

//////////////////////////////////////////////////////////////////////////////////////////////

  clickcheck(){

    console.log("subcategory")
    // this.options.push(subcategory)
     this.liveSearch()
  }

  liveSearch(){
    setTimeout(()=>{
        console.log("live",this.SearchWord)
            if(this.SearchWord.trim()!=""){
                  this.priceRange=this.minVal+":"+this.maxVal
                  this.souqSearchService.getSearchProducts(this.SearchWord.trim(),this.selectedOptions.join(),this.priceRange,1).subscribe((res)=>{
                    this.serachRes=res.productsData.docs;
                    this.pages= new Array<Number>(parseInt(res. productsData.pages));
                    this.reslen=res.productsData.docs.length;
                  });
            }
            else{
              this.serachRes=[];
              this.pages=[];
              this.reslen=0;
            }
    },500);
  }

getsearchResult(PageNum:number){
      this.souqSearchService.getSearchProducts(this.SearchWord.trim(),this.selectedOptions.join(),this.priceRange,PageNum).subscribe((res)=>{
        this.serachRes=res.productsData.docs;
    });
  }

}
