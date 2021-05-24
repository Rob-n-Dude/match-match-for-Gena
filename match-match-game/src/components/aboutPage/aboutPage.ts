import { BaseComponent } from '../base-component';
import { AboutConfigure } from './configure';
import { AboutRegister } from './register';
import { AboutRules } from './rules';

export class AboutPage extends BaseComponent {
  register: AboutRegister;

  configure: AboutConfigure;

  rules: AboutRules;

  constructor() {
    super('div', ['about-page']);
    this.element.innerHTML = `
    <h2 class="about-page_tittle">How to play?</h2>
    `;
    this.register = new AboutRegister();
    this.configure = new AboutConfigure();
    this.rules = new AboutRules();
    this.element.append(this.register.element, this.configure.element, this.rules.element);
  }
}
