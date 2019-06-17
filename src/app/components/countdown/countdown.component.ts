import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, merge, of } from 'rxjs';
import { mapTo, scan, switchMap, takeUntil } from 'rxjs/operators';
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

  constructor(public d: InputToCountdownDirective) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // 3.1
    const start$ = fromEvent(this.startBtn.nativeElement, 'click').pipe(mapTo(true));
    const pause$ = fromEvent(this.pauseBtn.nativeElement, 'click').pipe(mapTo(false));
    const reset$ = fromEvent(this.resetBtn.nativeElement, 'click').pipe(mapTo(null));
    const stateChange$ = this.d.obs$.pipe(mapTo(null));
    this.intervalObs$ = merge(start$, pause$, reset$, stateChange$).pipe(
      switchMap(isCounting => {
        if (isCounting === null) return of(null);
        return isCounting ? interval(1000) : of();
      }),
      scan((accumulatedValue, currentValue) => {
        if (accumulatedValue === 0 && currentValue !== null) return accumulatedValue;
        if (currentValue === null || !accumulatedValue) return this.d.getTotalSeconds();
        return --accumulatedValue;
      })
    );
    // End 3.1
  }
}
