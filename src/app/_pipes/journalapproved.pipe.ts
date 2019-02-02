import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journalapproved'
})
export class JournalapprovedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == "1") {
      return "Approved";
    }
    if (value == "-1") {
      return "Rejected";
    }
    if (value != "1" && value != "-1") {
      return "Pending";
    }
  }

}
