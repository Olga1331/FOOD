window.addEventListener('DOMContentLoaded', () => {

    
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

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
            item.classList.remove('tabheader__item_active');
        });
    }


    // функция показать контент табов.Через i передается № таба попорядку.По дефолту i=0. 
    // Добавляем-показать,анимация, класс 'tabheader__item_active'.
    // удаляем-скрытие
    function showTabcontent(i=0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
       
    }


    // вызыаем функции
    hideTabContent();
    showTabcontent();


    // навешиваем обработчик события клик на родителя табов
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
    // проверяем сработало ли наше событие на елементе с классом 'tabheader__item'.Перебираем все табы (елемент, номер).
    // Если событие совпадает с элементом, то вызываем фунцкции
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabcontent(i);
                }
                
            });

        }

    });

    // Timer

    const deadline ='2021-06-02';
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

    setClock('.timer',deadline);


// Modal

const modalOpenBtn = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

    modalOpenBtn.forEach (btn => {
      btn.addEventListener('click',openModal);
}); 

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(timerOpenModal);
        window.removeEventListener('scroll', showModalByScroll); /* удаляем обработчик,чтобы окно показывальсь только 1 раз */
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show'); 
        document.body.style.overflow = '';
    
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => { /* добавляем закрытие окна по кнопке esc */
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

const timerOpenModal = setTimeout(openModal, 5000);

    function showModalByScroll() { /* показываем окно при прокрутке до конца стр */
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // создаем карточки меню с помощью классов


class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.conversion = 71;
        this.changeToRub();

    }

    changeToRub() {
        this.price = this.price * this.conversion;
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="menu__item">
        <img src=${this.src}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
    </div>
    `;

    this.parent.append(element);

    }    
}

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        8,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        10,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        6,
        ".menu .container"
    ).render();
});