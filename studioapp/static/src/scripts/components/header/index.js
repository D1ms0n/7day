import React, { Component } from 'react';
import { Link } from 'react-router';
import Preloader from './../preloader/';

class Menu extends Component {
  render() {
    return (      
      <div>        
        <Preloader/>
        <div className="container-fluid">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <header>
                    <nav>
                      <ul className="nav justify-content-end">
                        <li className="nav-item">                         
                          <Link className="nav-link" to="/">home</Link>
                        </li>
                        <li className="nav-item">                          
                          <Link className="nav-link" to="/search">search</Link>
                        </li>
                        <li className="nav-item">                         
                          <Link className="nav-link" to="/tasks">tasks</Link>
                        </li>  
                        <li className="nav-item">                         
                          <Link className="nav-link" to="/instashop">instashop</Link>
                        </li>                        
                      </ul>                      
                    </nav>
                  </header>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
