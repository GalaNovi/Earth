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
        evt.preventDefault();
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

'use strict';

(function () {
    var POPUP_ACTIVE_CLASS = 'popup--active';
    var OVERLAY_ACTIVE_CLASS = 'overlay--active';
    var CLOSE_BUTTON_CLASS = 'popup__close';

    var callButtonElement = document.querySelector('.menu__tel-button'); // Кнопка "Позвоните мне"
    var callPopupElement = document.querySelector('.popup--call'); // Попап "Заказать звонок"
    var costButtonElement = document.querySelector('.main-order__button'); // Кнопка "Узнать стоимость"
    var costPopupElement = document.querySelector('.popup--cost'); // Попап "Узнать стоимость"
    var videoButtonElement = document.querySelector('.location__button'); // Кнопка "Получить видеосъемку с воздуха"
    var videoPopupElement = document.querySelector('.popup--video'); // Попап "Получить видеосъемку с воздуха"
    var actionButtonElement = document.querySelector('.conditions__button'); // Кнопка "Принять участие"
    var actionPopupElement = document.querySelector('.popup--action'); // Попап "Участие в акции"
    var offerButtonElement = document.querySelector('.advantages__button'); // Кнопка "Получить коммерческое предложение"
    var offerPopupElement = document.querySelector('.popup--offer'); // Попап "Ваше коммерческое предложение"
    var callbackButtonElement = document.querySelector('.contacts__button'); // Кнопка "Свяжитесь со мной"
    var callbackPopupElement = document.querySelector('.popup--callback'); // Попап "Обратная связь"
    var overlayElement = document.querySelector('#overlay-popup'); // Затемняющий слой

    // Главная функция инициализации
    var initPopup = function (button, popup, overlay) {
      var ESC_KEYCODE = 27;
      var ENTER_KEYCODE = 13;
      var closeButton = popup.querySelector('.' + CLOSE_BUTTON_CLASS);
      var bodyElement = document.querySelector('body');

      // При клике на крестик, закрывает попап
      var onCloseButtonClick = function (evt) {
        evt.preventDefault();
        closePopup();
      };

      // При нажатии Enter на крестике закрывает попап
      var onCloseButtonKeydown = function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          evt.preventDefault();
          closePopup();
        }
      };

      // При нажатии ESC закрывает попап
      var onWindowKeydown = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          evt.preventDefault();
          closePopup();
        }
      };

      // При клике на затемняющий слой, закрывает попап
      var onOverlayClick = function () {
        closePopup();
      };

      // Открывает попап, навешивает обработчики
      var openPopup = function () {
        popup.classList.add(POPUP_ACTIVE_CLASS);
        closeButton.addEventListener('click', onCloseButtonClick);
        closeButton.addEventListener('keydown', onCloseButtonKeydown);
        window.addEventListener('keydown', onWindowKeydown);
        overlay.addEventListener('click', onOverlayClick);
        switchOverlay();
        bodyElement.style.overflow = 'hidden';
      };

      // Закрывает попап, удаляет обработчики
      var closePopup = function () {
        popup.classList.remove(POPUP_ACTIVE_CLASS);
        closeButton.removeEventListener('click', onCloseButtonClick);
        closeButton.removeEventListener('keydown', onCloseButtonKeydown);
        window.removeEventListener('keydown', onWindowKeydown);
        overlay.removeEventListener('click', onOverlayClick);
        switchOverlay();
        bodyElement.style.overflow = '';
      };

      // Переключает затемняющий слой
      var switchOverlay = function () {
        overlay.classList.toggle(OVERLAY_ACTIVE_CLASS);
      };

      // При клике на кнопку открывается попап
      var onButtonClick = function (evt) {
        evt.preventDefault();
        openPopup();
      };

      // Навешиваем обработчик на кнопку
      button.addEventListener('click', onButtonClick);
    };

    // Инициализируем все попапы
    initPopup(costButtonElement, costPopupElement, overlayElement);
    initPopup(callButtonElement, callPopupElement, overlayElement);
    initPopup(videoButtonElement, videoPopupElement, overlayElement);
    initPopup(actionButtonElement, actionPopupElement, overlayElement);
    initPopup(offerButtonElement, offerPopupElement, overlayElement);
    initPopup(callbackButtonElement, callbackPopupElement, overlayElement);
})();

