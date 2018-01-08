import React, { Component } from 'react';
import Menu from './../header/';
import SearchResult from './modules/searchResult';
import Footer from './../footer/';
import config from './../../configs/index';
import ApiService from './../../services/api/index';
import { CookiesService } from './../../services/cookies';
import serialize from './../../services/serialize/index';
import { setTimeout } from 'timers';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
        resultList: [],
        filtersShown: false
    };
    this.searchSubmit = this.searchSubmit.bind(this);
    this.showFilters = this.showFilters.bind(this);
    this.followAll = this.followAll.bind(this);
    this.checkUnCheckAll = this.checkUnCheckAll.bind(this);
  }  
  followAll(){
    const preLoader = document.getElementById('preLoader');
    const showMassage = document.getElementById('showMassage');
    let apiService = new ApiService();
    let usersList = document.querySelectorAll('.js-for-check:checked');

    if ( usersList.length === 0 ){
      showMassage.classList.add('in');      
      setTimeout(function(){
        showMassage.classList.remove('in');
      },3000);
      return false;
    }

    let targets = [];
    let userName = "test_name";
    // decodeURIComponent(CookiesService.getCookie('userId'))
    for( let i = 0; i < usersList.length; i++){
        if ( usersList[i].followedbyviewer === true) { continue; } // ignore if already follow
        targets.push(usersList[i].value);
    }

    let targetsJSON = {
        "operation": "follow", 
        "username": userName,
        "targets": targets
    };    

    targetsJSON = JSON.stringify(targetsJSON);
   
    preLoader.style.display='block';
    apiService.postRequest(`${config.api.tasks}?${targetsJSON}`)
      .then((result) => {      
        preLoader.style.display='none';
      })
      .catch((e) => {
          console.log(e);
          preLoader.style.display='none';
      });
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
  searchSubmit(event) {

    event.preventDefault();

    const preLoader = document.getElementById('preLoader');    
    const form = document.getElementById('searchForm');        
    const formParams = serialize(form);
    let apiService = new ApiService();

    preLoader.style.display = 'block';
    apiService.getRequest(`${config.api.search}?${formParams}`)
      .then((result) => {
        this.setState({
          'resultList':result
        });        
        preLoader.style.display='none';
      })
      .catch((e) => {
          console.log(e);
          preLoader.style.display='none';
      });
  }
  showFilters(){
    this.setState({
      'filtersShown': !this.state.filtersShown
    });
  }
  render() {
    return (
      <div>        
        <Menu/>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4">
              <div className={"btn btn-primar showFilters " + (this.state.filtersShown === true ? 'active' : '')} 
                onClick={this.showFilters}>               
                Show Filters
              </div>  
              <form id="searchForm" className="searchFormOnMobile" onSubmit={this.searchSubmit}>
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
              </form>                       
            </div> 
            <div className="col-md-8 col-sm-8">
              <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input onChange={this.checkUnCheckAll}
                        type="checkbox" name="checkbox" className="custom-control-input" id="checkUncheck" />
                        <label className="custom-control-label" htmlFor="checkUncheck">Check/unCheckAll</label>
                      </div>   
                    </div>                           
                    <button
                      className="btn btn-success"                     
                      onClick={() => this.followAll()}>
                      Follow on Selected
                    </button>
                  </div>
                </div>    
                <div id="showMassage" className="absolute upper alert alert-danger fade" role="alert">
                    Please choose someone
                </div>
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

