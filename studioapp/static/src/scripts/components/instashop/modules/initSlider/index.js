
/**
 * {selector} - slider wrapper css selector
 */

export function initSlider(selector){

    const sliders = document.querySelectorAll(selector);        
        
    for ( let i = 0; i < sliders.length; i++ ){

        let slideIndex = 1;
        let data_selector = sliders[i].getAttribute('data-selector');
        const slides = document.querySelectorAll(`.${data_selector} .slide`);
        const dots = document.querySelectorAll(`.${data_selector} .dot`);
        const slide_left = document.querySelector(`.${data_selector} .slide_left`);    
        const slide_rigth = document.querySelector(`.${data_selector} .slide_rigth`);
                    
        dots[0].classList.add('active');

        if ( dots.length === 1 ){
            slide_left.style.display = "none"; 
            slide_rigth.style.display = "none"; 
            dots[0].style.display = "none"; ;
        }

        function plusSlides(index) {
            showSlides(slideIndex += index);
        }
        function currentSlide(index) {
            showSlides(slideIndex = index);
        }
        function showSlides(index) {
            if ( index > slides.length ){
                slideIndex = 1
            }            
            if ( index< 1 ){
                slideIndex = slides.length
            }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none"; 
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block"; 
            dots[slideIndex-1].className += " active";
        }

        if ( slide_left ){
            slide_left.addEventListener("click", function(){
                plusSlides(-1);
            });
        }
        if ( slide_rigth ){
            slide_rigth.addEventListener("click", function(){
                plusSlides(1);
            });
        }
        if ( dots ){
            for ( let i = 0; i < dots.length; i++ ){
                dots[i].addEventListener("click", function(){
                    let slide_index = dots[i].getAttribute('data-slide-index');
                    currentSlide(slide_index);
                });
            }
        }            
    }
}
