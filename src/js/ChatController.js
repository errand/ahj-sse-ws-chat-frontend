import Methods from './API/Methods';

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
      console.log(response);
    });
  }

  findUserByName(name) {

  }
}
