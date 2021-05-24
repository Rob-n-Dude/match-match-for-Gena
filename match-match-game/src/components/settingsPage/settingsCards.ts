import { BaseComponent } from '../base-component';

export class SettingsCards extends BaseComponent {
  select : BaseComponent;

  constructor() {
    super('div', ['settingsPage__select']);
    this.element.innerHTML = `
    <p class="settingsPage__tittle">Choose card type</p>`;
    this.select = new BaseComponent('select', ['settingsPage__cards', 'select']);
    this.select.element.innerHTML = `
    <option value="animals">Animals</option>
    <option value="flags">Flags</option>
    `;
    this.element.appendChild(this.select.element);
  }

  getCardType() : string {
    return (<HTMLSelectElement> this.select.element).value;
  }
}
