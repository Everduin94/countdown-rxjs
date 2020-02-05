import { Injectable } from '@angular/core';
import { Subject, merge, interval, BehaviorSubject, of, Observable } from 'rxjs';
import { withLatestFrom, tap, startWith, map, switchMap, scan, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {


  intialClockState = {
    isRunning: false,
    time: 120,
    min: 13,
    max: 18
  }

  startEvent = new Subject();
  resumeEvent = new Subject();
  pauseEvent = new Subject();
  stopEvent = new Subject();
  stopEvent$ = this.stopEvent.asObservable().pipe(
    switchMap(() => this.clockChangeEvent$)
  );
  clockChangeEvent = new BehaviorSubject(this.intialClockState);
  clockChangeEvent$: Observable<any> = this.clockChangeEvent.asObservable();

  state$ = merge(this.startEvent, this.resumeEvent, this.pauseEvent, this.stopEvent, this.clockChangeEvent$).pipe(
    switchMap(event => {
      if (event === 'start' || event === 'resume') return interval(1000).pipe(map(v => v+1));
      if (event === 'pause') return of();
      else return of({...event}); // ClockState
    }),
    scan((complete, partial) => {
      if (partial.time) {
        complete.isRunning = false;
        return partial;
      }

      if (complete.time === 0) {
        complete.isRunning = false;
        this.pauseEvent.next('pause');
      } else {
        complete.isRunning = true;
        --complete.time;
      }

      return complete;
    })
  )

  
  utterance$ = this.state$.pipe(
    scan((x,i) => {
      
      if (x.index === 0) {
        x.magicNumber = this.randomIntFromInterval(i.min, i.max);
      }

      if (x.index === x.magicNumber) {
        console.log('hey!! magic number was: ', x.magicNumber);
        return {index: 0, magicNumber: 0}
      }

      if (i.isRunning)  { 
        ++x.index;
        return x;
      } else { 
        return {index: 0, magicNumber: 0};
      }

    }, {index: 0, magicNumber: 0})
  ).subscribe(); // TODO: Fix

  constructor() { }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}


