window.onload = () => {


    /**-------Scroll Top----------**/
    const scrollTopBtn = document.getElementById('scrollTop');

    window.onscroll = () =>{
        if(window.scrollY > window.innerHeight){
            scrollTopBtn.classList.remove('hide');
        } else if( window.scrollY < window.innerHeight ){
            scrollTopBtn.classList.add('hide');
        }
    }

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    })


    /**-------Scroll Animation----------**/
    let animItems = document.querySelectorAll('._anim-items');

    if(animItems.length > 0){

        window.addEventListener('scroll', animOnScroll);

        function animOnScroll(){
            for(let index = 0; index < animItems.length; index++){
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight; /*Получаем высоту объекта*/
                const animItemOffset = offset(animItem).top; /*Позиция объекта*/
                const animStart = 4; /*Коэф, который регулирует момент старта анимации*/

                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                /*Если высота аним-объекта > высоты браузера, то ...*/
                if(animItemHeight > window.innerHeight){
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < animItemOffset + animItemHeight)){
                    animItem.classList.add('_active');
                }else{ /*Убираем повторную анимацию*/
                    if(!animItem.classList.contains('_anim-no-hide')){
                        animItem.classList.remove('_active');
                    }
                }

            }
        }
    }

        /*Функция, которая позволяет получить корректно позицию относительно верха*/
    function offset(el){
        const rect = el.getBoundingClientRect(),
              scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return{
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        };
    }

    setTimeout(() => {
       animOnScroll();
    }, 300);

};
