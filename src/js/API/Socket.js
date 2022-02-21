import Ui from '../Ui';

export default class Socket {
  constructor(name) {
    this.name = name;
    this.ui = new Ui();
  }

  init() {
    this.url = 'ws://localhost:7070/ws';
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', (evt) => {
      console.log('connected');
    });

    this.ws.addEventListener('message', (evt) => {
      this.handleRequest(evt);
    });

    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });

    this.ws.addEventListener('error', () => {
      console.log('error');
    });
  }

  sendMessage(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      try {
        const jsonMSG = JSON.stringify(data);
        this.ws.send(jsonMSG);
        this.name = jsonMSG.name;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Соединение разорвано, переподключаю...');
      this.ws = new WebSocket(this.url);
    }
  }

  handleRequest(evt) {
    const data = JSON.parse(evt.data);

    if (data.type === 'connect') {
      console.log('user registered');
    } else {
      console.log(data);
      this.ui.renderMessage(data);
    }
  }
}
