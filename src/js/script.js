
import tabs from './modules/tabs';
import modal from './modules/modal';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import timer from './modules/timer';
import slider from './modules/slider';
import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const timerOpenModal = setTimeout( () => openModal('.modal', timerOpenModal), 50000);

    tabs('.tabheader__item','.tabcontent','.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]','.modal', timerOpenModal);
    calc();
    cards();
    forms('form', timerOpenModal);
    timer('.timer', '2021-07-11');
    slider({
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