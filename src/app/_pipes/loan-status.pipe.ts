import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loanStatus'
})
export class LoanStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == "1") {
      return "applied";
    }
    if (value == "2") {
      return "funded";
    }
    if (value == "3") {
      return "repayment";
    }
    if (value == "4") {
      return "overdue";
    }
    if (value == "5") {
      return "paid";
    }
  }

}

