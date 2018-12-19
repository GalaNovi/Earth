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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwb3B1cHMuanMiLCJzbGlkZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIEJVUkdFUl9PUEVORURfQ0xBU1MgPSAncGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uLS1vcGVuZWQnOyAvLyDQmtC70LDRgdGBINGDINC60L3QvtC/0LrQuCDQv9GA0Lgg0L7RgtC60YDRi9GC0L7QvCDQvNC10L3RjlxuICAgIHZhciBCVVJHRVJfQ0xPU0VEX0NMQVNTID0gJ3BhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbi0tY2xvc2VkJzsgLy8g0JrQu9Cw0YHRgSDRgyDQutC90L7Qv9C60Lgg0L/RgNC4INC30LDQutGA0YvRgtC+0Lwg0LzQtdC90Y5cbiAgICB2YXIgTUVOVV9PUEVORURfQ0xBU1MgPSAnbWVudS0tb3BlbmVkJzsgLy8g0JrQu9Cw0YHRgSDQvtGC0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y5cbiAgICB2YXIgTUVOVV9DTE9TRURfQ0xBU1MgPSAnbWVudS0tY2xvc2VkJzsgLy8g0JrQu9Cw0YHRgSDQt9Cw0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y5cbiAgICB2YXIgT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MgPSAnb3ZlcmxheS0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtCz0L4g0LfQsNGC0LXQvNC90Y/RjtGJ0LXQs9C+INGB0LvQvtGPXG5cbiAgICB2YXIgYnVyZ2VyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcl9fbWVudS1idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwINC80LXQvdGOXG4gICAgdmFyIG1lbnVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTsgLy8g0JzQtdC90Y5cbiAgICB2YXIgb3ZlcmxheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpOyAvLyDQl9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgdmFyIGludGVybmFsTGlua3NFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7IC8vINCS0L3Rg9GC0YDQtdC90L3QuNC1INGB0YHRi9C70LrQuFxuXG4gICAgdmFyIGluaXRNZW51ID0gZnVuY3Rpb24gKGJ1cmdlciwgbWVudSwgb3ZlcmxheSwgaW50ZXJuYWxMaW5rcykge1xuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQutC90L7Qv9C60YMg0LzQtdC90Y5cbiAgICAgIHZhciBzd2l0Y2hCdXJnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKEJVUkdFUl9DTE9TRURfQ0xBU1MpO1xuICAgICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShCVVJHRVJfT1BFTkVEX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LzQtdC90Y5cbiAgICAgIHZhciBzd2l0Y2hNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobWVudS5jbGFzc0xpc3QuY29udGFpbnMoTUVOVV9DTE9TRURfQ0xBU1MpKSB7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9DTE9TRURfQ0xBU1MpO1xuICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9DTE9TRURfQ0xBU1MpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgICB2YXIgc3dpdGNoT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKE9WRVJMQVlfQUNUSVZFX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCU0LXQudGB0YLQstC40Y8g0L/RgNGA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvNC10L3RjlxuICAgICAgdmFyIGNsb3NlT3Blbk1lbnUgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzd2l0Y2hCdXJnZXIoKTtcbiAgICAgICAgc3dpdGNoTWVudSgpO1xuICAgICAgICBpZiAob3ZlcmxheSkge1xuICAgICAgICAgIHN3aXRjaE92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9C40LrQsCDQvdCwINC60L3QvtC/0LrQtSDQvNC10L3RjlxuICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPcGVuTWVudSk7XG5cbiAgICAgIC8vINCh0LvRg9GI0LDRgtC10LvQuCDQtNC70Y8g0LLQvdGD0YLRgNC10L3QvdC40YUg0YHRgdGL0LvQvtC6LiDQn9GA0Lgg0L/QtdGA0LXRhdC+0LTQtSDQvNC10L3RjiDQt9Cw0LrRgNGL0LLQsNC10YLRgdGPXG4gICAgICBpbnRlcm5hbExpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vINCf0L4g0YLQsNC/0YMg0L3QsCDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5INC30LDQutGA0YvQstCw0LXRgtGB0Y8g0LzQtdC90Y5cbiAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU9wZW5NZW51KTtcbiAgICB9O1xuXG4gICAgLy8g0J/QvtC00LrQu9GO0YfQsNC10Lwg0LLRgdC1INGN0LvQtdC80LXQvdGC0YtcbiAgICBpbml0TWVudShidXJnZXJFbGVtZW50LCBtZW51RWxlbWVudCwgb3ZlcmxheUVsZW1lbnQsIGludGVybmFsTGlua3NFbGVtZW50cyk7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBQT1BVUF9BQ1RJVkVfQ0xBU1MgPSAncG9wdXAtLWFjdGl2ZSc7XG4gICAgdmFyIE9WRVJMQVlfQUNUSVZFX0NMQVNTID0gJ292ZXJsYXktLWFjdGl2ZSc7XG4gICAgdmFyIENMT1NFX0JVVFRPTl9DTEFTUyA9ICdwb3B1cF9fY2xvc2UnO1xuXG4gICAgdmFyIGNhbGxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX3RlbC1idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/QvtC30LLQvtC90LjRgtC1INC80L3QtVwiXG4gICAgdmFyIGNhbGxQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNhbGwnKTsgLy8g0J/QvtC/0LDQvyBcItCX0LDQutCw0LfQsNGC0Ywg0LfQstC+0L3QvtC6XCJcbiAgICB2YXIgY29zdEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1vcmRlcl9fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCj0LfQvdCw0YLRjCDRgdGC0L7QuNC80L7RgdGC0YxcIlxuICAgIHZhciBjb3N0UG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1jb3N0Jyk7IC8vINCf0L7Qv9Cw0L8gXCLQo9C30L3QsNGC0Ywg0YHRgtC+0LjQvNC+0YHRgtGMXCJcbiAgICB2YXIgdmlkZW9CdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/QvtC70YPRh9C40YLRjCDQstC40LTQtdC+0YHRitC10LzQutGDwqDRgcKg0LLQvtC30LTRg9GF0LBcIlxuICAgIHZhciB2aWRlb1BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tdmlkZW8nKTsgLy8g0J/QvtC/0LDQvyBcItCf0L7Qu9GD0YfQuNGC0Ywg0LLQuNC00LXQvtGB0YrQtdC80LrRg8Kg0YHCoNCy0L7Qt9C00YPRhdCwXCJcbiAgICB2YXIgYWN0aW9uQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb25zX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/RgNC40L3Rj9GC0Ywg0YPRh9Cw0YHRgtC40LVcIlxuICAgIHZhciBhY3Rpb25Qb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWFjdGlvbicpOyAvLyDQn9C+0L/QsNC/IFwi0KPRh9Cw0YHRgtC40LUg0LIg0LDQutGG0LjQuFwiXG4gICAgdmFyIG9mZmVyQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZHZhbnRhZ2VzX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/QvtC70YPRh9C40YLRjCDQutC+0LzQvNC10YDRh9C10YHQutC+0LUg0L/RgNC10LTQu9C+0LbQtdC90LjQtVwiXG4gICAgdmFyIG9mZmVyUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1vZmZlcicpOyAvLyDQn9C+0L/QsNC/IFwi0JLQsNGI0LUg0LrQvtC80LzQtdGA0YfQtdGB0LrQvtC1INC/0YDQtdC00LvQvtC20LXQvdC40LVcIlxuICAgIHZhciBjYWxsYmFja0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdHNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQodCy0Y/QttC40YLQtdGB0Ywg0YHQviDQvNC90L7QuVwiXG4gICAgdmFyIGNhbGxiYWNrUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1jYWxsYmFjaycpOyAvLyDQn9C+0L/QsNC/IFwi0J7QsdGA0LDRgtC90LDRjyDRgdCy0Y/Qt9GMXCJcbiAgICB2YXIgb3ZlcmxheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheS1wb3B1cCcpOyAvLyDQl9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG5cbiAgICAvLyDQk9C70LDQstC90LDRjyDRhNGD0L3QutGG0LjRjyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuICAgIHZhciBpbml0UG9wdXAgPSBmdW5jdGlvbiAoYnV0dG9uLCBwb3B1cCwgb3ZlcmxheSkge1xuICAgICAgdmFyIEVTQ19LRVlDT0RFID0gMjc7XG4gICAgICB2YXIgRU5URVJfS0VZQ09ERSA9IDEzO1xuICAgICAgdmFyIGNsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLicgKyBDTE9TRV9CVVRUT05fQ0xBU1MpO1xuICAgICAgdmFyIGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60YDQtdGB0YLQuNC6LCDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uQ2xvc2VCdXR0b25DbGljayA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQvdCw0LbQsNGC0LjQuCBFbnRlciDQvdCwINC60YDQtdGB0YLQuNC60LUg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkNsb3NlQnV0dG9uS2V5ZG93biA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09PSBFTlRFUl9LRVlDT0RFKSB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0L3QsNC20LDRgtC40LggRVNDINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25XaW5kb3dLZXlkb3duID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT09IEVTQ19LRVlDT0RFKSB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LksINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25PdmVybGF5Q2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCe0YLQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/LCDQvdCw0LLQtdGI0LjQstCw0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4XG4gICAgICB2YXIgb3BlblBvcHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFBPUFVQX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbG9zZUJ1dHRvbkNsaWNrKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uQ2xvc2VCdXR0b25LZXlkb3duKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbldpbmRvd0tleWRvd24pO1xuICAgICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PdmVybGF5Q2xpY2spO1xuICAgICAgICBzd2l0Y2hPdmVybGF5KCk7XG4gICAgICAgIGJvZHlFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICB9O1xuXG4gICAgICAvLyDQl9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQvywg0YPQtNCw0LvRj9C10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICAgICAgdmFyIGNsb3NlUG9wdXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoUE9QVVBfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsb3NlQnV0dG9uQ2xpY2spO1xuICAgICAgICBjbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25DbG9zZUJ1dHRvbktleWRvd24pO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uV2luZG93S2V5ZG93bik7XG4gICAgICAgIG92ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk92ZXJsYXlDbGljayk7XG4gICAgICAgIHN3aXRjaE92ZXJsYXkoKTtcbiAgICAgICAgYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgICAgdmFyIHN3aXRjaE92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShPVkVSTEFZX0FDVElWRV9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvtGC0LrRgNGL0LLQsNC10YLRgdGPINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgb3BlblBvcHVwKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQndCw0LLQtdGI0LjQstCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINC60L3QvtC/0LrRg1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdXR0b25DbGljayk7XG4gICAgfTtcblxuICAgIC8vINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0LLRgdC1INC/0L7Qv9Cw0L/Ri1xuICAgIGluaXRQb3B1cChjb3N0QnV0dG9uRWxlbWVudCwgY29zdFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsQnV0dG9uRWxlbWVudCwgY2FsbFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cCh2aWRlb0J1dHRvbkVsZW1lbnQsIHZpZGVvUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGFjdGlvbkJ1dHRvbkVsZW1lbnQsIGFjdGlvblBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChvZmZlckJ1dHRvbkVsZW1lbnQsIG9mZmVyUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGNhbGxiYWNrQnV0dG9uRWxlbWVudCwgY2FsbGJhY2tQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbn0pKCk7XG4iLCIvLyDQodC70LDQudC00LXRgCDQsiDQs9Cw0LvQtdGA0LXQtVxuXG4kKCcuZ2FsbGVyeV9fbGlzdCcpLnNsaWNrKHtcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIGluZmluaXRlOiBmYWxzZSxcbiAgcHJldkFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImdhbGxlcnlfX2xpc3QtYXJyb3cgZ2FsbGVyeV9fbGlzdC1hcnJvdy0tcHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJnYWxsZXJ5X19saXN0LWFycm93IGdhbGxlcnlfX2xpc3QtYXJyb3ctLW5leHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QodC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICBhc05hdkZvcjogJy5nYWxsZXJ5X19saXN0LXRleHQnXG59KTtcblxuJChcIi5nYWxsZXJ5X19saXN0LXRleHRcIikub24oXCJpbml0XCIsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xuICBpZiAoc2xpY2suY3VycmVudFNsaWRlICsgMSA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dChwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH07XG4gIGlmIChzbGljay5zbGlkZUNvdW50IDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfTtcbn0pO1xuXG4kKFwiLmdhbGxlcnlfX2xpc3QtdGV4dFwiKS5vbihcImFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlKSB7XG4gIGlmIChzbGljay5jdXJyZW50U2xpZGUgKyAxIDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfTtcbiAgaWYgKHNsaWNrLnNsaWRlQ291bnQgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQocGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9O1xufSk7XG5cbiQoJy5nYWxsZXJ5X19saXN0LXRleHQnKS5zbGljayh7XG4gIGZhZGU6IHRydWUsXG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICBpbmZpbml0ZTogZmFsc2UsXG4gIGFycm93czogZmFsc2UsXG4gIGFzTmF2Rm9yOiAnLmdhbGxlcnlfX2xpc3QnXG59KTtcblxuXG4vLyDQodC70LDQudC00LXRgCDQsiDQsdC70L7QutC1IFwi0KHQutC+0LvRjNC60L4g0Y3RgtC+INCyINGG0LjRhNGA0LDRhVwiXG4iXX0=
