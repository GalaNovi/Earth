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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwb3B1cHMuanMiLCJzbGlkZXJzLmpzIiwidXNlLXN3aXRjaGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBCVVJHRVJfT1BFTkVEX0NMQVNTID0gJ3BhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbi0tb3BlbmVkJzsgLy8g0JrQu9Cw0YHRgSDRgyDQutC90L7Qv9C60Lgg0L/RgNC4INC+0YLQutGA0YvRgtC+0Lwg0LzQtdC90Y5cbiAgICB2YXIgQlVSR0VSX0NMT1NFRF9DTEFTUyA9ICdwYWdlLWhlYWRlcl9fbWVudS1idXR0b24tLWNsb3NlZCc7IC8vINCa0LvQsNGB0YEg0YMg0LrQvdC+0L/QutC4INC/0YDQuCDQt9Cw0LrRgNGL0YLQvtC8INC80LXQvdGOXG4gICAgdmFyIE1FTlVfT1BFTkVEX0NMQVNTID0gJ21lbnUtLW9wZW5lZCc7IC8vINCa0LvQsNGB0YEg0L7RgtC60YDRi9GC0L7Qs9C+INC80LXQvdGOXG4gICAgdmFyIE1FTlVfQ0xPU0VEX0NMQVNTID0gJ21lbnUtLWNsb3NlZCc7IC8vINCa0LvQsNGB0YEg0LfQsNC60YDRi9GC0L7Qs9C+INC80LXQvdGOXG4gICAgdmFyIE9WRVJMQVlfQUNUSVZFX0NMQVNTID0gJ292ZXJsYXktLWFjdGl2ZSc7IC8vINCa0LvQsNGB0YEg0LDQutGC0LjQstC90L7Qs9C+INC30LDRgtC10LzQvdGP0Y7RidC10LPQviDRgdC70L7Rj1xuXG4gICAgdmFyIGJ1cmdlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCDQvNC10L3RjlxuICAgIHZhciBtZW51RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7IC8vINCc0LXQvdGOXG4gICAgdmFyIG92ZXJsYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKTsgLy8g0JfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgIHZhciBpbnRlcm5hbExpbmtzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpOyAvLyDQktC90YPRgtGA0LXQvdC90LjQtSDRgdGB0YvQu9C60LhcblxuICAgIHZhciBpbml0TWVudSA9IGZ1bmN0aW9uIChidXJnZXIsIG1lbnUsIG92ZXJsYXksIGludGVybmFsTGlua3MpIHtcbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LrQvdC+0L/QutGDINC80LXQvdGOXG4gICAgICB2YXIgc3dpdGNoQnVyZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShCVVJHRVJfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoQlVSR0VSX09QRU5FRF9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINC80LXQvdGOXG4gICAgICB2YXIgc3dpdGNoTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKE1FTlVfQ0xPU0VEX0NMQVNTKSkge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX09QRU5FRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX09QRU5FRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgICAgdmFyIHN3aXRjaE92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShPVkVSTEFZX0FDVElWRV9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQlNC10LnRgdGC0LLQuNGPINC/0YDRgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0LzQtdC90Y5cbiAgICAgIHZhciBjbG9zZU9wZW5NZW51ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3dpdGNoQnVyZ2VyKCk7XG4gICAgICAgIHN3aXRjaE1lbnUoKTtcbiAgICAgICAgaWYgKG92ZXJsYXkpIHtcbiAgICAgICAgICBzd2l0Y2hPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCe0LHRgNCw0LHQvtGC0YfQuNC6INC60LvQuNC60LAg0L3QsCDQutC90L7Qv9C60LUg0LzQtdC90Y5cbiAgICAgIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuXG4gICAgICAvLyDQodC70YPRiNCw0YLQtdC70Lgg0LTQu9GPINCy0L3Rg9GC0YDQtdC90L3QuNGFINGB0YHRi9C70L7Qui4g0J/RgNC4INC/0LXRgNC10YXQvtC00LUg0LzQtdC90Y4g0LfQsNC60YDRi9Cy0LDQtdGC0YHRj1xuICAgICAgaW50ZXJuYWxMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU9wZW5NZW51KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyDQn9C+INGC0LDQv9GDINC90LAg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuSDQt9Cw0LrRgNGL0LLQsNC10YLRgdGPINC80LXQvdGOXG4gICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPcGVuTWVudSk7XG4gICAgfTtcblxuICAgIC8vINCf0L7QtNC60LvRjtGH0LDQtdC8INCy0YHQtSDRjdC70LXQvNC10L3RgtGLXG4gICAgaW5pdE1lbnUoYnVyZ2VyRWxlbWVudCwgbWVudUVsZW1lbnQsIG92ZXJsYXlFbGVtZW50LCBpbnRlcm5hbExpbmtzRWxlbWVudHMpO1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgUE9QVVBfQUNUSVZFX0NMQVNTID0gJ3BvcHVwLS1hY3RpdmUnO1xuICAgIHZhciBPVkVSTEFZX0FDVElWRV9DTEFTUyA9ICdvdmVybGF5LS1hY3RpdmUnO1xuICAgIHZhciBDTE9TRV9CVVRUT05fQ0xBU1MgPSAncG9wdXBfX2Nsb3NlJztcblxuICAgIHZhciBjYWxsQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X190ZWwtYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0L7Qt9Cy0L7QvdC40YLQtSDQvNC90LVcIlxuICAgIHZhciBjYWxsUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1jYWxsJyk7IC8vINCf0L7Qv9Cw0L8gXCLQl9Cw0LrQsNC30LDRgtGMINC30LLQvtC90L7QulwiXG4gICAgdmFyIGNvc3RCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tb3JkZXJfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQo9C30L3QsNGC0Ywg0YHRgtC+0LjQvNC+0YHRgtGMXCJcbiAgICB2YXIgY29zdFBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY29zdCcpOyAvLyDQn9C+0L/QsNC/IFwi0KPQt9C90LDRgtGMINGB0YLQvtC40LzQvtGB0YLRjFwiXG4gICAgdmFyIHZpZGVvQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbl9fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0L7Qu9GD0YfQuNGC0Ywg0LLQuNC00LXQvtGB0YrQtdC80LrRg8Kg0YHCoNCy0L7Qt9C00YPRhdCwXCJcbiAgICB2YXIgdmlkZW9Qb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLXZpZGVvJyk7IC8vINCf0L7Qv9Cw0L8gXCLQn9C+0LvRg9GH0LjRgtGMINCy0LjQtNC10L7RgdGK0LXQvNC60YPCoNGBwqDQstC+0LfQtNGD0YXQsFwiXG4gICAgdmFyIGFjdGlvbkJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uc19fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0YDQuNC90Y/RgtGMINGD0YfQsNGB0YLQuNC1XCJcbiAgICB2YXIgYWN0aW9uUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1hY3Rpb24nKTsgLy8g0J/QvtC/0LDQvyBcItCj0YfQsNGB0YLQuNC1INCyINCw0LrRhtC40LhcIlxuICAgIHZhciBvZmZlckJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWR2YW50YWdlc19fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0L7Qu9GD0YfQuNGC0Ywg0LrQvtC80LzQtdGA0YfQtdGB0LrQvtC1INC/0YDQtdC00LvQvtC20LXQvdC40LVcIlxuICAgIHZhciBvZmZlclBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tb2ZmZXInKTsgLy8g0J/QvtC/0LDQvyBcItCS0LDRiNC1INC60L7QvNC80LXRgNGH0LXRgdC60L7QtSDQv9GA0LXQtNC70L7QttC10L3QuNC1XCJcbiAgICB2YXIgY2FsbGJhY2tCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3RzX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0KHQstGP0LbQuNGC0LXRgdGMINGB0L4g0LzQvdC+0LlcIlxuICAgIHZhciBjYWxsYmFja1BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY2FsbGJhY2snKTsgLy8g0J/QvtC/0LDQvyBcItCe0LHRgNCw0YLQvdCw0Y8g0YHQstGP0LfRjFwiXG4gICAgdmFyIG92ZXJsYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXktcG9wdXAnKTsgLy8g0JfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuXG4gICAgLy8g0JPQu9Cw0LLQvdCw0Y8g0YTRg9C90LrRhtC40Y8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40LhcbiAgICB2YXIgaW5pdFBvcHVwID0gZnVuY3Rpb24gKGJ1dHRvbiwgcG9wdXAsIG92ZXJsYXkpIHtcbiAgICAgIHZhciBFU0NfS0VZQ09ERSA9IDI3O1xuICAgICAgdmFyIEVOVEVSX0tFWUNPREUgPSAxMztcbiAgICAgIHZhciBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy4nICsgQ0xPU0VfQlVUVE9OX0NMQVNTKTtcbiAgICAgIHZhciBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgICAgLy8g0J/RgNC4INC60LvQuNC60LUg0L3QsCDQutGA0LXRgdGC0LjQuiwg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkNsb3NlQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0L3QsNC20LDRgtC40LggRW50ZXIg0L3QsCDQutGA0LXRgdGC0LjQutC1INC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25DbG9zZUJ1dHRvbktleWRvd24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQua2V5Q29kZSA9PT0gRU5URVJfS0VZQ09ERSkge1xuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC90LDQttCw0YLQuNC4IEVTQyDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uV2luZG93S2V5ZG93biA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09PSBFU0NfS0VZQ09ERSkge1xuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC60LvQuNC60LUg0L3QsCDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5LCDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uT3ZlcmxheUNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQntGC0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQvywg0L3QsNCy0LXRiNC40LLQsNC10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICAgICAgdmFyIG9wZW5Qb3B1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChQT1BVUF9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xvc2VCdXR0b25DbGljayk7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkNsb3NlQnV0dG9uS2V5ZG93bik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25XaW5kb3dLZXlkb3duKTtcbiAgICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3ZlcmxheUNsaWNrKTtcbiAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICBib2R5RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgfTtcblxuICAgICAgLy8g0JfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L8sINGD0LTQsNC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60LhcbiAgICAgIHZhciBjbG9zZVBvcHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFBPUFVQX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIGNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbG9zZUJ1dHRvbkNsaWNrKTtcbiAgICAgICAgY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uQ2xvc2VCdXR0b25LZXlkb3duKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbldpbmRvd0tleWRvd24pO1xuICAgICAgICBvdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PdmVybGF5Q2xpY2spO1xuICAgICAgICBzd2l0Y2hPdmVybGF5KCk7XG4gICAgICAgIGJvZHlFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcbiAgICAgIHZhciBzd2l0Y2hPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0L7RgtC60YDRi9Cy0LDQtdGC0YHRjyDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25CdXR0b25DbGljayA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9wZW5Qb3B1cCgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J3QsNCy0LXRiNC40LLQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQutC90L7Qv9C60YNcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQnV0dG9uQ2xpY2spO1xuICAgIH07XG5cbiAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdC8INCy0YHQtSDQv9C+0L/QsNC/0YtcbiAgICBpbml0UG9wdXAoY29zdEJ1dHRvbkVsZW1lbnQsIGNvc3RQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAoY2FsbEJ1dHRvbkVsZW1lbnQsIGNhbGxQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAodmlkZW9CdXR0b25FbGVtZW50LCB2aWRlb1BvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChhY3Rpb25CdXR0b25FbGVtZW50LCBhY3Rpb25Qb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAob2ZmZXJCdXR0b25FbGVtZW50LCBvZmZlclBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsYmFja0J1dHRvbkVsZW1lbnQsIGNhbGxiYWNrUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG59KSgpO1xuIiwiLy8g0KHQu9Cw0LnQtNC10YAg0LIg0LPQsNC70LXRgNC10LVcblxuJCgnLmdhbGxlcnlfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICBpbmZpbml0ZTogZmFsc2UsXG4gIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJnYWxsZXJ5X19saXN0LWFycm93IGdhbGxlcnlfX2xpc3QtYXJyb3ctLXByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0J/RgNC10LTRi9C00YPRidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICBuZXh0QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiZ2FsbGVyeV9fbGlzdC1hcnJvdyBnYWxsZXJ5X19saXN0LWFycm93LS1uZXh0XCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0KHQu9C10LTRg9GO0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgYXNOYXZGb3I6ICcuZ2FsbGVyeV9fbGlzdC10ZXh0J1xufSk7XG5cbiQoXCIuZ2FsbGVyeV9fbGlzdC10ZXh0XCIpLm9uKFwiaW5pdFwiLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcbiAgaWYgKHNsaWNrLmN1cnJlbnRTbGlkZSArIDEgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQocGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9O1xuICBpZiAoc2xpY2suc2xpZGVDb3VudCA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dChwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH07XG59KTtcblxuJChcIi5nYWxsZXJ5X19saXN0LXRleHRcIikub24oXCJhZnRlckNoYW5nZVwiLCBmdW5jdGlvbihldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSkge1xuICBpZiAoc2xpY2suY3VycmVudFNsaWRlICsgMSA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dChwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH07XG4gIGlmIChzbGljay5zbGlkZUNvdW50IDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfTtcbn0pO1xuXG4kKCcuZ2FsbGVyeV9fbGlzdC10ZXh0Jykuc2xpY2soe1xuICBmYWRlOiB0cnVlLFxuICBhY2Nlc3NpYmlsaXR5OiBmYWxzZSxcbiAgaW5maW5pdGU6IGZhbHNlLFxuICBhcnJvd3M6IGZhbHNlLFxuICBhc05hdkZvcjogJy5nYWxsZXJ5X19saXN0J1xufSk7XG5cbi8vINCh0LvQsNC50LTQtdGAINCyINCx0LvQvtC60LUgXCLQodC60L7Qu9GM0LrQviDRjdGC0L4g0LIg0YbQuNGE0YDQsNGFXCJcbiQoJy5jb21wYXJpbmdfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICBjZW50ZXJNb2RlOiB0cnVlLFxuICBkb3RzOiB0cnVlLFxuICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiY29tcGFyaW5nX19saXN0LWFycm93IGNvbXBhcmluZ19fbGlzdC1hcnJvdy0tcHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJjb21wYXJpbmdfX2xpc3QtYXJyb3cgY29tcGFyaW5nX19saXN0LWFycm93LS1uZXh0XCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0KHQu9C10LTRg9GO0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+J1xufSk7XG5cbi8vINCh0LvQsNC50LTQtdGAINCyINCx0LvQvtC60LUgXCLQn9GA0LXQuNC80YPRidC10YHRgtCy0LBcIlxuJCgnLmFkdmFudGFnZXNfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICBjZW50ZXJNb2RlOiB0cnVlLFxuICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcbiAgZG90czogdHJ1ZSxcbiAgcHJldkFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImFkdmFudGFnZXNfX2xpc3QtYXJyb3cgYWR2YW50YWdlc19fbGlzdC1hcnJvdy0tcHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJhZHZhbnRhZ2VzX19saXN0LWFycm93IGFkdmFudGFnZXNfX2xpc3QtYXJyb3ctLW5leHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QodC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nXG59KTtcbiIsIid1c2Utc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEJVVFRPTl9BQ1RJVkVfQ0xBU1MgPSAndXNlX19idXR0b24tLWFjdGl2ZSc7IC8vINCa0LvQsNGB0YEg0LDQutGC0LjQstC90L7QuSDQutC90L7Qv9C60LhcbiAgdmFyIEJMT0NLX0FDVElWRV9DTEFTUyA9ICd1c2VfX2xpc3QtLWFjdGl2ZSc7IC8vINCa0LvQsNGB0YEg0LDQutGC0LjQstC90L7Qs9C+INCx0LvQvtC60LBcblxuICB2YXIgYnV0dG9uc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZV9fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQuFxuICB2YXIgYmxvY2tzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlX19saXN0Jyk7IC8vINCR0LvQvtC60LhcblxuICAvLyDQk9C70LDQstC90LDRjyDRhNGD0L3QutGG0LjRjyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRj1xuICB2YXIgaW5pdFN3aXRjaGVyID0gZnVuY3Rpb24gKGJ1dHRvbnMsIGJsb2Nrcykge1xuXG4gICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQsdC70L7QuiDQv9C+INC90LDQttCw0YLQvtC5INC60L3QvtC/0LrQtVxuICAgIHZhciBzd2l0Y2hCbG9jayA9IGZ1bmN0aW9uIChjbGlja2VkQnV0dG9uLCBjbGlja2VkQnV0dG9uSW5kZXgpIHtcbiAgICAgIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKEJVVFRPTl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgICBjbGlja2VkQnV0dG9uLmNsYXNzTGlzdC5hZGQoQlVUVE9OX0FDVElWRV9DTEFTUyk7XG4gICAgICBibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAoYmxvY2spIHtcbiAgICAgICAgYmxvY2suY2xhc3NMaXN0LnJlbW92ZShCTE9DS19BQ1RJVkVfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgICBibG9ja3NbY2xpY2tlZEJ1dHRvbkluZGV4XS5jbGFzc0xpc3QuYWRkKEJMT0NLX0FDVElWRV9DTEFTUyk7XG4gICAgfTtcblxuICAgIC8vINCe0LHRgNCw0LHQvtGC0YfQuNC60Lgg0LTQu9GPINC60L3QvtC/0L7QulxuICAgIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uLCBpbmRleCkge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2hCbG9jayhidXR0b24sIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXG4gIGluaXRTd2l0Y2hlcihidXR0b25zRWxlbWVudHMsIGJsb2Nrc0VsZW1lbnRzKTtcbn0pKCk7XG4iXX0=
