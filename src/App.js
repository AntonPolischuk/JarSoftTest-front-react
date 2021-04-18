import {Route}from 'react-router-dom';
import React, { Component } from 'react'
import CategoryComponent from './component/CategoryComponent';
import BannerComponent from './component/BannerComponent';
import TopMenuComponent from './component/TopMenuComponent';


export default class App extends Component {

  constructor(props){
      super(props)
      this.state={

      }

  }
  render() {
    return (
      <div className="container">
      
        <TopMenuComponent/>
        <Route path="/categories" component={CategoryComponent}/>
        <Route path="/banners" component={BannerComponent}/>
      </div>
    )
  }
}
