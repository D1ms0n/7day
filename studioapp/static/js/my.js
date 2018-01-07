var checked = []

class User_info_row extends React.Component{
    constructor(props){
    super(props)
    }

    render(){
        return (<tr >
             <th scope="row"><img src = {this.props.profile_pic_url_hd} width = '150px'/></th>
             <td>{this.props.user_name}</td>
             <td>{this.props.follow_count}</td>
             <td>{this.props.followers_count}</td>
             <td><input type="checkbox" id= {this.props.user_id} onClick={this.props.on_check} /></td>
            </tr>);
            }
}

class User_list extends React.Component{
    constructor(props){
        super(props)
        this.state = {'user_list'    : [],
                      'checked_users': [],
                      'follows_gte'  : '',
                      'follows_lte'  : '',
                      'followed_gte' : '',
                      'followed_lte' : ''
                      }
        this.handleClick = this.handleClick.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.render_user = this.render_user.bind(this)
        this.handleRelButton = this.handleRelButton.bind(this)
        this.handleTaskButton = this.handleTaskButton.bind(this)
    }


    handleCheck(e){
        e.target.checked == true ? checked.push(e.target.id) : checked.splice( checked.indexOf(e.target.id), 1 )
        this.setState({'checked_users': checked})
        }

    render_user(user){
        return(<User_info_row user_id            = {user.user_id}
                              user_name          = {user.user_name}
                              profile_pic_url_hd = {user.profile_pic_url_hd}
                              followers_count    = {user.followers_count}
                              follow_count       = {user.follow_count}
                              on_check           = {this.handleCheck}/>
              );
        }


    handleRelButton(e){

        var action = e.target.id === 'FollowButton' ? 'Follow' : 'Unfollow'

        fetch('http://192.168.0.103:8000/api/tasks/', {
                 method: "POST",
                 headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    },
                 body: JSON.stringify({
                    args: {user_ids: this.state['checked_users']},
                    operation: action

                    })
                 })
                .then(response => response.json())
                .then(json => {this.setState({'user_list':json})})
    }

    handleTaskButton(e){
    var action = e.target.id === 'FollowButton' ? 'Follow' : 'Unfollow'

        fetch('http://192.168.0.103:8000/api/tasks/', {
                 method: "POST",
                 headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    },
                 body: JSON.stringify({"operation":"follow",
                                       "username":"dima",
                                       "args":{"user_names":["new_arg","lalala"]},
                                        })

                 })
                .then(response => response.json())
                .then(json => {this.setState({'user_list':json})})


    }


    handleClick(){
        var filter = ''
        if (this.state["follows_gte"] != '' && filter == ''){
            filter = "?" + "follow_count__gte=" + this.state["follows_gte"]
        }

        if (this.state["follows_lte"] != '' && filter != ''){
            filter = filter + '&' + "follow_count__lte=" + this.state["follows_lte"]
        }
        else if (this.state["follows_lte"] != '' && filter == ''){
            filter = '?' + "follow_count__lte=" + this.state["follows_lte"]
        }

        if (this.state["followed_gte"] != '' && filter != ''){
            filter = filter + '&' + "followers_count__gte=" + this.state["followed_gte"]
        }
        else if (this.state["followed_gte"] != '' && filter == ''){
            filter = '?' + "followers_count__gte=" + this.state["followed_gte"]
        }

        if (this.state["followed_lte"] != '' && filter != ''){
            filter = filter + '&' + "followers_count__lte=" + this.state["followed_lte"]
        }
        else if (this.state["followed_lte"] != '' && filter == ''){
            filter = '?' + "followers_count__lte=" + this.state["followed_lte"]
        }
        var link =  "http://192.168.0.103:8000/api/users" + filter

        fetch(link)
        .then(response => response.json())
        .then(json => {this.setState({'user_list':json})})
        }

    handleFilter(e){
        this.setState({[e.target.id]: e.target.value})
        console.log(this.state)
        }

    render(){
        return(<div className = 'container'>
                filters {this.state['follows_gte']} and {this.state['follows_lte']}
                <button onClick={this.handleClick}>
                    Update table
                </button>

                <button id = 'FollowButton' onClick={this.handleRelButton}>
                    Follow
                </button>

                <button id = 'UnfollowButton' onClick={this.handleRelButton}>
                    Unfollow
                </button>

                <button id = 'GetFollowInfo' onClick={this.handleTaskButton}>
                    GetFollowInfo
                </button>


                <table className="table"  >
                 <thead>
                    <tr>
                      <th scope="col">IMG</th>
                      <th scope="col">Name</th>
                      <th scope="col">Follows</th>
                      <th scope="col">Followed</th>
                      <th scope="col">Check</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr >
                        <th scope="row"></th>
                        <td><input type = 'text'/></td>
                        <td><div>
                                <label for="uname">Follows gte:  </label>
                                <input type="text" id="follows_gte" name="follows_gte" onChange = {this.handleFilter}/>
                            </div>
                            <div>
                                <label for="uname">Follows lte:  </label>
                                <input type="text" id="follows_lte" name="follows_lte" onChange = {this.handleFilter}/>
                            </div>
                        </td>
                        <td><div>
                                <label for="uname">Followed gte:  </label>
                                <input type="text" id="followed_gte" name="followed_gte" onChange = {this.handleFilter}/>
                            </div>
                            <div>
                                <label for="uname">Followed lte:  </label>
                                <input type="text" id="followed_lte" name="followed_lte" onChange = {this.handleFilter}/>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    {this.state['user_list'].map(this.render_user)}
                 </tbody>
               </table>
               </div>
               );
    }
}


ReactDOM.render(
  <User_list />,
  document.getElementById('all')
);



