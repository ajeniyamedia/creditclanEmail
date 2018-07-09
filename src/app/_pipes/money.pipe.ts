import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(number: any): string {
    let formatted = "";
    if (number != undefined) {
      let abs = Math.abs(number)
      if (abs >= Math.pow(10, 12)) {
        formatted = (number / Math.pow(10, 12)).toFixed(1) + "t"
      }
      else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9)) {
        formatted = (number / Math.pow(10, 9)).toFixed(1) + "b"
      }
      else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6)) {
        formatted = (number / Math.pow(10, 6)).toFixed(1) + "m"

      }
      else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3)) {
        formatted = (number / Math.pow(10, 3)).toFixed(1) + "k"
      } else {
        formatted = "0";
      }

      return formatted;
    } else {
      return "0";
    }


  }

}
