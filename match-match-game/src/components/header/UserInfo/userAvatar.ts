import { BaseComponent } from '../../base-component';

export class UserAvatar extends BaseComponent {
  constructor() {
    super('div', ['user-info__avatar']);
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

  setImage(url:string) : void {
    this.element.style.backgroundImage = `url('./${url}')`;
  }
}
