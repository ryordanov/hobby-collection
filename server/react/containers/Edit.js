import React from 'react';
import PropTypes from 'prop-types';

import { getRequestToAPI, postRequestToAPI } from '../utils';


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oid: '',
            id: '',
            category: '',
            subCategory: '',
            items: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        return getRequestToAPI(`/api/collections/${this.props.match.params.collectionName}/${this.props.match.params.subCollectionName}?option=${this.props.match.params.option}`, this.props.history)
            .then((resData) => {
                this.setState({
                    oid: resData[0].oid,
                    id: resData[0].id,
                    category: resData[0].make,
                    subCategory: resData[0].serie,
                    items: resData[0].items
                });
            });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // const data = new FormData(event.target);

        // const form = event.target;
        // const data = {}
        // for (let element of form.elements) {
        //     if (element.name) {
        //         data[element.name] = element.value;
        //     }
        // }
        let { oid, id, category, subCategory, items } = this.state;

        return postRequestToAPI(`/api/save/${oid}`, { oid, id, category, subCategory, items }, this.props.history)
            .then(data => this.setState({
                oid: data.oid,
                id: data.data,
                category: data.make,
                subCategory: data.serie,
                items: data.items
            }));
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.records)}
                <form id='updateForm' onSubmit={this.handleSubmit} noValidate>
                    <label>
                        Category:
                        <input type="text" value={this.state.category} name='category' onChange={this.handleChange} />
                    </label>
                    <label>
                        Subcategory:
                        <input type="text" value={this.state.subCategory} name='subCategory' onChange={this.handleChange} />
                    </label>
                    <label>
                        Items:
                        <textarea value={this.state.items} name='items' onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Save" />
                    <input type="button" value="Cancel" onClick={() => this.props.history.goBack()} />
                </form>
            </div>
        );
    }

}

Edit.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};
Edit.defaultProps = {
    match: {
        params: {
            collectionName: '',
            subCollectionName: '',
            option: ''
        }
    }
};
