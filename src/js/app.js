import ChatController from './ChatController';
import Socket from './API/Socket';
import Ui from './Ui';

const ui = new Ui();
ui.bindToDOM(document.querySelector('#ticketsContainer'));

const ctr = new ChatController(ui);
const ws = new Socket('ui');

ws.init();
