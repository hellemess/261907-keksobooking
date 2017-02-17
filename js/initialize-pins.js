'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pin = pinMap.querySelectorAll('.pin');
  var selectedPin = pinMap.querySelector('.pin--active');
  var dialog = document.querySelector('.dialog');
  var dialogLabel = dialog.querySelector('.lodge__title');
  var dialogClose = dialog.querySelector('.dialog__close');

  for (var i = 0; i < pin.length; i++) {
    window.utils.createButton(pin[i], 2);
  }

  selectedPin.setAttribute('aria-pressed', true);

  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-hidden', false);
  dialogLabel.setAttribute('id', 'dialog-title');
  dialog.setAttribute('aria-labelledby', 'dialog-title');

  window.utils.createButton(dialogClose, 1);

  var clearPins = function () {
    for (i = 0; i < pin.length; i++) {
      pin[i].classList.remove('pin--active');
      pin[i].setAttribute('aria-pressed', false);
    }
  };

  var selectPin = function (target) {
    target.classList.add('pin--active');
    target.setAttribute('aria-pressed', true);
    dialog.style.display = 'block';
    dialogClose.focus();
  };

  var closeDialog = function (evt) {
    evt.preventDefault();
    dialog.style.display = 'none';
    selectedPin.classList.remove('pin--active');
  };

  pinMap.addEventListener('click', function (evt) {
    if (evt.path < 8) {
      return;
    }
    clearPins();
    selectedPin = evt.target.classList.contains('pin') ? evt.target : evt.path[1];
    selectPin(selectedPin);
  });

  pinMap.addEventListener('keydown', function (evt) {
    if (window.utils.isActivationEvent(evt)) {
      clearPins();
      selectedPin = evt.target;
      selectPin(selectedPin);
    }
  });

  dialogClose.addEventListener('click', closeDialog);

  dialogClose.addEventListener('keydown', function (evt) {
    if (window.utils.isActivationEvent(evt)) {
      closeDialog(evt);
    }
  });

  return function () {};
})();
