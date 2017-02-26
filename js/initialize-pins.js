'use strict';

window.initializePins = (function () {
  var URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');

  window.load(URL, function (data) {
    var similarApartments = JSON.parse(data);
    var pinsToRenderOnLoad = window.utils.getArrayOfRandomIndexes(similarApartments, 3);

    window.presentation.renderArray(similarApartments, pinsToRenderOnLoad, pinMap);

    var selectedPin = null;

    var selectPin = function (target) {
      window.utils.clearPins();
      target.classList.add('pin--active');
      target.setAttribute('aria-pressed', true);

      var targetIndex = target.getAttribute('id');

      if (typeof targetIndex === 'string') {
        var selectedCard = similarApartments[targetIndex];
        window.presentation.fillCard(window.card.template, selectedCard);
      } else {
        window.card.hide();
      }
    };

    pinMap.addEventListener('click', function (evt) {
      window.card.show();
      selectedPin = evt.target.classList.contains('pin') ? evt.target : evt.target.parentElement;
      selectPin(selectedPin);
    });

    pinMap.addEventListener('keydown', function (evt) {
      if (window.utils.isActivationEvent(evt)) {
        window.card.show(function () {
          selectedPin.focus();
        });

        selectedPin = evt.target;
        selectPin(selectedPin);
      }
    });

    window.activateFilter(similarApartments);
  }, function (error) {
    pinMap.insertAdjacentHTML('afterbegin', '<div class="load-error">' + error + '</div>');
    var errorElement = pinMap.querySelector('.load-error');
    errorElement.style = 'position: absolute; top: 50%; left: 50%; z-index: 1; padding: 20px; transform: translate(-50%, -50%); background: white; border: 3px solid #ff5635';
    errorElement.setAttribute('role', 'alertdialog');
    errorElement.setAttribute('aria-label', error);
    errorElement.setAttribute('tabindex', '1');
    errorElement.focus();

    errorElement.addEventListener('click', function () {
      pinMap.removeChild(errorElement);
    });

    errorElement.addEventListener('keydown', function (evt) {
      if (window.utils.isActivationEvent(evt) || window.utils.isDeactivationEvent(evt)) {
        pinMap.removeChild(errorElement);
      }
    });
  });

  window.utils.dragElement(pinMain, function (evt) {
    var addressPoint = evt.target.classList.contains('pin') ? evt.target : evt.target.parentElement;

    var address = {
      x: addressPoint.offsetLeft + 38,
      y: addressPoint.offsetTop + 90
    };

    var addressField = document.querySelector('#address');
    addressField.value = 'x: ' + address.x + ', y: ' + address.y;
  });
})();
