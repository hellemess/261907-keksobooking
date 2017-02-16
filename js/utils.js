'use strict';

window.utils = (function () {
  var ENTER = 13;

  return {
    createButton: function (button, queueRanking) {
      button.setAttribute('role', 'button');
      button.setAttribute('aria-pressed', false);
      button.setAttribute('tabindex', queueRanking);
    },
    isActivationEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER;
    }
  };
})();
