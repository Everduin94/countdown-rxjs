import { Component, OnInit } from '@angular/core';
import { ClockService } from 'src/app/services/clock.service';
import { ContentfulService } from 'src/app/services/contentful.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  form: FormGroup;
  drills$ = this.content.getDrills();

  constructor(public cs: ClockService, public content: ContentfulService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      minInterval: this.cs.intialClockState.min,
      maxInterval: this.cs.intialClockState.max,
      minutes: 2,
      seconds: 0,
      drill: []
    });

    this.form.valueChanges.subscribe(console.log);
  }

  onSubmit() {

  }

  startTimer() {
    this.cs.startEvent.next('start');
  }


  updateTime(value) {
    console.log(value)
    this.cs.clockChangeEvent.next({isRunning: false, time: value})
  }

}
