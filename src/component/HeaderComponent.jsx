import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <p>
            <Link to="/categories">Categories</Link>
        </p>
        <p>
            <Link to="/banners">Banners</Link>
        </p>
      </div>
    )
  }
}
