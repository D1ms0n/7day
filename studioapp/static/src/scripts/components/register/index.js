import React, { Component } from 'react';
import Menu from './../header/';
import Footer from './../footer/';
import FormErrors from './modules/formErrors';
import config from './../../configs/index';
import ApiService from './../../services/api/index';
import message from './../../services/messages/index';

class Register extends Component {

  constructor(props) {

    super(props);
    this.state = {
        name: '',
        password: '',
        email: '',
        instaLogin: '',
        instaPass: '',
        nameValid: false,
        passwordValid: false,
        emailValid: false,
        instaLoginValid: false,
        instaPassValid: false,
        validationPassed: false,
        formErrors: {
            name: '',
            password: '',
            email: '',
            instaLogin: '',
            instaPass: ''
        }      

    };
    this.registerSubmit = this.registerSubmit.bind(this); 
    this.validateField = this.validateField.bind(this); 
    this.validateForm = this.validateForm.bind(this); 
    this.handleUserInput = this.handleUserInput.bind(this); 

  }

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let instaLoginValid = this.state.instaLoginValid;
    let instaPassValid = this.state.instaPassValid;
    
    switch(fieldName) {
      case 'name':    
        nameValid = value.length >= 2;
        fieldValidationErrors.name = nameValid ? '': 'enter the name';   
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'is too short';
        break;      
      case 'instaLogin':    
        instaLoginValid = value.length >= 6;
        fieldValidationErrors.instaLogin = instaLoginValid ? '': 'is too short';     
       break;
      case 'instaPass':   
        instaPassValid = value.length >= 6;
        fieldValidationErrors.instaPass = instaPassValid ? '': 'is too short';    
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      instaLoginValid: instaLoginValid,
      instaPassValid: instaPassValid
      }, this.validateForm);
      
  }  

  validateForm() {

    this.setState({
      formValid:      
        this.state.nameValid
        && this.state.emailValid 
        && this.state.passwordValid
        && this.state.instaLoginValid
        && this.state.instaPassValid
      });

  }

  handleUserInput (event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, () => { this.validateField(name, value) });
  }

  registerSubmit(event) {
    event.preventDefault();
    const preLoader = document.getElementById('preLoader');
    
    let jsonBody = {
      'name': this.state.name,
      'password': this.state.password,       
      'email': this.state.email,
      'instaLogin': this.state.instaLogin,
      'instaPass': this.state.instaPass
    };

    let apiService = new ApiService();
    preLoader.style.display='block';
    apiService.postRequest(`${config.api.register}`,JSON.stringify(jsonBody))
      .then((result) => {
        console.log(result);
          preLoader.style.display='none';
      })
      .catch((e) => {
        console.log(e);
          preLoader.style.display='none';
      });
  }

  render() {
    return (
      <div>
        <Menu/>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <h2>{message.message.signUp}</h2>  
              <form id="registerForm"
                onSubmit={(event) => this.registerSubmit(event)}>                
                <div className='form-group row'>
                  <label htmlFor="username" className="col-md-3 col-form-label">{message.message.username}</label> 
                  <div className="col-md-9">
                    <input type="text" id="username" className="form-control"
                            placeholder={message.message.username}
                            name="name"
                            value={this.state.name}
                            onChange={(event) => this.handleUserInput(event)}/>
                  </div>                    
                </div>                      
                <div className='form-group row'>
                  <label htmlFor="email" className="col-md-3 col-form-label">{message.message.email}</label> 
                  <div className="col-md-9">
                    <input type="email" id="email" className="form-control"
                            placeholder={message.message.email}
                            name="email"
                            value={this.state.email}
                            onChange={(event) => this.handleUserInput(event)}/>
                  </div>                    
                </div>                    
                <div className='form-group row'>
                  <label htmlFor="password" className="col-md-3 col-form-label">{message.message.password}</label> 
                  <div className="col-md-9">
                    <input type="password" id="password" className="form-control"
                            placeholder={message.message.password}
                            name="password"
                            value={this.state.password}
                            onChange={(event) => this.handleUserInput(event)}/>      
                  </div>                    
                </div>                    
                <div className='form-group row'>
                  <label htmlFor="instaLogin" className="col-md-3 col-form-label">{message.message.instaLogin}</label> 
                  <div className="col-md-9">
                    <input type="text" id="instaLogin" className="form-control"
                            placeholder={message.message.instaLogin}
                            name="instaLogin"
                            value={this.state.instaLogin}
                            onChange={(event) => this.handleUserInput(event)}/>
                  </div>                    
                </div>  
                <div className='form-group row'>
                  <label htmlFor="instaPass" className="col-md-3 col-form-label">{message.message.instaPass}</label> 
                  <div className="col-md-9">
                    <input type="password" id="instaPass" className="form-control"
                            placeholder={message.message.instaPass}
                            name="instaPass"
                            value={this.state.instaPass}
                            onChange={(event) => this.handleUserInput(event)}/>
                  </div>                    
                </div>        
                <div className="form-group row">
                  <div className="col-md-12">
                    <button disabled={!this.state.formValid}
                            className="btn btn-primary">
                            {message.message.signUp}
                    </button>
                  </div>
                </div>
                <div className='formErrors'>
                  <FormErrors formErrors={this.state.formErrors} />
                </div>
              </form>              
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Register;