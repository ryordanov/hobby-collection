import React from 'react';
// import { Link } from 'react-router-dom';
import ListLinksCollectionItems from './ListLinksCollectionItems';
import PropTypes from 'prop-types';
import { getCollectionData } from '../utils';

let url = '/api/collections/';

export default class SubCollection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFromBackend: []
        };
    }

    componentDidMount() {
        console.log('subCollection', this.props.match);

        getCollectionData(url + this.props.match.params.name + '/' + this.props.match.params.subcollectionname)
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
                currentCollection={this.props.match.params.name}
                currentSubCollection={this.props.match.params.subcollectionname} />
        );
    }
}

SubCollection.propTypes = {
    match: PropTypes.object
};
SubCollection.defaultProps = {
    match: {
        params: {
            name: 'N/A'
        }
    }
};
