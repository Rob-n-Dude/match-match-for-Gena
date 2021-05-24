import { BaseComponent } from '../base-component';
import './timer.scss';

export class Timer extends BaseComponent {
  private secondsLeft = 0;

  private isTimer = false;

  time = '00:00';

  constructor() {
    super('div', ['timer']);

    this.showTime();
  }

  start() : void {
    this.isTimer = true;
    const a = setInterval(() => {
      if (this.isTimer) {
        console.log(a, 'внутри таймера');
        this.startTimer();
      } else {
        console.log(a, 'снаружи таймера');
        clearInterval(a);
      }
    }, 1000);
  }

  stop() : void {
    this.isTimer = false;
    this.clearTime();
  }

  private startTimer() {
    this.secondsLeft++;
    this.showTime();
  }

  getSeconds() : number {
    return this.secondsLeft;
  }

  clearTime() : void {
    this.secondsLeft = 0;
    this.showTime();
  }

  private static parseSeconds(sec:number) {
    if (sec >= 60) {
      if (sec / 60 < 10) {
        if (sec % 60 < 10) {
          return `0${Math.floor(sec / 60)}:0${sec % 60}`;
        }
        return `0${Math.floor(sec / 60)}:${sec % 60}`;
      }

      return `${Math.floor(sec / 60)}:${sec % 60}`;
    }

    if (sec % 60 < 10) return `00:0${sec % 60}`;
    return `00:${sec % 60}`;
  }

  private showTime() {
    this.time = Timer.parseSeconds(this.secondsLeft);
    this.element.textContent = this.time;
  }
}
