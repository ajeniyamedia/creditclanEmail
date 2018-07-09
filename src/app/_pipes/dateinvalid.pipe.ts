import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateinvalid'
})
export class DateinvalidPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == "Invalid date") {
      return "";
    } else {
      return "Requested: " + value;
    }
  }

}
