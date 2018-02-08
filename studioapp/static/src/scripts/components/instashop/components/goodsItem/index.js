import React, { Component } from 'react';
import config from '../../../../configs/index';
import ApiService from '../../../../services/api/index';
import messages from '../../../../services/messages/index';
import { CookiesService } from '../../../../services/cookies';
import { countBasketItems } from './../../modules/countbasketitems';
import { showMessage } from './../../modules/showmessage';

var Slider = require('react-slick');

class GoodsList extends Component {

    constructor(props) {
        super(props);    
        this.state = { 
            sliderReady: false 
        }; 
        this.addItem = this.addItem.bind(this);
        this.initSlider = this.initSlider.bind(this);
    }
    addItem(event){
        const googsId = event.target.getAttribute('data-id');
        const googsTitle = event.target.getAttribute('data-title');
        const googsPrice = event.target.getAttribute('data-price');
        const googsImgUrl = event.target.getAttribute('data-imgUrl');
        const count = event.target.getAttribute('data-count');
        let addedItemsList = CookiesService.getCookie('goodsArray');
        let goodsArray = [];   
        let goodsItem = {
            id : googsId,
            count : count,
            title : googsTitle,
            price : googsPrice,
            image : googsImgUrl
        };     
        if ( addedItemsList.length > 0 ){
            addedItemsList =JSON.parse(addedItemsList);        
            for ( let i = 0; i < addedItemsList.length; i++ ){
                
                if ( Number(addedItemsList[i].id) === Number(googsId) ){
                    let newCount = Number(addedItemsList[i].count) + 1;
                    goodsItem = {
                        id : googsId,
                        count : newCount.toString(),
                        title : googsTitle,
                        price : googsPrice,
                        image : googsImgUrl
                    };
                    continue;
                }
                goodsArray.push(addedItemsList[i]);
            }                
        }
        goodsArray.push(goodsItem);    
        CookiesService.setCookie('goodsArray',JSON.stringify(goodsArray),config.api.timeToSaveAddedList);   
        countBasketItems();    
        showMessage(messages.message.addedToBasketMss,'alert-success fixed bottom upper');
    }
    initSlider(){

        const sliders = document.querySelectorAll('.slides_container');        
        
        for ( let i = 0; i < sliders.length; i++ ){

            let slideIndex = 1;
            let data_selector = sliders[i].getAttribute('data-selector');
            const slides = document.querySelectorAll(`.${data_selector} .slide`);
            const dots = document.querySelectorAll(`.${data_selector} .dot`);
            const slide_left = document.querySelector(`.${data_selector} .slide_left`);    
            const slide_rigth = document.querySelector(`.${data_selector} .slide_rigth`);            
    
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
    
            slide_left.addEventListener("click", function(){
                plusSlides(-1);
            });
            slide_rigth.addEventListener("click", function(){
                plusSlides(1);
            });
            for ( let i = 0; i < dots.length; i++ ){
                dots[i].addEventListener("click", function(){
                    let slide_index = dots[i].getAttribute('data-slide-index');
                    currentSlide(slide_index);
                });
            }    
        }       
    }
    componentDidMount(){
        setTimeout(() => {    
            this.initSlider();        
            this.setState({ 
                sliderReady: true 
            });
        }, 100);
       
    }
    render() {
        let goodsList = this.props.goodsList;
        let notFound = '';
        if ( goodsList.length === 0 ){
            notFound = <div className="absolute alert alert-warning" role="alert">
                {messages.message.noResults}
            </div>
        }
        return (
            <div>            
                <div id="showMassage"></div>
                {notFound}
                {goodsList.map((goodsListItem,index) =>        
                    <div key={index} className="goods_item">
                        <div className="preview_float">            
                            <div data-selector={"slider_"+(index)} className={"slides_container slider_" + (index) + " " + this.state.sliderReady}>
                                {goodsListItem.media.srcs.map((item,index) =>
                                    <div className="slide fade" data-index={index}>
                                        <div className="preview"  
                                            style={{backgroundImage: "url(" + item.media_src + ")"}}></div>
                                    </div>                               
                                )} 
                                <div className="slider__control slide_left"></div> 
                                <div className="slider__control slider__control--right slide_rigth"></div>         
                                <div className="dots">
                                    {goodsListItem.media.srcs.map((item,index) =>
                                        <span className="dot" data-slide-index={index} ></span>                   
                                    )}   
                                </div>                                              
                            </div> 
                        </div>
                        <div className="description_float">
                            <div className="description">
                                <div className="on_sale hidden">
                                    {messages.message.onSale}
                                </div>
                                <div className="title">
                                    {goodsListItem.name}
                                </div>
                                <div className="text">
                                    {goodsListItem.description}
                                </div>
                                <div className="price">
                                    {goodsListItem.price}
                                </div>
                                <button 
                                        data-title={goodsListItem.name}
                                        data-price={goodsListItem.price}
                                        data-imgUrl={goodsListItem.media.srcs[0].media_src}
                                        data-id={goodsListItem.id} 
                                        data-count='1'
                                        className="btn add_btn" type="button"
                                        onClick={(event) => this.addItem(event)}>
                                    {messages.message.addToBasketText}
                                </button>  
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>           
                )}
            </div>
        );
    }
}

export default GoodsList;
