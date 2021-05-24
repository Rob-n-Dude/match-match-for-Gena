import { BaseComponent } from '../base-component';
import './aboutPage.scss';

export class AboutRegister extends BaseComponent {
  constructor() {
    super('div', ['about-page__register']);
    this.element.innerHTML = `
          <div class="about-page__register-step step">
            <div class="about-page__register-step-counter counter">1</div>
            <div class="about-page__register-step-text text">Register new player in game</div>
          </div>
          <a href='#/register' class="about-page__register-example"></a>
    `;
  }
}
