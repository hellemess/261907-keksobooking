'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pin = pinMap.querySelectorAll('.pin');
  var selectedPin = pinMap.querySelector('.pin--active');

  for (var i = 0; i < pin.length; i++) {
    window.utils.createButton(pin[i], 2);
  }

  selectedPin.setAttribute('aria-pressed', true);

  var selectPin = function (target) {
    for (i = 0; i < pin.length; i++) {
      pin[i].classList.remove('pin--active');
      pin[i].setAttribute('aria-pressed', false);
    }
    target.classList.add('pin--active');
    target.setAttribute('aria-pressed', true);
  };

  pinMap.addEventListener('click', function (evt) {
    if (evt.path < 8) {
      return;
    }
    selectedPin = evt.target.classList.contains('pin') ? evt.target : evt.path[1];
    selectPin(selectedPin);
    window.showCard();
  });

  pinMap.addEventListener('keydown', function (evt) {
    if (window.utils.isActivationEvent(evt)) {
      selectedPin = evt.target;
      selectPin(selectedPin);
      window.showCard(function () {
        selectedPin.focus();
      });
    }
  });

  return {
    deselectPin: function () {
      selectedPin.setAttribute('aria-pressed', false);
      selectedPin.classList.remove('pin--active');
    }
  };
})();
