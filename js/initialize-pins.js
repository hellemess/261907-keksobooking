'use strict';

window.initializePins = (function () {
  var URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinToClone = document.querySelector('#pin-template').content.querySelector('.pin');
  var dialogElement = document.querySelector('.dialog');
  dialogElement.style.display = 'none';

  window.load(URL, function (data) {
    var similarApartments = JSON.parse(data);

    for (var i = 0; i < 3; i++) {
      var pinElement = pinToClone.cloneNode(true);
      pinElement.setAttribute('id', i);
      pinElement.children[0].src = similarApartments[i].author.avatar;
      pinElement.style.top = similarApartments[i].location.y + 'px';
      pinElement.style.left = similarApartments[i].location.x + 'px';
      pinMap.appendChild(pinElement);
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
        dialogElement.querySelector('.dialog__title').children[0].src = selectedCard.author.avatar;
        dialogElement.querySelector('.lodge__title').innerHTML = selectedCard.offer.title;
        dialogElement.querySelector('.lodge__address').innerHTML = selectedCard.offer.address;
        dialogElement.querySelector('.lodge__price').innerHTML = selectedCard.offer.price + '&#x20bd;/ночь';
        var lodgeType = dialogElement.querySelector('.lodge__type');
        switch (selectedCard.offer.type) {
          case 'flat':
            lodgeType.innerHTML = 'Квартира';
            break;
          case 'bungalo':
            lodgeType.innerHTML = 'Сарай';
            break;
          case 'house':
            lodgeType.innerHTML = 'Дом';
            break;
        }
        dialogElement.querySelector('.lodge__rooms-and-guests').innerHTML = selectedCard.offer.rooms + ' комнаты для ' + selectedCard.offer.guests + ' гостей';
        dialogElement.querySelector('.lodge__checkin-time').innerHTML = 'Заед после ' + selectedCard.offer.checkin + ', выезд до ' + selectedCard.offer.checkout;
        var features = dialogElement.querySelector('.lodge__features');
        var checkForFeature = function (feature, index) {
          if (!selectedCard.offer.features.includes(feature)) {
            features.children[index].style.display = 'none';
          }
        };
        checkForFeature('wifi', 0);
        checkForFeature('dishwasher', 1);
        checkForFeature('parking', 2);
        checkForFeature('washer', 3);
        checkForFeature('elevator', 4);
        checkForFeature('conditioner', 5);
        dialogElement.querySelector('.lodge__description').innerHTML = selectedCard.offer.description;
        var photos = dialogElement.querySelector('.lodge__photos');
        var photoTemplate = photos.children[0];
        if (selectedCard.offer.photos.length > 0) {
          photos.style.display = 'block';
          photos.innerHTML = '';
          for (i = 0; i < selectedCard.offer.photos.length; i++) {
            var photoElement = photoTemplate.cloneNode();
            photoElement.src = selectedCard.offer.photos[i];
            photoElement.style.marginRight = '5px';
            photos.appendChild(photoElement);
          }
        } else {
          photos.style.display = 'none';
        }
      } else {
        dialogElement.style.display = 'none';
      }
    };

    pinMap.addEventListener('click', function (evt) {
      if (evt.path < 8) {
        return;
      }
      selectedPin = evt.target.classList.contains('pin') ? evt.target : evt.path[1];
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
})();
