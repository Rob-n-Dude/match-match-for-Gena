import './style.scss';
import { App } from './app';
// import img from '.assets/animals/01.png';

window.onload = () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('Root element now found');

  const Applicaton = new App(appElement);
  Applicaton.start();
};
