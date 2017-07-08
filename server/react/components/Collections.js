import React from 'react';
import { Link } from 'react-router-dom';
import LinksCollection from './ListLinksCollectionItems';

export default class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('/api/collections')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((resData) => {
                console.log(resData)
                this.setState({ data: resData });
            });
    };

    render() {
         return (
            <LinksCollection data={this.state.data} />
        );
    }
}

