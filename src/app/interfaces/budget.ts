export interface Budget {
  [month: string]: {
    amount: number[];
    budget: number[];
  }
}
