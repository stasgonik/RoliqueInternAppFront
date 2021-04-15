import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Main_Page from "./Components/Main_Page_Components/Main_Page";
import Login from "./Components/Login_Component/Login";
import Test from "./Components/testAccesToken/test";
import ForgotPassEmailForm from "./Components/ForgotPassword_emailForm/ForgotPassEmailForm";
import ForgotPassNotify from "./Components/ForgotPassword_notify/ForgotPassNotify";
import ForgotPassForm from "./Components/ForgotPassword_changePassword/ForgotPassForm";

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route path={'/'} exact{...props} component={Main_Page}/>
                <Route path={'/login'} exact{...props} component={Login}/>
                <Route path={'/test'} exact{...props} component={Test}/>
                <Route path={'/forgotPassword/emailForm'} exact{...props} component={ForgotPassEmailForm}/>
                <Route path={'/forgotPassword/notify'} exact{...props} component={ForgotPassNotify}/>
                <Route path={'/forgotPassword/changePassword'} exact{...props} component={ForgotPassForm}/>
            </Switch>
        </Router>
    );
}
