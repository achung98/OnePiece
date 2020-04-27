import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab4Page } from "./tab4.page";

// Components
import { AccountslinkedComponent } from "./components/accountslinked/accountslinked.component";
import { BudgetplanComponent } from "./components/budgetplan/budgetplan.component";
import { BalanceComponent } from "./components/balance/balance.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }])
  ],
  declarations: [
    Tab4Page,
    AccountslinkedComponent,
    BudgetplanComponent,
    BalanceComponent
  ]
})
export class Tab4PageModule {}
