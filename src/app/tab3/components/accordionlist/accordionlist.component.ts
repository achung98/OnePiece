import { Component, OnInit, DoCheck} from '@angular/core';
import { SectionEl } from "../../../../assets/sectionEl";

import { Globals } from  '../../../globals/globals';

import { DataSharingService } from '../../../services/data-sharing.service';

@Component({
  selector: 'app-accordionlist',
  templateUrl: './accordionlist.component.html',
  styleUrls: ['./accordionlist.component.scss'],
})
export class AccordionlistComponent implements OnInit {
  private sections: any[] = [
    {'name': 'Food', 'open': false},
    {'name': 'Rent/Mortgage', 'open': false},
    {'name': 'Entertainment', 'open': false},
    {'name': 'Transportation', 'open': false},
    {'name': 'Subscriptions', 'open': false},
    {'name': 'Utilities', 'open': false},
    {'name': 'Misc.', 'open': false}
  ];
  private sectionData: SectionEl[][]=[];
  private data = [];

  static currentPos=0;
  private months: any[] = ['February 2020', 'March 2020'];
  static next:number =0;

  constructor(private dataSharing: DataSharingService)
  {
    AccordionlistComponent.currentPos = this.months.length-1;
  }

  ngOnInit() {
    this.data = [];
    let febArray = this.getData(Globals.categoriesInit.February2020);
    let marArray = this.getData(Globals.categoriesInit.March2020);
    this.data.push(febArray, marArray);

    this.dataSharing.getCategory().subscribe(res => {
      this.data = [];
      let febArray = this.getData(Globals.categoriesInit.February2020);
      let marArray = this.getData(Globals.categoriesInit.March2020);
      this.data.push(febArray, marArray);
    })
  }

  getData(data) {
    let arr = [];

    for(let category in data) {
      let temp = [];
      for(let subcategory in data[`${category}`]) {
        temp.push({
          'name': subcategory,
          'value': data[`${category}`][`${subcategory}`]
        })
      }
      arr.push(temp);
    }

    return arr;
  }

  toogleSection(index) {
    this.sections[index].open = !this.sections[index].open;
  }

  ngDoCheck(){
    this.sectionData = this.data[AccordionlistComponent.currentPos];

  }

  refreshData(val: number){
    console.log("inside")
    AccordionlistComponent.currentPos = val;
    this.sectionData = [];
    this.ngDoCheck();
  }


}
