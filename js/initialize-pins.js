'use strict';

window.initializePins = (function () {
  var URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');
  var dialog = document.querySelector('.dialog');

  dialog.style.display = 'none';

  window.load(URL, function (data) {
    var similarApartments = JSON.parse(data);

    for (var i = 0; i < 3; i++) {
      window.presentation.renderArray(similarApartments, i, pinMap);
    }

    var pin = pinMap.querySelectorAll('.pin');
    var selectedPin = null;

    for (i = 0; i < pin.length; i++) {
      window.utils.createButton(pin[i], 2);
    }

    var selectPin = function (target) {
      window.utils.clearPins();
      target.classList.add('pin--active');
      target.setAttribute('aria-pressed', true);
      var targetIndex = target.getAttribute('id');
      if (targetIndex) {
        var selectedCard = similarApartments[targetIndex];
        window.presentation.fillCard(dialog, selectedCard);
      } else {
        dialog.style.display = 'none';
      }
    };

    pinMap.addEventListener('click', function (evt) {
      selectedPin = evt.target.classList.contains('pin') ? evt.target : evt.target.parentElement;
      window.showCard();
      selectPin(selectedPin);
    });

    pinMap.addEventListener('keydown', function (evt) {
      if (window.utils.isActivationEvent(evt)) {
        selectedPin = evt.target;
        window.showCard(function () {
          selectedPin.focus();
        });
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
    var addressPoint = evt.target.classList.contains('pin') ? evt.target : evt.path[1];
    var address = {
      x: addressPoint.offsetLeft + 38,
      y: addressPoint.offsetTop + 90
    };
    var addressField = document.querySelector('#address');
    addressField.value = 'x: ' + address.x + ', y: ' + address.y;
  });
})();
