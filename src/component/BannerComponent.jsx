import React, { Component } from 'react'
import BannerService from '../services/BannerService';
import { Link, Route, Switch } from 'react-router-dom';
import UpdateBannerComponent from './UpdateBannerComponent';
import CreateBannerComponent from './CreateBannerComponent';

export default class BannerComponent extends Component {

    constructor(props){
        super(props)
        this.state={
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
          <div className="row">
            <div className="col-4">
              <h2>Banners:</h2>
              <div className="input-group mb-3">
                  <input type="text" placeholder="Search" onChange={(event) => 
                                      this.setState({ searchValue: event.target.value })} />
              </div>
                  {filter.map(
                    banners =>
                    <p key={banners.id}>
                      <Link to={`${this.props.match.url}/${banners.id}`} className="btn-link btn active">
                        {banners.name}
                      </Link>
                    </p>
                  )}
                  <Link to="/banners/create" className="btn btn-primary active">Create banner</Link>
            </div>

            <div className="col-8">
                <Switch>
                <Route exact path={`${this.props.match.url}/create`} component={CreateBannerComponent}/>
                <Route path={`${this.props.match.url}/:id`} component={UpdateBannerComponent}/>
                <Route exact path={this.props.match.url} render={() => <div>Please select a Banner</div>}/>
                </Switch>
            </div>
          </div>
    )
  }
}
