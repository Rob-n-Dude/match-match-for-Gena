import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { Scoreboard } from '../scoreboard/scoreboard';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private unsuccessTryes = 0;

  private successTryes = 0;

  private activeCard?: Card;

  readonly scoreboard: Scoreboard;

  private isAnimation = false;

  private isGame = false;

  isStarteble = true;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.scoreboard = new Scoreboard();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]) : void {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
        this.WinCondition(cards);
      });
    });

    this.cardsField.addCards(cards);
  }

  startGame(delayTime : number) : void {
    // if (!this.isStarteble) return;
    // this.isStarteble = false;
    this.isGame = true;
    this.cardsField.showAllCards();
    const gameTimeOut = setTimeout(() => {
      if (this.isGame) {
        this.cardsField.hideAllCards();
        this.scoreboard.timer.start();
        this.cardsField.setIsActive(true);
        // this.isStarteble = true;
      } else {
        clearTimeout(gameTimeOut);
      }
    }, delayTime);
  }

  async startAsGame(delayTime : number) : Promise<void> {
    this.cardsField.showAllCards();
    this.isGame = true;
    return new Promise((resolve, reject) => {
      const gameTimeOut = setTimeout(() => {
        if (this.isGame) {
          this.cardsField.hideAllCards();
          this.scoreboard.timer.start();
          this.cardsField.setIsActive(true);
          resolve();
          // this.isStarteble = true;
        } else {
          clearTimeout(gameTimeOut);
          reject();
        }
      }, delayTime);
    });
  }

  stopGame() : void {
    this.isGame = false;
    this.reset();
    this.cardsField.setIsActive(false);
  }

  private WinCondition(cards:Card[]) : void {
    if (cards.every((card) => !card.isFlipped)) this.scoreboard.timer.stop();
  }

  private async cardHandler(card: Card) : Promise<void> {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    if (!this.cardsField.getIsActiv()) return;
    this.isAnimation = true;
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      // Срабатывает когда карты не совпали
      this.activeCard.paint('-1');
      card.paint('-1');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.unsuccessTryes += 2;
    } else {
      // Срабатывает, когда карты совпали
      this.activeCard.paint('1');
      card.paint('1');
      this.successTryes += 2;
    }

    this.activeCard = undefined;
    this.isAnimation = false;
    this.showScore();
  }

  private scoreCalc(successTryes:number, unsuccessTryes:number):string {
    // (Всего нажатий - неудачных нажатий) * 100 - время в секундах * 10 (больше либо равно нулю)
    const allTryes = successTryes + unsuccessTryes;
    const result = (allTryes - unsuccessTryes) * 100 - (this.scoreboard.timer.getSeconds() * 10);
    if (result <= 0) return '0';
    return String(result);
  }

  reset() : void {
    this.scoreboard.score.showScore('0');
    this.successTryes = 0;
    this.unsuccessTryes = 0;
    this.scoreboard.timer.clearTime();
    // this.scoreboard.timer.start();
    this.cardsField.hideAllCards();
  }

  showScore() : void {
    this.scoreboard.score.showScore(this.scoreCalc(this.successTryes, this.unsuccessTryes));
  }
}
