import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class TopMenuComponent extends Component {
  render() {
    return (
      <div className="row text-left border-bottom">
        
            <Link to="/categories" className="btn btn-link btn-lg active ">Categories</Link>
      
            <Link to="/banners"className="btn btn-link btn-lg active ">Banners</Link>
        
      </div>
    )
  }
}
