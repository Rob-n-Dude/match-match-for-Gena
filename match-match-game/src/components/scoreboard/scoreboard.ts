import { BaseComponent } from '../base-component';
import { Score } from '../score/score';
import { Timer } from '../timer/timer';
import './scoreboard.scss';

export class Scoreboard extends BaseComponent {
  timer:Timer;

  score: Score;

  constructor() {
    super('div', ['scoreboard']);
    this.timer = new Timer();
    this.score = new Score();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.score.element);
  }
}
