  import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { DataSharingService } from '../../../services/data-sharing.service';

import { Globals } from  '../../../globals/globals';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})

export class BudgetComponent implements OnInit {
  @ViewChild(BaseChartDirective, {'static': true}) chart: BaseChartDirective;

  readonly date = new Date();
  readonly background = [
    { // grey
      backgroundColor: "#8EE4AF",
      borderColor: "#5CDB95",
      pointBackgroundColor: "#5CDB95",
      pointBorderColor: "#5CDB95",
      pointHoverBackgroundColor: "#5CDB95",
      pointHoverBorderColor: "#5CDB95",
    }
  ];
  private col = {};

  private budget: number;
  private expenses: number;
  private savings: number;

  private chartOptions: (ChartOptions & { annotation: any });
  private chartData: ChartDataSets[];
  private chartLabels: Label[];
  private chartType = 'line';
  private lineChartPlugins = [pluginAnnotations];

  constructor(private dataSharing: DataSharingService) { }

  ngOnInit() {
    this.chartData = [
      this.parseData(Globals.budgetInit.March2020),
      this.parsePrediction(Globals.budgetInit.March2020)
    ]

    this.chartLabels = this.parseLabels(this.getNumberOfDays(2, this.date.getFullYear()));
    this.chartOptions = this.getChartOptions();
    this.savings = this.getSavings();

    if(this.savings < 0) {
      this.col = {
        'color': 'red'
      }
    } else {
      this.col = {
        'color': '#5CDB95'
      }
    }

    this.dataSharing.getExpense().subscribe(res => {
      this.chartData = [
        this.parseData(Globals.budgetInit.March2020),
        this.parsePrediction(Globals.budgetInit.March2020)
      ]

      this.chartOptions = this.getChartOptions();
      this.savings = this.getSavings();

      if(this.savings < 0) {
        this.col = {
          'color': 'red'
        }
      } else {
        this.col = {
          'color': '#5CDB95'
        }
      }

      this.chart.update();
    })
  }

  public parseData(budget: any) {
    let data: number[] = [];
    let chartData: any = {};

    data = budget.amount;

    data = this.getExpenseByMonth(data);

    this.budget = budget.budget;
    this.expenses = data[data.length - 1];
    this.savings = this.getSavings();

    chartData = {
      lineTension: 0,
      data: data,
      label: "$$$"
    };

    return chartData;
  }

  private getExpenseByMonth(data) {
    var dataToInsert = 0;
    let exp = data.map((d, i) => {
      dataToInsert += d;
      return dataToInsert;
    })

    return exp;
  }

  public parsePrediction(budget: any) {
    let data: number[] = [];
    let chartData: any = {};

    let expensesList = budget.amount;
    let days = this.getNumberOfDays(2, this.date.getFullYear());

    //If not everyday is filled create prediction +5%
    if(expensesList.length != days) {
      let sum = 0;
      for(let i = 0; i < days; i++) {
        if(i < expensesList.length - 1) {
          sum += (expensesList[i] == null || expensesList[i] == undefined) ? 0 : expensesList[i];
          data.push(null);
        } else if(i == expensesList.length - 1) {
          sum += (expensesList[i] == null || expensesList[i] == undefined) ? 0 : expensesList[i];
          data.push(sum);
        } else {
          sum *= 1.15;
          data.push(Number(sum.toFixed(2)));
        }
      }
    }

    chartData = {
      lineTension: 0,
      fill: false,
      borderDash: [10],
      data: data,
      label: 'Projection'
    };

    return chartData;
  }

  private parseLabels(days: number) {
    let labels: Label[] = [];
    for(let i = 1; i <= days; i++) {
      labels.push(String(i));
    }
    return labels;
  }

  private getChartOptions() {
    let currentAnnotation = this.chartData[0].data[this.chartData[0].data.length - 1];
    let predictionAnnotation = this.chartData[1].data[this.chartData[1].data.length - 1];

    return {
      responsive: true,
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: String(currentAnnotation),
            borderColor: 'black',
            borderWidth: 2,
            label: {
              enabled: true,
              fontColor: 'white',
              content: currentAnnotation
            }
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: String(predictionAnnotation),
            borderColor: 'black',
            borderWidth: 2,
            label: {
              enabled: true,
              fontColor: 'white',
              content: predictionAnnotation
            }
          }
        ],
      }
    }
  }

  private getSavings() {
    let feb = this.getExpenseByMonth(Globals.budgetInit.February2020.amount);
    let mar = this.getExpenseByMonth(Globals.budgetInit.March2020.amount);

    return Number((feb[feb.length - 1] - mar[mar.length - 1]).toFixed(2));
  }

  private getNumberOfDays(month: number, year: number) {
    return new Date(year, month + 1 , 0).getDate();
  }

}
