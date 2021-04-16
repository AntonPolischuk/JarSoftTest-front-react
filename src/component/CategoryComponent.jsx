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
      <Row>
        <Col>
          <h2>Categories</h2>
          <div className="form">
            <input type="text" placeholder="Search" onChange={(event) => this.setState({ searchValue: event.target.value })} />
          </div>
          {filter.map(categories =>
            <p key={categories.id} >
              <Link to={`${this.props.match.url}/${categories.id}`}>{categories.categoryName}</Link>
            </p>

          )
          }
          <Link to="/categories/create">Create category</Link>
        </Col>

        <Col>
          <Switch>
            <Route exact path={`${this.props.match.url}/create`} component={CreateCategoryComponent} />
            <Route path={`${this.props.match.url}/:id`} component={UpdateCategoryComponent} />
            <Route exact path={this.props.match.url} render={() => <div> Please select a Category</div>} />
          </Switch>
        </Col>
      </Row>

    )
  }
}
