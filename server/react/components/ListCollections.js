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
            dataFromBackend: [],
            selectedOption: itemsSeed[0].value
        };
        this.selectOption = this.selectOption.bind(this);
    }

    componentWillMount() {
        let url = '';
        if (this.props.match.params.collectionName && this.props.match.params.subCollectionName) {
            url = `/api/collection/${this.props.match.params.collectionName}/${this.props.match.params.subCollectionName}`;
        } else if (this.props.match.params.collectionName) {
            url = `/api/collection/${this.props.match.params.collectionName}`;
        } else {
            url = `/api/collections?option=${itemsSeed[0].value}`;
        }

        getCollectionData(url)
            .then((resData) => {
                this.setState({ dataFromBackend: resData });
                return resData;
            });
    }

    componentWillReceiveProps(nextProps) {
        let url = '';
        if (nextProps.match.params.collectionName && nextProps.match.params.subCollectionName) {
            url = `/api/collection/${nextProps.match.params.collectionName}/${nextProps.match.params.subCollectionName}`;
        } else if (nextProps.match.params.collectionName) {
            url = `/api/collection/${nextProps.match.params.collectionName}`;
        } else {
            url = `/api/collections?option=${this.state.selectedOption}`;
        }
        this.setState({ dataFromBackend: [] })
        console.log('url', url);

        getCollectionData(url)
            .then((resData) => {
                console.log('resData', resData);

                this.setState({ dataFromBackend: resData });
                return resData;
            });

    }

    selectOption(rbData) {
        this.setState({ selectedOption: rbData });
        getCollectionData(`/api/collections?option=${rbData}`)
            .then((resData) => {
                this.setState({ dataFromBackend: resData });
                return resData;
            });
    }

    render() {
        return (
            <div>
                {!this.props.match.params.collectionName && !this.props.match.params.subCollectionName &&
                    <OptionView
                        selectedOption={this.selectOption}
                        items={itemsSeed} />}
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
