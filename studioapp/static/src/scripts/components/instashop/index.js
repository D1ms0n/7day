import React, { Component } from 'react';
import { Link } from 'react-router';
import { log } from 'util';
import config from './../../configs/index';
import message from './../../services/messages/index';
import ApiService from './../../services/api/index';
import { countBasketItems } from './modules/countbasketitems';
import GoodsList from './modules/goodsitem';
import Footer from './../footer/';
import Preloader from './../preloader/';

class InstaShop extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            goodsList: [],
            categories: []
        };
        this.getAllGoods = this.getAllGoods.bind(this);  
        this.filterByCategory = this.filterByCategory.bind(this);     
    }
    getAllGoods(){
        let apiService = new ApiService();
        apiService.getRequest(`${config.api.instashop}`)
            .then((result) => {  
                this.setState({
                    'goodsList':result,
                    'categories':result.map((item) => item.category)
                }); 
            })
            .catch((e) => {
              console.log(e);
            });
    }  
    filterByCategory(event){
      
        const catName = event.target.getAttribute('data-cat-name'); 
        const preLoader = document.getElementById('preLoader');
        let requestParam ;
        let apiService = new ApiService();

        if ( catName === 'all'){
            requestParam = '';
        } else {
            requestParam = `?category=${catName}`;
        }

        preLoader.style.display = 'block';
        apiService.getRequest(`${config.api.instashop}${requestParam}`)
            .then((result) => {  
                this.setState({
                    'goodsList':result
                }); 
                preLoader.style.display='none';
            })
            .catch((e) => {
              console.log(e);
              preLoader.style.display='none';
            });
    }  
    componentDidMount(){
        this.getAllGoods();
        countBasketItems();
    }
    render() {
        return (
            <div>
                <Preloader/>
                <div className="container-fluid header_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <ul>
                                    <li>
                                        <div data-cat-name='all' className="category" 
                                            onClick={(event) => this.filterByCategory(event)}>
                                            {message.message.allCategories}
                                        </div>  
                                    </li>

                                    {this.state.categories.map((category,index) =>     
                                        <li key={index}>
                                            <div data-cat-name={category} className="category" 
                                                onClick={(event) => this.filterByCategory(event)}>
                                                {category}
                                            </div>  
                                        </li>
                                    )}                                   
                                                                 
                                </ul>
                                <div className="basket" id="basket">
                                    <Link to="/basket"></Link>  
                                    <div id="basketCount"></div>
                                </div>
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
                <Footer/>    
            </div>
        );
    }
}

export default InstaShop;
