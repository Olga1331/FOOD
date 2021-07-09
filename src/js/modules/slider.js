function slider() {
           // Slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          innerSlides = document.querySelector('.offer__slider-inner'),
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
export default slider;

