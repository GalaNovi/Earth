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
      var onOverlayClick = function (evt) {
        if (evt.target === overlay) {
          closePopup();
        }
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

// Слайдер в блоке "Преимущества"
$('.advantages__list').slick({
  accessibility: false,
  variableWidth: true,
  centerMode: true,
  adaptiveHeight: true,
  dots: true,
  prevArrow: '<button class="advantages__list-arrow advantages__list-arrow--previous" type="button"><span class="visually-hidden">Предыдущий слайд</span></button>',
  nextArrow: '<button class="advantages__list-arrow advantages__list-arrow--next" type="button"><span class="visually-hidden">Следующий слайд</span></button>'
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwb3B1cHMuanMiLCJzbGlkZXJzLmpzIiwidXNlLXN3aXRjaGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBCVVJHRVJfT1BFTkVEX0NMQVNTID0gJ3BhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbi0tb3BlbmVkJzsgLy8g0JrQu9Cw0YHRgSDRgyDQutC90L7Qv9C60Lgg0L/RgNC4INC+0YLQutGA0YvRgtC+0Lwg0LzQtdC90Y5cbiAgICB2YXIgQlVSR0VSX0NMT1NFRF9DTEFTUyA9ICdwYWdlLWhlYWRlcl9fbWVudS1idXR0b24tLWNsb3NlZCc7IC8vINCa0LvQsNGB0YEg0YMg0LrQvdC+0L/QutC4INC/0YDQuCDQt9Cw0LrRgNGL0YLQvtC8INC80LXQvdGOXG4gICAgdmFyIE1FTlVfT1BFTkVEX0NMQVNTID0gJ21lbnUtLW9wZW5lZCc7IC8vINCa0LvQsNGB0YEg0L7RgtC60YDRi9GC0L7Qs9C+INC80LXQvdGOXG4gICAgdmFyIE1FTlVfQ0xPU0VEX0NMQVNTID0gJ21lbnUtLWNsb3NlZCc7IC8vINCa0LvQsNGB0YEg0LfQsNC60YDRi9GC0L7Qs9C+INC80LXQvdGOXG4gICAgdmFyIE9WRVJMQVlfQUNUSVZFX0NMQVNTID0gJ292ZXJsYXktLWFjdGl2ZSc7IC8vINCa0LvQsNGB0YEg0LDQutGC0LjQstC90L7Qs9C+INC30LDRgtC10LzQvdGP0Y7RidC10LPQviDRgdC70L7Rj1xuXG4gICAgdmFyIGJ1cmdlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCDQvNC10L3RjlxuICAgIHZhciBtZW51RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7IC8vINCc0LXQvdGOXG4gICAgdmFyIG92ZXJsYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKTsgLy8g0JfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgIHZhciBpbnRlcm5hbExpbmtzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpOyAvLyDQktC90YPRgtGA0LXQvdC90LjQtSDRgdGB0YvQu9C60LhcblxuICAgIHZhciBpbml0TWVudSA9IGZ1bmN0aW9uIChidXJnZXIsIG1lbnUsIG92ZXJsYXksIGludGVybmFsTGlua3MpIHtcbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LrQvdC+0L/QutGDINC80LXQvdGOXG4gICAgICB2YXIgc3dpdGNoQnVyZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShCVVJHRVJfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoQlVSR0VSX09QRU5FRF9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINC80LXQvdGOXG4gICAgICB2YXIgc3dpdGNoTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKE1FTlVfQ0xPU0VEX0NMQVNTKSkge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX09QRU5FRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX09QRU5FRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgICAgdmFyIHN3aXRjaE92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShPVkVSTEFZX0FDVElWRV9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQlNC10LnRgdGC0LLQuNGPINC/0YDRgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0LzQtdC90Y5cbiAgICAgIHZhciBjbG9zZU9wZW5NZW51ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoQnVyZ2VyKCk7XG4gICAgICAgIHN3aXRjaE1lbnUoKTtcbiAgICAgICAgaWYgKG92ZXJsYXkpIHtcbiAgICAgICAgICBzd2l0Y2hPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINGB0YHRi9C70LrRgyDQt9Cw0LrRgNGL0LLQsNC10YIg0LzQtdC90Y5cbiAgICAgIHZhciBvbkludGVybmFsTGlua0NsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbG9zZU9wZW5NZW51KCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQntCx0YDQsNCx0L7RgtGH0LjQuiDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutC1INC80LXQvdGOXG4gICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU9wZW5NZW51KTtcblxuICAgICAgLy8g0KHQu9GD0YjQsNGC0LXQu9C4INC00LvRjyDQstC90YPRgtGA0LXQvdC90LjRhSDRgdGB0YvQu9C+0LouINCf0YDQuCDQv9C10YDQtdGF0L7QtNC1INC80LXQvdGOINC30LDQutGA0YvQstCw0LXRgtGB0Y9cbiAgICAgIGludGVybmFsTGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25JbnRlcm5hbExpbmtDbGljayk7XG4gICAgICB9KTtcblxuICAgICAgLy8g0J/QviDRgtCw0L/RgyDQvdCwINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0Lkg0LfQsNC60YDRi9Cy0LDQtdGC0YHRjyDQvNC10L3RjlxuICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuICAgIH07XG5cbiAgICAvLyDQn9C+0LTQutC70Y7Rh9Cw0LXQvCDQstGB0LUg0Y3Qu9C10LzQtdC90YLRi1xuICAgIGluaXRNZW51KGJ1cmdlckVsZW1lbnQsIG1lbnVFbGVtZW50LCBvdmVybGF5RWxlbWVudCwgaW50ZXJuYWxMaW5rc0VsZW1lbnRzKTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIFBPUFVQX0FDVElWRV9DTEFTUyA9ICdwb3B1cC0tYWN0aXZlJztcbiAgICB2YXIgT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MgPSAnb3ZlcmxheS0tYWN0aXZlJztcbiAgICB2YXIgQ0xPU0VfQlVUVE9OX0NMQVNTID0gJ3BvcHVwX19jbG9zZSc7XG5cbiAgICB2YXIgY2FsbEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fdGVsLWJ1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LfQstC+0L3QuNGC0LUg0LzQvdC1XCJcbiAgICB2YXIgY2FsbFBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY2FsbCcpOyAvLyDQn9C+0L/QsNC/IFwi0JfQsNC60LDQt9Cw0YLRjCDQt9Cy0L7QvdC+0LpcIlxuICAgIHZhciBjb3N0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW9yZGVyX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0KPQt9C90LDRgtGMINGB0YLQvtC40LzQvtGB0YLRjFwiXG4gICAgdmFyIGNvc3RQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNvc3QnKTsgLy8g0J/QvtC/0LDQvyBcItCj0LfQvdCw0YLRjCDRgdGC0L7QuNC80L7RgdGC0YxcIlxuICAgIHZhciB2aWRlb0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb25fX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LvRg9GH0LjRgtGMINCy0LjQtNC10L7RgdGK0LXQvNC60YPCoNGBwqDQstC+0LfQtNGD0YXQsFwiXG4gICAgdmFyIHZpZGVvUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS12aWRlbycpOyAvLyDQn9C+0L/QsNC/IFwi0J/QvtC70YPRh9C40YLRjCDQstC40LTQtdC+0YHRitC10LzQutGDwqDRgcKg0LLQvtC30LTRg9GF0LBcIlxuICAgIHZhciBhY3Rpb25CdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbnNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9GA0LjQvdGP0YLRjCDRg9GH0LDRgdGC0LjQtVwiXG4gICAgdmFyIGFjdGlvblBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tYWN0aW9uJyk7IC8vINCf0L7Qv9Cw0L8gXCLQo9GH0LDRgdGC0LjQtSDQsiDQsNC60YbQuNC4XCJcbiAgICB2YXIgb2ZmZXJCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkdmFudGFnZXNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LvRg9GH0LjRgtGMINC60L7QvNC80LXRgNGH0LXRgdC60L7QtSDQv9GA0LXQtNC70L7QttC10L3QuNC1XCJcbiAgICB2YXIgb2ZmZXJQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLW9mZmVyJyk7IC8vINCf0L7Qv9Cw0L8gXCLQktCw0YjQtSDQutC+0LzQvNC10YDRh9C10YHQutC+0LUg0L/RgNC10LTQu9C+0LbQtdC90LjQtVwiXG4gICAgdmFyIGNhbGxiYWNrQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0c19fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCh0LLRj9C20LjRgtC10YHRjCDRgdC+INC80L3QvtC5XCJcbiAgICB2YXIgY2FsbGJhY2tQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNhbGxiYWNrJyk7IC8vINCf0L7Qv9Cw0L8gXCLQntCx0YDQsNGC0L3QsNGPINGB0LLRj9C30YxcIlxuICAgIHZhciBvdmVybGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5LXBvcHVwJyk7IC8vINCX0LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcblxuICAgIC8vINCT0LvQsNCy0L3QsNGPINGE0YPQvdC60YbQuNGPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG4gICAgdmFyIGluaXRQb3B1cCA9IGZ1bmN0aW9uIChidXR0b24sIHBvcHVwLCBvdmVybGF5KSB7XG4gICAgICB2YXIgRVNDX0tFWUNPREUgPSAyNztcbiAgICAgIHZhciBFTlRFUl9LRVlDT0RFID0gMTM7XG4gICAgICB2YXIgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuJyArIENMT1NFX0JVVFRPTl9DTEFTUyk7XG4gICAgICB2YXIgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICAgIC8vINCf0YDQuCDQutC70LjQutC1INC90LAg0LrRgNC10YHRgtC40LosINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25DbG9zZUJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC90LDQttCw0YLQuNC4IEVudGVyINC90LAg0LrRgNC10YHRgtC40LrQtSDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uQ2xvc2VCdXR0b25LZXlkb3duID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT09IEVOVEVSX0tFWUNPREUpIHtcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQvdCw0LbQsNGC0LjQuCBFU0Mg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbldpbmRvd0tleWRvd24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQua2V5Q29kZSA9PT0gRVNDX0tFWUNPREUpIHtcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQutC70LjQutC1INC90LAg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuSwg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbk92ZXJsYXlDbGljayA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dC50YXJnZXQgPT09IG92ZXJsYXkpIHtcbiAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCe0YLQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/LCDQvdCw0LLQtdGI0LjQstCw0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4XG4gICAgICB2YXIgb3BlblBvcHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFBPUFVQX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbG9zZUJ1dHRvbkNsaWNrKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uQ2xvc2VCdXR0b25LZXlkb3duKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbldpbmRvd0tleWRvd24pO1xuICAgICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PdmVybGF5Q2xpY2spO1xuICAgICAgICBzd2l0Y2hPdmVybGF5KCk7XG4gICAgICAgIGJvZHlFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICB9O1xuXG4gICAgICAvLyDQl9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQvywg0YPQtNCw0LvRj9C10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICAgICAgdmFyIGNsb3NlUG9wdXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoUE9QVVBfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsb3NlQnV0dG9uQ2xpY2spO1xuICAgICAgICBjbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25DbG9zZUJ1dHRvbktleWRvd24pO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uV2luZG93S2V5ZG93bik7XG4gICAgICAgIG92ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk92ZXJsYXlDbGljayk7XG4gICAgICAgIHN3aXRjaE92ZXJsYXkoKTtcbiAgICAgICAgYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgICAgdmFyIHN3aXRjaE92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShPVkVSTEFZX0FDVElWRV9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvtGC0LrRgNGL0LLQsNC10YLRgdGPINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgb3BlblBvcHVwKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQndCw0LLQtdGI0LjQstCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINC60L3QvtC/0LrRg1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdXR0b25DbGljayk7XG4gICAgfTtcblxuICAgIC8vINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0LLRgdC1INC/0L7Qv9Cw0L/Ri1xuICAgIGluaXRQb3B1cChjb3N0QnV0dG9uRWxlbWVudCwgY29zdFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsQnV0dG9uRWxlbWVudCwgY2FsbFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cCh2aWRlb0J1dHRvbkVsZW1lbnQsIHZpZGVvUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGFjdGlvbkJ1dHRvbkVsZW1lbnQsIGFjdGlvblBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChvZmZlckJ1dHRvbkVsZW1lbnQsIG9mZmVyUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGNhbGxiYWNrQnV0dG9uRWxlbWVudCwgY2FsbGJhY2tQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbn0pKCk7XG4iLCIvLyDQodC70LDQudC00LXRgCDQsiDQs9Cw0LvQtdGA0LXQtVxuXG4kKCcuZ2FsbGVyeV9fbGlzdCcpLnNsaWNrKHtcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIGluZmluaXRlOiBmYWxzZSxcbiAgcHJldkFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImdhbGxlcnlfX2xpc3QtYXJyb3cgZ2FsbGVyeV9fbGlzdC1hcnJvdy0tcHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJnYWxsZXJ5X19saXN0LWFycm93IGdhbGxlcnlfX2xpc3QtYXJyb3ctLW5leHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QodC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICBhc05hdkZvcjogJy5nYWxsZXJ5X19saXN0LXRleHQnXG59KTtcblxuJChcIi5nYWxsZXJ5X19saXN0LXRleHRcIikub24oXCJpbml0XCIsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xuICBpZiAoc2xpY2suY3VycmVudFNsaWRlICsgMSA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dChwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH07XG4gIGlmIChzbGljay5zbGlkZUNvdW50IDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfTtcbn0pO1xuXG4kKFwiLmdhbGxlcnlfX2xpc3QtdGV4dFwiKS5vbihcImFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlKSB7XG4gIGlmIChzbGljay5jdXJyZW50U2xpZGUgKyAxIDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfTtcbiAgaWYgKHNsaWNrLnNsaWRlQ291bnQgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQocGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9O1xufSk7XG5cbiQoJy5nYWxsZXJ5X19saXN0LXRleHQnKS5zbGljayh7XG4gIGZhZGU6IHRydWUsXG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICBpbmZpbml0ZTogZmFsc2UsXG4gIGFycm93czogZmFsc2UsXG4gIGFzTmF2Rm9yOiAnLmdhbGxlcnlfX2xpc3QnXG59KTtcblxuLy8g0KHQu9Cw0LnQtNC10YAg0LIg0LHQu9C+0LrQtSBcItCh0LrQvtC70YzQutC+INGN0YLQviDQsiDRhtC40YTRgNCw0YVcIlxuJCgnLmNvbXBhcmluZ19fbGlzdCcpLnNsaWNrKHtcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gIGNlbnRlck1vZGU6IHRydWUsXG4gIGRvdHM6IHRydWUsXG4gIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJjb21wYXJpbmdfX2xpc3QtYXJyb3cgY29tcGFyaW5nX19saXN0LWFycm93LS1wcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImNvbXBhcmluZ19fbGlzdC1hcnJvdyBjb21wYXJpbmdfX2xpc3QtYXJyb3ctLW5leHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QodC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nXG59KTtcblxuLy8g0KHQu9Cw0LnQtNC10YAg0LIg0LHQu9C+0LrQtSBcItCf0YDQtdC40LzRg9GJ0LXRgdGC0LLQsFwiXG4kKCcuYWR2YW50YWdlc19fbGlzdCcpLnNsaWNrKHtcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gIGNlbnRlck1vZGU6IHRydWUsXG4gIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxuICBkb3RzOiB0cnVlLFxuICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiYWR2YW50YWdlc19fbGlzdC1hcnJvdyBhZHZhbnRhZ2VzX19saXN0LWFycm93LS1wcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImFkdmFudGFnZXNfX2xpc3QtYXJyb3cgYWR2YW50YWdlc19fbGlzdC1hcnJvdy0tbmV4dFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCh0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPidcbn0pO1xuIiwiJ3VzZS1zdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgQlVUVE9OX0FDVElWRV9DTEFTUyA9ICd1c2VfX2J1dHRvbi0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtC5INC60L3QvtC/0LrQuFxuICB2YXIgQkxPQ0tfQUNUSVZFX0NMQVNTID0gJ3VzZV9fbGlzdC0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtCz0L4g0LHQu9C+0LrQsFxuXG4gIHZhciBidXR0b25zRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutC4XG4gIHZhciBibG9ja3NFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VfX2xpc3QnKTsgLy8g0JHQu9C+0LrQuFxuXG4gIC8vINCT0LvQsNCy0L3QsNGPINGE0YPQvdC60YbQuNGPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9GPXG4gIHZhciBpbml0U3dpdGNoZXIgPSBmdW5jdGlvbiAoYnV0dG9ucywgYmxvY2tzKSB7XG5cbiAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINCx0LvQvtC6INC/0L4g0L3QsNC20LDRgtC+0Lkg0LrQvdC+0L/QutC1XG4gICAgdmFyIHN3aXRjaEJsb2NrID0gZnVuY3Rpb24gKGNsaWNrZWRCdXR0b24sIGNsaWNrZWRCdXR0b25JbmRleCkge1xuICAgICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoQlVUVE9OX0FDVElWRV9DTEFTUyk7XG4gICAgICB9KTtcbiAgICAgIGNsaWNrZWRCdXR0b24uY2xhc3NMaXN0LmFkZChCVVRUT05fQUNUSVZFX0NMQVNTKTtcbiAgICAgIGJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuICAgICAgICBibG9jay5jbGFzc0xpc3QucmVtb3ZlKEJMT0NLX0FDVElWRV9DTEFTUyk7XG4gICAgICB9KTtcbiAgICAgIGJsb2Nrc1tjbGlja2VkQnV0dG9uSW5kZXhdLmNsYXNzTGlzdC5hZGQoQkxPQ0tfQUNUSVZFX0NMQVNTKTtcbiAgICB9O1xuXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40LrQuCDQtNC70Y8g0LrQvdC+0L/QvtC6XG4gICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24sIGluZGV4KSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaEJsb2NrKGJ1dHRvbiwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cbiAgaW5pdFN3aXRjaGVyKGJ1dHRvbnNFbGVtZW50cywgYmxvY2tzRWxlbWVudHMpO1xufSkoKTtcbiJdfQ==
