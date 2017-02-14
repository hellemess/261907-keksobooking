'use strict';

var ENTER = 13;

window.isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER;
};

var pinMap = document.querySelector('.tokyo__pin-map');
var pin = pinMap.querySelectorAll('.pin');
var defaultPin = pinMap.querySelector('.pin--active');
var dialog = document.querySelector('.dialog');
var dialogLabel = dialog.querySelector('.lodge__title');
var dialogClose = dialog.querySelector('.dialog__close');

var createButton = function (button, queueRanking) {
  button.setAttribute('role', 'button');
  button.setAttribute('aria-pressed', false);
  button.setAttribute('tabindex', queueRanking);
};

for (var i = 0; i < pin.length; i++) {
  createButton(pin[i], 2);
}

defaultPin.setAttribute('aria-pressed', true);

dialog.setAttribute('role', 'dialog');
dialog.setAttribute('aria-hidden', false);
dialogLabel.setAttribute('id', 'dialog-title');
dialog.setAttribute('aria-labelledby', 'dialog-title');

createButton(dialogClose, 1);

window.initializePins();

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
