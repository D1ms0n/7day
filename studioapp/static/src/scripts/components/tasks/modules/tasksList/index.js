import React, { Component } from 'react';
import config from '../../../../configs/index';
import ApiService from '../../../../services/api/index';

class TasksList extends Component {

    constructor(props) {
        super(props);
        this.detailTask = this.detailTask.bind(this);
    }

    detailTask(event){

      const preLoader = document.getElementById('preLoader');
      const taskId = event.target.value;    
      let apiService = new ApiService();
      
      preLoader.style.display='block';
      apiService.getRequest(`${config.api.tasks}${taskId}`)
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
      let tasksList = this.props.taskstList;
      return (
        <div>
          <div className="table-responsive">
            <table className="table" id="tasksList">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Operation</th>
                  <th scope="col">Start time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasksList.map((tasksListItem, index) =>
                    <tr key={index} id={tasksListItem.task_id}>
                        <th scope="row">{index+1}</th>
                        <td>
                            {tasksListItem.username}
                        </td>
                        <td>
                            {tasksListItem.operation}
                        </td>
                        <td>
                            {tasksListItem.create_time}
                        </td>
                        <td>
                            {tasksListItem.status}
                        </td>
                        <td>
                            <button className="btn btn-info"
                              value={tasksListItem.task_id}                              
                              onClick={this.detailTask}>details</button>
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
