'use strict';

window.utils = (function () {
  var isDragging = false;
  var startPoint;
  var onAddressRequest = null;

  var ENTER = 13;
  var ESC = 27;

  return {
    clearPins: function () {
      var activePin = document.querySelector('.pin--active');

      if (activePin !== null) {
        activePin.setAttribute('aria-pressed', false);
        activePin.classList.remove('pin--active');
      }
    },
    createButton: function (button, queueRanking) {
      button.setAttribute('role', 'button');
      button.setAttribute('aria-pressed', false);
      button.setAttribute('tabindex', queueRanking);
    },
    dragElement: function (element, cb) {
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startPoint.x - moveEvt.clientX,
          y: startPoint.y - moveEvt.clientY,
        };

        element.style.top = element.offsetTop - shift.y + 'px';
        element.style.left = element.offsetLeft - shift.x + 'px';

        startPoint = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        onAddressRequest = cb;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        isDragging = false;

        if (typeof onAddressRequest === 'function') {
          onAddressRequest(upEvt);
        }
      };

      element.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        if (isDragging) {
          onMouseUp();
        }

        isDragging = true;

        startPoint = {
          x: evt.clientX,
          y: evt.clientY
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    },
    getArrayOfRandomIndexes: function (array, quantity) {
      var indexes = [];
      var randomIndexes = [];

      for (var i = 0; i < array.length; i++) {
        indexes.push(i);
      }

      for (i = 0; i < quantity; i++) {
        var randomPin = indexes[Math.floor(Math.random() * indexes.length)];
        indexes.splice(indexes.indexOf(randomPin), 1);
        randomIndexes.push(randomPin);
      }

      return randomIndexes;
    },
    isActivationEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER;
    },
    isDeactivationEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ESC;
    }
  };
})();
