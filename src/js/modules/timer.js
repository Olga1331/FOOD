function timer() {
 
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
}

export default timer;
