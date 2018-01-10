import React, { Component } from 'react';
import config from './../../../../configs/index';
import ApiService from './../../../../services/api/index';

class SearchResult extends Component {

  constructor(props) {
    super(props);   
  }  
  render(){
    let searchList = this.props.list;
    let notFound = '';
    if ( searchList.length === 0 ){
      notFound = <div className="absolute alert alert-warning" role="alert">
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
              <div className="custom-control custom-checkbox">
                <input className="custom-control-input form-check-input js-for-check" 
                      type="checkbox"
                      name="checkbox"
                      followedbyviewer = {searchListItem.followed_by_viewer}
                      id={searchListItem.user_id}
                      value={searchListItem.user_name}
                      aria-label="..." />
                <label className="custom-control-label" htmlFor={searchListItem.user_id}></label>
              </div>                    
              
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default SearchResult;
