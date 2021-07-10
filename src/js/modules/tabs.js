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

export default tabs;
