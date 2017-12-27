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
        passValid: false,
        emailValid: false,
        instaLoginValid: false,
        instaPassValid: false,
        validationPassed: false,
        formErrors: {
            name: '',
            pass: '',
            email: '',
            instaLogin: '',
            instaPass: ''
        }
        
    };
    
    this.registerSubmit = this.registerSubmit.bind(this); 
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'email':       
        break;
      case 'instaLogin':       
       break;
      case 'instaPass':       
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
  }
  checkFields(){
    if( this.state.nameValid &&
        this.state.passValid &&
        this.state.emailValid &&
        this.state.instaLoginValid &&
        this.state.instaPassValid ){
        this.setState({
            validationPassed: true
        });
    } else {        
        this.setState({
            validationPassed: false
        });
    }
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

      apiService.postRequest(`${config.api.register}`,jsonBody)
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
                  onSubmit={this.registerSubmit}>
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