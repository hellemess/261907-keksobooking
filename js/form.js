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

  window.synchronizeFields(time, timeout, [12, 13, 14], [12, 13, 14], 'value');
  window.synchronizeFields(timeout, time, [12, 13, 14], [12, 13, 14], 'value');
  window.synchronizeFields(roomNumber, capacity, [0, 3, 3], [3, 0], 'value');
  window.synchronizeFields(capacity, roomNumber, [3, 0], [0, 3, 3], 'value');
  window.synchronizeFields(apartmentType, price, [1000, 0, 10000], [1000, 0, 10000], 'min');

  document.querySelector('.footer-logo-link').removeAttribute('tabindex');
})();
