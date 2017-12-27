import React, { Component } from 'react';
import Menu from './../header/';
import Preloader from './../preloader/';
import config from './../../configs/index';
import ApiService from './../../services/api/index';
import SearchResult from './modules/searchResult';
import Footer from './../footer/';

let apiService = new ApiService();

class Search extends Component {

  constructor(props) {

    /**
     * local state
     * @param {targetName}  -
     * @param followers_count__gte: - у кого фоловеров больше
     * @param followers_count__lte: - у кого фоловеров меньше
     * @param follow_count__gte: -
     * @param follow_count__lte: -
     * @param follows_viewer: - на кого ты
     * @param followed_by_viewer: -  кто на тебя
     * @param task_id: -
     */

    super(props);
    this.state = {
        resultList: [],
        filtersShown: false
    };
    this.searchSubmit = this.searchSubmit.bind(this);
    this.showFilters = this.showFilters.bind(this);
  
  }
  showFilters(){
    this.setState({
      'filtersShown': !this.state.filtersShown
    });
  }

  searchSubmit(event) {

    event.preventDefault();
    const preLoader = document.getElementById('preLoader');    
    const serialize = require('form-serialize');
    const form = document.querySelector('#searchForm');
    const formParams = serialize(form);

    preLoader.style.display = 'block';
    apiService.getRequest(`${config.api.search}?${formParams}`)
      .then(result => {
        this.setState({
          'resultList':result
        });
        preLoader.style.display='none';
      })
      .catch( e => {
          console.log(e);
          preLoader.style.display='none';
      });
  }

  render() {
    return (
      <div>
        <Preloader/>
        <Menu/>
        <div className="container">
          <div className="row main-page">
            <div className="col-md-4 col-sm-4">
              <div className="search-block">
                <div className={"showFilters " + (this.state.filtersShown === true ? 'active' : '')} 
                  onClick={this.showFilters}>               
                  Show Filters
                </div>    
                <form id="searchForm" className="searchFormOnMobile" onSubmit={this.searchSubmit}>
                  <label>
                    Followers more than
                  </label>
                  <input name="followers_count__gte" type="number" className="main-input"/>
                  <label>
                    Followers less than
                  </label>
                  <input name="followers_count__lte" type="number" className="main-input"/>
                  <label>
                    Followed on more than
                  </label>
                  <input name="follow_count__gte" type="number" className="main-input"/>
                  <label>
                    Followed on less than
                  </label>
                  <input name="follow_count__lte" type="number" className="main-input"/>
                  <input id="followers" className="checkbox" type="checkbox" name="follows_viewer"/>
                  <label htmlFor="followers">
                    Get followers
                  </label>
                  <input id="follows" className="checkbox" type="checkbox" name="followed_by_viewer"/>
                  <label htmlFor="follows">
                    Get follows
                  </label>
                  <label htmlFor="follows">
                    Order by
                  </label>
                  <select className="main-select" name="order_by">                  
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
                  <button className="submit-btn">Search</button>
                </form>
              </div>
            </div>
            <div className="col-md-8 col-sm-8">
                <SearchResult list={this.state.resultList} />
            </div>            
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Search;

