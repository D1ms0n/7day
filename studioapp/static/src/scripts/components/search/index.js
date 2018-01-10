import React, { Component } from 'react';
import Menu from './../header/';
import SearchResult from './modules/searchResult';
import SearchForm from './modules/searchForm';
import ActionsForm from './modules/actionsForm';
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
            <div className="col-md-4">
              <div className={"btn btn-primar showFilters " + (this.state.filtersShown === true ? 'active' : '')} 
                onClick={this.showFilters}>  
                {(this.state.filtersShown === true ? 'Hide Filters' : 'Show Filters')} 
              </div>           
              <form id="searchForm" className="searchFormOnMobile" onSubmit={this.searchSubmit}>                 
                <SearchForm/> 
              </form>                                    
            </div> 
            <div className="col-md-8">
              <ActionsForm/>               
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

