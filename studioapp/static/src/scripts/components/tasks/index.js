import React, { Component } from 'react';
import Menu from './../header/';
import UserList from './modules/userList';
import Footer from './../footer/';

class Tasks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
      <div>
        <Menu/>
          <div className="container-fluid">
            <div className="row">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">

                    <div className="title">LIST OF TASKS</div>

                    <UserList />

                  </div>
                </div>
              </div>
            </div>
          </div>
        <Footer/>
      </div>
    );
  }
}

export default Tasks;