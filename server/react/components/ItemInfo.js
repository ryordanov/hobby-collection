import React from 'react';
import { Link } from 'react-router-dom';

export default class ItemInfo extends React.Component {
    constructor(props) {
        super(props);
        if (!this.params) {
            this.params = {};
        };

        this.params = Object.assign(this.params, this.props.match.params)
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        console.log(this);
        let url = '/item/' + ( this.params.number ? this.params.number : '0') + '/';
        // fetch('data_' + Math.floor(Math.random() * 11) + '.json')
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((resData) => {
                console.log(resData);
                this.setState({ data: resData });
            });
    };

    render() {
         return (
            <div>
                <div>Item Info: {this.state.data.items} </div>
                <Link to='/'>Back</Link>
            </div>
        );
    }
}
