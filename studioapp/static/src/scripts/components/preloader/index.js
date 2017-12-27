import React, { Component } from 'react';

export default class Preloader extends Component {
  render() {
    return (
      <div>
        <div id="preLoader">
          <div id="preloader_bg">
            <div className="waiting-text">
              Waiting...
            </div>
          </div>
        </div>
      </div>
    );
  }
}