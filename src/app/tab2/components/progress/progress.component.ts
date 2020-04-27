import { Component, OnInit } from '@angular/core';

import { DataSharingService } from '../../../services/data-sharing.service';

import { Globals } from  '../../../globals/globals';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  private current: Number;
  private max: Number = Globals.budgetInit.March2020.budget;
  private radius = 170;

  constructor(private dataSharing: DataSharingService) { }

  ngOnInit() {
    this.current = Globals.budgetInit.March2020.amount.reduce((acc, val) => acc + val);
    this.dataSharing.getExpense().subscribe(res => {
      this.current = Globals.budgetInit.March2020.amount.reduce((acc, val) => acc + val);
    })
  }

}
