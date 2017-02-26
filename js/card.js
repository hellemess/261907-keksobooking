'use strict';

window.card = (function () {
  var dialogToClone = document.querySelector('#dialog-template').content.querySelector('.dialog');
  var dialog = dialogToClone.cloneNode(true);
  var dialogClose = dialog.querySelector('.dialog__close');
  var onDialogClose = null;

  dialog.style.display = 'none';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-hidden', true);
  dialog.querySelector('.lodge__title').setAttribute('id', 'dialog-title');
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  window.utils.createButton(dialogClose, 1);

  document.querySelector('.tokyo').appendChild(dialog);

  var onEnterDown = function (evt) {
    if (window.utils.isActivationEvent(evt)) {
      closeDialog(evt);
    }
  };

  var onEscDown = function (evt) {
    if (window.utils.isDeactivationEvent(evt)) {
      closeDialog(evt);
    }
  };

  var openDialog = function () {
    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', false);
    dialogClose.focus();
  };

  var closeDialog = function (evt) {
    evt.preventDefault();
    dialog.style.display = 'none';
    dialog.setAttribute('aria-hidden', true);
    document.removeEventListener('keydown', onEscDown);
    dialogClose.removeEventListener('click', closeDialog);
    dialogClose.removeEventListener('keydown', onEnterDown);
    window.utils.clearPins();

    if (typeof onDialogClose === 'function') {
      onDialogClose();
    }
  };

  window.utils.dragElement(dialog);

  return {
    hide: function () {
      dialog.style.display = 'none';
      dialog.setAttribute('aria-hidden', true);
    },
    show: function (cb) {
      openDialog();
      document.addEventListener('keydown', onEscDown);
      dialogClose.addEventListener('click', closeDialog);
      dialogClose.addEventListener('keydown', onEnterDown);
      onDialogClose = cb;
    },
    template: dialog
  };
})();
