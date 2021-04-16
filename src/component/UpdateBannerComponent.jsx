import React, { Component } from 'react'
import BannerService from '../services/BannerService';
import CategoryService from '../services/CategoryService';
import Alert from 'react-bootstrap/Alert';

export default class UpdateBannerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
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
        this.updateBanner = this.updateBanner.bind(this);
        this.deleteBanner = this.deleteBanner.bind(this);
    }

    componentDidMount() {

        BannerService.getBannerById(this.props.match.params.id).then((res) => {
            let banner = res.data;
            this.setState({
                name: banner.name,
                price: banner.priceEntity, content: banner.content, category: banner.category,
                id: this.props.match.params.id
            })
        });

        CategoryService.getAllCategories().then((res) => {
            this.setState({ categories: res.data })
        });

    }

    componentDidUpdate(prevProps) {
        console.log("From Did Update");
        if (this.props !== prevProps) {
            BannerService.getBannerById(this.props.match.params.id).then((res) => {
                let banner = res.data;
                this.setState({
                    name: banner.name,
                    price: banner.priceEntity, content: banner.content, category: banner.category,
                    id: this.props.match.params.id
                })
            });
        }
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

    updateBanner = (event) => {
        event.preventDefault();
        let banner = {
            id: this.state.id, name: this.state.name, price: this.state.price
            , content: this.state.content, deleted: this.state.deleted, category: this.state.category
        };
        BannerService.updateBanner(banner, banner.id).then((res) => {
            this.props.history.push('/banners')
        }).catch(err => {
            if (err.response.data.response !== undefined) {
                this.setState({ show: true, alterValue: err.response.data.response });
            }
            else if (err.response.data.errors !== undefined) {
                console.log(err.response.data.errors);
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

    deleteBanner = (id) => {

        BannerService.deleteBanner(id)
            .then(response => {
                this.props.history.push('/banners');
            }).catch(err => {
                this.setState({ show: true, alterValue: err.response.data.error + ": please try again" });
            });
    };





    render() {
        return (

            <div >
                <div >
                    <div>
                        <h3 className="text-center">Update Banner</h3>
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
                                <label>Content</label>
                                <textarea placeholder="Content" name="content" className="form-control"
                                    value={this.state.content} onChange={this.changeContentHandler} />
                            </div>
                            <div className="form-group">

                                <label>Category</label>
                                <select value={this.state.category.id} onChange={this.changeCategoryHandler}>
                                    {
                                        this.state.categories.map(
                                            categories =>
                                                <option key={categories.id} value={categories.id}>
                                                    {categories.categoryName}
                                                </option>
                                        )
                                    }
                                </select>

                            </div>

                            <button className="btn btn-succes" onClick={this.updateBanner}>Save</button>

                        </form>
                        <button className="btn btn-danger" onClick={() => this.deleteBanner(this.state.id)} >Delete</button>
                    </div>
                </div>
                <Alert variant="danger" show={this.state.show} >
                    {this.state.alterValue}
                </Alert>
            </div>
        );
    }
}