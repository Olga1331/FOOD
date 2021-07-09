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


function modal() {

    const modalOpenBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

    modalOpenBtn.forEach (btn => {
    btn.addEventListener('click',openModal);
}); 

 


    modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') =='') {
        closeModal();
    }
});

    document.addEventListener('keydown', (event) => { /* добавляем закрытие окна по кнопке esc */
    if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

    const timerOpenModal = setTimeout(openModal, 50000);

    function showModalByScroll() { /* показываем окно при прокрутке до конца стр */
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
    }
    }
    window.addEventListener('scroll', showModalByScroll);
}
export default modal;
export {closeModal};
export {openModal};