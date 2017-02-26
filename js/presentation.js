'use strict';

window.presentation = (function () {
  var pinToClone = document.querySelector('#pin-template').content.querySelector('.pin');

  return {
    renderArray: function (array, elementsToRender, whereToRender) {
      var pinsQuantity = elementsToRender.length;

      for (var i = 0; i < pinsQuantity; i++) {
        var index = elementsToRender[0];
        var pinElement = pinToClone.cloneNode(true);
        pinElement.setAttribute('id', index);
        pinElement.children[0].src = array[index].author.avatar;
        pinElement.style.top = array[index].location.y + 'px';
        pinElement.style.left = array[index].location.x + 'px';
        window.utils.createButton(pinElement, 2);
        whereToRender.appendChild(pinElement);
        elementsToRender.shift();
      }
    },
    fillCard: function (cardTemplate, cardContent) {
      cardTemplate.querySelector('.dialog__title').children[0].src = cardContent.author.avatar;
      cardTemplate.querySelector('.lodge__title').innerHTML = cardContent.offer.title;
      cardTemplate.querySelector('.lodge__address').innerHTML = cardContent.offer.address;
      cardTemplate.querySelector('.lodge__price').innerHTML = cardContent.offer.price + '&#x20bd;/ночь';

      var lodgeType = cardTemplate.querySelector('.lodge__type');

      switch (cardContent.offer.type) {
        case 'flat':
          lodgeType.innerHTML = 'Квартира';
          break;
        case 'bungalo':
          lodgeType.innerHTML = 'Сарай';
          break;
        case 'house':
          lodgeType.innerHTML = 'Дом';
      }

      cardTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = cardContent.offer.rooms + ' комнаты для ' + cardContent.offer.guests + ' гостей';
      cardTemplate.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + cardContent.offer.checkin + ', выезд до ' + cardContent.offer.checkout;

      var features = cardTemplate.querySelector('.lodge__features');

      var checkForFeature = function (feature, index) {
        features.children[index].style.display = !cardContent.offer.features.includes(feature) ? 'none' : 'block';
      };

      checkForFeature('wifi', 0);
      checkForFeature('dishwasher', 1);
      checkForFeature('parking', 2);
      checkForFeature('washer', 3);
      checkForFeature('elevator', 4);
      checkForFeature('conditioner', 5);

      cardTemplate.querySelector('.lodge__description').innerHTML = cardContent.offer.description;

      var photos = cardTemplate.querySelector('.lodge__photos');
      var photoTemplate = photos.children[0];

      if (cardContent.offer.photos.length > 0) {
        photos.style.display = 'block';
        photos.innerHTML = '';

        for (var i = 0; i < cardContent.offer.photos.length; i++) {
          var photoElement = photoTemplate.cloneNode();
          photoElement.src = cardContent.offer.photos[i];
          photoElement.style.marginRight = '5px';
          photos.appendChild(photoElement);
        }
      }
    }
  };
})();
