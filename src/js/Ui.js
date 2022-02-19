import Methods from './API/Methods';

export default class Ui {
  constructor() {
    this.container = null;
    this.modalForm = null;
    this.methods = new Methods();
    this.messages = null;
    this.inputName = null;
    this.usersList = null;
    this.chatSection = null;
    this.onAddUserClickListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.checkBinding();
    this.openModal();
    const chatSection = document.createElement('div');
    chatSection.classList.add('chat--wrapper');
    chatSection.classList.add('blured');
    chatSection.innerHTML = '<div class="chat--users-list"></div><div class="chat--messages"></div>';
    this.usersList = chatSection.querySelector('.chat--users-list');
    this.messages = chatSection.querySelector('.chat--messages');

    this.methods.getAllUsers(response => {
      response.forEach(user => this.addUserToList(user.name));
    });

    this.chatSection = chatSection;

    this.container.appendChild(chatSection);
  }

  openModal() {
    document.body.classList.add('has-modal');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalTitle = 'Регистрация';

    const formControls = `<div class="form-group">
            <label class="form-label" for="userName">Выберите псевдоним</label>
            <input placeholder="Меня зовут" type="text" class="form-control" id="userName" name="userName" data-id="modal-name" required>
          </div>`;
    modal.innerHTML = `<div class="modal-inner">
      <div class="modal-content">
        <header><h3 class="title">${modalTitle}</h3></header>
        <form class="modal-form">
          ${formControls}
          <div class="form-group">          
            <button type="button" data-id="modal-submit">ОК</button>
          </div>
        </form>
      </div>
    </div>`;

    modal.querySelector('[data-id="modal-submit"]').addEventListener('click', (e) => {
      if (this.validateForm(e)) {
        this.onUserAddButtonClick(e);
      }
    });

    document.body.appendChild(modal);
    this.modalForm = modal;
    this.inputName = modal.querySelector('#userName');
    setTimeout(() => modal.classList.add('show'), 0);
  }

  validateForm(evt) {
    const input = this.inputName;
    input.closest('.form-control').classList.remove('invalid');
    if (input.value === '') {
      input.closest('.form-control').classList.add('invalid');
      input.placeholder = 'Поле не может быть пустым';
      return false;
    }
    return true;
  }

  addUserToList(user, author = false) {
    const userList = this.container.querySelector('.chat--users-list');
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    if (author) {
      userDiv.innerHTML = `<div class="avatar"><img src="https://eu.ui-avatars.com/api/?background=0DBC8A&color=fff&name=${user}" alt="${user}"></div><div class="name author">${user} (Вы)`;
      userDiv.classList.add('author');
      userList.prepend(userDiv);
    } else {
      userDiv.innerHTML = `<div class="avatar"><img src="https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user}" alt="${user}"></div><div class="name">${user}`;
      userList.appendChild(userDiv);
    }
  }

  /**
   * Add listener to mouse click for New Ticket Button
   *
   * @param callback
   */
  newUserClickListener(callback) {
    this.onAddUserClickListeners.push(callback);
  }

  onUserAddButtonClick(event) {
    this.onAddUserClickListeners.forEach(o => o.call(null, event));
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
        document.body.classList.remove('has-modal');
        this.chatSection.classList.remove('blured');
      }, 500);
    }
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('UI not bind to DOM');
    }
  }
}
