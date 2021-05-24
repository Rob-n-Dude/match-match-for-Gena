import { BaseComponent } from '../../base-component';

export class RegisterButton extends BaseComponent {
  constructor() {
    super('a', ['user-info__register']);
    this.element.setAttribute('href', '#/register');
    this.element.innerHTML = 'Register';
    this.show();
  }

  show() :void {
    if (this.element.classList.contains('hide')) this.element.classList.remove('hide');
    this.element.classList.add('show');
  }

  hide() :void {
    if (this.element.classList.contains('show')) this.element.classList.remove('show');
    this.element.classList.add('hide');
  }
}
