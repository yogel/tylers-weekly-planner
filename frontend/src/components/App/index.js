import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

// Views
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import DashboardPage from '../Dashboard';
import AdminPage from '../Admin';

// Path constants
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import './global.scss'

const App = () => (
    <Router>
        <div>
            <Navigation />

            <hr />
    
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
            />
            <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
    </Router>
);

export default withAuthentication(App);
