import React, { Component } from 'react';
import config from '../../../../configs/index';
import ApiService from '../../../../services/api/index';
import messages from '../../../../services/messages/index';
import { CookiesService } from '../../../../services/cookies';
import { countBasketItems } from './../../modules/countbasketitems';
import { showMessage } from './../../modules/showmessage';
import { initSlider } from './../../modules/initSlider';

var Slider = require('react-slick');

class GoodsList extends Component {

    constructor(props) {
        super(props);    
        this.state = { 
            sliderReady: false 
        }; 
        this.addItem = this.addItem.bind(this);
        this.changeCount = this.changeCount.bind(this);
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
        event.target.classList.add('active');
        goodsArray.push(goodsItem);    
        CookiesService.setCookie('goodsArray',JSON.stringify(goodsArray),config.api.timeToSaveAddedList);   
        countBasketItems();    
        showMessage(messages.message.addedToBasketMss,'alert-success fixed bottom upper');
    }
    changeCount(id,action){

        const counter = document.getElementById(`count${id}`);    
        const minus = document.getElementById(`minus${id}`);
        const timeSave = config.api.timeToSaveAddedList;
        let addedItemsList = JSON.parse(CookiesService.getCookie('goodsArray'));
        let goodsArray = []; 
        let goodsItem ;      
            
        for ( let i = 0; i < addedItemsList.length; i++ ){
          if ( Number(addedItemsList[i].id) === Number(id) ){
              let newCount ;        
              if( action === "inc"){
                newCount = Number(addedItemsList[i].count) + 1;
                counter.innerHTML = newCount;
              }else if( action === "dec"){
                newCount = Number(addedItemsList[i].count) - 1;
                if ( newCount === 0 ){
                  newCount = 1;
                }
                counter.innerHTML = newCount;
              }   
              if ( Number(newCount) < 2 ){
                minus.style.pointerEvents = 'none';
              } else {
                minus.style.pointerEvents = 'all';
              }
              goodsItem = {
                id : id,
                count : newCount.toString(),
                title : addedItemsList[i].title,
                price : addedItemsList[i].price,
                image : addedItemsList[i].image
              };
              goodsArray.push(goodsItem); 
              continue;
          }
          goodsArray.push(addedItemsList[i]);
        }  
        CookiesService.setCookie('goodsArray',JSON.stringify(goodsArray),timeSave);
        countBasketItems();
    }
    componentDidMount(){
        setTimeout(() => {    
            initSlider('.slides_container');        
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
                                <div className="changeCount">
                                    <div id={"minus" + goodsListItem.id} className="minus"
                                        onClick={() => this.changeCount(goodsListItem.id,'dec')}>
                                        -
                                    </div>
                                    <div className="allcount" id={"count" + goodsListItem.id} >
                                        1                   
                                    </div>
                                    <div className="plus"
                                        onClick={() => this.changeCount(goodsListItem.id,'inc')}>
                                        +
                                    </div>
                                </div>      

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
