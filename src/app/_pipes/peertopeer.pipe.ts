import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peertopeer'
})
export class PeertopeerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == "1") {
      return "fa-group";
    }
    if (value == 0) {
      return "fa-user";
    }
  }

}
