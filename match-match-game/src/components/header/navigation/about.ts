import { BaseComponent } from '../../base-component';

export class About extends BaseComponent {
  constructor() {
    super('a', ['about']);
    this.element.innerHTML = `
      <div class="about-image"></div>
      <div class="about-description">About Game</div>`;
    this.element.setAttribute('data-href', 'about');
    this.element.setAttribute('href', '#/about');
  }
}
