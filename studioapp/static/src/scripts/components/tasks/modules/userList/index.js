import React, { Component } from 'react';
import config from '../../../../configs/index';
import ApiService from '../../../../services/api/index';

let apiService = new ApiService();
const preLoader = document.getElementById('preLoader');

class UserList extends Component {

    constructor(props) {
        super(props);
        this.detailTask = this.detailTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    detailTask(event){

      preLoader.style.display='block';

      /**
       * {apiService} - fetch post request
       * {detailTask} - method for show task details
       */

      const taskId = event.target.value;

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

      preLoader.style.display='block';

      /**
       * {apiService} - fetch post request
       * {deleteTask} - method for delete task
       * {taskId} - task id
       */

      const taskId = event.target.value;

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
      return (
        <div>
          <div className="table-responsive">

            <table className="table taskslist" id="usersListResult">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Direction</td>
                  <td>Start time</td>
                  <td>Count</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>

                {this.props.list.map((item, index) =>
                    <tr key={index} id={item.task_id}>
                        <td>
                            {item.username}
                        </td>
                        <td>
                            {item.direction}
                        </td>
                        <td>
                            {item.create_time}
                        </td>
                        <td>
                            {item.count}
                        </td>
                        <td>
                            <button value={item.task_id} className="details-btn" onClick={this.detailTask}> </button>
                            <button value={item.task_id} className="close-btn" onClick={this.deleteTask}> </button>
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
export default UserList;