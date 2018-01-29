import React, { Component } from 'react';
import message from './../../../../services/messages/index';
import { Link } from 'react-router';

class Header extends Component {

    constructor(props) {
        super(props); 
        this.state = {          
            menushown: false
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
                <label onClick={() => this.toggleMenu()} 
                    className={"toggle_btn "+ (this.state.menushown === true ? 'active' : '')}>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <nav className={"nav menu " + (this.state.menushown === true ? 'active' : '')}>
                    <Link className="nav-item" to="/contacts">Contact</Link>
                </nav>
                <div className="top_bg">
                    <h1>
                        <Link className="nav-item" to="/">
                            {message.message.shopTitle}
                        </Link>                    
                    </h1>
                </div>                       
            </div>
        );
    }
}

export default Header;
