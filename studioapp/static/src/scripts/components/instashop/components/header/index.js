import React, { Component } from 'react';
import message from './../../../../services/messages/index';
import { countBasketItems } from './../../modules/countbasketitems/index'
import { Link } from 'react-router';

class Header extends Component {

    constructor(props) {
        super(props);    
        this.addFixedheader = this.addFixedheader.bind(this);
    } 
    addFixedheader(){
        if ( window.scrollY >= 220 ){
            document.querySelector('.header_wrap').classList.add('fixed');
        } else {
            document.querySelector('.header_wrap').classList.remove('fixed');
        }
    }
    componentDidMount(){
        countBasketItems();
        window.addEventListener('scroll', this.addFixedheader);
        setTimeout(() => {
            const animateTitleSpan = document.querySelectorAll('.animate_title');   
            for ( let i = 0; i < animateTitleSpan.length; i++ ){           
                animateTitleSpan[i].classList.add('active');           
            } 
        }, 0);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.addFixedheader);
    }
    render() {      
        return (
            <div>                
                <div className="top_bg">
                    <div className="filter"></div>
                    <h1>
                        <Link className="nav-item" to="/">
                            {message.message.shopTitle.split('').map(l => <span className="animate_title">{l}</span>)}
                        </Link>                    
                    </h1>
                </div>                
            </div>
        );
    }
}

export default Header;
