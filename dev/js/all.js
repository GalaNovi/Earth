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

      // Обработчик клика на кнопке меню
      burger.addEventListener('click', closeOpenMenu);

      // По тапу на затемняющий слой закрывается меню
      overlay.addEventListener('click', onOverlayClick);

      internalLinks.forEach(function (link) {
        link.addEventListener('click', closeOpenMenu);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwb3B1cHMuanMiLCJzbGlkZXJzLmpzIiwidXNlLXN3aXRjaGVyLmpzIiwic2Nyb2xsLW1lbnUuanMiLCJtYXJnaW4taGVhZGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBCVVJHRVJfT1BFTkVEX0NMQVNTID0gJ3BhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbi0tb3BlbmVkJzsgLy8g0JrQu9Cw0YHRgSDRgyDQutC90L7Qv9C60Lgg0L/RgNC4INC+0YLQutGA0YvRgtC+0Lwg0LzQtdC90Y5cbiAgICB2YXIgQlVSR0VSX0NMT1NFRF9DTEFTUyA9ICdwYWdlLWhlYWRlcl9fbWVudS1idXR0b24tLWNsb3NlZCc7IC8vINCa0LvQsNGB0YEg0YMg0LrQvdC+0L/QutC4INC/0YDQuCDQt9Cw0LrRgNGL0YLQvtC8INC80LXQvdGOXG4gICAgdmFyIE1FTlVfT1BFTkVEX0NMQVNTID0gJ21lbnUtLW9wZW5lZCc7IC8vINCa0LvQsNGB0YEg0L7RgtC60YDRi9GC0L7Qs9C+INC80LXQvdGOXG4gICAgdmFyIE1FTlVfQ0xPU0VEX0NMQVNTID0gJ21lbnUtLWNsb3NlZCc7IC8vINCa0LvQsNGB0YEg0LfQsNC60YDRi9GC0L7Qs9C+INC80LXQvdGOXG4gICAgdmFyIE9WRVJMQVlfQUNUSVZFX0NMQVNTID0gJ292ZXJsYXktLWFjdGl2ZSc7IC8vINCa0LvQsNGB0YEg0LDQutGC0LjQstC90L7Qs9C+INC30LDRgtC10LzQvdGP0Y7RidC10LPQviDRgdC70L7Rj1xuXG4gICAgdmFyIGJ1cmdlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX21lbnUtYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCDQvNC10L3RjlxuICAgIHZhciBtZW51RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7IC8vINCc0LXQvdGOXG4gICAgdmFyIG92ZXJsYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKTsgLy8g0JfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgIHZhciBpbnRlcm5hbExpbmtzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpOyAvLyDQktC90YPRgtGA0LXQvdC90LjQtSDRgdGB0YvQu9C60LhcblxuICAgIHZhciBpbml0TWVudSA9IGZ1bmN0aW9uIChidXJnZXIsIG1lbnUsIG92ZXJsYXksIGludGVybmFsTGlua3MpIHtcbiAgICAgIHZhciBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgIHdpbmRvdy5tZW51T3BlbmVkID0gZmFsc2U7IC8vINCk0LvQsNCzINCyINCz0LvQvtCx0LDQu9GM0L3QvtC5INC+0LHQu9Cw0YHRgtC4LCDRh9GC0L4g0LHRiyDQv9GA0Lgg0L7RgtC60YDRi9GC0LjQuCDQv9C+0L/QsNC/0LAg0LHRi9C70L4g0LjQt9Cy0LXRgdGC0L3QviDQvtGC0LrRgNGL0YLQviDQu9C4INC80LXQvdGOXG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LHQu9C+0LrQuNGA0L7QstC60YMg0LHQvtC00LhcbiAgICAgIHZhciBzd2l0Y2hCbG9ja0JvZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChib2R5RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PSBmYWxzZSkge1xuICAgICAgICAgIGJvZHlFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQutC90L7Qv9C60YMg0LzQtdC90Y5cbiAgICAgIHZhciBzd2l0Y2hCdXJnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKEJVUkdFUl9DTE9TRURfQ0xBU1MpO1xuICAgICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShCVVJHRVJfT1BFTkVEX0NMQVNTKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LzQtdC90Y5cbiAgICAgIHZhciBzd2l0Y2hNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobWVudS5jbGFzc0xpc3QuY29udGFpbnMoTUVOVV9DTE9TRURfQ0xBU1MpKSB7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoTUVOVV9DTE9TRURfQ0xBU1MpO1xuICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgd2luZG93Lm1lbnVPcGVuZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX09QRU5FRF9DTEFTUyk7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQ0xPU0VEX0NMQVNTKTtcbiAgICAgICAgICB3aW5kb3cubWVudU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5XG4gICAgICB2YXIgc3dpdGNoT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKE9WRVJMQVlfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgc3dpdGNoQmxvY2tCb2R5KCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQlNC10LnRgdGC0LLQuNGPINC/0YDRgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0LzQtdC90Y5cbiAgICAgIHZhciBjbG9zZU9wZW5NZW51ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoQnVyZ2VyKCk7XG4gICAgICAgIHN3aXRjaE1lbnUoKTtcbiAgICAgICAgaWYgKG92ZXJsYXkpIHtcbiAgICAgICAgICBzd2l0Y2hPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCV0YHQu9C4INC60LvQuNC6INC/0L4g0LfQsNGC0LXQvNC90Y/RjtGJ0LXQvNGDINGB0LvQvtGOLCDRgtC+INC80LXQvdGOINC30LDQutGA0YvQstCw0LXRgtGB0Y9cbiAgICAgIHZhciBvbk92ZXJsYXlDbGljayA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dC50YXJnZXQgPT09IG92ZXJsYXkpIHtcbiAgICAgICAgICBjbG9zZU9wZW5NZW51KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vINCe0LHRgNCw0LHQvtGC0YfQuNC6INC60LvQuNC60LAg0L3QsCDQutC90L7Qv9C60LUg0LzQtdC90Y5cbiAgICAgIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuXG4gICAgICAvLyDQn9C+INGC0LDQv9GDINC90LAg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuSDQt9Cw0LrRgNGL0LLQsNC10YLRgdGPINC80LXQvdGOXG4gICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PdmVybGF5Q2xpY2spO1xuXG4gICAgICBpbnRlcm5hbExpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Blbk1lbnUpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vINCf0L7QtNC60LvRjtGH0LDQtdC8INCy0YHQtSDRjdC70LXQvNC10L3RgtGLXG4gICAgaW5pdE1lbnUoYnVyZ2VyRWxlbWVudCwgbWVudUVsZW1lbnQsIG92ZXJsYXlFbGVtZW50LCBpbnRlcm5hbExpbmtzRWxlbWVudHMpO1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgUE9QVVBfQUNUSVZFX0NMQVNTID0gJ3BvcHVwLS1hY3RpdmUnO1xuICAgIHZhciBPVkVSTEFZX0FDVElWRV9DTEFTUyA9ICdvdmVybGF5LS1hY3RpdmUnO1xuICAgIHZhciBDTE9TRV9CVVRUT05fQ0xBU1MgPSAncG9wdXBfX2Nsb3NlJztcblxuICAgIHZhciBjYWxsQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X190ZWwtYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCf0L7Qt9Cy0L7QvdC40YLQtSDQvNC90LVcIlxuICAgIHZhciBjYWxsQnV0dG9uRGVza3RvcEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX3RlbC1idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0J/QvtC30LLQvtC90LjRgtC1INC80L3QtVwiICjQtNC10YHQutGC0L7QvylcbiAgICB2YXIgY2FsbFBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY2FsbCcpOyAvLyDQn9C+0L/QsNC/IFwi0JfQsNC60LDQt9Cw0YLRjCDQt9Cy0L7QvdC+0LpcIlxuICAgIHZhciBjb3N0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW9yZGVyX19idXR0b24nKTsgLy8g0JrQvdC+0L/QutCwIFwi0KPQt9C90LDRgtGMINGB0YLQvtC40LzQvtGB0YLRjFwiXG4gICAgdmFyIGNvc3RQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNvc3QnKTsgLy8g0J/QvtC/0LDQvyBcItCj0LfQvdCw0YLRjCDRgdGC0L7QuNC80L7RgdGC0YxcIlxuICAgIHZhciB2aWRlb0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb25fX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LvRg9GH0LjRgtGMINCy0LjQtNC10L7RgdGK0LXQvNC60YPCoNGBwqDQstC+0LfQtNGD0YXQsFwiXG4gICAgdmFyIHZpZGVvUG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS12aWRlbycpOyAvLyDQn9C+0L/QsNC/IFwi0J/QvtC70YPRh9C40YLRjCDQstC40LTQtdC+0YHRitC10LzQutGDwqDRgcKg0LLQvtC30LTRg9GF0LBcIlxuICAgIHZhciBhY3Rpb25CdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbnNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9GA0LjQvdGP0YLRjCDRg9GH0LDRgdGC0LjQtVwiXG4gICAgdmFyIGFjdGlvblBvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tYWN0aW9uJyk7IC8vINCf0L7Qv9Cw0L8gXCLQo9GH0LDRgdGC0LjQtSDQsiDQsNC60YbQuNC4XCJcbiAgICB2YXIgb2ZmZXJCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkdmFudGFnZXNfX2J1dHRvbicpOyAvLyDQmtC90L7Qv9C60LAgXCLQn9C+0LvRg9GH0LjRgtGMINC60L7QvNC80LXRgNGH0LXRgdC60L7QtSDQv9GA0LXQtNC70L7QttC10L3QuNC1XCJcbiAgICB2YXIgb2ZmZXJQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLW9mZmVyJyk7IC8vINCf0L7Qv9Cw0L8gXCLQktCw0YjQtSDQutC+0LzQvNC10YDRh9C10YHQutC+0LUg0L/RgNC10LTQu9C+0LbQtdC90LjQtVwiXG4gICAgdmFyIGNhbGxiYWNrQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0c19fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQsCBcItCh0LLRj9C20LjRgtC10YHRjCDRgdC+INC80L3QvtC5XCJcbiAgICB2YXIgY2FsbGJhY2tQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWNhbGxiYWNrJyk7IC8vINCf0L7Qv9Cw0L8gXCLQntCx0YDQsNGC0L3QsNGPINGB0LLRj9C30YxcIlxuICAgIHZhciBvdmVybGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5LXBvcHVwJyk7IC8vINCX0LDRgtC10LzQvdGP0Y7RidC40Lkg0YHQu9C+0LlcblxuICAgIC8vINCT0LvQsNCy0L3QsNGPINGE0YPQvdC60YbQuNGPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG4gICAgdmFyIGluaXRQb3B1cCA9IGZ1bmN0aW9uIChidXR0b24sIHBvcHVwLCBvdmVybGF5KSB7XG4gICAgICB2YXIgRVNDX0tFWUNPREUgPSAyNztcbiAgICAgIHZhciBFTlRFUl9LRVlDT0RFID0gMTM7XG4gICAgICB2YXIgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuJyArIENMT1NFX0JVVFRPTl9DTEFTUyk7XG4gICAgICB2YXIgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICAgIC8vINCR0LvQvtC60LjRgNGD0LXRgiDQv9GA0L7QutGA0YPRgtC60YMg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgdmFyIGJsb2NrQm9keSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgIH07XG5cbiAgICAgIC8vINCg0LDQt9Cx0LvQvtC60LjRgNGD0LXRgiDQv9GA0L7QutGA0YPRgtC60YMg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgdmFyIHVuYmxvY2tCb2R5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXdpbmRvdy5tZW51T3BlbmVkKSB7XG4gICAgICAgICAgYm9keUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC60LvQuNC60LUg0L3QsCDQutGA0LXRgdGC0LjQuiwg0LfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkNsb3NlQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0L3QsNC20LDRgtC40LggRW50ZXIg0L3QsCDQutGA0LXRgdGC0LjQutC1INC30LDQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/XG4gICAgICB2YXIgb25DbG9zZUJ1dHRvbktleWRvd24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChldnQua2V5Q29kZSA9PT0gRU5URVJfS0VZQ09ERSkge1xuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC90LDQttCw0YLQuNC4IEVTQyDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uV2luZG93S2V5ZG93biA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09PSBFU0NfS0VZQ09ERSkge1xuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J/RgNC4INC60LvQuNC60LUg0L3QsCDQt9Cw0YLQtdC80L3Rj9GO0YnQuNC5INGB0LvQvtC5LCDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQv1xuICAgICAgdmFyIG9uT3ZlcmxheUNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LnRhcmdldCA9PT0gb3ZlcmxheSkge1xuICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8g0J7RgtC60YDRi9Cy0LDQtdGCINC/0L7Qv9Cw0L8sINC90LDQstC10YjQuNCy0LDQtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60LhcbiAgICAgIHZhciBvcGVuUG9wdXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoUE9QVVBfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsb3NlQnV0dG9uQ2xpY2spO1xuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25DbG9zZUJ1dHRvbktleWRvd24pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uV2luZG93S2V5ZG93bik7XG4gICAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk92ZXJsYXlDbGljayk7XG4gICAgICAgIHN3aXRjaE92ZXJsYXkoKTtcbiAgICAgICAgYmxvY2tCb2R5KCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQl9Cw0LrRgNGL0LLQsNC10YIg0L/QvtC/0LDQvywg0YPQtNCw0LvRj9C10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICAgICAgdmFyIGNsb3NlUG9wdXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoUE9QVVBfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsb3NlQnV0dG9uQ2xpY2spO1xuICAgICAgICBjbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25DbG9zZUJ1dHRvbktleWRvd24pO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uV2luZG93S2V5ZG93bik7XG4gICAgICAgIG92ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk92ZXJsYXlDbGljayk7XG4gICAgICAgIHN3aXRjaE92ZXJsYXkoKTtcbiAgICAgICAgdW5ibG9ja0JvZHkoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LfQsNGC0LXQvNC90Y/RjtGJ0LjQuSDRgdC70L7QuVxuICAgICAgdmFyIHN3aXRjaE92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShPVkVSTEFZX0FDVElWRV9DTEFTUyk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvtGC0LrRgNGL0LLQsNC10YLRgdGPINC/0L7Qv9Cw0L9cbiAgICAgIHZhciBvbkJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgb3BlblBvcHVwKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyDQndCw0LLQtdGI0LjQstCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINC60L3QvtC/0LrRg1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdXR0b25DbGljayk7XG4gICAgfTtcblxuICAgIC8vINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0LLRgdC1INC/0L7Qv9Cw0L/Ri1xuICAgIGluaXRQb3B1cChjb3N0QnV0dG9uRWxlbWVudCwgY29zdFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsQnV0dG9uRWxlbWVudCwgY2FsbFBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsQnV0dG9uRGVza3RvcEVsZW1lbnQsIGNhbGxQb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAodmlkZW9CdXR0b25FbGVtZW50LCB2aWRlb1BvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChhY3Rpb25CdXR0b25FbGVtZW50LCBhY3Rpb25Qb3B1cEVsZW1lbnQsIG92ZXJsYXlFbGVtZW50KTtcbiAgICBpbml0UG9wdXAob2ZmZXJCdXR0b25FbGVtZW50LCBvZmZlclBvcHVwRWxlbWVudCwgb3ZlcmxheUVsZW1lbnQpO1xuICAgIGluaXRQb3B1cChjYWxsYmFja0J1dHRvbkVsZW1lbnQsIGNhbGxiYWNrUG9wdXBFbGVtZW50LCBvdmVybGF5RWxlbWVudCk7XG59KSgpO1xuIiwiLy8g0KHQu9Cw0LnQtNC10YAg0LIg0LPQsNC70LXRgNC10LVcblxuJCgnLmdhbGxlcnlfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICBpbmZpbml0ZTogZmFsc2UsXG4gIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJnYWxsZXJ5X19saXN0LWFycm93IGdhbGxlcnlfX2xpc3QtYXJyb3ctLXByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0J/RgNC10LTRi9C00YPRidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICBuZXh0QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwiZ2FsbGVyeV9fbGlzdC1hcnJvdyBnYWxsZXJ5X19saXN0LWFycm93LS1uZXh0XCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0KHQu9C10LTRg9GO0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgYXNOYXZGb3I6ICcuZ2FsbGVyeV9fbGlzdC10ZXh0J1xufSk7XG5cbiQoXCIuZ2FsbGVyeV9fbGlzdC10ZXh0XCIpLm9uKFwiaW5pdFwiLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcbiAgaWYgKHNsaWNrLmN1cnJlbnRTbGlkZSArIDEgPCAxMCkge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQoJzAnICsgcGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9IGVsc2Uge1xuICAgICQoXCIuZ2FsbGVyeV9fY3VycmVudC1pdGVtXCIpLnRleHQocGFyc2VJbnQoc2xpY2suY3VycmVudFNsaWRlICsgMSkpO1xuICB9O1xuICBpZiAoc2xpY2suc2xpZGVDb3VudCA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19hbGwtaXRlbXNcIikudGV4dChwYXJzZUludChzbGljay5zbGlkZUNvdW50KSk7XG4gIH07XG59KTtcblxuJChcIi5nYWxsZXJ5X19saXN0LXRleHRcIikub24oXCJhZnRlckNoYW5nZVwiLCBmdW5jdGlvbihldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSkge1xuICBpZiAoc2xpY2suY3VycmVudFNsaWRlICsgMSA8IDEwKSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dCgnMCcgKyBwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIi5nYWxsZXJ5X19jdXJyZW50LWl0ZW1cIikudGV4dChwYXJzZUludChzbGljay5jdXJyZW50U2xpZGUgKyAxKSk7XG4gIH07XG4gIGlmIChzbGljay5zbGlkZUNvdW50IDwgMTApIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KCcwJyArIHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiLmdhbGxlcnlfX2FsbC1pdGVtc1wiKS50ZXh0KHBhcnNlSW50KHNsaWNrLnNsaWRlQ291bnQpKTtcbiAgfTtcbn0pO1xuXG4kKCcuZ2FsbGVyeV9fbGlzdC10ZXh0Jykuc2xpY2soe1xuICBmYWRlOiB0cnVlLFxuICBhY2Nlc3NpYmlsaXR5OiBmYWxzZSxcbiAgaW5maW5pdGU6IGZhbHNlLFxuICBhcnJvd3M6IGZhbHNlLFxuICBhc05hdkZvcjogJy5nYWxsZXJ5X19saXN0J1xufSk7XG5cbi8vINCh0LvQsNC50LTQtdGAINCyINCx0LvQvtC60LUgXCLQodC60L7Qu9GM0LrQviDRjdGC0L4g0LIg0YbQuNGE0YDQsNGFXCJcbiQoJy5jb21wYXJpbmdfX2xpc3QnKS5zbGljayh7XG4gIGFjY2Vzc2liaWxpdHk6IGZhbHNlLFxuICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICBjZW50ZXJNb2RlOiB0cnVlLFxuICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcbiAgZG90czogdHJ1ZSxcbiAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJjb21wYXJpbmdfX2xpc3QtYXJyb3cgY29tcGFyaW5nX19saXN0LWFycm93LS1wcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQtdC00YvQtNGD0YnQuNC5INGB0LvQsNC50LQ8L3NwYW4+PC9idXR0b24+JyxcbiAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImNvbXBhcmluZ19fbGlzdC1hcnJvdyBjb21wYXJpbmdfX2xpc3QtYXJyb3ctLW5leHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QodC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICByZXNwb25zaXZlOiBbXG4gICAge1xuICAgICAgYnJlYWtwb2ludDogNzY3LFxuICAgICAgc2V0dGluZ3M6IFwidW5zbGlja1wiXG4gICAgfVxuICBdXG59KTtcblxuLy8g0KHQu9Cw0LnQtNC10YAg0LIg0LHQu9C+0LrQtSBcItCf0YDQtdC40LzRg9GJ0LXRgdGC0LLQsFwiXG4kKCcuYWR2YW50YWdlc19fbGlzdCcpLnNsaWNrKHtcbiAgYWNjZXNzaWJpbGl0eTogZmFsc2UsXG4gIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gIGNlbnRlck1vZGU6IHRydWUsXG4gIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxuICBkb3RzOiB0cnVlLFxuICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgcHJldkFycm93OiAnPGJ1dHRvbiBjbGFzcz1cImFkdmFudGFnZXNfX2xpc3QtYXJyb3cgYWR2YW50YWdlc19fbGlzdC1hcnJvdy0tcHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0PC9zcGFuPjwvYnV0dG9uPicsXG4gIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJhZHZhbnRhZ2VzX19saXN0LWFycm93IGFkdmFudGFnZXNfX2xpc3QtYXJyb3ctLW5leHRcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QodC70LXQtNGD0Y7RidC40Lkg0YHQu9Cw0LnQtDwvc3Bhbj48L2J1dHRvbj4nLFxuICByZXNwb25zaXZlOiBbXG4gICAge1xuICAgICAgYnJlYWtwb2ludDogNzY3LFxuICAgICAgc2V0dGluZ3M6IFwidW5zbGlja1wiXG4gICAgfVxuICBdXG59KTtcbiIsIid1c2Utc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEJVVFRPTl9BQ1RJVkVfQ0xBU1MgPSAndXNlX19idXR0b24tLWFjdGl2ZSc7IC8vINCa0LvQsNGB0YEg0LDQutGC0LjQstC90L7QuSDQutC90L7Qv9C60LhcbiAgdmFyIEJMT0NLX0FDVElWRV9DTEFTUyA9ICd1c2VfX2xpc3QtLWFjdGl2ZSc7IC8vINCa0LvQsNGB0YEg0LDQutGC0LjQstC90L7Qs9C+INCx0LvQvtC60LBcblxuICB2YXIgYnV0dG9uc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZV9fYnV0dG9uJyk7IC8vINCa0L3QvtC/0LrQuFxuICB2YXIgYmxvY2tzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlX19saXN0Jyk7IC8vINCR0LvQvtC60LhcblxuICAvLyDQk9C70LDQstC90LDRjyDRhNGD0L3QutGG0LjRjyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRj1xuICB2YXIgaW5pdFN3aXRjaGVyID0gZnVuY3Rpb24gKGJ1dHRvbnMsIGJsb2Nrcykge1xuXG4gICAgLy8g0J/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQsdC70L7QuiDQv9C+INC90LDQttCw0YLQvtC5INC60L3QvtC/0LrQtVxuICAgIHZhciBzd2l0Y2hCbG9jayA9IGZ1bmN0aW9uIChjbGlja2VkQnV0dG9uLCBjbGlja2VkQnV0dG9uSW5kZXgpIHtcbiAgICAgIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKEJVVFRPTl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgICBjbGlja2VkQnV0dG9uLmNsYXNzTGlzdC5hZGQoQlVUVE9OX0FDVElWRV9DTEFTUyk7XG4gICAgICBibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAoYmxvY2spIHtcbiAgICAgICAgYmxvY2suY2xhc3NMaXN0LnJlbW92ZShCTE9DS19BQ1RJVkVfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgICBibG9ja3NbY2xpY2tlZEJ1dHRvbkluZGV4XS5jbGFzc0xpc3QuYWRkKEJMT0NLX0FDVElWRV9DTEFTUyk7XG4gICAgfTtcblxuICAgIC8vINCe0LHRgNCw0LHQvtGC0YfQuNC60Lgg0LTQu9GPINC60L3QvtC/0L7QulxuICAgIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uLCBpbmRleCkge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2hCbG9jayhidXR0b24sIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXG4gIGluaXRTd2l0Y2hlcihidXR0b25zRWxlbWVudHMsIGJsb2Nrc0VsZW1lbnRzKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oJCl7XG4gICQod2luZG93KS5vbihcImxvYWRcIixmdW5jdGlvbigpe1xuICAgICQoXCJhW3JlbD0nbV9QYWdlU2Nyb2xsMmlkJ11cIikubVBhZ2VTY3JvbGwyaWQoKTtcbiAgfSk7XG59KShqUXVlcnkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZGluZ3NFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkaW5nLS1tYXJnaW4tanMnKTtcbiAgdmFyIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyLS1oZWFkaW5nLWpzJyk7XG5cbiAgdmFyIGluaXRIZWFkaW5ncyA9IGZ1bmN0aW9uIChoZWFkaW5ncywgY29udGFpbmVyKSB7XG4gICAgdmFyIGRpc3RhbnNlID0gY29udGFpbmVyLm9mZnNldExlZnQ7XG5cbiAgICBoZWFkaW5ncy5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkaW5nKSB7XG4gICAgICBoZWFkaW5nLnN0eWxlLm1hcmdpbkxlZnQgPSBkaXN0YW5zZSArICdweCc7XG4gICAgfSk7XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpbml0SGVhZGluZ3MoaGVhZGluZ3NFbGVtZW50cywgY29udGFpbmVyRWxlbWVudCk7XG4gIH0pO1xuXG4gIGluaXRIZWFkaW5ncyhoZWFkaW5nc0VsZW1lbnRzLCBjb250YWluZXJFbGVtZW50KTtcbn0pKCk7XG4iXX0=
