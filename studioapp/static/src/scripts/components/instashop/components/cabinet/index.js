import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './../header';
import Footer from './../../../footer'
import message from './../../../../services/messages/index'
import { countBasketItems } from './../../modules/countbasketitems';

class Cabinet extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            name: ''            
        };
        this.addFixedheader = this.addFixedheader.bind(this);  
    }   
   
    handleUserInput (event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) });
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
                                {message.message.cabinet}                                
                            </div>
                        </div>
                       
                        <div className="col-md-6">
                            <form id="createOrderForm" className="form"
                                onSubmit={(event) => this.createOrder(event)}>  

                                <div className='form-group row'>
                                    <label className="col-md-3 col-sm-4 col-form-label">{message.message.name}</label> 
                                    <div className="col-md-9 col-sm-8">
                                        <input type="text" className="form-control"
                                                placeholder="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={(event) => this.handleUserInput(event)}/>
                                    </div>                    
                                </div>                     
                                <div className='form-group row'>
                                    <label className="col-md-3 col-sm-4 col-form-label">{message.message.mail}</label> 
                                    <div className="col-md-9 col-sm-8">
                                        <input type="text" className="form-control"
                                                placeholder="mail"
                                                name="mail"
                                                value={this.state.mail}
                                                onChange={(event) => this.handleUserInput(event)}/>
                                    </div>                    
                                </div>
                                <div className='form-group row'>
                                    <label className="col-md-3 col-sm-4 col-form-label">{message.message.phone}</label> 
                                    <div className="col-md-9 col-sm-8">
                                        <input type="text" className="form-control"
                                                placeholder="phone"
                                                name="phone"
                                                value={this.state.phone}
                                                onChange={(event) => this.handleUserInput(event)}/>
                                    </div>                    
                                </div>
                                <div className='form-group row'>
                                    <label className="col-md-3 col-sm-4 col-form-label">{message.message.address}</label> 
                                    <div className="col-md-9 col-sm-8">
                                        <input type="text" className="form-control"
                                                placeholder="address"
                                                name="address"
                                                value={this.state.address}
                                                onChange={(event) => this.handleUserInput(event)}/>
                                    </div>                    
                                </div>
                                                                 
                                <div className="form-group row">
                                    <div className="col-md-10">
                                        <button disabled={!this.state.formValid}
                                                className="btn btn-primary">
                                            {message.message.createOrderText}
                                        </button>
                                    </div>
                                </div>
                                
                            </form>                              
                        </div>

                    </div> 
                </div> 
                <Footer/>
            </div>
        );
    }
}

export default Cabinet;
