import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offerstatus'
})
export class OfferstatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == "1") {
      return "applied";
    }

    if (value == "3") {
      return "offer_made";
    }
    if (value == "4") {
      return "accepted";
    }
    if (value == "5") {
      return "funded";
    }
  }

}
