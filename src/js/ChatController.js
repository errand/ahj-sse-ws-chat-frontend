import Methods from './API/Methods';
import Socket from './API/Socket';

export default class ChatController {
  constructor(ui) {
    this.ui = ui;
    this.methods = new Methods();
  }

  init() {
    this.ui.drawUi();
    this.ui.newUserClickListener(this.onNewUserSubmitButtonClick.bind(this));
  }

  onNewUserSubmitButtonClick(e) {
    this.methods.getAllUsers(response => {
      this.createUser(response);
    });
  }

  createUser(data) {
    this.methods.createUser(data, (response) => {
      this.currentUser = response;
    });

    this.socket = new Socket(this.currentUser);
    this.socket.init();
  }

  findUserByName(name) {

  }
}
