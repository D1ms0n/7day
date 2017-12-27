import React, { Component } from 'react';
import Menu from './../header/';
import Footer from './../footer/';

export default class Task extends Component {
  render() {
    return (
      <div>
        <Menu/>
        <div className="container-fluid">

        </div>
        <Footer/>
      </div>
    );
  }
}