import { Component, OnInit } from '@angular/core';
import { ClockService } from 'src/app/services/clock.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.css']
})
export class RunningComponent implements OnInit {

  faPlay = faPlay;
  faPause = faPause;
  faSquare = faSquare;

  constructor(public cs: ClockService) { }

  ngOnInit() {
  }

  resumeTimer() {
    this.cs.startEvent.next('start');
  }

  pauseTimer() {
    this.cs.pauseEvent.next('pause');
  }

  stopTimer() {
    this.cs.stopEvent.next('stop');
  }

}
