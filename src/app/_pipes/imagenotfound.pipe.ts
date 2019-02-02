import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenotfound'
})
export class ImagenotfoundPipe implements PipeTransform {

  transform(value: string): string {
    return value === null ? "avatar-mini.jpg" : value;
  }

}
