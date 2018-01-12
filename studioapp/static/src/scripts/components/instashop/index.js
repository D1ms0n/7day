import React, { Component } from 'react';
import config from './../../configs/index';
import ApiService from './../../services/api/index';
import { Link } from 'react-router';
import { CookiesService } from './../../services/cookies';

class InstaShop extends Component {

    constructor(props) {
        super(props);  
        this.getAllGoods = this.getAllGoods.bind(this);
        this.addGoods = this.addGoods.bind(this);
    }
    getAllGoods(){
        let apiService = new ApiService();
        apiService.getRequest(`${config.api.instashop}`)
            .then((result) => {  
                console.log(result);            
            })
            .catch((e) => {
              console.log(e);
            });
    }
    addGoods(googsId){
        let goodsArray =  CookiesService.getCookie('addedGoods');
        goodsArray.push(googsId);
        CookiesService.setCookie('goodsArray',goodsArray,'1');
    }
    componentDidMount(){    
        // this.getAllGoods();
    }
    render() {
        return (
            <div>
                <div className="container-fluid header_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <ul>
                                    <li>
                                        <div className="category">
                                            category
                                        </div>  
                                    </li>
                                    <li>
                                        <div className="category">
                                            category
                                        </div>  
                                    </li>
                                    <li>
                                        <div className="category">
                                            category
                                        </div>
                                    </li>
                                </ul>
                                <Link className="basket" to="/basket">basket</Link>    
                                <div className="clearfix"></div>
                            </div> 
                        </div> 
                    </div> 
                </div>      
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="goods_wrap">
                                    <div className="goods_item row">
                                        <div className="col-md-8 col-sm-8">
                                            <div className="preview"></div>
                                        </div>
                                        <div className="description col-md-4 col-sm-4">
                                            <h3 className="title">title</h3>
                                            <div className="text">
                                                description description description descriptiondescription description
                                            </div>
                                            <h4 className="price">
                                                ₴ 123
                                            </h4>
                                            <button className="btn add_btn" type="button"
                                            onClick={() => this.addGoods('googsId')}>
                                                button
                                            </button>  
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-md-12">
                                <div className="goods_wrap">
                                    <div className="goods_item row">                                        
                                        <div className="col-md-4 col-sm-4">
                                            <div className="description">
                                                <h3 className="title">title</h3>
                                                <div className="text">
                                                    description description description descriptiondescription description
                                                </div>
                                                <h4 className="price">
                                                    ₴ 123
                                                </h4>
                                                <button className="btn add_btn" type="button">
                                                    button
                                                </button>                                                  
                                            </div>
                                        </div>
                                        <div className="col-md-8 col-sm-8">
                                            <div className="preview"></div>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-md-12">
                                <div className="goods_wrap">
                                    <div className="goods_item row">
                                        <div className="col-md-8 col-sm-8">
                                            <div className="preview"></div>
                                        </div>
                                        <div className="description col-md-4 col-sm-4">
                                            <h3 className="title">title</h3>
                                            <div className="text">
                                                description description description descriptiondescription description
                                            </div>
                                            <h4 className="price">
                                                ₴ 123
                                            </h4>
                                            <button className="btn add_btn" type="button">
                                                button
                                            </button>  
                                        </div>
                                    </div>
                                </div>
                            </div> 

                        </div> 
                    </div> 
                </div>     
            </div>
        );
    }
}

export default InstaShop;