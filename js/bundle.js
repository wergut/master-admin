document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.custom-dropdown .dropdown-header').forEach(header => {
    header.addEventListener('click', function (e) {
      e.stopPropagation();
      const parentDropdown = this.parentElement;
      const isActive = parentDropdown.classList.contains('active');
      document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
      if (!isActive) {
        parentDropdown.classList.add('active');
      }
    });
  });

  document.querySelectorAll('.custom-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      const dropdown = this.closest('.custom-dropdown');
      const titleElement = dropdown.querySelector('.dropdown-title');
      titleElement.textContent = this.textContent;
      dropdown.classList.remove('active');
      dropdown.setAttribute('data-selected-value', this.textContent);
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var modalButtons = document.querySelectorAll('.open-modal-dialog'),
    overlay = document.querySelector('body'),
    closeButtons = document.querySelectorAll('.modal-dialog .modal-close');
  async function openModal(modalBtn) {
    return new Promise(resolve => {
      var modalId = modalBtn.getAttribute('data-src'),
        modalElem = document.querySelector('.modal-dialog.' + modalId);
      overlay.classList.add('modal-open');
      modalElem.style.display = 'flex';
      overlay.style.overflow = 'hidden';
      setTimeout(function () {
        modalElem.classList.add('modal-opening');
        resolve();
      }, 0);
    });
  }
  async function closeModal(closeBtn) {
    return new Promise(resolve => {
      var modal = closeBtn.closest('.modal-dialog');
      modal.classList.remove('modal-opening');
      modal.classList.add('modal-closing');
      overlay.style.overflow = 'initial';
      setTimeout(function () {
        modal.classList.remove('modal-closing');
        modal.style.display = 'none';
        overlay.classList.remove('modal-open');
        resolve();
      }, 500);
    });
  }

  /* open modal */
  modalButtons.forEach(function (modalBtn) {
    modalBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      await openModal(modalBtn);
    });
  });

  /* close modal */
  closeButtons.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', async function (e) {
      await closeModal(closeBtn);
    });
  });
  document.querySelectorAll('.modal-dialog').forEach(function (item) {
    item.addEventListener('click', async function (e) {
      if (e.target !== e.currentTarget) {
        return;
      } else {
        await closeModal(this);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const customButton = document.querySelector('.image-upload .custom-button');
  const fileInput = document.querySelector('.image-upload .file-input');
  const avatarImage = document.querySelector('.image-upload img');
  if (!customButton || !fileInput || !avatarImage) {
    return;
  }
  customButton.addEventListener('click', function () {
    fileInput.click();
  });
  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      avatarImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const customSelects = document.querySelectorAll('.custom-select');
  customSelects.forEach(select => {
    const header = select.querySelector('.custom-select-header');
    const selected = select.querySelector('.custom-select-selected');
    const options = select.querySelectorAll('.custom-select-option');
    header.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('.custom-select').forEach(s => {
        if (s !== select) s.classList.remove('active');
      });
      select.classList.toggle('active');
    });
    options.forEach(option => {
      option.addEventListener('click', function () {
        selected.textContent = this.textContent;
        select.classList.remove('active');
        console.log('Выбрано:', this.getAttribute('data-value'));
      });
    });
  });
  document.addEventListener('click', function () {
    customSelects.forEach(select => {
      select.classList.remove('active');
    });
  });
});

