import React, { Component } from 'react';
import config from '../../../../configs/index';
import ApiService from '../../../../services/api/index';
import { CookiesService } from '../../../../services/cookies';
import { log } from 'util';

class GoodsList extends Component {

    constructor(props) {
        super(props);        
        this.addItem = this.addItem.bind(this);
    }
    addItem(event){
        const googsId = event.target.getAttribute('data-id');
        const count = event.target.getAttribute('data-count');
        let addedItemsList = CookiesService.getCookie('goodsArray');
        let goodsArray = [];   
        let goodsItem = {
            id : googsId,
            count : count
        };     
        if ( addedItemsList.length > 0 ){
            addedItemsList =JSON.parse(addedItemsList);        
            for ( let i = 0; i < addedItemsList.length; i++ ){
                
                if ( Number(addedItemsList[i].id) === Number(googsId) ){
                    let newCount = Number(addedItemsList[i].count) + 1;
                    goodsItem = {
                        id : googsId,
                        count : newCount.toString()
                    };
                    continue;
                }
                goodsArray.push(addedItemsList[i]);
            }                
        }
        goodsArray.push(goodsItem);    
        CookiesService.setCookie('goodsArray',JSON.stringify(goodsArray),'7');
    }
    render() {
      let goodsList = this.props.goodsList;
      let notFound = '';
      if ( goodsList.length === 0 ){
      notFound = <div className="absolute alert alert-warning" role="alert">
                    No results!
                </div>
      }
      return (
        <div>
            {notFound}
            {goodsList.map((goodsListItem,index) =>        
                <div key={index} className="goods_item">
                    <div className="preview_float">
                        <div className="preview"  style={{backgroundImage: "url(" + goodsListItem.media.display_src + ")"}}></div>
                    </div>
                    <div className="description_float">
                        <div className="description">
                            <div className="title">
                                {goodsListItem.name}
                            </div>
                            <div className="text">
                                {goodsListItem.description}
                            </div>
                            <div className="price">
                                {goodsListItem.price}
                            </div>
                            <button data-count='1' data-id={goodsListItem.id} className="btn add_btn" type="button"
                                    onClick={(event) => this.addItem(event)}>
                                add to busket
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
