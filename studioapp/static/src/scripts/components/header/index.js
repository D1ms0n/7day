import React, { Component } from 'react';
import { Link } from 'react-router';

class Menu extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <header>
                    <nav>
                      <ul className="menu">
                        <li>
                          <Link to="/">home</Link>
                        </li>
                        <li>
                          <Link to="/search">search</Link>
                        </li>
                        <li>
                          <Link to="/tasks">tasks</Link>
                        </li>
                        <li>
                          <Link to="/task">task</Link>
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