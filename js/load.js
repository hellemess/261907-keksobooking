'use strict';

window.load = (function () {
  return function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status >= 400) {
        onError('Произошла ошибка загрузки. Статус ошибки: ' + evt.target.status + '.');
      } else if (evt.target.status >= 200) {
        onLoad(evt.target.response);
      }
    });

    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);

    xhr.open('GET', url);
    xhr.send();
  };
})();
