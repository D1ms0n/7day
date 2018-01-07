import React, { Component } from 'react';
import config from '../../../../configs/index';
import ApiService from '../../../../services/api/index';

class TasksList extends Component {

    constructor(props) {
        super(props);
        this.detailTask = this.detailTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    detailTask(event){

      const preLoader = document.getElementById('preLoader');
      let apiService = new ApiService();

      const taskId = event.target.value;    
      
      preLoader.style.display='block';
      apiService.getRequest(`${config.api.taskDetail}${taskId}`)
        .then(function (result) {
          console.log(result);
          preLoader.style.display='none';
        })
        .catch(function (e) {
          console.log(e);
          preLoader.style.display='none';
        });
    }

    deleteTask(event){
      const preLoader = document.getElementById('preLoader');
      const taskId = event.target.value;

      preLoader.style.display='block';
      apiService.postRequest(`${config.api.removeTask}`,taskId)
        .then(function (result) {
          console.log(result);
          document.getElementById(taskId).remove();
          preLoader.style.display='none';
        })
        .catch(function (e) {
          console.log(e);
          preLoader.style.display='none';
        });
    }

    render() {
      let tasksList = this.props.list;
      return (
        <div>
          <div className="table-responsive">
            <table className="table" id="tasksList">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Direction</th>
                  <th scope="col">Start time</th>
                  <th scope="col">Count</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasksList.map((tasksListItem, index) =>
                    <tr key={index} id={tasksListItem.task_id}>
                        <th scope="row">{index}</th>
                        <td>
                            {tasksListItem.username}
                        </td>
                        <td>
                            {tasksListItem.direction}
                        </td>
                        <td>
                            {tasksListItem.create_time}
                        </td>
                        <td>
                            {tasksListItem.count}
                        </td>
                        <td>
                            <button value={tasksListItem.task_id} className="btn btn-info" onClick={this.detailTask}></button>
                            <button value={tasksListItem.task_id} className="btn btn-warning" onClick={this.deleteTask}></button>
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
}
export default TasksList;
