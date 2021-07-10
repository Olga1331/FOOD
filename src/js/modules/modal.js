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

export default modal;
export {closeModal};
export {openModal};