import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
// import { PasswordForgetForm } from '../PasswordForget';
// import PasswordChangeForm from '../PasswordChange';
import TodoQueue from '../TodoQueue';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

const DashboardPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Welcome: {authUser.email}</h1>
                <DndProvider backend={HTML5Backend}>
                    <TodoQueue />
                </DndProvider>
                {/* <PasswordForgetForm />
                <PasswordChangeForm /> */}
            </div>
        )}
    </AuthUserContext.Consumer>
);

// The user can only see this page if they are authenticated
const condition = authUser => !!authUser;

export default withAuthorization(condition)(DashboardPage);