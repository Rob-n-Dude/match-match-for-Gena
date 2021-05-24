import { BaseComponent } from '../../base-component';
import { RegisterButton } from './registerButton';
import { StartButton } from './startButton';
import { UserAvatar } from './userAvatar';

export class UserInfo extends BaseComponent {
  registerButton : RegisterButton;

  startStopButton: StartButton;

  userAvatar : UserAvatar;

  constructor() {
    super('div', ['user-info']);
    this.registerButton = new RegisterButton();
    this.userAvatar = new UserAvatar();
    this.startStopButton = new StartButton();
    this.element.append(this.registerButton.element);
    this.element.append(this.startStopButton.element);
    this.element.append(this.userAvatar.element);
  }

  hideRegister() : void {
    this.registerButton.hide();
    this.startStopButton.show();
    this.userAvatar.show();
    this.startStopButton.setButtonText('Start');
  }

  showRegister() : void {
    this.registerButton.show();
    this.startStopButton.hide();
    this.userAvatar.hide();
  }
}
