import React, { Component } from 'react';
import { setTimeout } from 'timers';

 class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollToTopIsShowen : false
    };
    this.showScrollToTop = this.showScrollToTop.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.showScrollToTop);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showScrollToTop);
  }

  showScrollToTop(){
    if ( window.scrollY > 250 ){
      this.setState({
        'scrollToTopIsShowen': true
      });
    } else {
      this.setState({
        'scrollToTopIsShowen': false
      });
    }
  }

  scrollToTop(){
    for ( let i = window.scrollY; i >= 0 ; i-- ){
      if ( i % 5 === 0 ) {
       setTimeout(function(){
        window.scrollTo(0, i);  
       })
      }  
    }
  }

  render() {
        return (
            <div>
              <div className="container-fluid">
                <div className="row">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <footer>
                          <div className={"scrollToTop " + (this.state.scrollToTopIsShowen === true ? 'active' : '')} 
                            onClick={this.scrollToTop}></div>
                        </footer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
export default Footer;

