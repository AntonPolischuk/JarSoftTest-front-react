
import {Route}from 'react-router-dom';
import React, { Component } from 'react'
import CategoryComponent from './component/CategoryComponent';
import HeaderComponent from './component/HeaderComponent';
import { Container, Row } from 'react-bootstrap';
import BannerComponent from './component/BannerComponent';


export default class App extends Component {

  constructor(props){
      super(props)
      this.state={

      }

  }
  render() {
    return (
    <Container fluid="xl">
      <Row>
       <HeaderComponent/>
      </Row>
      <Row>
      <Route path="/categories" component={CategoryComponent}/>
      <Route path="/banners" component={BannerComponent}/>
      </Row>
   </Container>
    )
  }
}
