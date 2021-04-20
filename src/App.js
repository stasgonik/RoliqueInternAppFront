import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Main_Page from "./Components/Main_Page_Components/Main_Page";
import Login from "./Components/Login_Component/Login";
import ForgotPassEmailForm from "./Components/ForgotPassword_emailForm/ForgotPassEmailForm";
import ForgotPassNotify from "./Components/ForgotPassword_notify/ForgotPassNotify";
import ForgotPassForm from "./Components/ForgotPassword_changePassword/ForgotPassForm";
import CreateInternalUser from "./Components/Create_Internal_User/CreateInternalUser";
import UsersList from "./Components/UsersList/UsersList";

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route path={'/'} exact{...props} component={Main_Page}/>
                <Route path={'/login'} exact{...props} component={Login}/>
                <Route path={'/registration'} exact{...props} component={CreateInternalUser}/>
                <Route path={'/users'} exact{...props} component={CreateInternalUser}/>
                <Route path={'/usersList'} exact{...props} component={UsersList}/>
                <Route path={'/forgotPassword/emailForm'} exact{...props} component={ForgotPassEmailForm}/>
                <Route path={'/forgotPassword/notify'} exact{...props} component={ForgotPassNotify}/>
                <Route path={'/forgotPassword/changePassword'} exact{...props} component={ForgotPassForm}/>
            </Switch>
        </Router>
    );
}
