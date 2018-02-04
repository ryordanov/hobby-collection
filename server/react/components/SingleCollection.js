import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import ListLinksCollectionItems from './ListLinksCollectionItems';

import { getCollectionData } from '../utils';

let url = '/api/collection/';

export default class SingleCollection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFromBackend: []
        };
        // this.getCollectionData = this.getCollectionData.bind(this);
    }

    componentDidMount() {
        console.log('singlecollection', this.props.match);

        getCollectionData(url + this.props.match.params.name)
            .then((resData) => {
                this.setState({ dataFromBackend: resData });
                // console.log('resData', resData);
                return resData;
            });
    }

    render() {
        return (
            <ListLinksCollectionItems
                collectionRecords={this.state.dataFromBackend}
                currentCollection={this.props.match.params.name} />
        );
    }
}

SingleCollection.propTypes = {
    match: PropTypes.object
};
SingleCollection.defaultProps = {
    match: {
        params: {
            name: 'N/A'
        }
    }
};
