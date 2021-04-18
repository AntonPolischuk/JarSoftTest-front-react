import React, { Component } from 'react';
import CategoryService from '../services/CategoryService';
import Alert from 'react-bootstrap/Alert';
import ErrorHandler from '../ErrorHandler';

export default class CreateCategoryComponent extends Component {

    constructor(props) {

        super(props)

        this.state = {
            categoryName: '',
            reqName: '',
            deleted: false,
            show: false,
            alterValue: ''
        }
        this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
        this.changeReqNameHandler = this.changeReqNameHandler.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
    }

    saveCategory = (e) => {
        e.preventDefault();
        let category = {
            categoryName: this.state.categoryName, reqName: this.state.reqName,
            deleted: this.state.deleted
        };

        CategoryService.createCategory(category).then((res) => {
            this.props.history.push('/categories');
        }).catch(err => {
            this.setState({show:true, alterValue: ErrorHandler.updateErrorHandler(err)});
        });
    }

    changeCategoryNameHandler = (event) => {

        this.setState({ categoryName: event.target.value });
    }

    changeReqNameHandler = (event) => {

        this.setState({ reqName: event.target.value });
    }

    cancel() {

        this.props.history.push('/categories');
    }

    render() {
        return (
            <div>
                <h3 className="text-left border-bottom">Create new category</h3>
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
                    <Alert variant="danger" show={this.state.show}>
                        {this.state.alterValue}
                    </Alert>
                    <button className="btn btn-primary" onClick={this.saveCategory}>Save</button>
                    <button className="btn btn-danger float-right" 
                            onClick={this.cancel.bind(this)}>Cancel</button>
                </form>               
            </div>
        );
    }
}