import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import OptionView from '../components/OptionView';
import ViewCollections from '../components/ViewCollections';

import { getRequestToAPI } from '../utils';

let itemsSeed = [
    { id: 'print view', value: 'SQUISHED' },
    { id: 'numbers only', value: 'NUMBERS' },
    { id: 'expand', value: 'EXPND' }
];

// some kind of View-Controller
export default class Collections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            dataFromBackend: [],
            selectedOption: itemsSeed[0].value
        };
        this.selectOption = this.selectOption.bind(this);
    }

    componentDidMount() {
        this.loadNewData(this.props.match.params.collectionName, this.props.match.params.subCollectionName, this.state.selectedOption);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.loadNewData(nextProps.match.params.collectionName, nextProps.match.params.subCollectionName, this.state.selectedOption);
        }
    }

    selectOption(rbData) {
        this.loadNewData(this.props.match.params.collectionName, this.props.match.params.subCollectionName, rbData);
    }

    loadNewData(collectionName, subCollectionName, selectedOption) {
        let url = '/api/collections';
        selectedOption = selectedOption || this.state.selectedOption || '';

        if (collectionName) {
            url += `/${collectionName}`;
        }
        if (subCollectionName) {
            url += `/${subCollectionName}`;
        }
        this.setState({ dataFromBackend: [] }); // loader...

        return getRequestToAPI(url + `?option=${selectedOption}`, this.props.history)
            .then((resData) => {
                if (resData) {
                    this.setState({ url, selectedOption, dataFromBackend: resData });
                }
            });
    }

    render() {
        return (
            <div>
                <OptionView
                    // selectedOption={(rbData) => this.loadNewData(this.props.match.params.collectionName, this.props.match.params.subCollectionName, rbData)}
                    selectedOption={this.selectOption}
                    items={itemsSeed} />
                <ViewCollections
                    opt={this.state.selectedOption}
                    collectionRecords={this.state.dataFromBackend}
                    currentCollection={this.props.match.params.collectionName}
                    currentSubCollection={this.props.match.params.subCollectionName} />
            </div>
        );
    }
}

Collections.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
};
Collections.defaultProps = {
    match: {
        params: {
            collectionName: '',
            subCollectionName: ''
        }
    }
};
