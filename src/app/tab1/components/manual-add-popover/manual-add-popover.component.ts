import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { DataSharingService } from '../../../services/data-sharing.service';

import { Budget } from '../../../interfaces/budget';
import { Category } from '../../../interfaces/category';
import { Globals } from  '../../../globals/globals';

@Component({
  selector: 'app-manual-add-popover',
  templateUrl: './manual-add-popover.component.html',
  styleUrls: ['./manual-add-popover.component.scss'],
})
export class ManualAddPopoverComponent implements OnInit {
  private amount: number;
  private category: string;
  private extra: string;

  private newBudget: Budget;
  private newCategories: Category;

  constructor(private popoverController: PopoverController, private dataSharing: DataSharingService) { }

  ngOnInit() {}

  addExpense() {
    if((this.amount && this.amount > 0) && (this.category)) {
      Globals.budgetInit.March2020.amount[Globals.budgetInit.March2020.amount.length - 1] += this.amount;

      if(this.extra) {
        if(Globals.categoriesInit.March2020[`${this.category}`][`${this.extra}`]) {
          Globals.categoriesInit.March2020[`${this.category}`][`${this.extra}`] += this.amount;
        } else {
          Globals.categoriesInit.March2020[`${this.category}`][`${this.extra}`] = this.amount;
        }

      } else {
        if(Globals.categoriesInit.March2020[`${this.category}`]['Other']) {
          Globals.categoriesInit.March2020[`${this.category}`]['Other'] += this.amount;
        } else {
          Globals.categoriesInit.March2020[`${this.category}`]['Other'] = this.amount;
        }
      }

      this.dataSharing.updateExpense(this.amount);
      this.dataSharing.updateCategory({ category: this.category, extra: this.extra});
      this.dataSharing.updateMessage({ amount: this.amount, category: this.category, extra: this.extra})
    }
    this.popoverController.dismiss();
  }
}
