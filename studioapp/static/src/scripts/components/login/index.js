import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './../header/';
import Footer from './../footer/';
import Preloader from './../preloader/';
import config from './../../configs/index';
import ApiService from './../../services/api/index';

class Login extends Component {

  constructor(props) {

    /**
    * local state
    * @param {name} string - user name setting by {handleNameChange}
    * @param {pass} string - user pass setting by {handlePassChange}
    */

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
      preLoader.style.display='block';

      /**
       * {apiService} - fetch post request
       * {jsonBody}
       */

      let jsonBody = {
        'username': this.state.username,
        'password': this.state.password
      };
      let apiService = new ApiService();

      apiService.postRequest(`${config.api.login}`,jsonBody)
        .then(function (result) {
          console.log(result);
            preLoader.style.display='none';
        })
        .catch(function (e) {
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
        <Preloader/>
        <Menu/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <div className="login-title">
                Login Form
              </div>
              <div className="login-block">

                <form className="form-horizontal"
                      id="loginForm"
                      onSubmit={(event) => this.loginSubmit(event)}>
                  <input type="text"
                         className="main-input"
                         name="username"
                         placeholder="username"
                         value={this.state.username}
                         onChange={(event) => this.handleUserInput(event)}/>
                  <input type="password"
                         className="main-input"
                         name="password"
                         placeholder="password"
                         value={this.state.password}
                         onChange={(event) => this.handleUserInput(event)}/>
                  <button className="submit-btn">
                    Login
                  </button>                     
                </form>
                              
                <Link to="/register">Register</Link>

              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Login;