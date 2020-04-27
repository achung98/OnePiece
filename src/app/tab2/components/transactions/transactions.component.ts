import { Component, OnInit } from '@angular/core';

import { DataSharingService } from '../../../services/data-sharing.service';

import { Globals } from  '../../../globals/globals';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  private trans: any[] = [];
  private tableStyle: string = "bootstrap";

  constructor(private dataSharing: DataSharingService) { }

  ngOnInit() {
    this.dataSharing.getMessage().subscribe(res => {
      let extra = res.extra ? res.extra : "Other";
      this.trans.push({
        category: res.category,
        subcategory: extra,
        amount:res.amount
      });
      this.trans = [...this.trans];
    });
  }

  ngAfterContentChecked() { this.trans = [...this.trans]; }

  getRowClass(row) {

  }

  async open(row) {

  }
}
