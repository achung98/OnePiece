import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ManualAddPopoverComponent } from './components/manual-add-popover/manual-add-popover.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private popoverController: PopoverController) {}

  async addExpense() {
    const popover = await this.popoverController.create({
      component: ManualAddPopoverComponent,
      translucent: true
    });

    popover.style.cssText = '--min-width: 350px; --max-width: 350px;';
    return await popover.present();
  }
}
