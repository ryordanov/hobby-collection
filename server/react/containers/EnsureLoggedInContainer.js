import React from 'react';
import { Redirect } from 'react-router-dom';

import { getRequestToAPI } from '../utils';

export default class EnsureLoggedInContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: sessionStorage.getItem('loggedin') === 'true'
        };
    }

    render() {
        if (this.state.isLoggedIn) {
            return this.props.children;
        } else {
            return <Redirect to='/login'/>;
        }
    }
}
