'use strict';

(function () {
    var BURGER_OPENED_CLASS = 'page-header__menu-button--opened'; // Класс у кнопки при открытом меню
    var BURGER_CLOSED_CLASS = 'page-header__menu-button--closed'; // Класс у кнопки при закрытом меню
    var MENU_OPENED_CLASS = 'menu--opened'; // Класс открытого меню
    var MENU_CLOSED_CLASS = 'menu--closed'; // Класс закрытого меню
    var OVERLAY_ACTIVE_CLASS = 'overlay--active'; // Класс активного затемняющего слоя

    var burgerElement = document.querySelector('.page-header__menu-button'); // Кнопка меню
    var menuElement = document.querySelector('.menu'); // Меню
    var overlayElement = document.querySelector('#overlay'); // Затемняющий слой
    var internalLinksElements = document.querySelectorAll('.menu__link'); // Внутренние ссылки

    var initMenu = function (burger, menu, overlay, internalLinks) {
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
      var closeOpenMenu = function (evt) {
        if (evt) {
          evt.preventDefault();
        }
        switchBurger();
        switchMenu();
        if (overlay) {
          switchOverlay();
        }
      };

      // При нажатии на ссылку закрывает меню
      var onInternalLinkClick = function () {
        closeOpenMenu();
      };

      // Обработчик клика на кнопке меню
      burger.addEventListener('click', closeOpenMenu);

      // Слушатели для внутренних ссылок. При переходе меню закрывается
      internalLinks.forEach(function (link) {
        link.addEventListener('click', onInternalLinkClick);
      });

      // По тапу на затемняющий слой закрывается меню
      overlay.addEventListener('click', closeOpenMenu);
    };

    // Подключаем все элементы
    initMenu(burgerElement, menuElement, overlayElement, internalLinksElements);
})();
