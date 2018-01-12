import React, { Component } from 'react';

class SearchForm extends Component {

    constructor(props) {
        super(props);        
    }

    render() {
      return (
        <div>                      
           <div className="form-group">
                <label>Followers more than</label>
                <input name="followers_count__gte" type="number" className="form-control" />
            </div>              
            <div className="form-group">
                <label>Followers less than</label>
                <input name="followers_count__lte" type="number" className="form-control" />                
            </div>
            <div className="form-group">
                <label>Followed on more than</label>
                <input name="follow_count__gte" type="number" className="form-control" />
            </div> 
            <div className="form-group">
                <label>Followed on less than</label>
                <input name="follow_count__lte" type="number" className="form-control"/>
            </div> 
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                <input type="checkbox" name="follows_viewer" className="custom-control-input" id="followers" />
                <label className="custom-control-label" htmlFor="followers">follows viewer</label>
                </div>
                <div className="custom-control custom-checkbox">
                <input type="checkbox" name="followed_by_viewer" className="custom-control-input" id="follows" />
                <label className="custom-control-label" htmlFor="follows">followed by viewer</label>
                </div> 
            </div>                 
            <div className="form-group">
                <label>Order by</label>
                <select className="custom-select custom-select-lg" name="order_by">
                <option value="user_name">user name</option>
                <option value="user_id">user id</option>
                <option value="user_full_name">user full name</option>
                <option value="followers_count">followers count</option>
                <option value="follow_count">follow count</option>
                <option value="profile_pic_url_hd">profile pic url hd</option>
                <option value="user_biography">user biography</option>
                <option value="user_external_url">user external url</option>
                <option value="follows_viewer">follows viewer</option>
                <option value="followed_by_viewer">followed by viewer</option>
                <option value="has_requested_viewer">has requested viewer</option>
                <option value="requested_by_viewer">requested by viewer</option>
                <option value="has_blocked_viewer">has blocked viewer</option>
                <option value="blocked_by_viewer">blocked by viewer</option>
                <option value="is_private">is private</option>
                </select>   
            </div> 
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Search</button>
            </div>  
        </div>
      );
    }
}

export default SearchForm;
