'use strict';

window.synchronizeFields = (function () {
  return function (selectedField, dependentField, selectedArray, dependentArray, cb) {
    for (var i = 0; i < Math.max(selectedArray.length, dependentArray.length); i++) {
      if (selectedField[i]) {
        selectedField[i].value = selectedArray[i];
      }
      if (dependentField[i]) {
        dependentField[i].value = dependentArray[i];
      }
    }
    selectedField.addEventListener('change', function () {
      cb(dependentField, selectedField.value);
    });
  };
})();
