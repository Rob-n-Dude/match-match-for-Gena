import { BaseComponent } from '../../base-component';

export class StartButton extends BaseComponent {
  constructor() {
    super('div', ['user-info__game-button']);
    this.hide();
  }

  show() :void {
    if (this.element.classList.contains('hide')) this.element.classList.remove('hide');
    this.element.classList.add('show');
  }

  hide() :void {
    if (this.element.classList.contains('show')) this.element.classList.remove('show');
    this.element.classList.add('hide');
  }

  toggleDisableStyle() : void {
    this.element.classList.toggle('disabled');
  }

  setButtonText(selector:string) : void {
    if (selector === 'Start') this.element.innerHTML = 'Start';
    else {
      this.element.innerHTML = 'Stop';
    }
  }
}
