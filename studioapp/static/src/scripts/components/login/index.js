import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './../header/';
import Footer from './../footer/';
import config from './../../configs/index';
import ApiService from './../../services/api/index';
import { CookiesService } from './../../services/cookies';
import message from './../../services/messages/index';

class Login extends Component {

  constructor(props) {

    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);    
  }

  loginSubmit(event) {

      event.preventDefault();

      const preLoader = document.getElementById('preLoader');
      let apiService = new ApiService();
      let jsonBody = {
        'username': this.state.username,
        'password': this.state.password
      };
      preLoader.style.display='block';
      apiService.postRequest(`${config.api.login}`,jsonBody)
        .then((result) => {
          console.log(result);
          CookiesService.setCookie('userId',encodeURIComponent(result.id),1)
          preLoader.style.display='none';
        })
        .catch((e) => {
          console.log(e);
            preLoader.style.display='none';
        });
  }
  
  handleUserInput (event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value}
    );     
  }

  render() {
    return (
      <div>
        <Menu/>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <h2>{message.message.signIn}</h2>              
              <form id="loginForm"
                    onSubmit={(event) => this.loginSubmit(event)}>
                <div className='form-group row'>
                  <label className="col-md-3 col-form-label">{message.message.username}</label> 
                  <div className="col-md-9">
                    <input type="text"
                          className="form-control"
                          name="username"
                          placeholder="username"
                          value={this.state.username}
                          onChange={(event) => this.handleUserInput(event)}/>
                  </div>                    
                </div>    
                <div className='form-group row'>
                  <label className="col-md-3 col-form-label">{message.message.password}</label> 
                  <div className="col-md-9">
                    <input type="password"
                            className="form-control"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={(event) => this.handleUserInput(event)}/>
                  </div>                    
                </div>                      
                <div className="form-group row">
                  <div className="col-md-12">
                   <button type="submit" className="btn btn-primary">{message.message.signIn}</button>
                     {message.message.or}                    
                   <Link className="btn btn-primary" to="/register">{message.message.signUp}</Link>  
                  </div>
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

export default Login;
