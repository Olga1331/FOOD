/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
       // Calc
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

        if (localStorage.getItem('sex')) { /* проверка, если есть значение в localStorage, то бирем его */
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female'; /* значение по дефолту */
            localStorage.setItem('sex', 'female'); /* записываем в localStorage */
        }
    
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375); /* значение по дефолту */
        }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {  /* Проверка, если нет хотя бы одной данной из списка, функция запускать не будет. */
            result.textContent = '___'; 
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) { 
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); /* вытаскиваем значение дата атрибута */
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); /* вызов функции для блока м/ж */
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); /* вызов функции для блока активности */

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function cards() {
    
    // создаем карточки меню с помощью классов


class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.conversion = 71;
        this.changeToRUB();

    }

    changeToRUB() {
        this.price = this.price * this.conversion;
    }

    render() {
        const element = document.createElement('div');
        
        if(this.classes.length === 0) { /* если не передано ни одного значения в классы */
           this.classes = "menu__item"; /* присваиваеm класс menu_item */
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className)); /* иначе пеербираем рест массив классов и добавляем полученный */
        }

        
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}> 
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
    `;

    this.parent.append(element);

    }    
}
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");




function forms(formSelector, timerOpenModal) {
    
    // post запросы

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    
    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
         
            form.insertAdjacentElement('afterend', statusMessage);/* вставляем спинер после формы */

            
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
 

          (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showMessegeModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showMessegeModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showMessegeModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', timerOpenModal);

// создаем новое модальное окно для оповещения пользователя
        const messageModal = document.createElement('div');
        messageModal.classList.add('modal__dialog');
        messageModal.innerHTML = `
            <div class='modal__content'>
            <div class='modal__close'data-close>×</div>
            <div class='modal__title'>${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(messageModal);
        setTimeout(() => {
            messageModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        },4000);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, timerOpenModal) {
    const  modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (timerOpenModal) {
        clearInterval(timerOpenModal); /* если timerOpenModal был передан/ он существует, то запускаем clearInterval */
    } 
}

function closeModal(modalSelector) {
    const  modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show'); 
    document.body.style.overflow = '';

}


function modal(triggerSelector, modalSelector, timerOpenModal) {

    const modalOpenBtn = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    modalOpenBtn.forEach (btn => {
    btn.addEventListener('click',() => openModal(modalSelector, timerOpenModal)); /* оборачиваем в колбэк ф-цию, чтобы openModal вызывалась после клика */
}); 

 


    modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') =='') {
        closeModal(modalSelector);
    }
});

    document.addEventListener('keydown', (event) => { /* добавляем закрытие окна по кнопке esc */
    if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal(modalSelector);
    }
});

  

    function showModalByScroll() { /* показываем окно при прокрутке до конца стр */
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, timerOpenModal);
        window.removeEventListener('scroll', showModalByScroll); /* удаляем обработчик,чтобы окно показывальсь только 1 раз */  
    }
    }
    window.addEventListener('scroll', showModalByScroll);
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner }) {
           // Slider

    const slides = document.querySelectorAll(slide), 
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          innerSlides = document.querySelector(inner),
          width = slidesWrapper.clientWidth;

    let slideIndex = 1;
    let activeSlide = 0;


    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }

    function textIndex(){
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    }


    slidesWrapper.style.overflow = 'hidden';   

    innerSlides.style.width = 100 * slides.length + '%';
    innerSlides.style.display = 'flex';
    innerSlides.style.transition = '0.5s all';

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;

    if (i == 0) {
        dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function activeDots(dots) {
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[activeSlide].style.opacity = 1;
    }

    slides.forEach(slide => {
        slide.style.width = width;
    });

    function changeSlide(direction) {
        if (direction === "right") { 
            activeSlide++;
            if (activeSlide === slides.length) { 
                activeSlide = 0; 
            } 
            } else if (direction === "left") {
                activeSlide--;
                if (activeSlide < 0) {
                activeSlide = slides.length - 1;
                }
            }

        innerSlides.style.transform =`translateX(-${activeSlide * width}px)`; 
    }

    function changeIndex(direction) {
        if (direction === "right") {
            slideIndex++;
            if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        } else if (direction === "left") {
            slideIndex--;
            if (slideIndex == 0) {
            slideIndex = slides.length;
            }     
        }
    }
    
    prev.addEventListener('click', () =>{
        changeSlide('left');
        changeIndex('left');
        activeDots(dots);
        textIndex();
        
    });
    
    next.addEventListener('click', () =>{
        changeSlide('right');
        changeIndex('right');
        activeDots(dots);
        textIndex();
        
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
    
            slideIndex = slideTo;
            activeSlide = slideTo - 1;
    
            innerSlides.style.transform = `translateX(-${activeSlide* width}px)`;
            activeDots(dots);
            textIndex();
    
        });
    
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);



/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeSelector) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    // функция скрываем контент табов
    function hideTabContent() {
        tabsContent.forEach(item => {
                               // скрыть
            item.classList.add('hide');
                                // показать, анимация
            item.classList.remove('show', 'fade');
    });


    //    перебираем все табы и удаляем класс 'tabheader__item_active'
        tabs.forEach(item => {
            item.classList.remove(activeSelector);
        });
    }


    // функция показать контент табов.Через i передается № таба попорядку.По дефолту i=0. 
    // Добавляем-показать,анимация, класс 'tabheader__item_active'.
    // удаляем-скрытие
    function showTabcontent(i=0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeSelector);
       
    }


    // вызыаем функции
    hideTabContent();
    showTabcontent();


    // навешиваем обработчик события клик на родителя табов
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
    // проверяем сработало ли наше событие на елементе с классом 'tabheader__item'.Перебираем все табы (елемент, номер).
    // Если событие совпадает с элементом, то вызываем фунцкции
        if(target && target.classList.contains(tabsSelector.slice(1))) { /* убираем точку перед селектором и передаем значение tabheader__item */
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabcontent(i);
                }
                
            });

        }

    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
 
    // функция сколько времени осталось
        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                // округление до целого числа (перевод млс в дни,часы и т.д.)
                    days = Math.floor(t / (1000*60*60*24)),
                    hours = Math.floor((t / (1000*60*60) % 24)),
                    minutes = Math.floor(t / (1000*60) % 60),
                    seconds = Math.floor(t / 1000 % 60);
    
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    
        }
    // функция которая добавляет 0 впереди часа, если значение меньше 10.
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            }else if(num < 0) {
                return('00');
            }
            else {
                return(num);
            }
        }
    // устанавливаем часы
        function setClock(selector, endtime) {
                                            // .'timer'
            const timer = document.querySelector(selector),
                    days = timer.querySelector('#days'),
                    hours = timer.querySelector('#hours'),
                    minutes = timer.querySelector('#minutes'),
                    seconds = timer.querySelector('#seconds'),
                    timeInterval =setInterval(upDateClock, 1000);
    
        upDateClock();/*  вызываем фукцию чтобы не было моргания верстки */
    
        function upDateClock() {
            const t = getTimeRemaining(endtime);
    
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
    
            if (t.total <=0 ) {
                clearInterval(timeInterval);
            }
        }
    }
    
        setClock(id,deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");











window.addEventListener('DOMContentLoaded', () => {

    const timerOpenModal = setTimeout( () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', timerOpenModal), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item','.tabcontent','.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]','.modal', timerOpenModal);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', timerOpenModal);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default)('.timer', '2021-07-11');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner'

    });
 
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map