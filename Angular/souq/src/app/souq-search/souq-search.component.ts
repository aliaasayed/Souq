import { Component, OnInit } from '@angular/core';
import { SouqSearchService } from '../souq-search.service';;
@Component({
  selector: 'app-souq-search',
  templateUrl: './souq-search.component.html',
  styleUrls: ['./souq-search.component.css']
})
export class SouqSearchComponent implements OnInit {

  serachRes;
  pages;
  reslen;
  SearchWord=" ";
  options = [
    {name:'Bags & Wallets', value:'1', checked:false},
    {name:'OptionB', value:'2', checked:false},
    {name:'OptionC', value:'3', checked:false}
  ]

  selectedsubCat = [];
  constructor(private souqSearchService: SouqSearchService) {
   }

  ngOnInit() {
  }
//check boxes


get selectedOptions() { // right now: ['1','3']
  return this.options
            .filter(opt => opt.checked)
            .map(opt => opt.name)
}

//////////////////////////////////////////////////////////////////////////////////////////////


  getsearchResultFp(){
    this.souqSearchService.getSearchProducts(this.SearchWord,1).subscribe((res)=>{
      this.serachRes=res.productsData.docs;
      this.pages= new Array<Number>(parseInt(res. productsData.pages));
      console.log(res)
    });
  }

  liveSearch(){
    console.log(this.selectedOptions)
    console.log("livvvvvvvvvvvvvvvv",this.selectedsubCat)
    setTimeout(()=>{
        console.log("live",this.SearchWord)
            if(this.SearchWord.trim()!=""){
                  this.souqSearchService.getSearchProducts(this.SearchWord,1).subscribe((res)=>{
                    this.serachRes=res.productsData.docs;
                    this.pages= new Array<Number>(parseInt(res. productsData.pages));
                    this.reslen=res.productsData.docs.length;
                  });
            }
    },500);
  }

getsearchResult(PageNum:number){
      console.log("gggg",PageNum)
      this.souqSearchService.getSearchProducts(this.SearchWord,PageNum).subscribe((res)=>{
        this.serachRes=res.productsData.docs;
    });
  }

}
