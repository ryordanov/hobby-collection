import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';

import { getRequestToAPI, postRequestToAPI, buildUrl, concatQueryParams, setNestedValue } from '../utils';

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: {
                oid: '',
                id: '',
                collection: '',
                subCollection: '',
                margins: '',
                items: ''
            },
            responseStatus: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // return getRequestToAPI(`/api/collections/${this.props.match.params.collectionName}/${this.props.match.params.subCollectionName}?option=${this.props.match.params.option}`, this.props.history)
        let queryParams = concatQueryParams(this.props.location.search);
        return getRequestToAPI(buildUrl('/api/collections', this.props.match.params, queryParams), this.props.history)
            .then((resData) => {
                this.setState({
                    record: {
                        oid: resData[0].oid,
                        id: resData[0].id,
                        collection: resData[0].make,
                        subCollection: resData[0].serie,
                        margins: resData[0].margins,
                        items: resData[0].items
                    }
                });
            });
    }

    handleChange(event) {
        let path = event.target.id; // dot separated route
        let value = event.target.value;

        this.setState((prevState) => {
            let tmpState = Object.assign({}, prevState); // do not mutate previous State object
            setNestedValue(tmpState, path, value);
            tmpState.responseStatus = '';
            return tmpState;
        });
        // this.setState({ [event.target.id]: event.target.value });
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
        let { oid, id, collection, subCollection, items } = this.state.record;
        let queryParams = concatQueryParams(this.props.location.search);
        return postRequestToAPI(buildUrl('/api/save', [oid], queryParams), { oid, id, collection, subCollection, margins, items }, this.props.history)
            .then(data => this.setState({
                record: {
                    oid: data.oid,
                    id: data.data,
                    collection: data.make,
                    subCollection: data.serie,
                    margins: data.margins,
                    items: data.items
                },
                responseStatus: 'Success'
            }));
    }

    render() {
        return (
            <div>
                <form id='updateForm' onSubmit={this.handleSubmit} noValidate>
                    <FormGroup controlId="record.collection" bsSize="large">
                        <ControlLabel>Category:</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.record.collection}
                            onChange={this.handleChange}
                            placeholder="Example: Turbo"
                        />
                        {/* <FormControl componentClass="select" placeholder="select" defaultValue={this.state.record.collection} disabled>
                            <option value="_">Please choose</option>
                            <option value={this.state.record.collection}>{this.state.record.collection}</option>
                        </FormControl> */}
                    </FormGroup>
                    <FormGroup controlId="record.subCollection" bsSize="large">
                        <ControlLabel>Subcategory:</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.record.subCollection}
                            onChange={this.handleChange}
                            placeholder="Example: blue serie"
                        />
                        {/* <FormControl componentClass="select" placeholder="select" defaultValue={this.state.record.subCollection} disabled>
                            <option value="_">Please choose</option>
                            <option value={this.state.record.subCollection}>{this.state.record.subCollection}</option>
                        </FormControl> */}
                    </FormGroup>
                    <FormGroup controlId="record.margins" bsSize="large">
                        <ControlLabel>Margins:</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.record.margins}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="record.items" bsSize="large">
                        <ControlLabel>Items:</ControlLabel>
                        <FormControl
                            autoFocus
                            // type="text"
                            componentClass="textarea"
                            rows={8}
                            maxLength={4000}
                            value={this.state.record.items}
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
                {this.state.responseStatus &&
                    <Alert bsStyle="info">
                        <strong>Save status: </strong>
                        {this.state.responseStatus}
                    </Alert>}

            </div>
        );
    }
}

{/* <form>
    <FormGroup bsSize="large">
        <FormControl type="text" placeholder="small text" />
    </FormGroup>
    <FormGroup>
        <FormControl type="text" placeholder="Normal text" />
    </FormGroup>
    <FormGroup bsSize="large">
        <FormControl type="text" placeholder="Small text" />
    </FormGroup>
</form>; */}


Edit.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object
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
