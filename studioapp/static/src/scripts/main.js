import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from './components/login';
import Search from './components/search';
import Tasks from './components/tasks';
import Register from './components/register';
import InstaShop from './components/instashop';
import Cabinet from './components/instashop/components/Cabinet';
import Cart from './components/instashop/components/cart';


import '../styles/styles.scss';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/search" component={Search}/>       
        <Route path="/tasks" component={Tasks}/>
        <Route path="/register" component={Register}/>     

        <Route path="/instashop" component={InstaShop}/>      
        <Route path="/order" component={Cart}/>           
        <Route path="/cabinet" component={Cabinet}/>  
    </Router>,
  document.getElementById('page-content')
);
