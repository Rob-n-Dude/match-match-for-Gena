import { AboutPage } from './components/aboutPage/aboutPage';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { RegisterForm } from './components/registerForm/registerForm';
import { SettingsPage } from './components/settingsPage/settingsPage';
import { ImageCategoryModel } from './models/image-category-model';

export class App {
  private readonly rootElement: HTMLElement;

  private readonly game: Game;

  private readonly header : Header;

  private readonly about: AboutPage;

  private readonly register: RegisterForm;

  private readonly settings: SettingsPage;

  private images?: string [];

  constructor(elem: HTMLElement) {
    this.rootElement = elem;
    this.game = new Game();
    this.header = new Header();
    this.about = new AboutPage();
    this.register = new RegisterForm();
    this.settings = new SettingsPage();
    this.rootElement.parentElement?.prepend(this.header.element);
    this.setLocationEvent();
    this.setStartStopEvent();
    this.setSettingsEvent();
  }

  async getImages() : Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const [currentCategory, currentDifficulty] = this.settings.getSettings();
    const images = categories.filter((cat) => cat.category === currentCategory)[0].images.sort(() => (Math.random() * 1.5) - 1);
    const currentImages = images.slice(0, Number(currentDifficulty)).map((name) => `${currentCategory}/${name}`);
    this.images = currentImages;
  }

  async start() : Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const [currentCategory, currentDifficulty] = this.settings.getSettings();
    const images = categories.filter((cat) => cat.category === currentCategory)[0].images.sort(() => (Math.random() * 1.5) - 1);
    const currentImages = images.slice(0, Number(currentDifficulty)).map((name) => `${currentCategory}/${name}`);
    // const images = categories[0].images.map((name) => `${categories[0].category}/${name}`);
    this.images = currentImages;
    // avatars for register field;
    const rnd = Math.ceil(Math.random() * 8);
    const ava = categories[2].images.filter((name) => name === `${rnd}.jpg`)
      .map((name) => `${categories[2].category}/${name}`).join('');
    this.register.setAvatar(ava);
    this.header.headerWrapper.userInfo.userAvatar.setImage(ava);
  }

  setLocationEvent() :void {
    window.location.hash = '';
    window.addEventListener('hashchange', (e) => {
      this.locationHandler(e);
      if (this.register.user) this.header.headerWrapper.userInfo.hideRegister();
    });
    window.location.hash = '/about';
  }

  initGame() : void {
    this.reset();
    this.game.newGame(this.images!);
    this.rootElement.appendChild(this.game.scoreboard.element);
    this.rootElement.appendChild(this.game.element);
  }

  reset() : void {
    this.rootElement.innerHTML = '';
  }

  showAboutPage() : void {
    this.reset();
    this.rootElement.appendChild(this.about.element);
  }

  showRegisterForm() : void {
    this.rootElement.appendChild(this.register.element);
  }

  showSettingsPage() : void {
    this.reset();
    this.rootElement.appendChild(this.settings.element);
  }

  locationHandler(e:HashChangeEvent) : void {
    const newHash = (e.newURL).split('#')[1];
    if (window.location.hash === `/${newHash}`) return;
    switch (newHash) {
      case '/about': {
        this.showAboutPage();
        break;
      }
      case '/settings': {
        this.showSettingsPage();
        // this.settings.getSettings();
        break;
      }
      case '/game': {
        this.initGame();
        break;
      }
      case '/score': {
        break;
      }
      case '/register': {
        this.reset();
        this.showRegisterForm();
        break;
      }
      default: {
        break;
      }
    }
  }

  setStartStopEvent() : void {
    this.header.headerWrapper.userInfo.startStopButton.element.addEventListener('click', (e) => this.startStopButtonHandler(e));
  }

  async startStopButtonHandler(e: MouseEvent) : Promise<void> {
    const button = this.header.headerWrapper.userInfo.startStopButton.element;
    if (button.textContent === 'Start') {
      // если нажата старт кнопка
      if (window.location.hash !== '#/game') {
        window.location.hash = '/game';
      } else if (window.location.hash === '#/game') {
        // в окне с игрой нажата кнопка старт
        if (!this.game.isStarteble) return;
        this.game.isStarteble = false;
        const wait = 10;
        this.header.headerWrapper.userInfo.startStopButton.setButtonText('Stop');
        this.header.headerWrapper.userInfo.startStopButton.toggleDisableStyle();
        await this.game.startAsGame(wait * 1000);
        this.header.headerWrapper.userInfo.startStopButton.toggleDisableStyle();
        this.game.isStarteble = true;
      }
    } else {
      // когда нажата кнопка Стоп
      if (!this.game.isStarteble) return;
      this.game.isStarteble = false;
      this.game.stopGame();
      this.game.scoreboard.timer.stop();
      this.header.headerWrapper.userInfo.startStopButton.setButtonText('Start');
      this.game.isStarteble = true;
    }
  }

  setSettingsEvent() : void {
    this.settings.element.addEventListener('change', async () => {
      await this.getImages();
      this.game.newGame(this.images!);
    });
  }
}
