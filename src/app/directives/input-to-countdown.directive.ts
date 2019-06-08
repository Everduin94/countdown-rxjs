import { Directive } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Directive({
  selector: '[appInputToCountdown]'
})
export class InputToCountdownDirective {

  // 1.1 

  // End 1.1 

  // 1.2

  // End 1.2
  
  // 1.3

  // End 1.3
  // Note, I've replaced this.state.value... below with this['state']
  // The functionality is the same, this['state'] avoids compile time errors.

  constructor() {}
  
  getSeconds() {
     return this['state'].value.seconds;
  }

  getMinutes() {
    return this['state'].value.minutes;
  }

  getHours() {
    return this['state'].value.hours;
  }

  getTotalSeconds() {
    return this['state'].value.totalTime;
  }

}
