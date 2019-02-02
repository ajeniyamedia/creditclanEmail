import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageFunded'
})
export class PercentageFundedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value < 50) {
      return "red";
    }
    if (value >= 50) {
      return "green";
    }
  }

}
