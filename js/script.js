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
});
