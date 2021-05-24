import { BaseComponent } from '../../base-component';

export class BestScore extends BaseComponent {
  constructor() {
    super('a', ['best_score']);
    this.element.innerHTML = 'Best Score';
    this.element.setAttribute('data-href', 'score');
    this.element.setAttribute('href', '#/score');
  }
}
