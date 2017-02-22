'use strict';

window.utils = (function () {
  var ENTER = 13;
  var ESC = 27;

  return {
    clearPins: function () {
      var activePin = document.querySelector('.pin--active');
      if (activePin) {
        activePin.setAttribute('aria-pressed', false);
        activePin.classList.remove('pin--active');
      }
    },
    createButton: function (button, queueRanking) {
      button.setAttribute('role', 'button');
      button.setAttribute('aria-pressed', false);
      button.setAttribute('tabindex', queueRanking);
    },
    isActivationEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER;
    },
    isDeactivationEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ESC;
    }
  };
})();
