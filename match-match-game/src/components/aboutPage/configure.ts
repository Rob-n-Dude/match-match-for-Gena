import './aboutPage.scss';
import { BaseComponent } from '../base-component';

export class AboutConfigure extends BaseComponent {
  constructor() {
    super('div', ['about-page__configure']);
    this.element.innerHTML = `
          <div class="about-page__configure-step step">
            <div class="about-page__configure-step-counter counter">2</div>
            <div class="about-page__configure-step-text text">Configure your game settings</div>
          </div>
          <a href='#/settings' class="about-page__configure-example"></a>

    `;
  }
}
