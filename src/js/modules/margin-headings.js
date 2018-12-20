'use strict';

(function () {
  var headingsElements = document.querySelectorAll('.heading--margin-js');
  var containerElement = document.querySelector('.container--heading-js');

  var initHeadings = function (headings, container) {
    var distanse = container.offsetLeft;

    headings.forEach(function (heading) {
      heading.style.marginLeft = distanse + 'px';
    });
  };

  window.addEventListener('resize', function () {
    initHeadings(headingsElements, containerElement);
  });

  initHeadings(headingsElements, containerElement);
})();
