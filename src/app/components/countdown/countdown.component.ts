import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, merge, of, range, BehaviorSubject, Subject } from 'rxjs';
import { mapTo, scan, switchMap, takeUntil, concatMap, delay, mergeMap, tap, skipWhile } from 'rxjs/operators';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { InputToCountdownDirective } from 'src/app/directives/input-to-countdown.directive';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, AfterViewInit {

  faPlay = faPlay;
  faPause = faPause;
  faSquare = faSquare;

  @ViewChild('start', { static: true })
  startBtn: ElementRef;

  @ViewChild('pause', { static: true })
  pauseBtn: ElementRef;

  @ViewChild('reset', { static: true })
  resetBtn: ElementRef;

  intervalObs$;
  max = 0;
  min = 0;

  constructor(public d: InputToCountdownDirective) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // 3.1
    const start$ = fromEvent(this.startBtn.nativeElement, 'click').pipe(mapTo(true));
    const pause$ = fromEvent(this.pauseBtn.nativeElement, 'click').pipe(mapTo(false));
    const reset$ = fromEvent(this.resetBtn.nativeElement, 'click').pipe(mapTo(null));
    const zero$ = new Subject();
    const stateChange$ = this.d.obs$.pipe(mapTo(null));
    this.intervalObs$ = merge(start$, pause$, reset$, stateChange$, zero$).pipe(
      switchMap(isCounting => {
        if (isCounting === null) return of(null);
        return isCounting ? interval(1000) : of();
      }),
      scan((accumulatedValue, currentValue) => {
        if (accumulatedValue === 0 && currentValue !== null) {
          zero$.next(null);
          return accumulatedValue;
        }
        if (currentValue === null || !accumulatedValue) return this.d.getTotalSeconds();
        return --accumulatedValue;
      })
    );
    // End 3.1

    this.d.intervalObs$.subscribe(val => {
      console.log(val)
      this.max = val.max;
      this.min = val.min;
    }); // TODO: Don't do this, Brain is alseep.
    

    merge(start$, pause$, reset$, zero$).pipe(
      switchMap(isCounting => {
        const random = () => { 
          console.log(this.min);
          console.log(this.max);

          const value = (this.min * 1000) + (Math.floor((Math.random() * (this.max + 1 - this.min) )) * 1000) 
          console.log(value);
          return value;
        };
        if (isCounting === null) return of(null);
        return isCounting ? interval(1000).pipe(
          concatMap(val => {
            return of(val).pipe(delay(random()));
          })
        ) : of();
      }),
    ).subscribe(console.log)



  }
}
