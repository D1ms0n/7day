import React, { Component } from 'react';
import config from '../../../../configs/index';
import ApiService from '../../../../services/api/index';
import messages from '../../../../services/messages/index';
import { CookiesService } from '../../../../services/cookies';
import { countBasketItems } from './../../modules/countbasketitems';
import { showMessage } from './../../modules/showmessage';

class GoodsList extends Component {

    constructor(props) {
        super(props);        
        this.addItem = this.addItem.bind(this);
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
                        <div className="preview"  style={{backgroundImage: "url(" + goodsListItem.media.display_src + ")"}}></div>
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
                                    data-imgUrl={goodsListItem.media.display_src}
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
