import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';
import { Link /*, withRouter */ } from 'react-router-dom';
import { getRequestToAPI, postRequestToAPI, buildUrl, concatQueryParams, setNestedValue } from '../utils';

import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
// import { Typeahead } from 'react-bootstrap-typeahead';

export default class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            record: {
                // oid: (props.match && props.match.params && props.match.params.itemOid) || '',
                oid: (props && props.location && props.location.itemEditOid) || '',
                id: '',
                path: /*(props.match && props.match.params && props.match.params.path) ||*/[''],
                margins: '',
                items: ''
            },
            // categoryOptions: [{ name: 'Alaska', population: 710249, capital: 'Juneau', region: 'West' }, { name: 'Arizona', population: 6392307, capital: 'Phoenix', region: 'West' }],
            responseStatus: '',
            errorCode: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        if (this.state.record.oid) {
            let queryParams = concatQueryParams(this.props.location.search);
            return getRequestToAPI(buildUrl('/api/getItem', [this.state.record.oid], queryParams), this.props.history)
                .then((resData) => {
                    if (resData && resData.oid) {
                        this.setState({
                            record: {
                                oid: resData.oid,
                                id: resData.id,
                                path: resData.path,
                                margins: resData.margins,
                                items: resData.items
                            }
                        });
                    }
                });
        }
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
        let { oid, id, path, margins, items } = this.state.record;
        let queryParams = concatQueryParams(this.props.location.search);
        let url = '';
        if (this.state.record && this.state.record.oid) {
            url = buildUrl('/api/save', [oid], queryParams);
        } else {
            url = buildUrl('/api/create', [], queryParams);
        }
        return postRequestToAPI(url, { oid, id, path, margins, items }, this.props.history)
            .then(data => {
                if (data) {
                    if (data.error) {
                        this.setState({ responseStatus: data.error, errorCode: data.errorCode });
                    } else {
                        this.setState({
                            record: {
                                oid: data.oid,
                                id: data.data,
                                path: data.path,
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

    handleAdd() {
        this.setState((prevState) => {
            return prevState.record.path.push('');
        });
    }

    handleRemove() {
        this.setState((prevState) => {
            if (prevState.record.path.length > 1) {
                prevState.record.path.pop();
            }
            return prevState;
        });
    }

    render() {
        if (this.props.location.pathname.startsWith('/edit') && !this.state.record.oid) {
            return <Redirect to='/collections' />;
        }
        return (
            <div>
                <form id='updateForm' onSubmit={this.handleSubmit} noValidate>
                    {this.state.record.path.map((el, i) => {
                        return <FormGroup key={i} controlId={'record.path[' + i + ']'} bsSize="large">
                            <ControlLabel>{i === 0 ? 'Category' : 'Subcategory'}:</ControlLabel>
                            {i === 0 &&
                                <span>
                                    <Button bsStyle={classnames('info', 'actionBtn')} onClick={this.handleAdd}>+</Button>
                                    <Button bsStyle={classnames('info', 'actionBtn')} onClick={this.handleRemove}>-</Button>
                                </span>
                            }
                            <FormControl
                                autoFocus
                                type="text"
                                value={decodeURIComponent(el || '')}
                                onChange={this.handleChange}
                                placeholder={'Example: Category ' + ++i}
                            />
                        </FormGroup>;
                    })}
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
                            placeholder="Example: 1,2,5-10,11(2;broken),21"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        type="submit"
                        disabled={!!this.state.responseStatus}
                    >
                        Save
                    </Button>
                    <Button
                        block
                        bsSize="large"
                        type="button"
                        onClick={this.props.history.goBack}
                    >
                        Cancel
                    </Button>
                </form>
                {this.state.responseStatus &&
                    <Alert bsStyle="info">
                        <strong>Create status: </strong>
                        {this.state.responseStatus && this.state.errorCode === 2 &&
                            <span>
                                {this.state.responseStatus}
                                <span> Please use </span><Link to={buildUrl('/edit', [this.state.record.oid])} className="alert-link">Edit</Link><span> link. </span>
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
            path: [],
            option: ''
        }
    }
};
