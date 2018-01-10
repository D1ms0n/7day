import React, { Component } from 'react';
import config from './../../../../configs/index';
import ApiService from './../../../../services/api/index';

class ActionsForm extends Component {

    constructor(props) {
        super(props);
        this.checkUnCheckAll = this.checkUnCheckAll.bind(this);
        this.createTask = this.createTask.bind(this);
    }
    checkUnCheckAll(){

      const checkUncheck = document.getElementById('checkUncheck');
      const checkboxes = document.querySelectorAll('.js-for-check');
  
      for( let i = 0; i <= checkboxes.length; i++){
  
       if(checkboxes[i]) {
         if ( checkUncheck.checked ) {
           checkboxes[i].checked = true;
         } else {
           checkboxes[i].checked = false;
         }
       }
      }
    }    
    createTask(){
      const preLoader = document.getElementById('preLoader');
      const showMassage = document.getElementById('showMassage');
      const taskMassage = document.getElementById('taskMassage');
      const actions = document.getElementById('actions').value || '';
      const count = document.getElementById('count').value || '';      
      let usersList = document.querySelectorAll('.js-for-check:checked');
      let targets = [];
      let userName = "test_name";
      let apiService = new ApiService();

      if ( usersList.length === 0 ){
        showMassage.classList.add('in');     
        showMassage.innerHTML = 'Please choose someone' 
        setTimeout(function(){
          showMassage.classList.remove('in');
        },2000);
        return false;
      }
      // decodeURIComponent(CookiesService.getCookie('userId'))
      for( let i = 0; i < usersList.length; i++){
          if ( usersList[i].followedbyviewer === true) { continue; }
          targets.push(usersList[i].value);
      }

      let targetsJSON = {
          operation: actions, 
          username: userName,
          targets: targets,
          count: count
      };    
      targetsJSON = JSON.stringify(targetsJSON);    

      preLoader.style.display='block';
      apiService.postRequest(config.api.tasks,targetsJSON)
        .then((result) => {   
          if ( result.task_id ){
            taskMassage.classList.add('in');      
            setTimeout(function(){
              taskMassage.classList.remove('in');
            },2000);        
          } else {
            showMassage.innerHTML = JSON.parse(result);
            showMassage.classList.add('in');     
            setTimeout(function(){
              showMassage.classList.remove('in');
            },2000);
          }
         
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
          <div id="taskMassage" className="absolute upper rigth-top alert alert-success fade" role="alert">
              Task created !
          </div>
          <div id="showMassage" className="absolute upper rigth-top alert alert-danger fade" role="alert">
              
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Select action</label>
                  <select id="actions" className="custom-select custom-select-lg" name="action">
                    <option value="follow">follow</option>
                    <option value="unfollow">unfollow</option>
                    <option value="get_following">get following</option>
                    <option value="get_followers">get followers</option>                  
                  </select>   
                </div> 
                <div className="form-group">
                  <label>Count</label>
                  <input id="count" type="number" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input onChange={this.checkUnCheckAll}
                    type="checkbox" name="checkbox" className="custom-control-input" id="checkUncheck" />
                    <label className="custom-control-label" htmlFor="checkUncheck">Check/unCheckAll</label>
                  </div>   
                </div>
              </div>
              <div className="clearfix"></div>    
              <button
                className="btn btn-success"                     
                onClick={() => this.createTask()}>
                  Create task
              </button>
            </div>
          </div>  
        </div>
      );
    }
}

export default ActionsForm;
