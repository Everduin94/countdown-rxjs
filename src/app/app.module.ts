import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { InputToCountdownDirective } from './directives/input-to-countdown.directive';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StartComponent } from './components/start/start.component';
import { RunningComponent } from './components/running/running.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeInputComponent,
    CountdownComponent,
    InputToCountdownDirective,
    TimeFormatPipe,
    StartComponent,
    RunningComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
