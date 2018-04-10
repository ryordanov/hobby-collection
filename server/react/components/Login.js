import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';
import { postRequestToAPI } from '../utils';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseStatus: props.location.responseStatus || '',
            username: 'user',
            password: '1234'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        return postRequestToAPI('/api/login', {
            username: (this.theUsername.props && this.theUsername.props.value) || '',
            password: (this.thePassword.props && this.thePassword.props.value) || '',
        }, this.props.history)
            .then((response) => {
                this.setState({ responseStatus: response.responseStatus, isAuthenticated: response.isAuthenticated });
            })
            .catch((error) => {
                console.error(error);
                this.setState({responseStatus: 'No connection'});
            });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                            ref={(r) => { this.theUsername = r; }}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                            ref={(r) => { this.thePassword = r; }}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
                <Alert bsStyle="info">
                    <strong>Server says: </strong>
                    {this.state.responseStatus}
                </Alert>
                {this.state.isAuthenticated && <Redirect to='/collections' />}
            </div>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
};
