import ChatController from './ChatController';
import Ui from './Ui';

const ui = new Ui();
ui.bindToDOM(document.querySelector('#chatContainer'));

const ctr = new ChatController(ui);

ctr.init();
