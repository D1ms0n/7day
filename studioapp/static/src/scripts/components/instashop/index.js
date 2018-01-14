import React, { Component } from 'react';
import config from './../../configs/index';
import ApiService from './../../services/api/index';
import { Link } from 'react-router';
import GoodsList from './modules/goodsitem';

class InstaShop extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            goodsList: []
        };
        this.getAllGoods = this.getAllGoods.bind(this);       
    }
    getAllGoods(){
        let apiService = new ApiService();
        apiService.getRequest(`${config.api.instashop}`)
            .then((result) => {  
                this.setState({
                    'goodsList':result
                }); 
            })
            .catch((e) => {
              console.log(e);
            });
    }    
    componentDidMount(){    
        this.getAllGoods();
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
                        <div className="goods_wrap">                 
                            <GoodsList goodsList={this.state.goodsList}/>
                        </div>
                    </div> 
                </div>     
            </div>
        );
    }
}

export default InstaShop;