import { BaseComponent } from '../base-component';

export class SettingsDifficulty extends BaseComponent {
  difficulty : BaseComponent;

  constructor() {
    super('div', ['settingsPage__select']);
    this.element.innerHTML = `
    <p class="settingsPage__tittle">Choose difficulty</p>`;
    this.difficulty = new BaseComponent('select', ['settingsPage__difficulty', 'select']);
    this.difficulty.element.innerHTML = `
    <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>`;
    this.element.appendChild(this.difficulty.element);
  }

  getDifficulty() : string {
    return (<HTMLSelectElement> this.difficulty.element).value;
  }
}
