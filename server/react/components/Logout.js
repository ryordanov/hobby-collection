import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { postRequestToAPI } from '../utils';

export default class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        return postRequestToAPI('/api/logout')
            // .then((response) => {
            //     this.props.history.push('/login');
            // })
            // .catch((error) => {
            //     console.error(error);
            // });
    }

    render() {
        return (
            <div>
                <Redirect to='/login'/>
            </div>
        );
    }
}