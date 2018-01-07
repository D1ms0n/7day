import React, { Component } from 'react';

export default class Preloader extends Component {
  render() {
    return (
      <div>
        <div id="preLoader">
          <div id="preloader_bg">
            <div className="waiting-text">
              Pending...
            </div>
          </div>
        </div>
      </div>
    );
  }
}