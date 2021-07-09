
import {closeModal, openModal} from './modal';

function forms() {
    
    // post запросы

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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


    
    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            statusMessage.textContent = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);/* вставляем спинер после формы */

            
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
 

          postData('http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
        },4000);
    }
    fetch('http://localhost:3000/menu')
    .then(data =>data.json())
    .then(res => console.log(res));
}

export default forms;