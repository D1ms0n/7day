import React, { Component } from 'react';
import Menu from './../header/';
import TasksList from './modules/tasksList';
import Footer from './../footer/';
import config from './../../configs/index';
import ApiService from './../../services/api/index';
import { CookiesService } from './../../services/cookies';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taskstList: []
    };
    this.getTasksList = this.getTasksList.bind(this);
  }

  getTasksList() {
    const preLoader = document.getElementById('preLoader');
    let apiService = new ApiService();
    console.log('user id',decodeURIComponent(CookiesService.getCookie('userId')));
    preLoader.style.display='block';
    apiService.getRequest(`${config.api.tasks}`)
        .then((result) => {  
          this.setState({
            'taskstList': result
          });        
          preLoader.style.display='none';
        })
        .catch((e) => {
          console.log(e);
          preLoader.style.display='none';
        });
  }
  
  componentDidMount(){    
    this.getTasksList();
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
                  <h2>TASKS</h2>
                  <TasksList taskstList={this.state.taskstList}/>
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
