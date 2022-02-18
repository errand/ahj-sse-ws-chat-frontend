import Methods from './API/Methods';

export default class Ui {
  constructor() {
    this.container = null;
    this.messages = null;
    this.methods = new Methods();
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
    chatSection.innerHTML = `
      <div class="chat--users-list"></div>
      <div class="chat--messages"></div>
    `;

    this.messages = chatSection.querySelector('.chat--users-list');
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
    setTimeout(() => modal.classList.add('show'), 0);
  }

  validateForm(evt) {
    const form = evt.target.closest('.modal-form');
    const input = form.querySelector('[data-id="modal-name"]');
    input.closest('.form-control').classList.remove('invalid');
    if (input.value === '') {
      input.closest('.form-control').classList.add('invalid');
      input.placeholder = 'Поле не может быть пустым';
      return false;
    }
    return true;
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
      }, 500);
    }
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('UI not bind to DOM');
    }
  }
}
