import React, { Component } from 'react';
import config from '../../../../configs/index';
import ApiService from '../../../../services/api/index';
import { CookiesService } from '../../../../services/cookies';

class GoodsList extends Component {

    constructor(props) {
        super(props);        
        this.addGood = this.addGood.bind(this);
    }
    addGood(googsId){
        let goodsArray =  CookiesService.getCookie('addedGoods');
        goodsArray.push(googsId);
        CookiesService.setCookie('goodsArray',goodsArray,'1');
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
                            <div className="text">
                                {goodsListItem.description}
                            </div>
                            <div className="price">
                                {goodsListItem.price}
                            </div>
                            <button className="btn add_btn" type="button"
                                    onClick={() => this.addGood('googsId')}>
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
