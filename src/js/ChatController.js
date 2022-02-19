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
    const form = e.target.closest('.modal-form');
    const name = form.querySelector('#userName').value.trim();
    this.ui.inputName.closest('.form-control').classList.remove('invalid');
    this.methods.getAllUsers(response => {
      if (this.findUserIndexByName(response, name) === -1) {
        this.createUser(name);
      } else {
        this.ui.inputName.closest('.form-control').classList.add('invalid');
        this.ui.inputName.value = '';
        this.ui.inputName.placeholder = 'Это имя занято';
        return false;
      }
    });
  }

  findUserIndexByName(arr, name) {
    return arr.findIndex((user) => user.name === name);
  }

  createUser(data) {
    this.methods.createUser(data, response => {
      this.currentUser = response;
    });

    console.log(this.currentUser);
    /* this.ui.addUserToList(this.currentUser, true);

    this.ui.closeModal();

    this.socket = new Socket(this.currentUser);
    this.socket.init(); */
  }

  findUserByName(name) {

  }
}
