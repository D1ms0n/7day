import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from './components/login'
import Search from './components/search'
import Task from './components/task'
import Tasks from './components/tasks'
import Register from './components/register'
import '../styles/styles.scss';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/search" component={Search}/>
        <Route path="/task" component={Task}/>
        <Route path="/tasks" component={Tasks}/>
        <Route path="/register" component={Register}/>        
    </Router>,
  document.getElementById('page-content')
);
