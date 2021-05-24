import { BaseComponent } from '../base-component';
import { User } from '../user';
import './registerForm.scss';

const possibleColors = {
  green: 'rgba(0, 255, 114, 0.22)',
  red: '#ff000038',
  default: 'rgba(156, 156, 156, 0.137)',
};

export class RegisterForm extends BaseComponent {
  user? : User;

  userAva? : string;

  constructor() {
    super('div', ['register-backfield']);
    this.element.innerHTML = `
      <div class="register-area">
        <div class="register-tittle">Register new Player</div>
        <div class="register-form">
          <form action="#" method="GET" onsubmit="return false;">
            <input class='register-input' id='name' type="text" placeholder="First name">
            <input class='register-input' id='s-name' type="text" placeholder="Second name">
            <input class='register-input' id='mail' type="email" placeholder="E-mail">
            <div class="register-buttons">
              <input class='register-button' type="submit" value="Add user">
              <input class='register-button' type="button" value="Cancel">
            </div>
          </form>
          <div class="avatar"></div>
        </div>
      </div>
      `;
    this.setValidationEvents();
  }

  setAvatar(image:string) : void {
    const avatar = (this.element as Element).querySelector('.avatar');
    if (avatar) (avatar as HTMLElement).style.backgroundImage = `url('./${image}')`;
    this.userAva = image;
  }

  setValidationEvents() : void {
    if ((this.element as Element).querySelector('.register-form')) {
      const form = (this.element as Element).querySelectorAll('input');
      form.forEach((el) => {
        if (el.className === 'register-input') el.addEventListener('input', (e) => RegisterForm.inputValidation(e));
        else {
          el.addEventListener('click', (e) => this.buttonValidation(e));
        }
      });
    }
  }

  private static inputValidation(e : Event) : void {
    let regex: RegExp;
    const input = <HTMLInputElement>document.getElementById(`${(e.currentTarget as Element).attributes[1].nodeValue}`);
    if (input.type === 'text') regex = /^([А-Яа-яё]{1,30}|[A-Za-z]{1,30})$/gm;
    else regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/gm;

    if (regex.test(input.value)) input.style.backgroundColor = possibleColors.green;
    else input.style.backgroundColor = possibleColors.red;
    if (input.value.length === 0) input.style.backgroundColor = possibleColors.default;
  }

  private buttonValidation(e : Event) : void {
    const form = document.forms[0];
    const target = (e.currentTarget as HTMLElement);
    if (target.attributes[1].nodeValue === 'button') {
      RegisterForm.clearForm();
      window.history.back();
    } else {
      if (RegisterForm.isFormValid(form)) {
        const formInfo = RegisterForm.getFormInfo(form);
        this.user = new User(formInfo);
        this.user.setAvatar(this.userAva ?? '');
        window.history.back();
      }
      RegisterForm.clearForm();
    }
  }

  private static clearForm() {
    const form = <HTMLFormElement>document.forms[0];
    form.childNodes.forEach((input) => {
      if ((input as HTMLInputElement).type === 'text' || (input as HTMLInputElement).type === 'email') {
        (input as HTMLInputElement).value = '';
        (input as HTMLInputElement).style.backgroundColor = possibleColors.default;
      }
    });
  }

  private static isFormValid(form : HTMLFormElement) : boolean {
    const res : boolean[] = [];
    form.childNodes.forEach((input) => {
      if ((input as HTMLInputElement).type === 'text' || (input as HTMLInputElement).type === 'email') {
        if ((input as HTMLInputElement).style.backgroundColor === possibleColors.green) res.push(true);
        else {
          res.push(false);
        }
      }
    });
    return res.every((val) => val === true);
  }

  private static getFormInfo(form : HTMLFormElement) : string[] {
    const result : string[] = [];
    form.childNodes.forEach((input) => {
      if ((input as HTMLInputElement).type === 'text' || (input as HTMLInputElement).type === 'email') {
        result.push((input as HTMLInputElement).value);
      }
    });
    return result;
  }
}
