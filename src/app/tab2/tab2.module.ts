import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Components
import { ProgressComponent } from './components/progress/progress.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RoundProgressModule,
    NgxDatatableModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
  ],
  declarations: [
    Tab2Page,
    ProgressComponent,
    CategoriesComponent,
    TransactionsComponent
  ]
})
export class Tab2PageModule {}
