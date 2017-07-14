import React from 'react';
// import { Link } from 'react-router-dom';
import ListLinksCollectionItems from './ListLinksCollectionItems';
import PropTypes from 'prop-types';

export default class SubCollection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFromBackend: []
        };
        this.getCollectionData = this.getCollectionData.bind(this);
    }

    // componentDidMount() {
    //     fetch('/api/collection/' + this.props.match.params.name + '/' + this.props.match.params.subcollectionname)
    //         .then(function(response) {
    //             if (response.status >= 400) {
    //                 throw new Error('Bad response from server');
    //             }
    //             return response.json();
    //         })
    //         .then((resData) => {
    //             this.setState({ dataFromBackend: resData });
    //         });
    // };

    getCollectionData(callback) {
        fetch('/api/collection/' + this.props.match.params.name + '/' + this.props.match.params.subcollectionname)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((resData) => {
                this.setState({ dataFromBackend: resData });
                if (callback) {
                    return callback(resData);
                }
                return resData;
            });
    }

    render() {
        return (
            // collectionData={this.state.dataFromBackend}
            <ListLinksCollectionItems
              getCollectionData={this.getCollectionData}
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
