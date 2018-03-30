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
  pages;
  reslen;
  SearchWord="";
  minVal=0;
  maxVal=100000;
  priceRange=this.minVal+":"+0
  options = [
    {name:'Bags & Wallets', value:'1', checked:false},
    {name:'shoes', value:'2', checked:false},
    {name:'OptionC', value:'3', checked:false}
  ];
  categories;


  constructor(private souqSearchService: SouqSearchService,private categoriesService: CategoriesService) {


   }

  ngOnInit() {
  }
//check boxes


get selectedOptions() { // right now: ['1','3']
  return this.options
            .filter(opt => opt.checked)
            .map(opt => opt.name.trim())
}

//////////////////////////////////////////////////////////////////////////////////////////////

  clickcheck(){

    console.log("click")
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
