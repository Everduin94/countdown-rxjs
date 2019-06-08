import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  pure: true
})
export class TimeFormatPipe implements PipeTransform {

  /**
   * Value is in seconds.
   */
  transform(value: any, args?: any): any {
    // 4.1

    // END 4.1
  }

  private padding(time) {
    return time < 10 ? '0' : '';
  }
}
