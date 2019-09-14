import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, merge, of, range, BehaviorSubject, Subject } from 'rxjs';
import { mapTo, scan, switchMap, takeUntil, concatMap, delay, mergeMap, tap, skipWhile } from 'rxjs/operators';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { InputToCountdownDirective } from 'src/app/directives/input-to-countdown.directive';
import { SynthesisService } from 'src/app/services/synthesis.service';

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

  @ViewChild('drillSelect', { static: true })
  drillSelect: ElementRef;

  currentDrill$ = new BehaviorSubject('');
  techniques = [];
  tempWrestling = ['down-block', 'sprawl', 'shot', 'slide-by', 'down-block... sprawl'];
  tempGuard = ['x-pass', 'x-pass... late', 'knee-cut', 'knee-cut... late', 'over-under', 'torreando', 'leg-lace', 'mount'];
  tempPassing = ['D-L-R', 'Reverse D-L-R', 'S-L-X', 'X-Guard',
    'Deep-Half', 'Spider', 'Lasso-Left', 'Lasso-Right', 'Closed Guard', 'Butterfly'];
  kneeShieldMiniGame = ['front', 'inside', 'lace', 'hip switch'];
  kneeShieldMiniGameTwo = ['front', 'inside', 'lace', 'hip switch', 'front... late', 'inside... late', 'lace... late', 'hip switch... late'];
  doubleTeamMiniGame = ['left-pin... stack', 'left-pin drag', 'left-pin... circle',
    'right-pin... stack', 'right-pin drag', 'right-pin... circle'];
  tenacity = ['Single Legs', 'Peak Outs', 'Mace Swings', 'Stack Passes', 'Hip Escape and Invert', 'Question Mark and Wiggle'];
  options = ['Wrestling', 'Guard', 'Passing', 'Knee Shield Mini-Game', 'Knee Shield Mini-Game 2', 'Double Team Mini-Game', 'Tenacity'];
  intervalObs$;
  max = 0;
  min = 0;

  constructor(public d: InputToCountdownDirective, private s: SynthesisService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // 3.1
    this.s.updateMessage('hello');
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

          const value = (this.min * 1000) + (Math.floor((Math.random() * (this.max + 1 - this.min))) * 1000)
          console.log(value);
          return value;
        };
        if (isCounting === null) return of(null);
        return isCounting ? interval(1000).pipe(
          concatMap(val => {
            return of(val).pipe(delay(random()), tap(val => {
              const arrayLength = this.techniques.length;
              const randValue = Math.floor((Math.random() * arrayLength))
              const message = this.techniques[randValue];
              this.s.updateMessage(message);
              this.s.speak();
            }));
          })
        ) : of();
      }),
    ).subscribe(console.log) // TODO: Don't do this either, async pipe later or something cute


    this.currentDrill$.subscribe(val => {
      switch (val) {
        case 'Wrestling':
          this.techniques = this.tempWrestling;
          break;
        case 'Guard':
          this.techniques = this.tempGuard;
          break;
        case 'Passing':
          this.techniques = this.tempPassing;
          break;
        case 'Knee Shield Mini-Game':
          this.techniques = this.kneeShieldMiniGame
          break;
        case 'Knee Shield Mini-Game 2':
          this.techniques = this.kneeShieldMiniGameTwo
          break;
        case 'Double Team Mini-Game':
          this.techniques = this.doubleTeamMiniGame;
        case 'Tenacity':
          this.techniques = this.tenacity;
        default:
          break;
      } // TODO: OOOOOOOOOOOOOOOOOF
      console.log(val);
    })
  }

  drillChanged(value) {
    this.currentDrill$.next(value);
  }
}
