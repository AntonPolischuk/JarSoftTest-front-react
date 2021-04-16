import React, { Component } from 'react'
import Categoryservice from '../services/CategoryService'
import Alert from 'react-bootstrap/Alert';

export default class UpdateCategoryComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            categoryName: '',
            reqName: '',
            deleted: false,
            show: false,
            alterValue: ''
        }
        this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
        this.changeReqNameHandler = this.changeReqNameHandler.bind(this);
        this.updateCategory = this.updateCategory.bind(this);

    }


    componentDidMount() {

        Categoryservice.getCategoryById(this.props.match.params.id).then((res) => {
            let category = res.data;
            this.setState({
                categoryName: category.categoryName,
                reqName: category.reqName, id: this.props.match.params.id
            })
        }).catch(err => {
            this.props.history.push('/categories')
        });
    }

    componentDidUpdate(prevProps) {

        if (this.props !== prevProps) {
            Categoryservice.getCategoryById(this.props.match.params.id).then((res) => {
                let category = res.data;
                this.setState({
                    categoryName: category.categoryName,
                    reqName: category.reqName, id: this.props.match.params.id, show: false
                })
            });
        }

    }

    updateCategory = (e) => {
        e.preventDefault();
        let category = {
            id: this.state.id, categoryName: this.state.categoryName
            , reqName: this.state.reqName, deleted: this.state.deleted
        };
        Categoryservice.updateCategory(category, this.state.id).then((res) => {
            this.props.history.push('/categories');
        }).catch(err => {
            if (err.response.data.response !== 'undefined') {
                this.setState({ show: true, alterValue: err.response.data.response });
            }
            else if (err.response.data.errors !== undefined) {
                let message = '';
                err.response.data.errors.forEach(function (item, i, arr) {
                    message += item.defaultMessage;
                });
                this.setState({ show: true, alterValue: message });
            }
            else {
                this.setState({ show: true, alterValue: err.response.data.error + ": please try again" });
            }
        });

    }

    changeCategoryNameHandler = (event) => {
        this.setState({ categoryName: event.target.value });
    }

    changeReqNameHandler = (event) => {
        this.setState({ reqName: event.target.value });
    }

    deleteCategories = (id) => {
        Categoryservice.deleteCategoty(id)
            .then(response => {
                if (response.data.response ==='') {
                    this.props.history.push('/categories');
                } else {
                    this.setState({ show: true, alterValue: response.data.response });
                }
            }).catch(err => {
                this.setState({ show: true, alterValue: err.response.data.error + ": please try again" });
            });
    };



    render() {
        return (
            <div>
                <div>
                    <div>
                        <h3 className="text-center">{this.state.categoryName} ID:{this.state.id}</h3>

                        <form>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input placeholder="Category Name" name="categoryname" className="form-control"
                                    value={this.state.categoryName} onChange={this.changeCategoryNameHandler} />
                            </div>
                            <div className="form-group">
                                <label>Request ID</label>
                                <input placeholder="Req Name" name="reqName" className="form-control"
                                    value={this.state.reqName} onChange={this.changeReqNameHandler} />
                            </div>

                            <button className="btn btn-succes" onClick={this.updateCategory}>Save</button>
                            <td style={{ marginLeft: "10px" }} button onClick={() => this.deleteCategories(this.state.id)} className="btn btn-danger">Delete</td>
                        </form>
                    </div>
                </div>

                <Alert variant="danger" show={this.state.show}>
                    {this.state.alterValue}
                </Alert>

            </div>

        )
    }
}
