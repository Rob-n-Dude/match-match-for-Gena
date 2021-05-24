import { BaseComponent } from '../base-component';
import './aboutPage.scss';

export class AboutRules extends BaseComponent {
  constructor() {
    super('div', ['about-page__rules']);
    this.element.innerHTML = `
          <div class="about-page__rules-step step">
            <div class="about-page__rules-step-counter counter">3</div>
            <div class="about-page__rules-step-text text">Start you new game! Remember card positions
            and match it before times up.</div>
          </div>
          <a href='#/game' class="about-page__rules-example"></a>
    `;
  }
}
