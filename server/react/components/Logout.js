import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { postRequestToAPI } from '../utils';

export default class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        return postRequestToAPI('/api/logout')
            .then((response) => {
                if (!response.isAuthenticated) {
                    sessionStorage.removeItem('loggedin');
                    // this.props.history.push('/login');
                    this.props.history.push({
                        pathname: '/login',
                        responseStatus: response.responseStatus
                    });
                }
            });
        // .catch((error) => {
        //     console.error(error);
        // });
    }

    render() {
        return (
            <div>
                {/* <Redirect to='/login'/> */}
            </div>
        );
    }
}

Logout.propTypes = {
    history:PropTypes.object
};
