import React from 'react';

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('notFound')
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((resData) => {
                return this.setState({data: resData});
            });
    }

    render() {
        return (
            <div>{this.state.data.notFound}</div>
        );
    }
}
