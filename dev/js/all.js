'use strict';

(function () {
    var burgerElement = document.querySelector('.page-header__menu-button'); // Кнопка меню
    var menuElement = document.querySelector('.menu'); // Меню
    var overlayElement = document.querySelector('#overlay'); // Затемняющий слой
    var internalLinksElements = document.querySelectorAll('.menu__link'); // Внутренние ссылки

    var initMenu = function (burger, menu, overlay, internalLinks) {
      var BURGER_OPENED_CLASS = 'page-header__menu-button--opened'; // Класс у кнопки при открытом меню
      var BURGER_CLOSED_CLASS = 'page-header__menu-button--closed'; // Класс у кнопки при закрытом меню
      var MENU_OPENED_CLASS = 'menu--opened'; // Класс открытого меню
      var MENU_CLOSED_CLASS = 'menu--closed'; // Класс закрытого меню
      var OVERLAY_ACTIVE_CLASS = 'overlay--active'; // Класс активного затемняющего слоя

      // Переключает кнопку меню
      var switchBurger = function () {
        burger.classList.toggle(BURGER_CLOSED_CLASS);
        burger.classList.toggle(BURGER_OPENED_CLASS);
      };

      // Переключает меню
      var switchMenu = function () {
        if (menu.classList.contains(MENU_CLOSED_CLASS)) {
          menu.classList.toggle(MENU_OPENED_CLASS);
          menu.classList.toggle(MENU_CLOSED_CLASS);
          menu.style.display = 'block';
        } else {
          menu.classList.toggle(MENU_OPENED_CLASS);
          menu.classList.toggle(MENU_CLOSED_CLASS);
          setTimeout(function () {
            menu.style.display = '';
          }, 500);
        }
      };

      // Переключает затемняющий слой
      var switchOverlay = function () {
        overlay.classList.toggle(OVERLAY_ACTIVE_CLASS);
      };

      // Действия прри клике на кнопку меню
      var closeOpenMenu = function () {
        switchBurger();
        switchMenu();
        if (overlay) {
          switchOverlay();
        }
      };

      // Обработчик клика на кнопке меню
      burger.addEventListener('click', closeOpenMenu);

      // Слушатели для внутренних ссылок. При переходе меню закрывается
      internalLinks.forEach(function (link) {
        link.addEventListener('click', closeOpenMenu);
      });

      // По тапу на затемняющий слой закрывается меню
      overlay.addEventListener('click', closeOpenMenu);
    };

    // Подключаем все элементы
    initMenu(burgerElement, menuElement, overlayElement, internalLinksElements);
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYnVyZ2VyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcl9fbWVudS1idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwINC80LXQvdGOXG4gICAgdmFyIG1lbnVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTsgLy8g0JzQtdC90Y5cbiAgICB2YXIgb3ZlcmxheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpOyAvLyDQl9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgdmFyIGludGVybmFsTGlua3NFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7IC8vINCS0L3Rg9GC0YDQtdC90L3QuNC1INGB0YHRi9C70LrQuFxuXG4gICAgdmFyIGluaXRNZW51ID0gZnVuY3Rpb24gKGJ1cmdlciwgbWVudSwgb3ZlcmxheSwgaW50ZXJuYWxMaW5rcykge1xuICAgICAgdmFyIEJVUkdFUl9PUEVORURfQ0xBU1MgPSAncGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uLS1vcGVuZWQnOyAvLyDQmtC70LDRgdGBINGDINC60L3QvtC/0LrQuCDQv9GA0Lgg0L7RgtC60YDRi9GC0L7QvCDQvNC10L3RjlxuICAgICAgdmFyIEJVUkdFUl9DTE9TRURfQ0xBU1MgPSAncGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uLS1jbG9zZWQnOyAvLyDQmtC70LDRgdGBINGDINC60L3QvtC/0LrQuCDQv9GA0Lgg0LfQsNC60YDRi9GC0L7QvCDQvNC10L3RjlxuICAgICAgdmFyIE1FTlVfT1BFTkVEX0NMQVNTID0gJ21lbnUtLW9wZW5lZCc7IC8vINCa0LvQsNGB0YEg0L7RgtC60YDRi9GC0L7Qs9C+INC80LXQvdGOXG4gICAgICB2YXIgTUVOVV9DTE9TRURfQ0xBU1MgPSAnbWVudS0tY2xvc2VkJzsgLy8g0JrQu9Cw0YHRgSDQt9Cw0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y5cbiAgICAgIHZhciBPVkVSTEFZX0FDVElWRV9DTEFTUyA9ICdvdmVybGF5LS1hY3RpdmUnOyAvLyDQmtC70LDRgdGBINCw0LrRgtC40LLQvdC+0LPQviDQt9Cw0YLQtdC80L3Rj9GO0YnQtdCz0L4g0YHQu9C+0Y9cblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQutC90L7Qv9C60YMg0LzQtdC90Y5cbiAgICAgIHZhciBzd2l0Y2hCdXJnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKEJVUkdFUl9DTE9TRURfQ0xBU1MpO1xuICAgICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShCVVJHRVJfT1BFTkVEX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LzQtdC90Y5cbiAgICAgIHZhciBzd2l0Y2hNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobWVudS5jbGFzc0xpc3QuY29udGFpbnMoTUVOVV9DTE9TRURfQ0xBU1MpKSB7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9DTE9TRURfQ0xBU1MpO1xuICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9DTE9TRURfQ0xBU1MpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgICB2YXIgc3dpdGNoT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKE9WRVJMQVlfQUNUSVZFX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCU0LXQudGB0YLQstC40Y8g0L/RgNGA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvNC10L3RjlxuICAgICAgdmFyIGNsb3NlT3Blbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaEJ1cmdlcigpO1xuICAgICAgICBzd2l0Y2hNZW51KCk7XG4gICAgICAgIGlmIChvdmVybGF5KSB7XG4gICAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQntCx0YDQsNCx0L7RgtGH0LjQuiDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutC1INC80LXQvdGOXG4gICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU9wZW5NZW51KTtcblxuICAgICAgLy8g0KHQu9GD0YjQsNGC0LXQu9C4INC00LvRjyDQstC90YPRgtGA0LXQvdC90LjRhSDRgdGB0YvQu9C+0LouINCf0YDQuCDQv9C10YDQtdGF0L7QtNC1INC80LXQvdGOINC30LDQutGA0YvQstCw0LXRgtGB0Y9cbiAgICAgIGludGVybmFsTGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPcGVuTWVudSk7XG4gICAgICB9KTtcblxuICAgICAgLy8g0J/QviDRgtCw0L/RgyDQvdCwINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0Lkg0LfQsNC60YDRi9Cy0LDQtdGC0YHRjyDQvNC10L3RjlxuICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuICAgIH07XG5cbiAgICAvLyDQn9C+0LTQutC70Y7Rh9Cw0LXQvCDQstGB0LUg0Y3Qu9C10LzQtdC90YLRi1xuICAgIGluaXRNZW51KGJ1cmdlckVsZW1lbnQsIG1lbnVFbGVtZW50LCBvdmVybGF5RWxlbWVudCwgaW50ZXJuYWxMaW5rc0VsZW1lbnRzKTtcbn0pKCk7XG4iXX0=
