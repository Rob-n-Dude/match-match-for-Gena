import { BaseComponent } from '../base-component';
import { SettingsCards } from './settingsCards';
import { SettingsDifficulty } from './settingsDifficulty';
import './settingsPage.scss';

export class SettingsPage extends BaseComponent {
  cards : SettingsCards;

  difficulty : SettingsDifficulty;

  constructor() {
    super('div', ['settingsPage']);
    this.cards = new SettingsCards();
    this.difficulty = new SettingsDifficulty();
    this.element.append(this.cards.element, this.difficulty.element);
  }

  getSettings() : string[] {
    switch (this.difficulty.getDifficulty()) {
      case 'medium': {
        document.documentElement.style.setProperty('--card-width', '5rem');
        document.documentElement.style.setProperty('--card-height', '6rem');
        document.documentElement.style.setProperty('--card-flex', '1 1 calc(100% / 6)');
        return [this.cards.getCardType(), '18'];
      }
      case 'hard': {
        document.documentElement.style.setProperty('--card-width', '4rem');
        document.documentElement.style.setProperty('--card-height', '5rem');
        document.documentElement.style.setProperty('--card-flex', '1 1 calc(100% / 8)');
        return [this.cards.getCardType(), '32'];
      }
      default: {
        document.documentElement.style.setProperty('--card-width', '6rem');
        document.documentElement.style.setProperty('--card-height', '8rem');
        document.documentElement.style.setProperty('--card-flex', '1 1 calc(100% / 4)');
        return [this.cards.getCardType(), '8'];
      }
    }
  }
}
