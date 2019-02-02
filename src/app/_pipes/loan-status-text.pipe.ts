import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loanStatusText'
})
export class LoanStatusTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == "1") {
      return "Applied";
    }
    if (value === "0") {
      return "Applied";
    }
    if (value == "2") {
      return "Funded";
    }
    if (value == "3") {
      return "Repayment";
    }
    if (value == "4") {
      return "Overdue";
    }
    if (value == "5") {
      return "Paid";
    }
  }

}
