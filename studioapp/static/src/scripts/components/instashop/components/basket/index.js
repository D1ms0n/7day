import React, { Component } from 'react';
import { Link } from 'react-router';
import config from './../../../../configs/index';
import ApiService from './../../../../services/api/index';
import { CookiesService } from './../../../../services/cookies';
import message from './../../../../services/messages/index';
import AddedItemsList from './modules/addeditem/index';
import Header from './../../components/header';
import FormErrors from './modules/formErrors';
import { log } from 'util';

class Basket extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            name:'',
            mail:'',
            phone:'',
            address:'',
            comment:'',
            menushown: false,
            nameValid: false,
            phoneValid: false,
            addressValid: false,
            validationPassed: false,
            formErrors: {
                name: '',
                mail: '',
                phone: '',
                address: ''
            }
        };
        this.createOrder = this.createOrder.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    createOrder(event){
        event.preventDefault();

        const addedItemsArray = JSON.parse(CookiesService.getCookie('goodsArray')).map((item)=>(
            {
                id:item.id,
                count:item.count
            }
        ));
        const data = {
            "name": this.state.name,
            "mail": this.state.mail,
            "phone": this.state.phone,
            "address": this.state.address,
            "comment": this.state.comment,
            "items": addedItemsArray
        }
        let apiService = new ApiService();

        apiService.postRequest(`${config.api.orders}`,JSON.stringify(data))
            .then((result) => {  
                CookiesService.setCookie('goodsArray','','1');
               
                document.getElementById('modal').innerHTML = `
                                                    <div class="modal-result">
                                                       name ${result.name} <br/>
                                                       email  ${result.mail} <br/
                                                       phone num ${result.phone} <br/
                                                       adress ${result.address} <br/
                                                    </div>`
                                               
            })
            .catch((e) => {
                console.log(e);
            });

    }
    validateField(fieldName, value) {
        
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let mailValid = this.state.mailValid;
        let phoneValid = this.state.phoneValid;
        let addressValid = this.state.addressValid;      
        
        switch(fieldName) {
          case 'name':    
            nameValid = value.length >= 2;
            fieldValidationErrors.name = nameValid ? '': message.message.validationName;   
            break;
          case 'mail':
            mailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.mail = mailValid ? '' : message.message.validationEmail;
            break;
          case 'phone':
            phoneValid = value.match(/^\d+$/);
            fieldValidationErrors.phone = phoneValid ? '': message.message.validationPhone;   
            break;
          case 'address':
            addressValid = value.length >= 2;
            fieldValidationErrors.address = addressValid ? '': message.message.validationAdress;  
            break;
          default:
            break;
        }
        this.setState({
          formErrors: fieldValidationErrors,
          nameValid: nameValid,
          mailValid: mailValid,
          phoneValid: phoneValid,
          addressValid: addressValid     
          }, this.validateForm);
          
    }      
    validateForm() {
        this.setState({
          formValid:      
            this.state.nameValid
            && this.state.mailValid
            && this.state.addressValid
            && this.state.phoneValid
          });
    
    }
    toggleMenu(){
        this.setState({
            menushown: !this.state.menushown
        });
    }
    handleUserInput (event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) });
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
                                <div className="clearfix"></div>
                            </div> 
                        </div> 
                    </div> 
                </div>      
                <div className="container-fluid">
                    <div className="container basket_wrap">
                        <div className="row">
                            <div className="col-md-6">
                                <AddedItemsList/>                                
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
                                    <div className='form-group row'>
                                        <label className="col-md-3 col-sm-4 col-form-label">{message.message.comment}</label> 
                                        <div className="col-md-9 col-sm-8">
                                            <textarea className="form-control"
                                                      name="comment"
                                                      value={this.state.comment}
                                                      onChange={(event) => this.handleUserInput(event)}>
                                            </textarea>
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

                                    <FormErrors formErrors={this.state.formErrors} />

                                    <div id="modal"></div>  

                                </form>                              
                            </div>
                        </div> 
                    </div> 
                </div>                  
            </div>
        );
    }
}

export default Basket;
