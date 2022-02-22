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
    this.ui.formSubmit.addEventListener('click', e => this.onChatFormSubmit(e));
  }

  onNewUserSubmitButtonClick(e) {
    const form = e.target.closest('.modal-form');
    const name = form.querySelector('#userName').value.trim();
    this.ui.inputName.closest('.form-control').classList.remove('invalid');
    // eslint-disable-next-line consistent-return
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

  onChatFormSubmit(e) {
    e.preventDefault();

    if (this.ui.formInput.value !== '') {
      this.createPost({ user: this.currentUser, text: this.ui.formInput.value });
      this.ui.formInput.value = '';
      this.ui.messages.scrollTop = this.ui.messages.scrollHeight;
    } else {
      this.ui.formInput.placeholder = 'Поле не может быть пустым';
    }
  }

  findUserIndexByName(arr, name) {
    return arr.findIndex((user) => user.name === name);
  }

  createPost(obj) {
    this.methods.createPost(obj, response => {
      this.socket.sendMessage(obj);
    });
  }

  createUser(data) {
    this.methods.createUser(data, response => {
      this.currentUser = response;

      this.ui.closeModal();

      this.socket = new Socket(this.currentUser);
      this.socket.init();
    });
  }
}
