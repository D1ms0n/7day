import React, { Component } from 'react';
import config from './../../configs/index';
import ApiService from './../../services/api/index';
import { Link } from 'react-router';
import GoodsList from './modules/goodsitem';
import Footer from './../footer/';
import Preloader from './../preloader/';
import { log } from 'util';

class InstaShop extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            goodsList: []
        };
        this.getAllGoods = this.getAllGoods.bind(this);  
        this.filterByCategory = this.filterByCategory.bind(this);     
    }
    getAllGoods(){
        let apiService = new ApiService();
        apiService.getRequest(`${config.api.instashop}`)
            .then((result) => {  
                this.setState({
                    'goodsList':result
                }); 
                for ( let i = 0; i < result.length; i++ ){
                    console.log(result[i].category)
                }
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
                                            all
                                        </div>  
                                    </li>
                                    <li>
                                        <div data-cat-name='cat1' className="category" 
                                            onClick={(event) => this.filterByCategory(event)}>
                                            category 1
                                        </div>  
                                    </li>
                                    <li>
                                        <div data-cat-name='cat2' className="category"
                                            onClick={(event) => this.filterByCategory(event)}>
                                            category 2
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
                <Footer/>    
            </div>
        );
    }
}

export default InstaShop;
