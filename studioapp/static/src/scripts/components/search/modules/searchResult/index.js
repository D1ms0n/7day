import React, { Component } from 'react';
import config from './../../../../configs/index';
import ApiService from './../../../../services/api/index';

class SearchResult extends Component {

  constructor(props) {
    super(props);
    this.followUnFollowThis = this.followUnFollowThis.bind(this);    
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
    const preLoader = document.getElementById('preLoader');
    let apiService = new ApiService();
    console.log(userNameJson);
  };
  render(){
    let searchList = this.props.list;
    let notFound = '';
    if ( searchList.length === 0 ){
      notFound = <div className="alert alert-warning" role="alert">
                    No results!
                  </div>
    }
    return (
      <div>
        {notFound}
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
                className="btn btn-success"
                id="subscribe"
                onClick={() => this.followUnFollowThis(searchListItem.user_name,'follow')}>
                Follow
              </button>
              <button
                className="btn btn-info hidden"
                id="unsubscribe"
                onClick={() => this.followUnFollowThis(searchListItem.user_name,'unfollow')}>
                UnFollow
              </button>
              <input className="form-check-input js-for-check" 
                    type="checkbox"
                    name="checkbox"
                    followedbyviewer = {searchListItem.followed_by_viewer}
                    id={searchListItem.user_id}
                    value={searchListItem.user_name}
                    aria-label="..." />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default SearchResult;
