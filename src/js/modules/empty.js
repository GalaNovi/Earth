'use strict';

(function () {
    var button = document.querySelector('button');
    var elements = document.querySelectorAll('li');

    button.addEventListener('click', function () {
        elements.forEach(function (element) {
            element.style.color = 'lightgreen';
        });
    });
})();
