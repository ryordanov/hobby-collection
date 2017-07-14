import React from 'react';
// import { Link } from 'react-router-dom';
import ListLinksCollectionItems from './ListLinksCollectionItems';

export default class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFromBackend: []
        };

        this.getCollectionData = this.getCollectionData.bind(this);
    }

    // componentDidMount() {
    //     this.getCollectionData();
    // }

    getCollectionData(callback) {
        console.log('parent', this.state, callback);
        // if (this.state.dataFromBackend.length > 0) {
        //     if (callback) {
        //         return callback(this.state.dataFromBackend);
        //     }

        //     return this.state.dataFromBackend;
        // }

        fetch('/api/collections', {credentials: 'same-origin'}) // in order to send cookies too
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
            <div>
                {/* { JSON.stringify(this.state.dataFromBackend)}   */}
                {/* collectionData={this.state.dataFromBackend}  */}
                <ListLinksCollectionItems getCollectionData={this.getCollectionData} />
            </div>
        );
    }
}

