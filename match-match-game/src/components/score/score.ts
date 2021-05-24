import { BaseComponent } from '../base-component';
import './score.scss';

export class Score extends BaseComponent {
  constructor() {
    super('div', ['score']);
    this.element.textContent = '0';
  }

  showScore(value:string) : void {
    this.element.textContent = value;
  }
}
