import { BaseComponent } from '../../base-component';

export class Settings extends BaseComponent {
  constructor() {
    super('a', ['settings']);
    this.element.innerHTML = `
    <div class="settings-image"></div>
    <div class="settings-description">Game Settings</div>
    `;
    this.element.setAttribute('data-href', 'settings');
    this.element.setAttribute('href', '#/settings');
  }
}
