import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agefilter'
})
export class AgefilterPipe implements PipeTransform {

  transform(value: string): string {
    if (value == "") {
      return "";
    } else {
      let age = this.calculateAge(value);
      if (age == 0)
        return this.monthDiff(value, new Date()) + ' months';
      return "" + age + " years old";
    }

  }
  calculateAge(birthday) { // birthday is a date
    let newday = new Date(birthday);
    let ageDifMs = Date.now() - newday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  monthDiff(d1, d2) {
    if (d1 < d2) {
      var months = d2.getMonth() - d1.getMonth();
      return months <= 0 ? 0 : months;
    }
    return 0;
  }
}
