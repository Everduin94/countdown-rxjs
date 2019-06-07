import { Directive } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Directive({
  selector: '[appInputToCountdown]'
})
export class InputToCountdownDirective {

  // 1.1 - 
  private state = new BehaviorSubject({
    seconds: 0,
    minutes: 0,
    hours: 0,
    totalTime: 0
  });  
  public obs$ = this.state.asObservable();
  // End 1.1 

  // 1.2
  updateState(value, command) {
    let valToNumber = parseInt(value);
    if (valToNumber < 0) valToNumber = 0;
    let countdown = this.state.value;
    if (command === 'seconds') countdown.seconds = valToNumber;
    if (command === 'minutes') countdown.minutes = valToNumber;
    if (command === 'hours') countdown.hours = valToNumber;
    countdown.totalTime = this.calculateSeconds(countdown);
    this.state.next(countdown);
  }
  // End 1.2
  
  // 1.3
  calculateSeconds(countdown) {
    let totalTime = countdown.seconds
    totalTime += countdown.minutes * 60;
    totalTime += (countdown.hours * 60) * 60;
    return totalTime;
  }
  // End 1.3

  constructor() {}
  
  getSeconds() {
    return this.state.value.seconds;
  }

  getMinutes() {
    return this.state.value.minutes;
  }

  getHours() {
    return this.state.value.hours;
  }

  getTotalSeconds() {
    return this.state.value.totalTime;
  }

}
