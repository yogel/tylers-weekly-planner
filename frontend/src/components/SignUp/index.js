import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/roles';

const SignUp = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
        <SignUpLink />
    </div>
);

class SignUpForm extends Component {
    // constructor(props) {
    //     super(props);
    // }

    onSubmit = event => {
        
    }

    onChange = event => {
        
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>

            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign UP</Link>
    </p>
);

export default SignUp
