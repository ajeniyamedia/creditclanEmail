import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitto'
})
export class LimittoPipe implements PipeTransform {

  transform(value: string, limit: string): string {
    return value.substring(0, parseInt(limit)) + "...";
  }

}
