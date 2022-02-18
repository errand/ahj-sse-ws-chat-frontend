export default class Socket {
  constructor(name) {
    this.name = name;
  }

  init() {
    // const board = new Board(document.getElementById('container'));
    // this.ctrl = new Controller(board);
    this.url = 'ws://localhost:7070/ws';
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', (evt) => {
      console.log('connected');

      // this.ctrl.addUser(evt.data);
    });

    this.ws.addEventListener('message', (evt) => {
      console.log('message');
      console.log(evt);
    });

    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });

    this.ws.addEventListener('error', () => {
      console.log('error');
    });
  }
}
