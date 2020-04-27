import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private expense = new Subject<any>();
  private category = new Subject<any>();
  private message = new Subject<any>();

  constructor() { }

  getExpense(): Observable<any> {
    return this.expense.asObservable();
  }

  getCategory(): Observable<any> {
    return this.category.asObservable();
  }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }

  updateMessage(message: any) {
    this.message.next(message);
  }

  updateExpense(expense: any) {
    this.expense.next(expense);
  }

  updateCategory(category: any) {
    this.category.next(category);
  }
}
