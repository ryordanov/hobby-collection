import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import OptionView from './OptionView';
import ListLinksCollectionItems from './ListLinksCollectionItems';

import { getCollectionData } from '../utils';

let itemsSeed = [
    { id: 'original', value: 'ORG' },
    { id: 'collapse', value: 'CLLPS' },
    { id: 'expand', value: 'EXPND' }
];

// some kind of View-Controller
export default class ListCollections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            dataFromBackend: [],
            selectedOption: itemsSeed[0].value
        };
        this.selectOption = this.selectOption.bind(this);
    }

    componentWillMount() {
        let url = this.buildUrl(this.props.match.params.collectionName, this.props.match.params.subCollectionName, this.state.selectedOption);

        getCollectionData(url)
            .then((resData) => {
                this.setState({ dataFromBackend: resData });
            });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            let url = this.buildUrl(nextProps.match.params.collectionName, nextProps.match.params.subCollectionName, this.state.selectedOption);
            getCollectionData(url)
                .then((resData) => {
                    // console.log('resData', resData);
                    this.setState({ dataFromBackend: resData });
                    return resData;
                });
        }
    }

    selectOption(rbData) {
        let url = this.buildUrl(null, null, rbData);
        getCollectionData(url)
            .then((resData) => {
                this.setState({ dataFromBackend: resData });
            });
    }

    buildUrl(collectionName, subCollectionName, selectedOption) {
        let url = '/api/collections';
        selectedOption = selectedOption || this.state.selectedOption || '';

        if (collectionName) {
            url += `/${collectionName}`;
        }
        if (subCollectionName) {
            url += `/${subCollectionName}`;
        }
        this.setState({ url, selectedOption, dataFromBackend: [] }) // loader...
        return url + `?option=${selectedOption}`;
    }

    render() {
        return (
            <div>
                <OptionView
                    selectedOption={this.selectOption}
                    items={itemsSeed} />
                <ListLinksCollectionItems
                    opt={this.state.selectedOption}
                    collectionRecords={this.state.dataFromBackend}
                    currentCollection={this.props.match.params.collectionName}
                    currentSubCollection={this.props.match.params.subCollectionName} />
            </div>
        );
    }
}

ListCollections.propTypes = {
    match: PropTypes.object
};
ListCollections.defaultProps = {
    match: {
        params: {
            collectionName: '',
            subCollectionName: ''
        }
    }
};
