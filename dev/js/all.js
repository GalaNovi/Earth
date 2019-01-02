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
      var bodyElement = document.querySelector('body');
      window.menuOpened = false; // Флаг в глобальной области, что бы при открытии попапа было известно открыто ли меню

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
          window.menuOpened = true;
        } else {
          menu.classList.toggle(MENU_OPENED_CLASS);
          menu.classList.toggle(MENU_CLOSED_CLASS);
          window.menuOpened = false;
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

      // Если клик по затемняющему слою, то меню закрывается
      var onOverlayClick = function (evt) {
        if (evt.target === overlay) {
          closeOpenMenu();
        }
      };

      // Обработчик клика по внутренней ссылке
      var oninternalLinkClick = function () {
        closeOpenMenu();
      };

      // Обработчик клика на кнопке меню
      burger.addEventListener('click', closeOpenMenu);

      // По тапу на затемняющий слой закрывается меню
      overlay.addEventListener('click', onOverlayClick);

      internalLinks.forEach(function (link) {
        link.addEventListener('click', oninternalLinkClick);
      });
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

      // Блокирует прокрутку страницы
      var blockBody = function () {
        bodyElement.style.overflow = 'hidden';
      };

      // Разблокирует прокрутку страницы
      var unblockBody = function () {
        if (!window.menuOpened) {
          bodyElement.style.overflow = '';
        }
      };

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
        blockBody();
      };

      // Закрывает попап, удаляет обработчики
      var closePopup = function () {
        popup.classList.remove(POPUP_ACTIVE_CLASS);
        closeButton.removeEventListener('click', onCloseButtonClick);
        closeButton.removeEventListener('keydown', onCloseButtonKeydown);
        window.removeEventListener('keydown', onWindowKeydown);
        overlay.removeEventListener('click', onOverlayClick);
        switchOverlay();
        unblockBody();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwb3B1cHMuanMiLCJzbGlkZXJzLmpzIiwidXNlLXN3aXRjaGVyLmpzIiwic2Nyb2xsLW1lbnUuanMiLCJtYXJnaW4taGVhZGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQlVSR0VSX09QRU5FRF9DTEFTUyA9ICdwYWdlLWhlYWRlcl9fbWVudS1idXR0b24tLW9wZW5lZCc7IC8vINCa0LvQsNGB0YEg0YMg0LrQvdC+0L/QutC4INC/0YDQuCDQvtGC0LrRgNGL0YLQvtC8INC80LXQvdGOXG4gICAgdmFyIEJVUkdFUl9DTE9TRURfQ0xBU1MgPSAncGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uLS1jbG9zZWQnOyAvLyDQmtC70LDRgdGBINGDINC60L3QvtC/0LrQuCDQv9GA0Lgg0LfQsNC60YDRi9GC0L7QvCDQvNC10L3RjlxuICAgIHZhciBNRU5VX09QRU5FRF9DTEFTUyA9ICdtZW51LS1vcGVuZWQnOyAvLyDQmtC70LDRgdGBINC+0YLQutGA0YvRgtC+0LPQviDQvNC10L3RjlxuICAgIHZhciBNRU5VX0NMT1NFRF9DTEFTUyA9ICdtZW51LS1jbG9zZWQnOyAvLyDQmtC70LDRgdGBINC30LDQutGA0YvRgtC+0LPQviDQvNC10L3RjlxuICAgIHZhciBPVkVSTEFZX0FDVElWRV9DTEFTUyA9ICdvdmVybGF5LS1hY3RpdmUnOyAvLyDQmtC70LDRgdGBINCw0LrRgtC40LLQvdC+0LPQviDQt9Cw0YLQtdC80L3Rj9GO0YnQtdCz0L4g0YHQu9C+0Y9cblxuICAgIHZhciBidXJnZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAg0LzQtdC90Y5cbiAgICB2YXIgbWVudUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpOyAvLyDQnNC10L3RjlxuICAgIHZhciBvdmVybGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jyk7IC8vINCX0LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcbiAgICB2YXIgaW50ZXJuYWxMaW5rc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTsgLy8g0JLQvdGD0YLRgNC10L3QvdC40LUg0YHRgdGL0LvQutC4XG5cbiAgICB2YXIgaW5pdE1lbnUgPSBmdW5jdGlvbiAoYnVyZ2VyLCBtZW51LCBvdmVybGF5LCBpbnRlcm5hbExpbmtzKSB7XG4gICAgICB2YXIgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICB3aW5kb3cubWVudU9wZW5lZCA9IGZhbHNlOyAvLyDQpNC70LDQsyDQsiDQs9C70L7QsdCw0LvRjNC90L7QuSDQvtCx0LvQsNGB0YLQuCwg0YfRgtC+INCx0Ysg0L/RgNC4INC+0YLQutGA0YvRgtC40Lgg0L/QvtC/0LDQv9CwINCx0YvQu9C+INC40LfQstC10YHRgtC90L4g0L7RgtC60YDRi9GC0L4g0LvQuCDQvNC10L3RjlxuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINCx0LvQvtC60LjRgNC+0LLQutGDINCx0L7QtNC4XG4gICAgICB2YXIgc3dpdGNoQmxvY2tCb2R5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT0gZmFsc2UpIHtcbiAgICAgICAgICBib2R5RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvZHlFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LrQvdC+0L/QutGDINC80LXQvdGOXG4gICAgICB2YXIgc3dpdGNoQnVyZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShCVVJHRVJfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoQlVSR0VSX09QRU5FRF9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINC80LXQvdGOXG4gICAgICB2YXIgc3dpdGNoTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKE1FTlVfQ0xPU0VEX0NMQVNTKSkge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX09QRU5FRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIHdpbmRvdy5tZW51T3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9PUEVORURfQ0xBU1MpO1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX0NMT1NFRF9DTEFTUyk7XG4gICAgICAgICAgd2luZG93Lm1lbnVPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgICAgdmFyIHN3aXRjaE92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShPVkVSTEFZX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIHN3aXRjaEJsb2NrQm9keSgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0JTQtdC50YHRgtCy0LjRjyDQv9GA0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINC80LXQvdGOXG4gICAgICB2YXIgY2xvc2VPcGVuTWVudSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dCkge1xuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaEJ1cmdlcigpO1xuICAgICAgICBzd2l0Y2hNZW51KCk7XG4gICAgICAgIGlmIChvdmVybGF5KSB7XG4gICAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQldGB0LvQuCDQutC70LjQuiDQv9C+INC30LDRgtC10LzQvdGP0Y7RidC10LzRgyDRgdC70L7Rjiwg0YLQviDQvNC10L3RjiDQt9Cw0LrRgNGL0LLQsNC10YLRgdGPXG4gICAgICB2YXIgb25PdmVybGF5Q2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQudGFyZ2V0ID09PSBvdmVybGF5KSB7XG4gICAgICAgICAgY2xvc2VPcGVuTWVudSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQntCx0YDQsNCx0L7RgtGH0LjQuiDQutC70LjQutCwINC/0L4g0LLQvdGD0YLRgNC10L3QvdC10Lkg0YHRgdGL0LvQutC1XG4gICAgICB2YXIgb25pbnRlcm5hbExpbmtDbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xvc2VPcGVuTWVudSgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9C40LrQsCDQvdCwINC60L3QvtC/0LrQtSDQvNC10L3RjlxuICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPcGVuTWVudSk7XG5cbiAgICAgIC8vINCf0L4g0YLQsNC/0YMg0L3QsCDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5INC30LDQutGA0YvQstCw0LXRgtGB0Y8g0LzQtdC90Y5cbiAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk92ZXJsYXlDbGljayk7XG5cbiAgICAgIGludGVybmFsTGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25pbnRlcm5hbExpbmtDbGljayk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8g0J/QvtC00LrQu9GO0YfQsNC10Lwg0LLRgdC1INGN0LvQtdC80LXQvdGC0YtcbiAgICBpbml0TWVudShidXJnZXJFbGVtZW50LCBtZW51RWxlbWVudCwgb3ZlcmxheUVsZW1lbnQsIGludGVybmFsTGlua3NFbGVtZW50cyk7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBQT1BVUF9BQ1RJVkVfQ0xBU1MgPSAncG9wdXAtLWFjdGl2ZSc7XG4gICAgdmFyIE9WRVJMQVlfQUNUSVZFX0NMQVNTID0gJ292ZXJsYXktLWFjdGl2ZSc7XG4gICAgdmFyIENMT1NFX0JVVFRPTl9DTEFTUyA9ICdwb3B1cF9fY2xvc2UnO1xuXG4gICAgdmFyIGNhbGxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX3RlbC1idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/QvtC30LLQvtC90LjRgtC1INC80L3QtVwiXG4gICAgdmFyIGNhbGxCdXR0b25EZXNrdG9wRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcl9fdGVsLWJ1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LfQstC+0L3QuNGC0LUg0LzQvdC1XCIgKNC00LXRgdC60YLQvtC/KVxuICAgIHZhciBjYWxsUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1jYWxsJyk7IC8vINCf0L7Qv9Cw0L8gXCLQl9Cw0LrQsNC30LDRgtGMINC30LLQvtC90L7QulwiXG4gICAgdmFyIGNvc3RCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tb3JkZXJfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQo9C30L3QsNGC0Ywg0YHRgtC+0LjQvNC+0YHRgtGMXCJcbiAgICB2YXIgY29zdFBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY29zdCcpOyAvLyDQn9C+0L/QsNC/IFwi0KPQt9C90LDRgtGMINGB0YLQvtC40LzQvtGB0YLRjFwiXG4gICAgdmFyIHZpZGVvQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbl9fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0L7Qu9GD0YfQuNGC0Ywg0LLQuNC00LXQvtGB0YrQtdC80LrRg8Kg0YHCoNCy0L7Qt9C00YPRhdCwXCJcbiAgICB2YXIgdmlkZW9Qb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLXZpZGVvJyk7IC8vINCf0L7Qv9Cw0L8gXCLQn9C+0LvRg9GH0LjRgtGMINCy0LjQtNC10L7RgdGK0LXQvNC60YPCoNGBwqDQstC+0LfQtNGD0YXQsFwiXG4gICAgdmFyIGFjdGlvbkJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uc19fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0YDQuNC90Y/RgtGMINGD0YfQsNGB0YLQuNC1XCJcbiAgICB2YXIgYWN0aW9uUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1hY3Rpb24nKTsgLy8g0J/QvtC/0LDQvyBcItCj0YfQsNGB0YLQuNC1INCyINCw0LrRhtC40LhcIlxuICAgIHZhciBvZmZlckJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWR2YW50YWdlc19fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0L7Qu9GD0YfQuNGC0Ywg0LrQvtC80LzQtdGA0YfQtdGB0LrQvtC1INC/0YDQtdC00LvQvtC20LXQvdC40LVcIlxuICAgIHZhciBvZmZlclBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tb2ZmZXInKTsgLy8g0J/QvtC/0LDQvyBcItCS0LDRiNC1INC60L7QvNC80LXRgNGH0LXRgdC60L7QtSDQv9GA0LXQtNC70L7QttC10L3QuNC1XCJcbiAgICB2YXIgY2FsbGJhY2tCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3RzX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0KHQstGP0LbQuNGC0LXRgdGMINGB0L4g0LzQvdC+0LlcIlxuICAgIHZhciBjYWxsYmFja1BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY2FsbGJhY2snKTsgLy8g0J/QvtC/0LDQvyBcItCe0LHRgNCw0YLQvdCw0Y8g0YHQstGP0LfRjFwiXG4gICAgdmFyIG92ZXJsYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXktcG9wdXAnKTsgLy8g0JfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuXG4gICAgLy8g0JPQu9Cw0LLQvdCw0Y8g0YTRg9C90LrRhtC40Y8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40LhcbiAgICB2YXIgaW5pdFBvcHVwID0gZnVuY3Rpb24gKGJ1dHRvbiwgcG9wdXAsIG92ZXJsYXkpIHtcbiAgICAgIHZhciBFU0NfS0VZQ09ERSA9IDI3O1xuICAgICAgdmFyIEVOVEVSX0tFWUNPREUgPSAxMztcbiAgICAgIHZhciBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy4nICsgQ0xPU0VfQlVUVE9OX0NMQVNTKTtcbiAgICAgIHZhciBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgICAgLy8g0JHQu9C+0LrQuNGA0YPQtdGCINC/0YDQvtC60YDRg9GC0LrRgyDRgdGC0YDQsNC90LjRhtGLXG4gICAgICB2YXIgYmxvY2tCb2R5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBib2R5RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgfTtcblxuICAgICAgLy8g0KDQsNC30LHQu9C+0LrQuNGA0YPQtdGCINC/0YDQvtC60YDRg9GC0LrRgyDRgdGC0YDQsNC90LjRhtGLXG4gICAgICB2YXIgdW5ibG9ja0JvZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghd2luZG93Lm1lbnVPcGVuZWQpIHtcbiAgICAgICAgICBib2R5RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60YDQtdGB0YLQuNC6LCDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uQ2xvc2VCdXR0b25DbGljayA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQvdCw0LbQsNGC0LjQuCBFbnRlciDQvdCwINC60YDQtdGB0YLQuNC60LUg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkNsb3NlQnV0dG9uS2V5ZG93biA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09PSBFTlRFUl9LRVlDT0RFKSB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0L3QsNC20LDRgtC40LggRVNDINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25XaW5kb3dLZXlkb3duID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT09IEVTQ19LRVlDT0RFKSB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC30LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LksINC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25PdmVybGF5Q2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQudGFyZ2V0ID09PSBvdmVybGF5KSB7XG4gICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyDQntGC0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQvywg0L3QsNCy0LXRiNC40LLQsNC10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICAgICAgdmFyIG9wZW5Qb3B1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChQT1BVUF9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xvc2VCdXR0b25DbGljayk7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkNsb3NlQnV0dG9uS2V5ZG93bik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25XaW5kb3dLZXlkb3duKTtcbiAgICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3ZlcmxheUNsaWNrKTtcbiAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICBibG9ja0JvZHkoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCX0LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/LCDRg9C00LDQu9GP0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4XG4gICAgICB2YXIgY2xvc2VQb3B1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShQT1BVUF9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xvc2VCdXR0b25DbGljayk7XG4gICAgICAgIGNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkNsb3NlQnV0dG9uS2V5ZG93bik7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25XaW5kb3dLZXlkb3duKTtcbiAgICAgICAgb3ZlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3ZlcmxheUNsaWNrKTtcbiAgICAgICAgc3dpdGNoT3ZlcmxheSgpO1xuICAgICAgICB1bmJsb2NrQm9keSgpO1xuICAgICAgfTtcblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgICB2YXIgc3dpdGNoT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKE9WRVJMQVlfQUNUSVZFX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINC+0YLQutGA0YvQstCw0LXRgtGB0Y8g0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvcGVuUG9wdXAoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCd0LDQstC10YjQuNCy0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LrQvdC+0L/QutGDXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkJ1dHRvbkNsaWNrKTtcbiAgICB9O1xuXG4gICAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LjRgNGD0LXQvCDQstGB0LUg0L/QvtC/0LDQv9GLXG4gICAgaW5pdFBvcHVwKGNvc3RCdXR0b25FbGVtZW50LCBjb3N0UG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGNhbGxCdXR0b25FbGVtZW50LCBjYWxsUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGNhbGxCdXR0b25EZXNrdG9wRWxlbWVudCwgY2FsbFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cCh2aWRlb0J1dHRvbkVsZW1lbnQsIHZpZGVvUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGFjdGlvbkJ1dHRvbkVsZW1lbnQsIGFjdGlvblBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChvZmZlckJ1dHRvbkVsZW1lbnQsIG9mZmVyUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG4gICAgaW5pdFBvcHVwKGNhbGxiYWNrQnV0dG9uRWxlbWVudCwgY2FsbGJhY2tQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbn0pKCk7XG4iLCIvLyDQodC70LDQudC00LXRgCDQsiDQs9Cw0LvQtdGA0LXQtVxuXG4kKCcuZ2FsbGVyeV9fbGlzdCcpLnNsaWNrKHtcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIGluZmluaXRlOiBmYWxzZSxcbiAgcHJldkFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImdhbGxlcnlfX2xpc3QtYXJyb3cgZ2FsbGVyeV9fbGlzdC1hcnJvdy0tcHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJnYWxsZXJ5X19saXN0LWFycm93IGdhbGxlcnlfX2xpc3QtYXJyb3ctLW5leHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QodC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICBhc05hdkZvcjogJy5nYWxsZXJ5X19saXN0LXRleHQnXG59KTtcblxuJChcIi5nYWxsZXJ5X19saXN0LXRleHRcIikub24oXCJpbml0XCIsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xuICBpZiAoc2xpY2suY3VycmVudFNsaWRlICsgMSA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dChwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH07XG4gIGlmIChzbGljay5zbGlkZUNvdW50IDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfTtcbn0pO1xuXG4kKFwiLmdhbGxlcnlfX2xpc3QtdGV4dFwiKS5vbihcImFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlKSB7XG4gIGlmIChzbGljay5jdXJyZW50U2xpZGUgKyAxIDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2N1cnJlbnQtaXRlbVwiKS50ZXh0KHBhcnNlSW50KHNsaWNrLmN1cnJlbnRTbGlkZSArIDEpKTtcbiAgfTtcbiAgaWYgKHNsaWNrLnNsaWRlQ291bnQgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fYWxsLWl0ZW1zXCIpLnRleHQocGFyc2VJbnQoc2xpY2suc2xpZGVDb3VudCkpO1xuICB9O1xufSk7XG5cbiQoJy5nYWxsZXJ5X19saXN0LXRleHQnKS5zbGljayh7XG4gIGZhZGU6IHRydWUsXG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICBpbmZpbml0ZTogZmFsc2UsXG4gIGFycm93czogZmFsc2UsXG4gIGFzTmF2Rm9yOiAnLmdhbGxlcnlfX2xpc3QnXG59KTtcblxuLy8g0KHQu9Cw0LnQtNC10YAg0LIg0LHQu9C+0LrQtSBcItCh0LrQvtC70YzQutC+INGN0YLQviDQsiDRhtC40YTRgNCw0YVcIlxuJCgnLmNvbXBhcmluZ19fbGlzdCcpLnNsaWNrKHtcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gIGNlbnRlck1vZGU6IHRydWUsXG4gIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxuICBkb3RzOiB0cnVlLFxuICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgcHJldkFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImNvbXBhcmluZ19fbGlzdC1hcnJvdyBjb21wYXJpbmdfX2xpc3QtYXJyb3ctLXByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0J/RgNC10LTRi9C00YPRidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICBuZXh0QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiY29tcGFyaW5nX19saXN0LWFycm93IGNvbXBhcmluZ19fbGlzdC1hcnJvdy0tbmV4dFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCh0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIHJlc3BvbnNpdmU6IFtcbiAgICB7XG4gICAgICBicmVha3BvaW50OiA3NjcsXG4gICAgICBzZXR0aW5nczogXCJ1bnNsaWNrXCJcbiAgICB9XG4gIF1cbn0pO1xuXG4vLyDQodC70LDQudC00LXRgCDQsiDQsdC70L7QutC1IFwi0J/RgNC10LjQvNGD0YnQtdGB0YLQstCwXCJcbiQoJy5hZHZhbnRhZ2VzX19saXN0Jykuc2xpY2soe1xuICBhY2Nlc3NpYmlsaXR5OiBmYWxzZSxcbiAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcbiAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gIGRvdHM6IHRydWUsXG4gIG1vYmlsZUZpcnN0OiB0cnVlLFxuICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiYWR2YW50YWdlc19fbGlzdC1hcnJvdyBhZHZhbnRhZ2VzX19saXN0LWFycm93LS1wcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImFkdmFudGFnZXNfX2xpc3QtYXJyb3cgYWR2YW50YWdlc19fbGlzdC1hcnJvdy0tbmV4dFwiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCh0LvQtdC00YPRjtGJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIHJlc3BvbnNpdmU6IFtcbiAgICB7XG4gICAgICBicmVha3BvaW50OiA3NjcsXG4gICAgICBzZXR0aW5nczogXCJ1bnNsaWNrXCJcbiAgICB9XG4gIF1cbn0pO1xuIiwiJ3VzZS1zdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgQlVUVE9OX0FDVElWRV9DTEFTUyA9ICd1c2VfX2J1dHRvbi0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtC5INC60L3QvtC/0LrQuFxuICB2YXIgQkxPQ0tfQUNUSVZFX0NMQVNTID0gJ3VzZV9fbGlzdC0tYWN0aXZlJzsgLy8g0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtCz0L4g0LHQu9C+0LrQsFxuXG4gIHZhciBidXR0b25zRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutC4XG4gIHZhciBibG9ja3NFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VfX2xpc3QnKTsgLy8g0JHQu9C+0LrQuFxuXG4gIC8vINCT0LvQsNCy0L3QsNGPINGE0YPQvdC60YbQuNGPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9GPXG4gIHZhciBpbml0U3dpdGNoZXIgPSBmdW5jdGlvbiAoYnV0dG9ucywgYmxvY2tzKSB7XG5cbiAgICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINCx0LvQvtC6INC/0L4g0L3QsNC20LDRgtC+0Lkg0LrQvdC+0L/QutC1XG4gICAgdmFyIHN3aXRjaEJsb2NrID0gZnVuY3Rpb24gKGNsaWNrZWRCdXR0b24sIGNsaWNrZWRCdXR0b25JbmRleCkge1xuICAgICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoQlVUVE9OX0FDVElWRV9DTEFTUyk7XG4gICAgICB9KTtcbiAgICAgIGNsaWNrZWRCdXR0b24uY2xhc3NMaXN0LmFkZChCVVRUT05fQUNUSVZFX0NMQVNTKTtcbiAgICAgIGJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuICAgICAgICBibG9jay5jbGFzc0xpc3QucmVtb3ZlKEJMT0NLX0FDVElWRV9DTEFTUyk7XG4gICAgICB9KTtcbiAgICAgIGJsb2Nrc1tjbGlja2VkQnV0dG9uSW5kZXhdLmNsYXNzTGlzdC5hZGQoQkxPQ0tfQUNUSVZFX0NMQVNTKTtcbiAgICB9O1xuXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40LrQuCDQtNC70Y8g0LrQvdC+0L/QvtC6XG4gICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24sIGluZGV4KSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaEJsb2NrKGJ1dHRvbiwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cbiAgaW5pdFN3aXRjaGVyKGJ1dHRvbnNFbGVtZW50cywgYmxvY2tzRWxlbWVudHMpO1xufSkoKTtcbiIsIihmdW5jdGlvbigkKXtcbiAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7XG4gICAgJChcImFbcmVsPSdtX1BhZ2VTY3JvbGwyaWQnXVwiKS5tUGFnZVNjcm9sbDJpZCgpO1xuICB9KTtcbn0pKGpRdWVyeSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkaW5nc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRpbmctLW1hcmdpbi1qcycpO1xuICB2YXIgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXItLWhlYWRpbmctanMnKTtcblxuICB2YXIgaW5pdEhlYWRpbmdzID0gZnVuY3Rpb24gKGhlYWRpbmdzLCBjb250YWluZXIpIHtcbiAgICB2YXIgZGlzdGFuc2UgPSBjb250YWluZXIub2Zmc2V0TGVmdDtcblxuICAgIGhlYWRpbmdzLmZvckVhY2goZnVuY3Rpb24gKGhlYWRpbmcpIHtcbiAgICAgIGhlYWRpbmcuc3R5bGUubWFyZ2luTGVmdCA9IGRpc3RhbnNlICsgJ3B4JztcbiAgICB9KTtcbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgIGluaXRIZWFkaW5ncyhoZWFkaW5nc0VsZW1lbnRzLCBjb250YWluZXJFbGVtZW50KTtcbiAgfSk7XG5cbiAgaW5pdEhlYWRpbmdzKGhlYWRpbmdzRWxlbWVudHMsIGNvbnRhaW5lckVsZW1lbnQpO1xufSkoKTtcbiJdfQ==
