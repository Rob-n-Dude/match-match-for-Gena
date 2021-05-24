import { BaseComponent } from '../base-component';
import './header.scss';
import { HeaderWrapper } from './headerWrapper';

export class Header extends BaseComponent {
  headerWrapper : HeaderWrapper;

  constructor() {
    super('header');
    this.element.innerHTML = `
    <a href='#/game' class="app__name">
      <span>MATCH</span>
      <span>MATCH</span>
    </div>
    `;
    this.headerWrapper = new HeaderWrapper();
    this.element.append(this.headerWrapper.element);
  }
}