// Слайдер в галерее

$('.gallery__list').slick({
  accessibility: false,
  infinite: false,
  prevArrow: '<button class="gallery__list-arrow gallery__list-arrow--previous" type="button"><span class="visually-hidden">Предыдущий слайд</span></button>',
  nextArrow: '<button class="gallery__list-arrow gallery__list-arrow--next" type="button"><span class="visually-hidden">Следующий слайд</span></button>',
  asNavFor: '.gallery__list-text'
});

$(".gallery__list-text").on("init", function(event, slick) {
  if (slick.currentSlide + 1 < 10) {
    $(".gallery__current-item").text('0' + parseInt(slick.currentSlide + 1));
  } else {
    $(".gallery__current-item").text(parseInt(slick.currentSlide + 1));
  };
  if (slick.slideCount < 10) {
    $(".gallery__all-items").text('0' + parseInt(slick.slideCount));
  } else {
    $(".gallery__all-items").text(parseInt(slick.slideCount));
  };
});

$(".gallery__list-text").on("afterChange", function(event, slick, currentSlide) {
  if (slick.currentSlide + 1 < 10) {
    $(".gallery__current-item").text('0' + parseInt(slick.currentSlide + 1));
  } else {
    $(".gallery__current-item").text(parseInt(slick.currentSlide + 1));
  };
  if (slick.slideCount < 10) {
    $(".gallery__all-items").text('0' + parseInt(slick.slideCount));
  } else {
    $(".gallery__all-items").text(parseInt(slick.slideCount));
  };
});

$('.gallery__list-text').slick({
  fade: true,
  accessibility: false,
  infinite: false,
  arrows: false,
  asNavFor: '.gallery__list'
});


// Слайдер в блоке "Сколько это в цифрах"
$('.comparing__list').slick({
  accessibility: false,
  variableWidth: true,
  centerMode: true,
  dots: true,
  prevArrow: '<button class="comparing__list-arrow comparing__list-arrow--previous" type="button"><span class="visually-hidden">Предыдущий слайд</span></button>',
  nextArrow: '<button class="comparing__list-arrow comparing__list-arrow--next" type="button"><span class="visually-hidden">Следующий слайд</span></button>'
});

'use-strict';

