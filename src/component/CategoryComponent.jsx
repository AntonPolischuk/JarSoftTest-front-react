import React, { Component } from 'react'
import CategoryService from '../services/CategoryService'
import { Link, Route, Switch } from 'react-router-dom';
import UpdateCategoryComponent from './UpdateCategoryComponent';
import CreateCategoryComponent from './CreateCategoryComponent';
import { Col, Row } from 'react-bootstrap';

export default class CategoryComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
          categories: [],
          id: '',
          searchValue: ''
        }
    }

    componentDidMount() {

        CategoryService.getAllCategories().then((res) => {
          this.setState({ categories: res.data, id: res.data[0].id })
        });
    }

    componentDidUpdate(prevProps) {

        if (this.props !== prevProps) {
            CategoryService.getAllCategories().then((res) => {
            this.setState({ categories: res.data, id: res.data[0].id })
        });
        }
    }

    render() {

      const filter = this.state.categories.filter(categories => {
        return categories.categoryName.toLowerCase().includes(this.state.searchValue.toLowerCase())
      });

      return (
        <div className="row">
        <div className="col-4">
          <h2>Categories:</h2>
          <div className="input-group mb-3">
            <input type="text" placeholder="Search" onChange={(event) => this.setState({ searchValue: event.target.value })} />
          </div>
          {filter.map(categories =>
            <p key={categories.id} >
              <Link to={`${this.props.match.url}/${categories.id}`} className="btn-link btn active">
                {categories.categoryName}
                </Link>
            </p>
          )}
          <Link to="/categories/create" className="btn btn-primary active">Create category</Link>
        </div>

        <div className="col-8">
          <Switch>
            <Route exact path={`${this.props.match.url}/create`} component={CreateCategoryComponent} />
            <Route path={`${this.props.match.url}/:id`} component={UpdateCategoryComponent} />
            <Route exact path={this.props.match.url} render={() => <div> Please select a Category</div>} />
          </Switch>
        </div>
      </div>

    )
  }
}
