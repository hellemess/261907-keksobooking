'use strict';

var ENTER = 13;

var pinMap = document.querySelector('.tokyo__pin-map');
var pin = pinMap.querySelectorAll('.pin');
var defaultPin = pinMap.querySelector('.pin--active');
var dialog = document.querySelector('.dialog');
var dialogLabel = dialog.querySelector('.lodge__title');
var dialogClose = dialog.querySelector('.dialog__close');

var createButton = function (button) {
  button.setAttribute('role', 'button');
  button.setAttribute('aria-pressed', false);
  button.setAttribute('tabindex', 1);
}

for (var i = 0; i < pin.length; i++) {
  createButton(pin[i]);
}

defaultPin.setAttribute('aria-pressed', true);

dialog.setAttribute('role', 'dialog');
dialog.setAttribute('aria-hidden', false);
dialogLabel.setAttribute('id', 'dialog-title');
dialog.setAttribute('aria-labelledby', 'dialog-title');

createButton(dialogClose);

var clearPins = function () {
  for (i = 0; i < pin.length; i++) {
    pin[i].classList.remove('pin--active');
    pin[i].setAttribute('aria-pressed', false);
  }
};

var selectPin = function (target) {
  target.classList.add('pin--active');
  target.setAttribute('aria-pressed', true);
  dialog.style.display = 'block';
};

pinMap.addEventListener('click', function (evt) {
  if (evt.path < 8) {
    return;
  }
  clearPins();
  if (evt.target.tagName === 'div') {
    var selectedPin = evt.target;
  } else {
    var selectedPin = evt.path[1];
  }
  selectPin(selectedPin);
});

var isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER;
}

pinMap.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    clearPins();
    var selectedPin = evt.target;
    selectPin(selectedPin);
  }
});

var closeDialog = function () {
  dialog.style.display = 'none';
  var activePin = pinMap.querySelector('.pin--active');
  activePin.classList.remove('pin--active');
}

dialogClose.addEventListener('click', closeDialog);

dialogClose.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    closeDialog();
  }
});

var title = document.querySelector('#title');
var price = document.querySelector('#price');
var address = document.querySelector('#address');

var makeFieldRequired = function (field) {
  field.required = true;
};

makeFieldRequired(title);
makeFieldRequired(price);
makeFieldRequired(address);

title.setAttribute('minlength', 30);
title.setAttribute('maxlength', 100);

price.type = 'number';
price.min = 1000;
price.max = 1000000;

var time = document.querySelector('#time');
var timeout = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var changeFieldsTogether = function (selectedField, dependentField) {
  selectedField.addEventListener('change', function () {
    var selectedOption = 0;
    for (i = 0; i < selectedField.options.length; i++) {
      if (selectedField.options[i].selected) {
        selectedOption = i;
      }
    }
    var selectedValue = selectedField.options[selectedOption].value;
    var dependentOption = 0;
    for (i = 0; i < dependentField.options.length; i++) {
      if (dependentField.options[i].value === selectedValue) {
        dependentOption = i;
      }
    }
    dependentField.options[dependentOption].selected = true;
  });
};

changeFieldsTogether(time, timeout);
changeFieldsTogether(timeout, time);
changeFieldsTogether(roomNumber, capacity);
changeFieldsTogether(capacity, roomNumber);

var apartmentType = document.querySelector('#type');

apartmentType.addEventListener('change', function () {
  var selectedType = 0;
  for (i = 0; i < apartmentType.options.length; i++) {
    if (apartmentType.options[i].selected) {
      selectedType = i;
    }
  }
  var minPrice = apartmentType.options[selectedType].value;
  price.min = minPrice;
});
