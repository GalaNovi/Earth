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
    var callButtonDesktopElement = document.querySelector('.page-header__tel-button'); // Кнопка "Позвоните мне" (десктоп)
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
    initPopup(callButtonDesktopElement, callPopupElement, overlayElement);
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
  adaptiveHeight: true,
  dots: true,
  mobileFirst: true,
  prevArrow: '<button class="comparing__list-arrow comparing__list-arrow--previous" type="button"><span class="visually-hidden">Предыдущий слайд</span></button>',
  nextArrow: '<button class="comparing__list-arrow comparing__list-arrow--next" type="button"><span class="visually-hidden">Следующий слайд</span></button>',
  responsive: [
    {
      breakpoint: 767,
      settings: "unslick"
    }
  ]
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

(function($){
  $(window).on("load",function(){
    $("a[rel='m_PageScroll2id']").mPageScroll2id();
  });
})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwb3B1cHMuanMiLCJzbGlkZXJzLmpzIiwidXNlLXN3aXRjaGVyLmpzIiwic2Nyb2xsLW1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIEJVUkdFUl9PUEVORURfQ0xBU1MgPSAncGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uLS1vcGVuZWQnOyAvLyDQmtC70LDRgdGBINGDINC60L3QvtC/0LrQuCDQv9GA0Lgg0L7RgtC60YDRi9GC0L7QvCDQvNC10L3RjlxuICAgIHZhciBCVVJHRVJfQ0xPU0VEX0NMQVNTID0gJ3BhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbi0tY2xvc2VkJzsgLy8g0JrQu9Cw0YHRgSDRgyDQutC90L7Qv9C60Lgg0L/RgNC4INC30LDQutGA0YvRgtC+0Lwg0LzQtdC90Y5cbiAgICB2YXIgTUVOVV9PUEVORURfQ0xBU1MgPSAnbWVudS0tb3BlbmVkJzsgLy8g0JrQu9Cw0YHRgSDQvtGC0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y5cbiAgICB2YXIgTUVOVV9DTE9TRURfQ0xBU1MgPSAnbWVudS0tY2xvc2VkJzsgLy8g0JrQu9Cw0YHRgSDQt9Cw0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y5cbiAgICB2YXIgT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MgPSAnb3ZlcmxheS0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtCz0L4g0LfQsNGC0LXQvNC90Y/RjtGJ0LXQs9C+INGB0LvQvtGPXG5cbiAgICB2YXIgYnVyZ2VyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcl9fbWVudS1idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwINC80LXQvdGOXG4gICAgdmFyIG1lbnVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTsgLy8g0JzQtdC90Y5cbiAgICB2YXIgb3ZlcmxheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpOyAvLyDQl9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgdmFyIGludGVybmFsTGlua3NFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7IC8vINCS0L3Rg9GC0YDQtdC90L3QuNC1INGB0YHRi9C70LrQuFxuXG4gICAgdmFyIGluaXRNZW51ID0gZnVuY3Rpb24gKGJ1cmdlciwgbWVudSwgb3ZlcmxheSwgaW50ZXJuYWxMaW5rcykge1xuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQutC90L7Qv9C60YMg0LzQtdC90Y5cbiAgICAgIHZhciBzd2l0Y2hCdXJnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKEJVUkdFUl9DTE9TRURfQ0xBU1MpO1xuICAgICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShCVVJHRVJfT1BFTkVEX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LzQtdC90Y5cbiAgICAgIHZhciBzd2l0Y2hNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobWVudS5jbGFzc0xpc3QuY29udGFpbnMoTUVOVV9DTE9TRURfQ0xBU1MpKSB7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9DTE9TRURfQ0xBU1MpO1xuICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9DTE9TRURfQ0xBU1MpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgICB2YXIgc3dpdGNoT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKE9WRVJMQVlfQUNUSVZFX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCU0LXQudGB0YLQstC40Y8g0L/RgNGA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvNC10L3RjlxuICAgICAgdmFyIGNsb3NlT3Blbk1lbnUgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQpIHtcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2hCdXJnZXIoKTtcbiAgICAgICAgc3dpdGNoTWVudSgpO1xuICAgICAgICBpZiAob3ZlcmxheSkge1xuICAgICAgICAgIHN3aXRjaE92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0YHRgdGL0LvQutGDINC30LDQutGA0YvQstCw0LXRgiDQvNC10L3RjlxuICAgICAgdmFyIG9uSW50ZXJuYWxMaW5rQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsb3NlT3Blbk1lbnUoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCe0LHRgNCw0LHQvtGC0YfQuNC6INC60LvQuNC60LAg0L3QsCDQutC90L7Qv9C60LUg0LzQtdC90Y5cbiAgICAgIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuXG4gICAgICAvLyDQodC70YPRiNCw0YLQtdC70Lgg0LTQu9GPINCy0L3Rg9GC0YDQtdC90L3QuNGFINGB0YHRi9C70L7Qui4g0J/RgNC4INC/0LXRgNC10YXQvtC00LUg0LzQtdC90Y4g0LfQsNC60YDRi9Cy0LDQtdGC0YHRj1xuICAgICAgaW50ZXJuYWxMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkludGVybmFsTGlua0NsaWNrKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyDQn9C+INGC0LDQv9GDINC90LAg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuSDQt9Cw0LrRgNGL0LLQsNC10YLRgdGPINC80LXQvdGOXG4gICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPcGVuTWVudSk7XG4gICAgfTtcblxuICAgIC8vINCf0L7QtNC60LvRjtGH0LDQtdC8INCy0YHQtSDRjdC70LXQvNC10L3RgtGLXG4gICAgaW5pdE1lbnUoYnVyZ2VyRWxlbWVudCwgbWVudUVsZW1lbnQsIG92ZXJsYXlFbGVtZW50LCBpbnRlcm5hbExpbmtzRWxlbWVudHMpO1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgUE9QVVBfQUNUSVZFX0NMQVNTID0gJ3BvcHVwLS1hY3RpdmUnO1xuICAgIHZhciBPVkVSTEFZX0FDVElWRV9DTEFTUyA9ICdvdmVybGF5LS1hY3RpdmUnO1xuICAgIHZhciBDTE9TRV9CVVRUT05fQ0xBU1MgPSAncG9wdXBfX2Nsb3NlJztcblxuICAgIHZhciBjYWxsQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X190ZWwtYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0L7Qt9Cy0L7QvdC40YLQtSDQvNC90LVcIlxuICAgIHZhciBjYWxsQnV0dG9uRGVza3RvcEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX3RlbC1idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/QvtC30LLQvtC90LjRgtC1INC80L3QtVwiICjQtNC10YHQutGC0L7QvylcbiAgICB2YXIgY2FsbFBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY2FsbCcpOyAvLyDQn9C+0L/QsNC/IFwi0JfQsNC60LDQt9Cw0YLRjCDQt9Cy0L7QvdC+0LpcIlxuICAgIHZhciBjb3N0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW9yZGVyX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0KPQt9C90LDRgtGMINGB0YLQvtC40LzQvtGB0YLRjFwiXG4gICAgdmFyIGNvc3RQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNvc3QnKTsgLy8g0J/QvtC/0LDQvyBcItCj0LfQvdCw0YLRjCDRgdGC0L7QuNC80L7RgdGC0YxcIlxuICAgIHZhciB2aWRlb0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb25fX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LvRg9GH0LjRgtGMINCy0LjQtNC10L7RgdGK0LXQvNC60YPCoNGBwqDQstC+0LfQtNGD0YXQsFwiXG4gICAgdmFyIHZpZGVvUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS12aWRlbycpOyAvLyDQn9C+0L/QsNC/IFwi0J/QvtC70YPRh9C40YLRjCDQstC40LTQtdC+0YHRitC10LzQutGDwqDRgcKg0LLQvtC30LTRg9GF0LBcIlxuICAgIHZhciBhY3Rpb25CdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbnNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9GA0LjQvdGP0YLRjCDRg9GH0LDRgdGC0LjQtVwiXG4gICAgdmFyIGFjdGlvblBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tYWN0aW9uJyk7IC8vINCf0L7Qv9Cw0L8gXCLQo9GH0LDRgdGC0LjQtSDQsiDQsNC60YbQuNC4XCJcbiAgICB2YXIgb2ZmZXJCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkdmFudGFnZXNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LvRg9GH0LjRgtGMINC60L7QvNC80LXRgNGH0LXRgdC60L7QtSDQv9GA0LXQtNC70L7QttC10L3QuNC1XCJcbiAgICB2YXIgb2ZmZXJQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLW9mZmVyJyk7IC8vINCf0L7Qv9Cw0L8gXCLQktCw0YjQtSDQutC+0LzQvNC10YDRh9C10YHQutC+0LUg0L/RgNC10LTQu9C+0LbQtdC90LjQtVwiXG4gICAgdmFyIGNhbGxiYWNrQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0c19fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCh0LLRj9C20LjRgtC10YHRjCDRgdC+INC80L3QvtC5XCJcbiAgICB2YXIgY2FsbGJhY2tQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNhbGxiYWNrJyk7IC8vINCf0L7Qv9Cw0L8gXCLQntCx0YDQsNGC0L3QsNGPINGB0LLRj9C30YxcIlxuICAgIHZhciBvdmVybGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5LXBvcHVwJyk7IC8vINCX0LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcblxuICAgIC8vINCT0LvQsNCy0L3QsNGPINGE0YPQvdC60YbQuNGPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG4gICAgdmFyIGluaXRQb3B1cCA9IGZ1bmN0aW9uIChidXR0b24sIHBvcHVwLCBvdmVybGF5KSB7XG4gICAgICB2YXIgRVNDX0tFWUNPREUgPSAyNztcbiAgICAgIHZhciBFTlRFUl9LRVlDT0RFID0gMTM7XG4gICAgICB2YXIgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuJyArIENMT1NFX0JVVFRPTl9DTEFTUyk7XG4gICAgICB2YXIgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICAgIC8vINCf0YDQuCDQutC70LjQutC1INC90LAg0LrRgNC10YHRgtC40LosINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25DbG9zZUJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC90LDQttCw0YLQuNC4IEVudGVyINC90LAg0LrRgNC10YHRgtC40LrQtSDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uQ2xvc2VCdXR0b25LZXlkb3duID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT09IEVOVEVSX0tFWUNPREUpIHtcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQvdCw0LbQsNGC0LjQuCBFU0Mg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbldpbmRvd0tleWRvd24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQua2V5Q29kZSA9PT0gRVNDX0tFWUNPREUpIHtcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQutC70LjQutC1INC90LAg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuSwg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbk92ZXJsYXlDbGljayA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dC50YXJnZXQgPT09IG92ZXJsYXkpIHtcbiAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCe0YLQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/LCDQvdCw0LLQtdGI0LjQstCw0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4XG4gICAgICB2YXIgb3BlblBvcHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFBPUFVQX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbG9zZUJ1dHRvbkNsaWNrKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uQ2xvc2VCdXR0b25LZXlkb3duKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbldpbmRvd0tleWRvd24pO1xuICAgICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PdmVybGF5Q2xpY2spO1xuICAgICAgICBzd2l0Y2hPdmVybGF5KCk7XG4gICAgICAgIGJvZHlFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICB9O1xuXG4gICAgICAvLyDQl9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQvywg0YPQtNCw0LvRj9C10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICAgICAgdmFyIGNsb3NlUG9wdXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoUE9QVVBfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsb3NlQnV0dG9uQ2xpY2spO1xuICAgICAgICBjbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25DbG9zZUJ1dHRvbktleWRvd24pO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uV2luZG93S2V5ZG93bik7XG4gICAgICAgIG92ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk92ZXJsYXlDbGljayk7XG4gICAgICAgIHN3aXRjaE92ZXJsYXkoKTtcbiAgICAgICAgYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgICAgdmFyIHN3aXRjaE92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShPVkVSTEFZX0FDVElWRV9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvtGC0LrRgNGL0LLQsNC10YLRgdGPINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgb3BlblBvcHVwKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQndCw0LLQtdGI0LjQstCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINC60L3QvtC/0LrRg1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdXR0b25DbGljayk7XG4gICAgfTtcblxuICAgIC8vINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0LLRgdC1INC/0L7Qv9Cw0L/Ri1xuICAgIGluaXRQb3B1cChjb3N0QnV0dG9uRWxlbWVudCwgY29zdFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsQnV0dG9uRWxlbWVudCwgY2FsbFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsQnV0dG9uRGVza3RvcEVsZW1lbnQsIGNhbGxQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAodmlkZW9CdXR0b25FbGVtZW50LCB2aWRlb1BvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChhY3Rpb25CdXR0b25FbGVtZW50LCBhY3Rpb25Qb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAob2ZmZXJCdXR0b25FbGVtZW50LCBvZmZlclBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsYmFja0J1dHRvbkVsZW1lbnQsIGNhbGxiYWNrUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG59KSgpO1xuIiwiLy8g0KHQu9Cw0LnQtNC10YAg0LIg0LPQsNC70LXRgNC10LVcblxuJCgnLmdhbGxlcnlfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICBpbmZpbml0ZTogZmFsc2UsXG4gIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJnYWxsZXJ5X19saXN0LWFycm93IGdhbGxlcnlfX2xpc3QtYXJyb3ctLXByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0J/RgNC10LTRi9C00YPRidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICBuZXh0QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiZ2FsbGVyeV9fbGlzdC1hcnJvdyBnYWxsZXJ5X19saXN0LWFycm93LS1uZXh0XCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0KHQu9C10LTRg9GO0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgYXNOYXZGb3I6ICcuZ2FsbGVyeV9fbGlzdC10ZXh0J1xufSk7XG5cbiQoXCIuZ2FsbGVyeV9fbGlzdC10ZXh0XCIpLm9uKFwiaW5pdFwiLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcbiAgaWYgKHNsaWNrLmN1cnJlbnRTbGlkZSArIDEgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQocGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9O1xuICBpZiAoc2xpY2suc2xpZGVDb3VudCA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dChwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH07XG59KTtcblxuJChcIi5nYWxsZXJ5X19saXN0LXRleHRcIikub24oXCJhZnRlckNoYW5nZVwiLCBmdW5jdGlvbihldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSkge1xuICBpZiAoc2xpY2suY3VycmVudFNsaWRlICsgMSA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dChwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH07XG4gIGlmIChzbGljay5zbGlkZUNvdW50IDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfTtcbn0pO1xuXG4kKCcuZ2FsbGVyeV9fbGlzdC10ZXh0Jykuc2xpY2soe1xuICBmYWRlOiB0cnVlLFxuICBhY2Nlc3NpYmlsaXR5OiBmYWxzZSxcbiAgaW5maW5pdGU6IGZhbHNlLFxuICBhcnJvd3M6IGZhbHNlLFxuICBhc05hdkZvcjogJy5nYWxsZXJ5X19saXN0J1xufSk7XG5cbi8vINCh0LvQsNC50LTQtdGAINCyINCx0LvQvtC60LUgXCLQodC60L7Qu9GM0LrQviDRjdGC0L4g0LIg0YbQuNGE0YDQsNGFXCJcbiQoJy5jb21wYXJpbmdfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICBjZW50ZXJNb2RlOiB0cnVlLFxuICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcbiAgZG90czogdHJ1ZSxcbiAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJjb21wYXJpbmdfX2xpc3QtYXJyb3cgY29tcGFyaW5nX19saXN0LWFycm93LS1wcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImNvbXBhcmluZ19fbGlzdC1hcnJvdyBjb21wYXJpbmdfX2xpc3QtYXJyb3ctLW5leHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QodC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICByZXNwb25zaXZlOiBbXG4gICAge1xuICAgICAgYnJlYWtwb2ludDogNzY3LFxuICAgICAgc2V0dGluZ3M6IFwidW5zbGlja1wiXG4gICAgfVxuICBdXG59KTtcblxuLy8g0KHQu9Cw0LnQtNC10YAg0LIg0LHQu9C+0LrQtSBcItCf0YDQtdC40LzRg9GJ0LXRgdGC0LLQsFwiXG4kKCcuYWR2YW50YWdlc19fbGlzdCcpLnNsaWNrKHtcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gIGNlbnRlck1vZGU6IHRydWUsXG4gIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxuICBkb3RzOiB0cnVlLFxuICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiYWR2YW50YWdlc19fbGlzdC1hcnJvdyBhZHZhbnRhZ2VzX19saXN0LWFycm93LS1wcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImFkdmFudGFnZXNfX2xpc3QtYXJyb3cgYWR2YW50YWdlc19fbGlzdC1hcnJvdy0tbmV4dFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCh0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPidcbn0pO1xuIiwiJ3VzZS1zdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgQlVUVE9OX0FDVElWRV9DTEFTUyA9ICd1c2VfX2J1dHRvbi0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtC5INC60L3QvtC/0LrQuFxuICB2YXIgQkxPQ0tfQUNUSVZFX0NMQVNTID0gJ3VzZV9fbGlzdC0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtCz0L4g0LHQu9C+0LrQsFxuXG4gIHZhciBidXR0b25zRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutC4XG4gIHZhciBibG9ja3NFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VfX2xpc3QnKTsgLy8g0JHQu9C+0LrQuFxuXG4gIC8vINCT0LvQsNCy0L3QsNGPINGE0YPQvdC60YbQuNGPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9GPXG4gIHZhciBpbml0U3dpdGNoZXIgPSBmdW5jdGlvbiAoYnV0dG9ucywgYmxvY2tzKSB7XG5cbiAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINCx0LvQvtC6INC/0L4g0L3QsNC20LDRgtC+0Lkg0LrQvdC+0L/QutC1XG4gICAgdmFyIHN3aXRjaEJsb2NrID0gZnVuY3Rpb24gKGNsaWNrZWRCdXR0b24sIGNsaWNrZWRCdXR0b25JbmRleCkge1xuICAgICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoQlVUVE9OX0FDVElWRV9DTEFTUyk7XG4gICAgICB9KTtcbiAgICAgIGNsaWNrZWRCdXR0b24uY2xhc3NMaXN0LmFkZChCVVRUT05fQUNUSVZFX0NMQVNTKTtcbiAgICAgIGJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuICAgICAgICBibG9jay5jbGFzc0xpc3QucmVtb3ZlKEJMT0NLX0FDVElWRV9DTEFTUyk7XG4gICAgICB9KTtcbiAgICAgIGJsb2Nrc1tjbGlja2VkQnV0dG9uSW5kZXhdLmNsYXNzTGlzdC5hZGQoQkxPQ0tfQUNUSVZFX0NMQVNTKTtcbiAgICB9O1xuXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40LrQuCDQtNC70Y8g0LrQvdC+0L/QvtC6XG4gICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24sIGluZGV4KSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaEJsb2NrKGJ1dHRvbiwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cbiAgaW5pdFN3aXRjaGVyKGJ1dHRvbnNFbGVtZW50cywgYmxvY2tzRWxlbWVudHMpO1xufSkoKTtcbiIsIihmdW5jdGlvbigkKXtcbiAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7XG4gICAgJChcImFbcmVsPSdtX1BhZ2VTY3JvbGwyaWQnXVwiKS5tUGFnZVNjcm9sbDJpZCgpO1xuICB9KTtcbn0pKGpRdWVyeSk7XG4iXX0=
