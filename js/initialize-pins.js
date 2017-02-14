'use strict';

window.initializePins = function () {
  var clearPins = function () {
    for (var i = 0; i < window.pin.length; i++) {
      window.pin[i].classList.remove('pin--active');
      window.pin[i].setAttribute('aria-pressed', false);
    }
  };

  var selectPin = function (target) {
    target.classList.add('pin--active');
    target.setAttribute('aria-pressed', true);
    window.dialog.style.display = 'block';
    window.dialogClose.focus();
  };

  var closeDialog = function (evt) {
    evt.preventDefault();
    window.dialog.style.display = 'none';
    var activePin = window.pinMap.querySelector('.pin--active');
    activePin.classList.remove('pin--active');
  };

  window.pinMap.addEventListener('click', function (evt) {
    if (evt.path < 8) {
      return;
    }
    clearPins();
    if (evt.target.tagName === 'div') {
      var selectedPin = evt.target;
    } else {
      selectedPin = evt.path[1];
    }
    selectPin(selectedPin);
  });

  window.pinMap.addEventListener('keydown', function (evt) {
    if (window.isActivateEvent(evt)) {
      clearPins();
      var selectedPin = evt.target;
      selectPin(selectedPin);
    }
  });

  window.dialogClose.addEventListener('click', closeDialog);

  window.dialogClose.addEventListener('keydown', function (evt) {
    if (window.isActivateEvent(evt)) {
      closeDialog(evt);
    }
  });
};
