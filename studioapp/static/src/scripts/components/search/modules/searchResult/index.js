import React, { Component } from 'react';
import config from './../../../../configs/index';
import ApiService from './../../../../services/api/index';

let apiService = new ApiService();
const preLoader = document.getElementById('preLoader');


class SearchResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actionsIsOpened : false
    };
    this.followUnFollowThis = this.followUnFollowThis.bind(this);
    this.followAll = this.followAll.bind(this);
    this.checkUnCheckAll = this.checkUnCheckAll.bind(this);
  }

  checkUnCheckAll(){

    const checkUncheck = document.getElementById('checkUncheck');
    const checkboxes = document.querySelectorAll('.users-list .checkbox');

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

  followUnFollowThis(name,action){
    let userNameObject;
    switch (action) {
      case 'follow':
        action = 'follow';
        break;
      case 'unfollow':
        action = 'unfollow';
        break;
      default:
        action = '';
    }
    userNameObject = {
      "user_names": name,
      "direction": action
    };

    const userNameJson = JSON.stringify(userNameObject);
    console.log(userNameJson);
  };

  followAll(){
      let usersNames = [];
      let usersList = document.querySelectorAll('.checkbox:checked');

      for( let i = 0; i < usersList.length; i++){
          if ( usersList[i].followedbyviewer === true) { continue; } // ignore if already follow
          usersNames.push(usersList[i].value);
      }

      const usersNamesObject = {
          "user_names": usersNames,
          "direction": 'follow'
      };
      const usersNamesJson = JSON.stringify(usersNamesObject);
      console.log(usersNamesJson);
  }

  componentWillReceiveProps (){
    if ( this.props.list.length > 0 ){
      this.setState({
        'actionsIsOpened': true
      });
    }
  }

  render(){
    let searchList = this.props.list;
    let listActionBtns = '';
    if ( this.state.actionsIsOpened ) {
      listActionBtns =
        <div className="actionForm">
          <input
            onChange={this.checkUnCheckAll}
            type="checkbox"
            name="checkbox"
            className="checkbox"
            id="checkUncheck"
          />
          <label htmlFor="checkUncheck" className="checkbox-label">Check/unCheckAll</label>
          <button
            className="action-btn"
            onClick={() => this.followAll()}>
            Follow on Selected
          </button>
        </div>
      ;
    }
  return (
    <div>
      {listActionBtns}
      <ul className="users-list">
        {searchList.map((searchListItem,index) =>
          <li className="users-list-block" key={searchListItem.user_id} >
            <div className="user-avatar"
              style={{backgroundImage: "url(" + searchListItem.profile_pic_url_hd + ")"}}></div>
            <a href={`https://www.instagram.com/${searchListItem.user_name}`}
              target="_blank"
              className="main-link">
              {searchListItem.user_name}
            </a>
            <div className="name">
              {searchListItem.user_full_name}
            </div>
            <div className="description">
              {searchListItem.user_biography}
            </div>
            <div className="followed_by">
              Followed by : {searchListItem.followers_count}
            </div>
            <div className="follows">
              Follows : {searchListItem.follow_count}
            </div>


            <button
               className="action-btn"
               id="subscribe"
               onClick={() => this.followUnFollowThis(searchListItem.user_name,'follow')}>
               Follow
             </button>
             <button
               className="action-btn"
               id="unsubscribe"
               onClick={() => this.followUnFollowThis(searchListItem.user_name,'unfollow')}>
               UnFollow
             </button>


             <input
               type="checkbox"
               name="checkbox"
               className="checkbox"
               followedbyviewer = {searchListItem.followed_by_viewer}
               id={searchListItem.user_id}
               value={searchListItem.user_name}/>
             <label htmlFor={searchListItem.user_id} className="checkbox-label"> </label>
           </li>
         )}
      </ul>
    </div>
     )
   }
}

export default SearchResult;
