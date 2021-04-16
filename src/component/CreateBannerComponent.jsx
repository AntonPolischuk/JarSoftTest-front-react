import React, { Component } from 'react'
import BannerService from '../services/BannerService';
import CategoryService from '../services/CategoryService';
import Alert from 'react-bootstrap/Alert';

export default class CreateBannerComponent extends Component {

    constructor(props) {

        super(props)

        this.state = {
            name: '',
            price: '',
            content: '',
            deleted: false,
            categories: [],
            category: '',
            show: false,
            alterValue: ''
        }

        this.changeBannerNameHandler = this.changeBannerNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.saveBanner = this.saveBanner.bind(this);
    }

    saveBanner = (e) => {
        e.preventDefault();
        let banner = {
            name: this.state.name, price: this.state.price,
            deleted: this.state.deleted, content: this.state.content,
            category: this.state.category
        };
        BannerService.createBanner(banner)
            .then(res => {
                this.props.history.push('/banners')
            })
            .catch(err => {
                if (err.response.data.response !== undefined) {
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

    changeBannerNameHandler = (event) => {

        this.setState({ name: event.target.value });
    }

    changePriceHandler = (event) => {

        this.setState({ price: event.target.value });
    }

    changeContentHandler = (event) => {

        this.setState({ content: event.target.value });
    }

    changeCategoryHandler = (event) => {

        this.setState({ category: this.state.categories
                        .filter(categories => categories.id == event.target.value)[0] });
    }

    cancel() {

        this.props.history.push('/banners');
    }

    componentDidMount() {

        CategoryService.getAllCategories().then((res) => {
            this.setState({ categories: res.data, category: res.data[0] });
        });
    }


    render() {
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <h3 className="text-center">Add Banner</h3>
                            <form>
                                <div className="form-group">
                                    <label>Banner Name</label>
                                    <input placeholder="Banner Name" name="bannername" className="form-control"
                                        value={this.state.name} onChange={this.changeBannerNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input placeholder="Price" name="price" className="form-control"
                                        value={this.state.price} onChange={this.changePriceHandler} />
                                </div>

                                <div className="form-group">

                                    <label>Category</label>
                                    <select onChange={this.changeCategoryHandler}>
                                        {
                                            this.state.categories.map(
                                                categories => <option key={categories.id} value={categories.id}>{categories.categoryName}</option>
                                            )
                                        }
                                    </select>

                                </div>


                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea placeholder="Content" name="content" className="form-control"
                                        value={this.state.content} onChange={this.changeContentHandler} />
                                </div>

                                <button className="btn btn-succes" onClick={this.saveBanner}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Alert variant="danger" show={this.state.show} >
                    {this.state.alterValue}
                </Alert>
            </div>
        );
    }
}