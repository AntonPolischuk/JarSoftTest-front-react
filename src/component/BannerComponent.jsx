import React, { Component } from 'react'
import BannerService from '../services/BannerService';
import { Col, Row } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import UpdateBannerComponent from './UpdateBannerComponent';
import CreateBannerComponent from './CreateBannerComponent';

export default class BannerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            banners: [],
            searchValue: ''
        }
    }

    componentDidMount() {

        BannerService.getAllBanners().then((res) => {
          this.setState({ banners: res.data })
        });
    }

    componentDidUpdate(prevProps) {

        if (this.props !== prevProps) {
            BannerService.getAllBanners().then((res) => {
                this.setState({ banners: res.data })
            });
        }
    }

    render() {
        const filter = this.state.banners.filter(banners => {
            return banners.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        });

        return (
        <Row>
        <Col>
          <h2>Banners:</h2>
          <div className="form">
            <input type="text" placeholder="Search" onChange={(event) => this.setState({ searchValue: event.target.value })} />
          </div>
          {filter.map(
            banners =>
              <p key={banners.id}>
                <Link to={`${this.props.match.url}/${banners.id}`}>{banners.name}</Link>
              </p>
          )}
          <Link to="/banners/create">Create banner</Link>
        </Col>
        <Col>

          <Switch>
            <Route exact path={`${this.props.match.url}/create`} component={CreateBannerComponent} />
            <Route path={`${this.props.match.url}/:id`} component={UpdateBannerComponent} />
            <Route exact path={this.props.match.url} render={() => <div> Please select a Banner</div>} />
          </Switch>

        </Col>
      </Row>
    )
  }
}
