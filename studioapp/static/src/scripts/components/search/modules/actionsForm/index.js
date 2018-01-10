import React, { Component } from 'react';
import config from './../../../../configs/index';
import ApiService from './../../../../services/api/index';

class ActionsForm extends Component {

    constructor(props) {
        super(props);
        this.checkUnCheckAll = this.checkUnCheckAll.bind(this);
        this.createTask = this.createTask.bind(this);
        this.showMassage = this.showMassage.bind(this);
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
    showMassage(text,className){
      const showMassage = document.getElementById('showMassage');
      showMassage.className = 'absolute upper rigth-top alert fade';      
      showMassage.innerHTML = text;            
      showMassage.classList.add(className);  
      showMassage.classList.add('in'); 
      setTimeout(function(){
        showMassage.classList.remove('in');
      },2000);
    }
    createTask(){
      const preLoader = document.getElementById('preLoader');    
      const actions = document.getElementById('actions').value || '';
      const count = document.getElementById('count').value || '';      
      let usersList = document.querySelectorAll('.js-for-check:checked');
      let targets = [];
      let userName = "test_name";
      let apiService = new ApiService();

      if ( usersList.length === 0 ){
        this.showMassage('Please choose someone','alert-danger');
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
          preLoader.style.display='none';
          if ( result.task_id ){
            this.showMassage('Task created !','alert-success');                 
          } else {
            this.showMassage(result,'alert-danger');  
          }  
        })
        .catch((e) => {
            console.log(e);
            preLoader.style.display='none';
        });
    }
    
    render() {
      return (
        <div> 
          <div id="showMassage" role="alert"></div>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
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
                  <button
                    className="btn btn-success"                     
                    onClick={() => this.createTask()}>
                      Create task
                  </button>
                </div>
                <div className="col-md-6">                
                  <div className="form-group">
                    <label>Count</label>
                    <input id="count" type="number" className="form-control" />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input onChange={this.checkUnCheckAll}
                      type="checkbox" name="checkbox" className="custom-control-input" id="checkUncheck" />
                      <label className="custom-control-label" htmlFor="checkUncheck">Check/unCheckAll</label>
                    </div>   
                  </div>
                </div>
              </div>  
            </div>
          </div>  
        </div>
      );
    }
}

export default ActionsForm;
