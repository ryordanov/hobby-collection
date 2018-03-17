import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

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
        this.setState({ [event.target.id]: event.target.value });
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
                    <FormGroup controlId="category" bsSize="large">
                        <ControlLabel>Category:</ControlLabel>
                        {/* <FormControl
                            autoFocus
                            type="text"
                            value={this.state.category}
                            onChange={this.handleChange}
                        /> */}
                        <FormControl componentClass="select" placeholder="select" defaultValue={this.state.category} disabled>
                            <option value="_">Please choose</option>
                            <option value={this.state.category}>{this.state.category}</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="subCategory" bsSize="large">
                        <ControlLabel>Subcategory:</ControlLabel>
                        {/* <FormControl
                            autoFocus
                            type="text"
                            value={this.state.subCategory}
                            onChange={this.handleChange}
                        /> */}
                        <FormControl componentClass="select" placeholder="select" defaultValue={this.state.subCategory} disabled>
                            <option value="_">Please choose</option>
                            <option value={this.state.subCategory}>{this.state.subCategory}</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="items" bsSize="large">
                        <ControlLabel>Items:</ControlLabel>
                        <FormControl
                            autoFocus
                            // type="text"
                            componentClass="textarea"
                            rows={8}
                            maxLength={4000}
                            value={this.state.items}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        type="submit"
                    >
                        Save
                    </Button>
                    <Button
                        block
                        bsSize="large"
                        type="button"
                        onClick={() => this.props.history.goBack()}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }
}

{/* <form>
    <FormGroup bsSize="large">
        <FormControl type="text" placeholder="Large text" />
    </FormGroup>
    <FormGroup>
        <FormControl type="text" placeholder="Normal text" />
    </FormGroup>
    <FormGroup bsSize="small">
        <FormControl type="text" placeholder="Small text" />
    </FormGroup>
</form>; */}


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
