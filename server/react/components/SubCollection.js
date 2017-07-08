import React from 'react';
import { Link } from 'react-router-dom';
import LinksCollection from './ListLinksCollectionItems';

export default class SubCollection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('/api/collection/' + this.props.match.params.name + '/' + this.props.match.params.subcollectionname)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((resData) => {
                this.setState({ data: resData });
            });
    };

    render() {
         return (
            <LinksCollection data={this.state.data} collection={this.props.match.params.name} subcollectionname={this.props.match.params.subcollectionname} />
        );
    }
}
