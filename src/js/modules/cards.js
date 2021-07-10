
import {getResource} from '../services/services';

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
    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });
}

export default cards;
