import React, { Component } from 'react';
import Menu from './../header/';
import Footer from './../footer/';
import Preloader from './../preloader/';
import FormErrors from './modules/formErrors';

import config from './../../configs/index';
import ApiService from './../../services/api/index';

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
  componentdidmount(){
    console.log(this.state.formErrors);
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
        fieldValidationErrors.name = nameValid ? '': ' enter the name';   
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;      

      case 'instaLogin':    
        instaLoginValid = value.length >= 6;
        fieldValidationErrors.instaLogin = instaLoginValid ? '': ' is too short';     
       break;
      case 'instaPass':   
        instaPassValid = value.length >= 6;
        fieldValidationErrors.instaPass = instaPassValid ? '': ' is too short';    
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
      preLoader.style.display='block';

      let jsonBody = {
        'name': this.state.name,
        'password': this.state.password,       
        'email': this.state.email,
        'instaLogin': this.state.instaLogin,
        'instaPass': this.state.instaPass
      };

      let apiService = new ApiService();

      apiService.postRequest(`${config.api.register}`,JSON.stringify(jsonBody))
        .then(function (result) {
          console.log(result);
            preLoader.style.display='none';
        })
        .catch(function (e) {
          console.log(e);
            preLoader.style.display='none';
        });
  }

  render() {
    return (
      <div>
        <Preloader/>
        <Menu/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">             
              <div className="login-title">
                  Register Form
              </div>
              <div className="login-block">
                <form id="registerForm"
                  onSubmit={(event) => this.registerSubmit(event)}>
                  <input type="text" className="main-input"
                          placeholder="name"
                          name="name"
                          value={this.state.name}
                          onChange={(event) => this.handleUserInput(event)}/>
                  <input type="email" className="main-input"
                          placeholder="email"
                          name="email"
                          value={this.state.email}
                          onChange={(event) => this.handleUserInput(event)}/>
                  <input type="password" className="main-input"
                          placeholder="password"
                          name="password"
                          value={this.state.password}
                          onChange={(event) => this.handleUserInput(event)}/>                  
                  <input type="text" className="main-input"
                          placeholder="instaLogin"
                          name="instaLogin"
                          value={this.state.instaLogin}
                          onChange={(event) => this.handleUserInput(event)}/>
                  <input type="password" className="main-input"
                          placeholder="instaPass"
                          name="instaPass"
                          value={this.state.instaPass}
                          onChange={(event) => this.handleUserInput(event)}/>
                  <button disabled={!this.state.validationPassed}
                          className="submit-btn">
                          Register
                  </button>
                  <div className='panel panel-default'>
                    <FormErrors formErrors={this.state.formErrors} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Register;