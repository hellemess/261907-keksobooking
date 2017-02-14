'use strict';

window.synchronizeFields = function (selectedField, dependentField, selectedArray, dependentArray, dependentAttribute) {
  for (var i = 0; i < Math.max(selectedArray.length, dependentArray.length); i++) {
    if (selectedField[i]) {
      selectedField[i].value = selectedArray[i];
    }
    if (dependentField[i]) {
      dependentField[i][dependentAttribute] = dependentArray[i];
    }
  }
  selectedField.addEventListener('change', function () {
    dependentField[dependentAttribute] = selectedField.value;
  });
};
