'use strict';

window.showCard = (function () {
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var onDialogClose = null;

  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-hidden', false);
  dialog.querySelector('.lodge__title').setAttribute('id', 'dialog-title');
  dialog.setAttribute('aria-labelledby', 'dialog-title');

  window.utils.createButton(dialogClose, 1);

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
    dialogClose.focus();
  };

  var closeDialog = function (evt) {
    evt.preventDefault();
    window.utils.clearPins();
    dialog.style.display = 'none';
    document.removeEventListener('keydown', onEscDown);
    dialogClose.removeEventListener('click', closeDialog);
    dialogClose.removeEventListener('keydown', onEnterDown);

    if (typeof onDialogClose === 'function') {
      onDialogClose();
    }
  };

  return function (cb) {
    openDialog();
    document.addEventListener('keydown', onEscDown);
    dialogClose.addEventListener('click', closeDialog);
    dialogClose.addEventListener('keydown', onEnterDown);
    onDialogClose = cb;
  };
})();
