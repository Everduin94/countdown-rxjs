<div class="center" appInputToCountdown>
  <app-countdown></app-countdown>
  <app-time-input></app-time-input>
</div>


private state = new BehaviorSubject({
  seconds: 0,
  minutes: 0,
  hours: 0,
  totalTime: 0
});  
obs$ = this.state.asObservable();

updateState(value, command) {
  let valToNumber = parseInt(value);
  if (valToNumber > 59 || valToNumber < 0) valToNumber = 0;
  let update = {...this.state.value};
  if (command === 'seconds') update.seconds = valToNumber;
  if (command === 'minutes') update.minutes = valToNumber;
  if (command === 'hours') update.hours = valToNumber;
  update.totalTime = this.calculateSeconds(update);
  this.state.next(update);
}
  
calculateSeconds(state) {
  const time = state;
  let totalTime = time.seconds
  totalTime += time.minutes * 60;
  totalTime += (time.hours * 60) * 60;
  return totalTime;
}