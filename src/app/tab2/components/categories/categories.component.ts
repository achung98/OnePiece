import { Component, OnInit } from '@angular/core';

import { DataSharingService } from '../../../services/data-sharing.service';

import { Globals } from  '../../../globals/globals';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  private sections: any[] = [];

  private sectionData: any[][] = [];

  constructor(private dataSharing: DataSharingService) { }

  ngOnInit() {
    this.getSections(Globals.categoriesInit.March2020);
    this.getSectionsData(Globals.categoriesInit.March2020);

    this.dataSharing.getCategory().subscribe(res => {
      this.sections = [];
      this.getSections(Globals.categoriesInit.March2020);
      this.getSectionsData(Globals.categoriesInit.March2020);
    })
  }

  toogleSection(index) {
    this.sections[index].open = !this.sections[index].open;
  }

  private getSections(data) {
    for(let category in data) {
      this.sections.push({
        'name': category,
        'open': false
      });
    }
  }

  private getSectionsData(data) {
    let i = 0;
    let subCategoryData: any[] = [];

    for(let category in data) {
      for(let subCategory in data[`${category}`]) {
        subCategoryData.push({
          'name': subCategory,
          'value': data[`${category}`][`${subCategory}`]
        });
      }
      this.sectionData[i] = subCategoryData;
      subCategoryData = [];
      i++;
    }
  }
}
