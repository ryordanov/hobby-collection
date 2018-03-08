import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';

import { postRequestToAPI } from '../utils';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responseStatus: '',
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            (this.state.password === this.state.confirmPassword);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validateForm()) {
            return postRequestToAPI('/api/signup', {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
            }, this.props.history)
                .then((response) => {
                    this.setState({ responseStatus: response.responseStatus, isAuthenticated: response.isAuthenticated });
                    sessionStorage.setItem('loggedin', 'true'); // sign up auto login
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <div className="SignUp">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="confirmPassword" bsSize="large">
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>E-mail</ControlLabel>
                        <FormControl
                            value={this.state.email}
                            onChange={this.handleChange}
                            type="email"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Sign Up
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
