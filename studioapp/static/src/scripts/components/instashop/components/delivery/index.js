import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './../header';
import Footer from './../../../footer'
import message from './../../../../services/messages/index'
import { countBasketItems } from './../../modules/countbasketitems';

class Delivery extends Component {

    constructor(props) {
        super(props); 
        this.addFixedheader = this.addFixedheader.bind(this);  
    }
    addFixedheader(){
        if ( window.scrollY >= 200 ){
            document.querySelector('.header_wrap').classList.add('fixed');
        } else {
            document.querySelector('.header_wrap').classList.remove('fixed');
        }
    }
    componentDidMount(){
        countBasketItems();
        window.addEventListener('scroll', this.addFixedheader);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.addFixedheader);
    }
    render() {      
        return (
            <div>    
                <Header />    
                <div className="container-fluid header_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Link className="back_to_shop" to="/instashop">{message.message.backToShop}</Link>
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
                        <div className="col-md-12">                 
                            <div className="content_wrap">
                                Delivery
                            </div>
                        </div>
                    </div> 
                </div> 
                <Footer/>
            </div>
        );
    }
}

export default Delivery;
