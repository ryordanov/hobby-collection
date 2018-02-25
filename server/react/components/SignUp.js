import React, { Component } from 'react';
import { postRequestToAPI } from '../utils';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resp: '',
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.theUsername.value.length > 0 &&
            this.thePassword.value.length > 0 &&
            (this.thePassword.value === this.thePasswordConfirm.value);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validateForm()) {
            return postRequestToAPI('/api/signup', {
                username: this.theUsername.value || '',
                password: this.thePassword.value || '',
                email: this.theEmail.value || '',
            })
                .then((response) => {
                    debugger
                    if (response.status >= 400) {
                        throw new Error('Bad response from server');
                    }
                    this.setState({ resp: response.data });
                    sessionStorage.setItem('loggedin', 'true'); // sign up auto login
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <div className='SignUp'>
                <form id='signupForm' method='POST' onSubmit={this.handleSubmit} >
                    <label>
                        Username:
                        <input type='text' name='username' ref={(r) => { this.theUsername = r; }} />
                    </label>
                    <label>
                        Email:
                        <input type='text' name='email' ref={(r) => { this.theEmail = r; }} />
                    </label>
                    <label>
                        Password:
                        <input type='password' name='password' ref={(r) => { this.thePassword = r; }} />
                    </label>
                    <label>
                        Confirm Password:
                        <input type='password' name='passwordConfirm' ref={(r) => { this.thePasswordConfirm = r; }} />
                    </label>
                    <input type='submit' value='Submit' />
                </form>
                {'Server says:' + this.state.resp}
            </div>
        );
    }
}