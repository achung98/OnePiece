import { Component, OnInit, ViewChild } from "@angular/core";
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip
} from "ng2-charts";
import { ChartType, ChartOptions } from "chart.js";
import {AccordionlistComponent} from "../accordionlist/accordionlist.component";

import { Globals } from  '../../../globals/globals';
import { DataSharingService } from '../../../services/data-sharing.service';

@Component({
  providers: [AccordionlistComponent],
  selector: "app-piechart",
  templateUrl: "./piechart.component.html",
  styleUrls: ["./piechart.component.scss"]
})
export class PiechartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array<any> = [
    {
      backgroundColor: [
        "#5CDB95",
        "#A1E8CC",
        "#CDFACD",
        "#EDF5E1",
        "#395E66",
        "#379683",
        "#519E8A"
      ],
      borderColor: ["white", "white", "white", "white", "white", "white", "white"]
    }
  ];
  public temp: any;
  private categories: any[] = [
    "Food",
    "Rent/Mortgage",
    "Entertainment",
    "Transportation",
    "Subscriptions",
    "Utilities",
    "Misc."
  ];
  private data = [];
  static currentPos=0;
  private months: any[] = ['February 2020', 'March 2020'];
  public givenMonth:string;

  constructor(private accordionlistComponent: AccordionlistComponent, private dataSharing: DataSharingService) {
    this.data = [];
    let febArray = this.getData(Globals.categoriesInit.February2020);
    let marArray = this.getData(Globals.categoriesInit.March2020);
    this.data.push(febArray, marArray);

    this.dataSharing.getCategory().subscribe(res => {
      this.data = [];
      let febArray = this.getData(Globals.categoriesInit.February2020);
      let marArray = this.getData(Globals.categoriesInit.March2020);
      this.data.push(febArray, marArray);
      this.pieChartData = [];
      PiechartComponent.currentPos = this.months.length-1;
      this.pieChartLabels = this.categories;
      this.givenMonth = this.months[PiechartComponent.currentPos];
      let sum =0;
      for (let i = 0 ; i < this.data[PiechartComponent.currentPos].length;i++){
        sum=0;

        for(let j=0; j< this.data[PiechartComponent.currentPos][i].length;j++){
          sum = sum + this.data[PiechartComponent.currentPos][i][j].value;
        }
        this.pieChartData.push(sum);
      }
    })

    PiechartComponent.currentPos = this.months.length-1;
    this.pieChartLabels = this.categories;
    this.givenMonth = this.months[PiechartComponent.currentPos];
    let sum =0;
    for (let i = 0 ; i < this.data[PiechartComponent.currentPos].length;i++){
      sum=0;

      for(let j=0; j< this.data[PiechartComponent.currentPos][i].length;j++){
        sum = sum + this.data[PiechartComponent.currentPos][i][j].value;
      }
      this.pieChartData.push(sum);
    }
    console.log("before")
    this.accordionlistComponent.refreshData(PiechartComponent.currentPos);
    console.log("after")
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {}

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

  nextMonth() {

    if (PiechartComponent.currentPos + 1 >= this.months.length){
      //alert
      alert("No data has been recorded for this month")
    }else{
      PiechartComponent.currentPos = PiechartComponent.currentPos + 1;
      this.pieChartData = [];
      this.givenMonth = this.months[PiechartComponent.currentPos];
      let sum =0;
      for (let i = 0 ; i < this.data[PiechartComponent.currentPos].length;i++){
        sum=0;
        for(let j=0; j< this.data[PiechartComponent.currentPos][i].length;j++){
          sum = sum + this.data[PiechartComponent.currentPos][i][j].value;
        }
        this.pieChartData.push(sum);
      }
      this.accordionlistComponent.refreshData(PiechartComponent.currentPos)
    }
  }

  previousMonth() {

    if (PiechartComponent.currentPos -1  <0){
      //alert
      alert("No data has been recorded for this month")
    }else{
      PiechartComponent.currentPos = PiechartComponent.currentPos - 1;
      this.pieChartData = [];
      this.givenMonth = this.months[PiechartComponent.currentPos];
      let sum =0;
      for (let i = 0 ; i < this.data[PiechartComponent.currentPos].length;i++){
        sum=0;

        for(let j=0; j< this.data[PiechartComponent.currentPos][i].length;j++){
          sum = sum + this.data[PiechartComponent.currentPos][i][j].value;
        }
        this.pieChartData.push(sum);
      }
      this.accordionlistComponent.refreshData(PiechartComponent.currentPos)
    }
  }

}
