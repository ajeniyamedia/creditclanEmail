import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {


  transform(value: any, args?: any): any {
    if (value < 50) {
      return "below w" + value;
    }
    if (value >= 50) {
      return "above w" + Math.floor(value);
    }
  }

}
