import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ChartsModule } from 'ng2-charts';
import { File } from '@ionic-native/file/ngx';

// Components
import { AlertsComponent } from './components/alerts/alerts.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ManualAddPopoverComponent } from './components/manual-add-popover/manual-add-popover.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [
    Tab1Page,
    AlertsComponent,
    BudgetComponent,
    ManualAddPopoverComponent
  ],
  entryComponents:[
    ManualAddPopoverComponent
  ],
  providers: [
    File
  ]
})
export class Tab1PageModule {}
