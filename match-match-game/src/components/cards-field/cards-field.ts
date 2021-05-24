import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  private isActiv = false;

  constructor() {
    super('div', ['cards-field']);
  }

  clear() :void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) : void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    this.hideAllCards();
  }

  getCards() : Card[] {
    return this.cards;
  }

  hideAllCards() : void {
    this.cards.forEach((card) => card.flipToBack());
  }

  showAllCards() : void {
    this.cards.forEach((card) => card.flipToFront());
  }

  getIsActiv() : boolean {
    return this.isActiv;
  }

  setIsActive(val: boolean) : void {
    this.isActiv = val;
  }
}
