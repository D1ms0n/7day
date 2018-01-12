import React, { Component } from 'react';
import { Link } from 'react-router';
import config from './../../../../configs/index';
import ApiService from './../../../../services/api/index';
import { CookiesService } from './../../../../services/cookies';

class Basket extends Component {
    constructor(props) {
        super(props);  
        this.getAddedGoods = this.getAddedGoods.bind(this);
    }
    getAddedGoods(){
        let apiService = new ApiService();
        const goodsArray =  CookiesService.getCookie('addedGoods');

        apiService.getRequest(`${config.api.instashop}?${goodsArray}`)
            .then((result) => {  
                console.log(result);            
            })
            .catch((e) => {
                console.log(e);
            });
    }
    componentDidMount(){  
    }
    render() {
        return (
            <div>                
                <div className="container-fluid header_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Link to="/instashop">to shop</Link>     
                                <div className="clearfix"></div>
                            </div> 
                        </div> 
                    </div> 
                </div>      
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="added_goods_list">
                                    <li className="row">                                    
                                        <div className="preview"></div>
                                        <div className="description">
                                            <h4 className="title">                                                    
                                                <a href="/">
                                                    title
                                                </a>  
                                            </h4>
                                            <h4 className="price">
                                                ₴ 123
                                            </h4>
                                            <button className="btn remove_btn" type="button">
                                                remove
                                            </button>  
                                        </div>                                   
                                    </li>
                                </ul>
                            </div> 
                        </div> 
                    </div> 
                </div>                  
            </div>
        );
    }
}

export default Basket;