(function () {
  var BUTTON_ACTIVE_CLASS = 'use__button--active'; // Класс активной кнопки
  var BLOCK_ACTIVE_CLASS = 'use__list--active'; // Класс активного блока

  var buttonsElements = document.querySelectorAll('.use__button'); // Кнопки
  var blocksElements = document.querySelectorAll('.use__list'); // Блоки

  // Главная функция инициализации переключателя
  var initSwitcher = function (buttons, blocks) {

    // Переключает блок по нажатой кнопке
    var switchBlock = function (clickedButton, clickedButtonIndex) {
      buttons.forEach(function (button) {
        button.classList.remove(BUTTON_ACTIVE_CLASS);
      });
      clickedButton.classList.add(BUTTON_ACTIVE_CLASS);
      blocks.forEach(function (block) {
        block.classList.remove(BLOCK_ACTIVE_CLASS);
      });
      blocks[clickedButtonIndex].classList.add(BLOCK_ACTIVE_CLASS);
    };

    // Обработчики для кнопок
    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        switchBlock(button, index);
      });
    });
  };

  // Инициализация
  initSwitcher(buttonsElements, blocksElements);
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwb3B1cHMuanMiLCJzbGlkZXJzLmpzIiwidXNlLXN3aXRjaGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQlVSR0VSX09QRU5FRF9DTEFTUyA9ICdwYWdlLWhlYWRlcl9fbWVudS1idXR0b24tLW9wZW5lZCc7IC8vINCa0LvQsNGB0YEg0YMg0LrQvdC+0L/QutC4INC/0YDQuCDQvtGC0LrRgNGL0YLQvtC8INC80LXQvdGOXG4gICAgdmFyIEJVUkdFUl9DTE9TRURfQ0xBU1MgPSAncGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uLS1jbG9zZWQnOyAvLyDQmtC70LDRgdGBINGDINC60L3QvtC/0LrQuCDQv9GA0Lgg0LfQsNC60YDRi9GC0L7QvCDQvNC10L3RjlxuICAgIHZhciBNRU5VX09QRU5FRF9DTEFTUyA9ICdtZW51LS1vcGVuZWQnOyAvLyDQmtC70LDRgdGBINC+0YLQutGA0YvRgtC+0LPQviDQvNC10L3RjlxuICAgIHZhciBNRU5VX0NMT1NFRF9DTEFTUyA9ICdtZW51LS1jbG9zZWQnOyAvLyDQmtC70LDRgdGBINC30LDQutGA0YvRgtC+0LPQviDQvNC10L3RjlxuICAgIHZhciBPVkVSTEFZX0FDVElWRV9DTEFTUyA9ICdvdmVybGF5LS1hY3RpdmUnOyAvLyDQmtC70LDRgdGBINCw0LrRgtC40LLQvdC+0LPQviDQt9Cw0YLQtdC80L3Rj9GO0YnQtdCz0L4g0YHQu9C+0Y9cblxuICAgIHZhciBidXJnZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAg0LzQtdC90Y5cbiAgICB2YXIgbWVudUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpOyAvLyDQnNC10L3RjlxuICAgIHZhciBvdmVybGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jyk7IC8vINCX0LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcbiAgICB2YXIgaW50ZXJuYWxMaW5rc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTsgLy8g0JLQvdGD0YLRgNC10L3QvdC40LUg0YHRgdGL0LvQutC4XG5cbiAgICB2YXIgaW5pdE1lbnUgPSBmdW5jdGlvbiAoYnVyZ2VyLCBtZW51LCBvdmVybGF5LCBpbnRlcm5hbExpbmtzKSB7XG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINC60L3QvtC/0LrRgyDQvNC10L3RjlxuICAgICAgdmFyIHN3aXRjaEJ1cmdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoQlVSR0VSX0NMT1NFRF9DTEFTUyk7XG4gICAgICAgIGJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKEJVUkdFUl9PUEVORURfQ0xBU1MpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQvNC10L3RjlxuICAgICAgdmFyIHN3aXRjaE1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChtZW51LmNsYXNzTGlzdC5jb250YWlucyhNRU5VX0NMT1NFRF9DTEFTUykpIHtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9PUEVORURfQ0xBU1MpO1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX0NMT1NFRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9PUEVORURfQ0xBU1MpO1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX0NMT1NFRF9DTEFTUyk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcbiAgICAgIHZhciBzd2l0Y2hPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgfTtcblxuICAgICAgLy8g0JTQtdC50YHRgtCy0LjRjyDQv9GA0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINC80LXQvdGOXG4gICAgICB2YXIgY2xvc2VPcGVuTWVudSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHN3aXRjaEJ1cmdlcigpO1xuICAgICAgICBzd2l0Y2hNZW51KCk7XG4gICAgICAgIGlmIChvdmVybGF5KSB7XG4gICAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQntCx0YDQsNCx0L7RgtGH0LjQuiDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutC1INC80LXQvdGOXG4gICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU9wZW5NZW51KTtcblxuICAgICAgLy8g0KHQu9GD0YjQsNGC0LXQu9C4INC00LvRjyDQstC90YPRgtGA0LXQvdC90LjRhSDRgdGB0YvQu9C+0LouINCf0YDQuCDQv9C10YDQtdGF0L7QtNC1INC80LXQvdGOINC30LDQutGA0YvQstCw0LXRgtGB0Y9cbiAgICAgIGludGVybmFsTGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPcGVuTWVudSk7XG4gICAgICB9KTtcblxuICAgICAgLy8g0J/QviDRgtCw0L/RgyDQvdCwINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0Lkg0LfQsNC60YDRi9Cy0LDQtdGC0YHRjyDQvNC10L3RjlxuICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuICAgIH07XG5cbiAgICAvLyDQn9C+0LTQutC70Y7Rh9Cw0LXQvCDQstGB0LUg0Y3Qu9C10LzQtdC90YLRi1xuICAgIGluaXRNZW51KGJ1cmdlckVsZW1lbnQsIG1lbnVFbGVtZW50LCBvdmVybGF5RWxlbWVudCwgaW50ZXJuYWxMaW5rc0VsZW1lbnRzKTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIFBPUFVQX0FDVElWRV9DTEFTUyA9ICdwb3B1cC0tYWN0aXZlJztcbiAgICB2YXIgT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MgPSAnb3ZlcmxheS0tYWN0aXZlJztcbiAgICB2YXIgQ0xPU0VfQlVUVE9OX0NMQVNTID0gJ3BvcHVwX19jbG9zZSc7XG5cbiAgICB2YXIgY2FsbEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fdGVsLWJ1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LfQstC+0L3QuNGC0LUg0LzQvdC1XCJcbiAgICB2YXIgY2FsbFBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY2FsbCcpOyAvLyDQn9C+0L/QsNC/IFwi0JfQsNC60LDQt9Cw0YLRjCDQt9Cy0L7QvdC+0LpcIlxuICAgIHZhciBjb3N0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW9yZGVyX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0KPQt9C90LDRgtGMINGB0YLQvtC40LzQvtGB0YLRjFwiXG4gICAgdmFyIGNvc3RQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNvc3QnKTsgLy8g0J/QvtC/0LDQvyBcItCj0LfQvdCw0YLRjCDRgdGC0L7QuNC80L7RgdGC0YxcIlxuICAgIHZhciB2aWRlb0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb25fX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LvRg9GH0LjRgtGMINCy0LjQtNC10L7RgdGK0LXQvNC60YPCoNGBwqDQstC+0LfQtNGD0YXQsFwiXG4gICAgdmFyIHZpZGVvUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS12aWRlbycpOyAvLyDQn9C+0L/QsNC/IFwi0J/QvtC70YPRh9C40YLRjCDQstC40LTQtdC+0YHRitC10LzQutGDwqDRgcKg0LLQvtC30LTRg9GF0LBcIlxuICAgIHZhciBhY3Rpb25CdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbnNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9GA0LjQvdGP0YLRjCDRg9GH0LDRgdGC0LjQtVwiXG4gICAgdmFyIGFjdGlvblBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tYWN0aW9uJyk7IC8vINCf0L7Qv9Cw0L8gXCLQo9GH0LDRgdGC0LjQtSDQsiDQsNC60YbQuNC4XCJcbiAgICB2YXIgb2ZmZXJCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkdmFudGFnZXNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LvRg9GH0LjRgtGMINC60L7QvNC80LXRgNGH0LXRgdC60L7QtSDQv9GA0LXQtNC70L7QttC10L3QuNC1XCJcbiAgICB2YXIgb2ZmZXJQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLW9mZmVyJyk7IC8vINCf0L7Qv9Cw0L8gXCLQktCw0YjQtSDQutC+0LzQvNC10YDRh9C10YHQutC+0LUg0L/RgNC10LTQu9C+0LbQtdC90LjQtVwiXG4gICAgdmFyIGNhbGxiYWNrQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0c19fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCh0LLRj9C20LjRgtC10YHRjCDRgdC+INC80L3QvtC5XCJcbiAgICB2YXIgY2FsbGJhY2tQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNhbGxiYWNrJyk7IC8vINCf0L7Qv9Cw0L8gXCLQntCx0YDQsNGC0L3QsNGPINGB0LLRj9C30YxcIlxuICAgIHZhciBvdmVybGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5LXBvcHVwJyk7IC8vINCX0LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcblxuICAgIC8vINCT0LvQsNCy0L3QsNGPINGE0YPQvdC60YbQuNGPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG4gICAgdmFyIGluaXRQb3B1cCA9IGZ1bmN0aW9uIChidXR0b24sIHBvcHVwLCBvdmVybGF5KSB7XG4gICAgICB2YXIgRVNDX0tFWUNPREUgPSAyNztcbiAgICAgIHZhciBFTlRFUl9LRVlDT0RFID0gMTM7XG4gICAgICB2YXIgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuJyArIENMT1NFX0JVVFRPTl9DTEFTUyk7XG4gICAgICB2YXIgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICAgIC8vINCf0YDQuCDQutC70LjQutC1INC90LAg0LrRgNC10YHRgtC40LosINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25DbG9zZUJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC90LDQttCw0YLQuNC4IEVudGVyINC90LAg0LrRgNC10YHRgtC40LrQtSDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uQ2xvc2VCdXR0b25LZXlkb3duID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT09IEVOVEVSX0tFWUNPREUpIHtcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQvdCw0LbQsNGC0LjQuCBFU0Mg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbldpbmRvd0tleWRvd24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQua2V5Q29kZSA9PT0gRVNDX0tFWUNPREUpIHtcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQutC70LjQutC1INC90LAg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuSwg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbk92ZXJsYXlDbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J7RgtC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L8sINC90LDQstC10YjQuNCy0LDQtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60LhcbiAgICAgIHZhciBvcGVuUG9wdXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoUE9QVVBfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsb3NlQnV0dG9uQ2xpY2spO1xuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25DbG9zZUJ1dHRvbktleWRvd24pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uV2luZG93S2V5ZG93bik7XG4gICAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk92ZXJsYXlDbGljayk7XG4gICAgICAgIHN3aXRjaE92ZXJsYXkoKTtcbiAgICAgICAgYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgIH07XG5cbiAgICAgIC8vINCX0LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/LCDRg9C00LDQu9GP0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4XG4gICAgICB2YXIgY2xvc2VQb3B1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShQT1BVUF9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xvc2VCdXR0b25DbGljayk7XG4gICAgICAgIGNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkNsb3NlQnV0dG9uS2V5ZG93bik7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25XaW5kb3dLZXlkb3duKTtcbiAgICAgICAgb3ZlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3ZlcmxheUNsaWNrKTtcbiAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICBib2R5RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgfTtcblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgICB2YXIgc3dpdGNoT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKE9WRVJMQVlfQUNUSVZFX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINC+0YLQutGA0YvQstCw0LXRgtGB0Y8g0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvcGVuUG9wdXAoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCd0LDQstC10YjQuNCy0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LrQvdC+0L/QutGDXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkJ1dHRvbkNsaWNrKTtcbiAgICB9O1xuXG4gICAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LjRgNGD0LXQvCDQstGB0LUg0L/QvtC/0LDQv9GLXG4gICAgaW5pdFBvcHVwKGNvc3RCdXR0b25FbGVtZW50LCBjb3N0UG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGNhbGxCdXR0b25FbGVtZW50LCBjYWxsUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKHZpZGVvQnV0dG9uRWxlbWVudCwgdmlkZW9Qb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAoYWN0aW9uQnV0dG9uRWxlbWVudCwgYWN0aW9uUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKG9mZmVyQnV0dG9uRWxlbWVudCwgb2ZmZXJQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAoY2FsbGJhY2tCdXR0b25FbGVtZW50LCBjYWxsYmFja1BvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xufSkoKTtcbiIsIi8vINCh0LvQsNC50LTQtdGAINCyINCz0LDQu9C10YDQtdC1XG5cbiQoJy5nYWxsZXJ5X19saXN0Jykuc2xpY2soe1xuICBhY2Nlc3NpYmlsaXR5OiBmYWxzZSxcbiAgaW5maW5pdGU6IGZhbHNlLFxuICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiZ2FsbGVyeV9fbGlzdC1hcnJvdyBnYWxsZXJ5X19saXN0LWFycm93LS1wcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImdhbGxlcnlfX2xpc3QtYXJyb3cgZ2FsbGVyeV9fbGlzdC1hcnJvdy0tbmV4dFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCh0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIGFzTmF2Rm9yOiAnLmdhbGxlcnlfX2xpc3QtdGV4dCdcbn0pO1xuXG4kKFwiLmdhbGxlcnlfX2xpc3QtdGV4dFwiKS5vbihcImluaXRcIiwgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XG4gIGlmIChzbGljay5jdXJyZW50U2xpZGUgKyAxIDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfTtcbiAgaWYgKHNsaWNrLnNsaWRlQ291bnQgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQocGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9O1xufSk7XG5cbiQoXCIuZ2FsbGVyeV9fbGlzdC10ZXh0XCIpLm9uKFwiYWZ0ZXJDaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUpIHtcbiAgaWYgKHNsaWNrLmN1cnJlbnRTbGlkZSArIDEgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQocGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9O1xuICBpZiAoc2xpY2suc2xpZGVDb3VudCA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dChwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH07XG59KTtcblxuJCgnLmdhbGxlcnlfX2xpc3QtdGV4dCcpLnNsaWNrKHtcbiAgZmFkZTogdHJ1ZSxcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIGluZmluaXRlOiBmYWxzZSxcbiAgYXJyb3dzOiBmYWxzZSxcbiAgYXNOYXZGb3I6ICcuZ2FsbGVyeV9fbGlzdCdcbn0pO1xuXG5cbi8vINCh0LvQsNC50LTQtdGAINCyINCx0LvQvtC60LUgXCLQodC60L7Qu9GM0LrQviDRjdGC0L4g0LIg0YbQuNGE0YDQsNGFXCJcbiQoJy5jb21wYXJpbmdfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICBjZW50ZXJNb2RlOiB0cnVlLFxuICBkb3RzOiB0cnVlLFxuICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiY29tcGFyaW5nX19saXN0LWFycm93IGNvbXBhcmluZ19fbGlzdC1hcnJvdy0tcHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJjb21wYXJpbmdfX2xpc3QtYXJyb3cgY29tcGFyaW5nX19saXN0LWFycm93LS1uZXh0XCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0KHQu9C10LTRg9GO0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+J1xufSk7XG4iLCIndXNlLXN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBCVVRUT05fQUNUSVZFX0NMQVNTID0gJ3VzZV9fYnV0dG9uLS1hY3RpdmUnOyAvLyDQmtC70LDRgdGBINCw0LrRgtC40LLQvdC+0Lkg0LrQvdC+0L/QutC4XG4gIHZhciBCTE9DS19BQ1RJVkVfQ0xBU1MgPSAndXNlX19saXN0LS1hY3RpdmUnOyAvLyDQmtC70LDRgdGBINCw0LrRgtC40LLQvdC+0LPQviDQsdC70L7QutCwXG5cbiAgdmFyIGJ1dHRvbnNFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LhcbiAgdmFyIGJsb2Nrc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZV9fbGlzdCcpOyAvLyDQkdC70L7QutC4XG5cbiAgLy8g0JPQu9Cw0LLQvdCw0Y8g0YTRg9C90LrRhtC40Y8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70Y9cbiAgdmFyIGluaXRTd2l0Y2hlciA9IGZ1bmN0aW9uIChidXR0b25zLCBibG9ja3MpIHtcblxuICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LHQu9C+0Log0L/QviDQvdCw0LbQsNGC0L7QuSDQutC90L7Qv9C60LVcbiAgICB2YXIgc3dpdGNoQmxvY2sgPSBmdW5jdGlvbiAoY2xpY2tlZEJ1dHRvbiwgY2xpY2tlZEJ1dHRvbkluZGV4KSB7XG4gICAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbikge1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShCVVRUT05fQUNUSVZFX0NMQVNTKTtcbiAgICAgIH0pO1xuICAgICAgY2xpY2tlZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKEJVVFRPTl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgYmxvY2tzLmZvckVhY2goZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgICAgIGJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoQkxPQ0tfQUNUSVZFX0NMQVNTKTtcbiAgICAgIH0pO1xuICAgICAgYmxvY2tzW2NsaWNrZWRCdXR0b25JbmRleF0uY2xhc3NMaXN0LmFkZChCTE9DS19BQ1RJVkVfQ0xBU1MpO1xuICAgIH07XG5cbiAgICAvLyDQntCx0YDQsNCx0L7RgtGH0LjQutC4INC00LvRjyDQutC90L7Qv9C+0LpcbiAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbiwgaW5kZXgpIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoQmxvY2soYnV0dG9uLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xuICBpbml0U3dpdGNoZXIoYnV0dG9uc0VsZW1lbnRzLCBibG9ja3NFbGVtZW50cyk7XG59KSgpO1xuIl19
