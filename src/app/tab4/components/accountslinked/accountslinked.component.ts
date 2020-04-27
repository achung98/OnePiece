import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-accountslinked",
  templateUrl: "./accountslinked.component.html",
  styleUrls: ["./accountslinked.component.scss"]
})
export class AccountslinkedComponent implements OnInit {
  private sections: any[] = [
    { name: "Canadian Accounts", open: false },
    { name: "US Accounts", open: false },
    { name: "Foreign Accounts", open: false }
  ];

  private sectionData: any[][] = [
    [
      { name: " Scotia Bank Savings Account", value: "XXXX XXXX 1234 5678" },
      {
        name: " Bank of Montreal Checking Account",
        value: "XXXX XXXX 1234 9999"
      },
      { name: " TD Bank Line Of Credit", value: "XXXX XXXX 1234 0000" }
    ],
    [
      {
        name: "	JPMorgan Chase & Co. Taxable Investments",
        value: "XXXX XXXX 9999 9999"
      },
      {
        name: "	Goldman Sachs Group Inc. Checking Account",
        value: "XXXX XXXX 9999 8888"
      }
    ],
    [
      {
        name: "	Bank of China Loan",
        value: "XXXX XXXX 0000 1111"
      }
    ]
  ];

  constructor() {}

  ngOnInit() {}

  toogleSection(index) {
    this.sections[index].open = !this.sections[index].open;
  }
}
