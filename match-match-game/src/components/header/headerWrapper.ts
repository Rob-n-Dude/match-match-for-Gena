import { BaseComponent } from '../base-component';
import { Navigation } from './navigation/navigation';
import { UserInfo } from './UserInfo/userInfo';
import './header.scss';

export class HeaderWrapper extends BaseComponent {
  navigation : Navigation;

  userInfo : UserInfo;

  constructor() {
    super('div', ['header-wrapper']);
    this.userInfo = new UserInfo();
    this.navigation = new Navigation();
    this.element.append(this.navigation.element);
    this.element.append(this.userInfo.element);
  }
}
