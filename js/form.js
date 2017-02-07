'use strict';

var pin = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');

for (var i = 0; i < pin.length; i++) {
  pin[i].addEventListener('click', function () {
    for (var j = 0; j < pin.length; j++) {
      pin[j].classList.remove('pin--active');
    }
    this.classList.add('pin--active');
    dialog.style.display = 'block';
  });
}

var dialogClose = dialog.querySelector('.dialog__close');

dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
  var activePin = document.querySelector('.pin--active');
  activePin.classList.remove('pin--active');
});

var title = document.querySelector('#title');
var price = document.querySelector('#price');
var address = document.querySelector('#address');

var requiredField = function (field) {
  field.required = true;
}

requiredField(title);
requiredField(price);
requiredField(address);

title.minlength = 30;
title.maxlength = 100;

price.type = 'number';
price.min = 1000;
price.max = 1000000;

var time = document.querySelector('#time');
var timeout = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var autoFieldChanger = function(selectedField, dependentField) {
  selectedField.addEventListener('change', function() {
    var selectedOption = 0;
    for (i = 0; i < selectedField.options.length; i++) {
      if (selectedField.options[i].selected) {
        selectedOption = i;
      }
    }
    var selectedValue = selectedField.options[selectedOption].value;
    var dependentOption = 0;
    for (i = 0; i < dependentField.options.length; i++) {
      if (dependentField.options[i].value == selectedValue) {
        dependentOption = i;
      }
    }
    dependentField.options[dependentOption].selected = true;
  });
}

autoFieldChanger(time, timeout);
autoFieldChanger(timeout, time);
autoFieldChanger(roomNumber, capacity);
autoFieldChanger(capacity, roomNumber);

var apartmentType = document.querySelector('#type');

apartmentType.addEventListener('change', function() {
  var selectedType = 0;
  for (i = 0; i < apartmentType.options.length; i++) {
    if (apartmentType.options[i].selected) {
      selectedType = i;
    }
  }
  var minPrice = apartmentType.options[selectedType].value;
  price.min = minPrice;
});
