import {Component, OnInit} from '@angular/core';
import { InputToCountdownDirective } from 'src/app/directives/input-to-countdown.directive';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.css']
})
export class TimeInputComponent implements OnInit {

  constructor(public d: InputToCountdownDirective) {}

  ngOnInit() {}

}
