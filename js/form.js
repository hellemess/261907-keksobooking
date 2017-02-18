'use strict';

window.form = (function () {
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var address = document.querySelector('#address');

  title.required = true;
  title.setAttribute('minlength', 30);
  title.setAttribute('maxlength', 100);

  price.required = true;
  price.type = 'number';
  price.min = 1000;
  price.max = 1000000;

  address.required = true;

  var time = document.querySelector('#time');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var apartmentType = document.querySelector('#type');

  var synchronizeValues = function (element, value) {
    element.value = value;
  };

  var synchronizeValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(time, timeout, [12, 13, 14], [12, 13, 14], synchronizeValues);
  window.synchronizeFields(timeout, time, [12, 13, 14], [12, 13, 14], synchronizeValues);
  window.synchronizeFields(roomNumber, capacity, [0, 3, 3], [3, 0], synchronizeValues);
  window.synchronizeFields(capacity, roomNumber, [3, 0], [0, 3, 3], synchronizeValues);
  window.synchronizeFields(apartmentType, price, [1000, 0, 10000], [1000, 0, 10000], synchronizeValueWithMin);

  document.querySelector('.footer-logo-link').removeAttribute('tabindex');
})();
