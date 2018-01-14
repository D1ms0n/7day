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
      return (
        <div>
            {goodsList.map((goodsListItem,index) =>        
                <div key={index} className="goods_item">
                    <div className="preview_float">
                        <div className="preview"  style={{backgroundImage: "url(" + goodsListItem.display_src + ")"}}></div>
                    </div>
                    <div className="description_float">
                        <div className="description">
                            <div className="text">
                                {goodsListItem.caption}
                            </div>
                            <button className="btn add_btn" type="button"
                            onClick={() => this.addGood('googsId')}>
                                button
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
