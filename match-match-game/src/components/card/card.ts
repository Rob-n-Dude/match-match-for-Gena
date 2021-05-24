import { BaseComponent } from '../base-component';
import './card.scss';

const FLIP_CLASS = 'flipped';
const possibleColors = {
  green: '#00ff7238',
  red: '#ff000038',
  default: '#ff000000',
};

export class Card extends BaseComponent {
  isFlipped = false;

  colorCanvas;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.colorCanvas = new BaseComponent('div', ['card__color']);
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url(./${image})"></div>
        <div class="card__back"></div>
      </div>
    `;
    this.addColorCanvas();
  }

  flipToBack():Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip(false);
  }

  paint(statment:string) :void {
    switch (statment) {
      case '-1': {
        this.colorCanvas.element.style.backgroundColor = `${possibleColors.red}`;
        break;
      }
      case '0': {
        this.colorCanvas.element.style.backgroundColor = `${possibleColors.default}`;
        break;
      }
      case '1': {
        this.colorCanvas.element.style.backgroundColor = `${possibleColors.green}`;
        break;
      }
      default: {
        break;
      }
    }
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
      this.paint('0');
    });
  }

  private addColorCanvas() {
    this.element.children[0].appendChild(this.colorCanvas.element);
  }
}
