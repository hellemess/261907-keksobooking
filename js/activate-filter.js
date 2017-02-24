'use strict';

window.activateFilter = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');
  var dialog = document.querySelector('.dialog');
  var filtersContainer = document.querySelector('.tokyo__filters-container');
  var filterSelects = filtersContainer.querySelectorAll('.tokyo__filter');
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
      dialog.style.display = 'none';
      var target = evt.target;
      var filterKey;
      var filterValue;
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
      var pinsToRender = [];
      for (var i = 0; i < array.length; i++) {
        var offer = array[i].offer;
        for (var key in requested) {
          if (requested.hasOwnProperty(key)) {
            var indicator = false;
            if (key === 'price') {
              switch (requested[key]) {
                case 'low':
                  indicator = offer[key] < 10000;
                  break;
                case 'middle':
                  indicator = offer[key] >= 10000 && offer[key] <= 50000;
                  break;
                case 'hight':
                  indicator = offer[key] > 50000;
              }
            } else if (typeof requested[key] === 'boolean') {
              indicator = offer.features.includes(key);
            } else {
              indicator = requested[key] === offer[key] || +requested[key] === offer[key];
            }
            if (!indicator) {
              break;
            }
          }
        }
        if (indicator) {
          pinsToRender.push(i);
        }
      }
      var pinsQuantity = pinsToRender.length;
      pinMap.innerHTML = '';
      pinMap.appendChild(pinMain);
      for (i = 0; i < pinsQuantity; i++) {
        window.presentation.renderArray(array, pinsToRender[0], pinMap);
        pinsToRender.shift();
      }
    }, true);
  };
})();
