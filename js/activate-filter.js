'use strict';

window.activateFilter = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');
  var filtersContainer = document.querySelector('.tokyo__filters-container');
  var filterSelects = filtersContainer.querySelectorAll('.tokyo__filter');
  var filterKey;
  var filterValue;

  var requested = {
    price: 'middle'
  };

  var setKeyNames = function (field) {
    var keyName;

    switch (field.name) {
      case 'housing_type':
        keyName = 'type';
        break;
      case 'housing_price':
        keyName = 'price';
        break;
      case 'housing_room-number':
        keyName = 'rooms';
        break;
      case 'housing_guests-number':
        keyName = 'guests';
    }

    return keyName;
  };

  filterSelects.forEach(function (field) {
    field.name = setKeyNames(field);
  });

  return function (array) {
    filtersContainer.addEventListener('change', function (evt) {
      window.card.hide();
      var target = evt.target;

      if (evt.target.tagName.toLowerCase() === 'select') {
        filterKey = target.name;
        filterValue = target.value;
      } else {
        filterKey = target.value;
        filterValue = target.checked;
      }

      if (filterValue === 'any' || filterValue === false) {
        delete requested[filterKey];
      } else {
        requested[filterKey] = filterValue;
      }

      var requestedKeys = Object.keys(requested);
      var pinsToRender = [];

      for (var i = 0; i < array.length; i++) {
        var offer = array[i].offer;

        for (var j = 0; j < requestedKeys.length; j++) {
          var indicator = false;
          var currentKey = requestedKeys[j];

          if (currentKey === 'price') {
            switch (requested[currentKey]) {
              case 'low':
                indicator = offer[currentKey] < 10000;
                break;
              case 'middle':
                indicator = offer[currentKey] >= 10000 && offer[currentKey] <= 50000;
                break;
              case 'hight':
                indicator = offer[currentKey] > 50000;
            }
          } else if (typeof requested[currentKey] === 'boolean') {
            indicator = offer.features.includes(currentKey);
          } else {
            indicator = requested[currentKey] === offer[currentKey] || +requested[currentKey] === offer[currentKey];
          }

          if (!indicator) {
            break;
          }
        }

        if (indicator) {
          pinsToRender.push(i);
        }
      }

      pinMap.innerHTML = '';
      pinMap.appendChild(pinMain);

      window.presentation.renderArray(array, pinsToRender, pinMap);
    }, true);
  };
})();
