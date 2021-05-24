import { BaseComponent } from '../../base-component';
import { About } from './about';
import { BestScore } from './score';
import { Settings } from './settings';

export class Navigation extends BaseComponent {
  about: BaseComponent;

  settings: BaseComponent;

  bestScore: BaseComponent;

  constructor() {
    super('nav', ['navigation']);
    this.about = new About();
    this.settings = new Settings();
    this.bestScore = new BestScore();
    this.element.append(this.about.element, this.bestScore.element, this.settings.element);
  }
}
