'use strict';

window.utils = (function () {
  var ENTER = 13;
  var ESC = 27;

  return {
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
