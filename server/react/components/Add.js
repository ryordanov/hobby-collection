import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';
import { Link /*, withRouter */ } from 'react-router-dom';
import { /* getRequestToAPI, */postRequestToAPI, buildUrl, concatQueryParams, setNestedValue } from '../utils';

// import { Typeahead } from 'react-bootstrap-typeahead';

export default class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: {
                oid: '',
                id: '',
                collection: (props.match && props.match.params && props.match.params.collectionName) || '',
                subCollection: '',
                margins: '',
                items: ''
            },
            // categoryOptions: [{ name: 'Alaska', population: 710249, capital: 'Juneau', region: 'West' }, { name: 'Arizona', population: 6392307, capital: 'Phoenix', region: 'West' }],
            responseStatus: '',
            errorCode: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //     GET LIST OF CATEGORIES FOR DROPDOWN
    //     // return getRequestToAPI(`/api/collections/${this.props.match.params.collectionName}/${this.props.match.params.subCollectionName}?option=${this.props.match.params.option}`, this.props.history)
    //     let queryParams = concatQueryParams(this.props.location.search);
    //     return getRequestToAPI(buildUrl('/api/collections', this.props.match.params, queryParams), this.props.history)
    //         .then((resData) => {
    //             this.setState({
    //                 record: {
    //                     oid: resData[0].oid,
    //                     id: resData[0].id,
    //                     collection: resData[0].make,
    //                     subCollection: resData[0].serie,
    //                     margins: resData[0].margins,
    //                     items: resData[0].items
    //                 }
    //             });
    //         });
    // }

    handleChange(event) {
        let path = event.target.id; // dot separated route
        let value = event.target.value;

        this.setState((prevState) => {
            let tmpState = Object.assign({}, prevState); // do not mutate previous State object
            setNestedValue(tmpState, path, value);
            tmpState.responseStatus = '';
            tmpState.errorCode = 0;
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
        let { oid, id, collection, subCollection, margins, items } = this.state.record;
        let queryParams = concatQueryParams(this.props.location.search);
        return postRequestToAPI(buildUrl('/api/create', [], queryParams), { oid, id, collection, subCollection, margins, items }, this.props.history)
            .then(data => {
                if (data) {
                    if (data.error) {
                        this.setState({ responseStatus: data.error, errorCode: data.errorCode });
                    } else {
                        this.setState({
                            record: {
                                oid: data.oid,
                                id: data.data,
                                collection: data.make,
                                subCollection: data.serie,
                                margins: data.margins,
                                items: data.items
                            },
                            responseStatus: 'Success',
                            errorCode: 0
                        });
                    }
                } else {
                    this.setState({ responseStatus: 'No data returned from server! Create failed!' });
                }
            });
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
                        {/* <Typeahead
                            emptyLabel={'ásdasdads'}
                            labelKey="name"
                            options={this.state.categoryOptions}
                            placeholder="Select category..."
                            onChange={(categoryOptions) => {
                                this.setState({categoryOptions});
                            }}
                        /> */}
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
                            placeholder="Example: 1-50"
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
                            placeholder="Example: 1,2,5-10,11(2;broken)"
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
                        <strong>Create status: </strong>
                        {/* {this.state.responseStatus} */}
                        {this.state.responseStatus && this.state.errorCode === 2 &&
                            <span>
                                {this.state.responseStatus}
                                <span> Please use </span><Link to={buildUrl('/edit', [this.state.record.collection, this.state.record.subCollection])} className="alert-link">Edit</Link><span> link. </span>
                            </span>
                        }
                        {this.state.responseStatus && this.state.errorCode !== 2 &&
                            this.state.responseStatus
                        }
                    </Alert>}

            </div>
        );
    }
}

Add.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object
};
Add.defaultProps = {
    match: {
        params: {
            collectionName: '',
            subCollectionName: '',
            option: ''
        }
    }
};
