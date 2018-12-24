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

    var initMenu = function (burger, menu, overlay) {
      var bodyElement = document.querySelector('body');

      // Переключает блокировку боди
      var switchBlockBody = function () {
        if (bodyElement.style.overflow == false) {
          bodyElement.style.overflow = 'hidden';
        } else {
          bodyElement.style.overflow = '';
        }
      };

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
        switchBlockBody();
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

      // Обработчик клика на кнопке меню
      burger.addEventListener('click', closeOpenMenu);

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
  mobileFirst: true,
  prevArrow: '<button class="advantages__list-arrow advantages__list-arrow--previous" type="button"><span class="visually-hidden">Предыдущий слайд</span></button>',
  nextArrow: '<button class="advantages__list-arrow advantages__list-arrow--next" type="button"><span class="visually-hidden">Следующий слайд</span></button>',
  responsive: [
    {
      breakpoint: 767,
      settings: "unslick"
    }
  ]
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwb3B1cHMuanMiLCJzbGlkZXJzLmpzIiwidXNlLXN3aXRjaGVyLmpzIiwic2Nyb2xsLW1lbnUuanMiLCJtYXJnaW4taGVhZGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIEJVUkdFUl9PUEVORURfQ0xBU1MgPSAncGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uLS1vcGVuZWQnOyAvLyDQmtC70LDRgdGBINGDINC60L3QvtC/0LrQuCDQv9GA0Lgg0L7RgtC60YDRi9GC0L7QvCDQvNC10L3RjlxuICAgIHZhciBCVVJHRVJfQ0xPU0VEX0NMQVNTID0gJ3BhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbi0tY2xvc2VkJzsgLy8g0JrQu9Cw0YHRgSDRgyDQutC90L7Qv9C60Lgg0L/RgNC4INC30LDQutGA0YvRgtC+0Lwg0LzQtdC90Y5cbiAgICB2YXIgTUVOVV9PUEVORURfQ0xBU1MgPSAnbWVudS0tb3BlbmVkJzsgLy8g0JrQu9Cw0YHRgSDQvtGC0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y5cbiAgICB2YXIgTUVOVV9DTE9TRURfQ0xBU1MgPSAnbWVudS0tY2xvc2VkJzsgLy8g0JrQu9Cw0YHRgSDQt9Cw0LrRgNGL0YLQvtCz0L4g0LzQtdC90Y5cbiAgICB2YXIgT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MgPSAnb3ZlcmxheS0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtCz0L4g0LfQsNGC0LXQvNC90Y/RjtGJ0LXQs9C+INGB0LvQvtGPXG5cbiAgICB2YXIgYnVyZ2VyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcl9fbWVudS1idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwINC80LXQvdGOXG4gICAgdmFyIG1lbnVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTsgLy8g0JzQtdC90Y5cbiAgICB2YXIgb3ZlcmxheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpOyAvLyDQl9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgdmFyIGludGVybmFsTGlua3NFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7IC8vINCS0L3Rg9GC0YDQtdC90L3QuNC1INGB0YHRi9C70LrQuFxuXG4gICAgdmFyIGluaXRNZW51ID0gZnVuY3Rpb24gKGJ1cmdlciwgbWVudSwgb3ZlcmxheSkge1xuICAgICAgdmFyIGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINCx0LvQvtC60LjRgNC+0LLQutGDINCx0L7QtNC4XG4gICAgICB2YXIgc3dpdGNoQmxvY2tCb2R5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT0gZmFsc2UpIHtcbiAgICAgICAgICBib2R5RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvZHlFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LrQvdC+0L/QutGDINC80LXQvdGOXG4gICAgICB2YXIgc3dpdGNoQnVyZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShCVVJHRVJfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoQlVSR0VSX09QRU5FRF9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINC80LXQvdGOXG4gICAgICB2YXIgc3dpdGNoTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKE1FTlVfQ0xPU0VEX0NMQVNTKSkge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX09QRU5FRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX09QRU5FRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgICAgdmFyIHN3aXRjaE92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShPVkVSTEFZX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIHN3aXRjaEJsb2NrQm9keSgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0JTQtdC50YHRgtCy0LjRjyDQv9GA0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINC80LXQvdGOXG4gICAgICB2YXIgY2xvc2VPcGVuTWVudSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dCkge1xuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaEJ1cmdlcigpO1xuICAgICAgICBzd2l0Y2hNZW51KCk7XG4gICAgICAgIGlmIChvdmVybGF5KSB7XG4gICAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQntCx0YDQsNCx0L7RgtGH0LjQuiDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutC1INC80LXQvdGOXG4gICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU9wZW5NZW51KTtcblxuICAgICAgLy8g0J/QviDRgtCw0L/RgyDQvdCwINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0Lkg0LfQsNC60YDRi9Cy0LDQtdGC0YHRjyDQvNC10L3RjlxuICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuICAgIH07XG5cbiAgICAvLyDQn9C+0LTQutC70Y7Rh9Cw0LXQvCDQstGB0LUg0Y3Qu9C10LzQtdC90YLRi1xuICAgIGluaXRNZW51KGJ1cmdlckVsZW1lbnQsIG1lbnVFbGVtZW50LCBvdmVybGF5RWxlbWVudCwgaW50ZXJuYWxMaW5rc0VsZW1lbnRzKTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIFBPUFVQX0FDVElWRV9DTEFTUyA9ICdwb3B1cC0tYWN0aXZlJztcbiAgICB2YXIgT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MgPSAnb3ZlcmxheS0tYWN0aXZlJztcbiAgICB2YXIgQ0xPU0VfQlVUVE9OX0NMQVNTID0gJ3BvcHVwX19jbG9zZSc7XG5cbiAgICB2YXIgY2FsbEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fdGVsLWJ1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LfQstC+0L3QuNGC0LUg0LzQvdC1XCJcbiAgICB2YXIgY2FsbEJ1dHRvbkRlc2t0b3BFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX190ZWwtYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0L7Qt9Cy0L7QvdC40YLQtSDQvNC90LVcIiAo0LTQtdGB0LrRgtC+0L8pXG4gICAgdmFyIGNhbGxQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNhbGwnKTsgLy8g0J/QvtC/0LDQvyBcItCX0LDQutCw0LfQsNGC0Ywg0LfQstC+0L3QvtC6XCJcbiAgICB2YXIgY29zdEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1vcmRlcl9fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCj0LfQvdCw0YLRjCDRgdGC0L7QuNC80L7RgdGC0YxcIlxuICAgIHZhciBjb3N0UG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1jb3N0Jyk7IC8vINCf0L7Qv9Cw0L8gXCLQo9C30L3QsNGC0Ywg0YHRgtC+0LjQvNC+0YHRgtGMXCJcbiAgICB2YXIgdmlkZW9CdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/QvtC70YPRh9C40YLRjCDQstC40LTQtdC+0YHRitC10LzQutGDwqDRgcKg0LLQvtC30LTRg9GF0LBcIlxuICAgIHZhciB2aWRlb1BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tdmlkZW8nKTsgLy8g0J/QvtC/0LDQvyBcItCf0L7Qu9GD0YfQuNGC0Ywg0LLQuNC00LXQvtGB0YrQtdC80LrRg8Kg0YHCoNCy0L7Qt9C00YPRhdCwXCJcbiAgICB2YXIgYWN0aW9uQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb25zX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/RgNC40L3Rj9GC0Ywg0YPRh9Cw0YHRgtC40LVcIlxuICAgIHZhciBhY3Rpb25Qb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWFjdGlvbicpOyAvLyDQn9C+0L/QsNC/IFwi0KPRh9Cw0YHRgtC40LUg0LIg0LDQutGG0LjQuFwiXG4gICAgdmFyIG9mZmVyQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZHZhbnRhZ2VzX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/QvtC70YPRh9C40YLRjCDQutC+0LzQvNC10YDRh9C10YHQutC+0LUg0L/RgNC10LTQu9C+0LbQtdC90LjQtVwiXG4gICAgdmFyIG9mZmVyUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1vZmZlcicpOyAvLyDQn9C+0L/QsNC/IFwi0JLQsNGI0LUg0LrQvtC80LzQtdGA0YfQtdGB0LrQvtC1INC/0YDQtdC00LvQvtC20LXQvdC40LVcIlxuICAgIHZhciBjYWxsYmFja0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdHNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQodCy0Y/QttC40YLQtdGB0Ywg0YHQviDQvNC90L7QuVwiXG4gICAgdmFyIGNhbGxiYWNrUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1jYWxsYmFjaycpOyAvLyDQn9C+0L/QsNC/IFwi0J7QsdGA0LDRgtC90LDRjyDRgdCy0Y/Qt9GMXCJcbiAgICB2YXIgb3ZlcmxheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheS1wb3B1cCcpOyAvLyDQl9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG5cbiAgICAvLyDQk9C70LDQstC90LDRjyDRhNGD0L3QutGG0LjRjyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuICAgIHZhciBpbml0UG9wdXAgPSBmdW5jdGlvbiAoYnV0dG9uLCBwb3B1cCwgb3ZlcmxheSkge1xuICAgICAgdmFyIEVTQ19LRVlDT0RFID0gMjc7XG4gICAgICB2YXIgRU5URVJfS0VZQ09ERSA9IDEzO1xuICAgICAgdmFyIGNsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLicgKyBDTE9TRV9CVVRUT05fQ0xBU1MpO1xuICAgICAgdmFyIGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60YDQtdGB0YLQuNC6LCDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uQ2xvc2VCdXR0b25DbGljayA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQvdCw0LbQsNGC0LjQuCBFbnRlciDQvdCwINC60YDQtdGB0YLQuNC60LUg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkNsb3NlQnV0dG9uS2V5ZG93biA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09PSBFTlRFUl9LRVlDT0RFKSB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0L3QsNC20LDRgtC40LggRVNDINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25XaW5kb3dLZXlkb3duID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT09IEVTQ19LRVlDT0RFKSB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LksINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25PdmVybGF5Q2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQudGFyZ2V0ID09PSBvdmVybGF5KSB7XG4gICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQntGC0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQvywg0L3QsNCy0LXRiNC40LLQsNC10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICAgICAgdmFyIG9wZW5Qb3B1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChQT1BVUF9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xvc2VCdXR0b25DbGljayk7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkNsb3NlQnV0dG9uS2V5ZG93bik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25XaW5kb3dLZXlkb3duKTtcbiAgICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3ZlcmxheUNsaWNrKTtcbiAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICBib2R5RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgfTtcblxuICAgICAgLy8g0JfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L8sINGD0LTQsNC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60LhcbiAgICAgIHZhciBjbG9zZVBvcHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFBPUFVQX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIGNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbG9zZUJ1dHRvbkNsaWNrKTtcbiAgICAgICAgY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uQ2xvc2VCdXR0b25LZXlkb3duKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbldpbmRvd0tleWRvd24pO1xuICAgICAgICBvdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PdmVybGF5Q2xpY2spO1xuICAgICAgICBzd2l0Y2hPdmVybGF5KCk7XG4gICAgICAgIGJvZHlFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcbiAgICAgIHZhciBzd2l0Y2hPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoT1ZFUkxBWV9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0L7RgtC60YDRi9Cy0LDQtdGC0YHRjyDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25CdXR0b25DbGljayA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9wZW5Qb3B1cCgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J3QsNCy0LXRiNC40LLQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQutC90L7Qv9C60YNcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQnV0dG9uQ2xpY2spO1xuICAgIH07XG5cbiAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdC8INCy0YHQtSDQv9C+0L/QsNC/0YtcbiAgICBpbml0UG9wdXAoY29zdEJ1dHRvbkVsZW1lbnQsIGNvc3RQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAoY2FsbEJ1dHRvbkVsZW1lbnQsIGNhbGxQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAoY2FsbEJ1dHRvbkRlc2t0b3BFbGVtZW50LCBjYWxsUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKHZpZGVvQnV0dG9uRWxlbWVudCwgdmlkZW9Qb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAoYWN0aW9uQnV0dG9uRWxlbWVudCwgYWN0aW9uUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKG9mZmVyQnV0dG9uRWxlbWVudCwgb2ZmZXJQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAoY2FsbGJhY2tCdXR0b25FbGVtZW50LCBjYWxsYmFja1BvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xufSkoKTtcbiIsIi8vINCh0LvQsNC50LTQtdGAINCyINCz0LDQu9C10YDQtdC1XG5cbiQoJy5nYWxsZXJ5X19saXN0Jykuc2xpY2soe1xuICBhY2Nlc3NpYmlsaXR5OiBmYWxzZSxcbiAgaW5maW5pdGU6IGZhbHNlLFxuICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiZ2FsbGVyeV9fbGlzdC1hcnJvdyBnYWxsZXJ5X19saXN0LWFycm93LS1wcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImdhbGxlcnlfX2xpc3QtYXJyb3cgZ2FsbGVyeV9fbGlzdC1hcnJvdy0tbmV4dFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCh0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIGFzTmF2Rm9yOiAnLmdhbGxlcnlfX2xpc3QtdGV4dCdcbn0pO1xuXG4kKFwiLmdhbGxlcnlfX2xpc3QtdGV4dFwiKS5vbihcImluaXRcIiwgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XG4gIGlmIChzbGljay5jdXJyZW50U2xpZGUgKyAxIDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfTtcbiAgaWYgKHNsaWNrLnNsaWRlQ291bnQgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQocGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9O1xufSk7XG5cbiQoXCIuZ2FsbGVyeV9fbGlzdC10ZXh0XCIpLm9uKFwiYWZ0ZXJDaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUpIHtcbiAgaWYgKHNsaWNrLmN1cnJlbnRTbGlkZSArIDEgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQocGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9O1xuICBpZiAoc2xpY2suc2xpZGVDb3VudCA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dChwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH07XG59KTtcblxuJCgnLmdhbGxlcnlfX2xpc3QtdGV4dCcpLnNsaWNrKHtcbiAgZmFkZTogdHJ1ZSxcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIGluZmluaXRlOiBmYWxzZSxcbiAgYXJyb3dzOiBmYWxzZSxcbiAgYXNOYXZGb3I6ICcuZ2FsbGVyeV9fbGlzdCdcbn0pO1xuXG4vLyDQodC70LDQudC00LXRgCDQsiDQsdC70L7QutC1IFwi0KHQutC+0LvRjNC60L4g0Y3RgtC+INCyINGG0LjRhNGA0LDRhVwiXG4kKCcuY29tcGFyaW5nX19saXN0Jykuc2xpY2soe1xuICBhY2Nlc3NpYmlsaXR5OiBmYWxzZSxcbiAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcbiAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gIGRvdHM6IHRydWUsXG4gIG1vYmlsZUZpcnN0OiB0cnVlLFxuICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiY29tcGFyaW5nX19saXN0LWFycm93IGNvbXBhcmluZ19fbGlzdC1hcnJvdy0tcHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJjb21wYXJpbmdfX2xpc3QtYXJyb3cgY29tcGFyaW5nX19saXN0LWFycm93LS1uZXh0XCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0KHQu9C10LTRg9GO0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgcmVzcG9uc2l2ZTogW1xuICAgIHtcbiAgICAgIGJyZWFrcG9pbnQ6IDc2NyxcbiAgICAgIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgIH1cbiAgXVxufSk7XG5cbi8vINCh0LvQsNC50LTQtdGAINCyINCx0LvQvtC60LUgXCLQn9GA0LXQuNC80YPRidC10YHRgtCy0LBcIlxuJCgnLmFkdmFudGFnZXNfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICBjZW50ZXJNb2RlOiB0cnVlLFxuICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcbiAgZG90czogdHJ1ZSxcbiAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJhZHZhbnRhZ2VzX19saXN0LWFycm93IGFkdmFudGFnZXNfX2xpc3QtYXJyb3ctLXByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0J/RgNC10LTRi9C00YPRidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICBuZXh0QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiYWR2YW50YWdlc19fbGlzdC1hcnJvdyBhZHZhbnRhZ2VzX19saXN0LWFycm93LS1uZXh0XCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0KHQu9C10LTRg9GO0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgcmVzcG9uc2l2ZTogW1xuICAgIHtcbiAgICAgIGJyZWFrcG9pbnQ6IDc2NyxcbiAgICAgIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgIH1cbiAgXVxufSk7XG4iLCIndXNlLXN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBCVVRUT05fQUNUSVZFX0NMQVNTID0gJ3VzZV9fYnV0dG9uLS1hY3RpdmUnOyAvLyDQmtC70LDRgdGBINCw0LrRgtC40LLQvdC+0Lkg0LrQvdC+0L/QutC4XG4gIHZhciBCTE9DS19BQ1RJVkVfQ0xBU1MgPSAndXNlX19saXN0LS1hY3RpdmUnOyAvLyDQmtC70LDRgdGBINCw0LrRgtC40LLQvdC+0LPQviDQsdC70L7QutCwXG5cbiAgdmFyIGJ1dHRvbnNFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LhcbiAgdmFyIGJsb2Nrc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZV9fbGlzdCcpOyAvLyDQkdC70L7QutC4XG5cbiAgLy8g0JPQu9Cw0LLQvdCw0Y8g0YTRg9C90LrRhtC40Y8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70Y9cbiAgdmFyIGluaXRTd2l0Y2hlciA9IGZ1bmN0aW9uIChidXR0b25zLCBibG9ja3MpIHtcblxuICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LHQu9C+0Log0L/QviDQvdCw0LbQsNGC0L7QuSDQutC90L7Qv9C60LVcbiAgICB2YXIgc3dpdGNoQmxvY2sgPSBmdW5jdGlvbiAoY2xpY2tlZEJ1dHRvbiwgY2xpY2tlZEJ1dHRvbkluZGV4KSB7XG4gICAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbikge1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShCVVRUT05fQUNUSVZFX0NMQVNTKTtcbiAgICAgIH0pO1xuICAgICAgY2xpY2tlZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKEJVVFRPTl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgYmxvY2tzLmZvckVhY2goZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgICAgIGJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoQkxPQ0tfQUNUSVZFX0NMQVNTKTtcbiAgICAgIH0pO1xuICAgICAgYmxvY2tzW2NsaWNrZWRCdXR0b25JbmRleF0uY2xhc3NMaXN0LmFkZChCTE9DS19BQ1RJVkVfQ0xBU1MpO1xuICAgIH07XG5cbiAgICAvLyDQntCx0YDQsNCx0L7RgtGH0LjQutC4INC00LvRjyDQutC90L7Qv9C+0LpcbiAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbiwgaW5kZXgpIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoQmxvY2soYnV0dG9uLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xuICBpbml0U3dpdGNoZXIoYnV0dG9uc0VsZW1lbnRzLCBibG9ja3NFbGVtZW50cyk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCQpe1xuICAkKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXtcbiAgICAkKFwiYVtyZWw9J21fUGFnZVNjcm9sbDJpZCddXCIpLm1QYWdlU2Nyb2xsMmlkKCk7XG4gIH0pO1xufSkoalF1ZXJ5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWRpbmdzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGluZy0tbWFyZ2luLWpzJyk7XG4gIHZhciBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lci0taGVhZGluZy1qcycpO1xuXG4gIHZhciBpbml0SGVhZGluZ3MgPSBmdW5jdGlvbiAoaGVhZGluZ3MsIGNvbnRhaW5lcikge1xuICAgIHZhciBkaXN0YW5zZSA9IGNvbnRhaW5lci5vZmZzZXRMZWZ0O1xuXG4gICAgaGVhZGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGluZykge1xuICAgICAgaGVhZGluZy5zdHlsZS5tYXJnaW5MZWZ0ID0gZGlzdGFuc2UgKyAncHgnO1xuICAgIH0pO1xuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5pdEhlYWRpbmdzKGhlYWRpbmdzRWxlbWVudHMsIGNvbnRhaW5lckVsZW1lbnQpO1xuICB9KTtcblxuICBpbml0SGVhZGluZ3MoaGVhZGluZ3NFbGVtZW50cywgY29udGFpbmVyRWxlbWVudCk7XG59KSgpO1xuIl19
