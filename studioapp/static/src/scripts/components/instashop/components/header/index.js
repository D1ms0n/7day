import React, { Component } from 'react';
import message from './../../../../services/messages/index';
import { Link } from 'react-router';

class Header extends Component {

    constructor(props) {
        super(props); 
        this.state = {          
            menushown: true
        };
    }
    
    toggleMenu(){
        this.setState({
            menushown: !this.state.menushown
        });
    }
   
    render() {      
        return (
            <div>                
                <div className="top_bg">
                    <div className="filter"></div>
                    <h1>
                        <Link className="nav-item" to="/">
                            {message.message.shopTitle}
                        </Link>                    
                    </h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                           
                            <label onClick={() => this.toggleMenu()} 
                                className={"toggle_btn "+ (this.state.menushown === true ? 'active' : '')}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </label>

                            <nav className={"nav menu " + (this.state.menushown === true ? 'active' : '')}>
                                <Link className="nav-item" to="/instashop">{message.message.instashop}</Link>
                                <Link className="nav-item" to="/contacts">{message.message.contacts}</Link>
                                <Link className="nav-item" to="/delivery">{message.message.delivery}</Link> 
                                <Link className="nav-item" to="/cabinet">{message.message.cabinet}</Link>                    
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
