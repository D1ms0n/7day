import React, { Component } from 'react';
import { Link } from 'react-router';
import { log } from 'util';
import config from './../../configs/index';
import message from './../../services/messages/index';
import ApiService from './../../services/api/index';
import { countBasketItems } from './modules/countbasketitems';
import GoodsList from './components/goodsitem';
import Header from './components/header';
import Footer from './../footer/';

class InstaShop extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            goodsList: [],
            categories: []
        };
        this.getAllGoods = this.getAllGoods.bind(this);  
        this.filterByCategory = this.filterByCategory.bind(this);  
        this.addFixedheader = this.addFixedheader.bind(this);   
    }
    getAllGoods(){
        let apiService = new ApiService();
        apiService.getRequest(`${config.api.instashop}`)
            .then((result) => {  
                let categories = [];                
                for ( let i = 0; i < result.length ; i++){
                    for ( let j = 0; j <= categories.length ; j++){
                        if ( categories.indexOf(result[i].category) !== -1 ){
                            continue;
                        } else {
                            categories.push(result[i].category);
                        }
                    }                    
                }
                this.setState({
                    'goodsList': result,
                    'categories': categories
                }); 
            })
            .catch((e) => {
              console.log(e);
            });
    }  
    filterByCategory(event){
      
        const catName = event.target.getAttribute('data-cat-name');      
        let requestParam ;
        let apiService = new ApiService();

        if ( catName === 'all'){
            requestParam = '';
        } else {
            requestParam = `?category=${catName}`;
        }

        apiService.getRequest(`${config.api.instashop}${requestParam}`)
            .then((result) => {  
                this.setState({
                    'goodsList':result
                }); 
            })
            .catch((e) => {
              console.log(e);
            });
    }  
    addFixedheader(){
        if ( window.scrollY >= 200 ){
            document.querySelector('.header_wrap').classList.add('fixed');
        } else {
            document.querySelector('.header_wrap').classList.remove('fixed');
        }
    }
    componentDidMount(){
        this.getAllGoods();
        countBasketItems();
        window.addEventListener('scroll', this.addFixedheader);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.addFixedheader);
    }
    render() {
        return (
            <div>            
                <Header/>
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
