import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

// import Main_Page from "./Components/Main_Page_Components/Main_Page";
import Login from "./Components/Login_Component/Login";
import ForgotPassEmailForm from "./Components/ForgotPassword_emailForm/ForgotPassEmailForm";
import ForgotPassForm from "./Components/ForgotPassword_changePassword/ForgotPassForm";
import CreateInternalUser from "./Components/Create_Internal_User/CreateInternalUser";
import UsersList from "./Components/UsersList/UsersList";
import EditInternalUser from "./Components/Edit_Internal_User/EditInternalUser";

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route path={'/'} exact{...props} component={Login}/>
                <Route path={'/users'} exact{...props} component={UsersList}/>
                <Route path={'/users/create'} exact{...props} component={CreateInternalUser}/>
                {/*<Route path={'/users'} exact{...props} component={CreateInternalUser}/>*/}
                {/*<Route path={'/usersList'} exact{...props} component={UsersList}/>*/}
                <Route path={'/forgotPassword/emailForm'} exact{...props} component={ForgotPassEmailForm}/>
                <Route path={'/forgotPassword/changePassword'} exact{...props} component={ForgotPassForm}/>
                <Route path={'/users/edit'} exact{...props} component={EditInternalUser}/>
            </Switch>
        </Router>
    );
}
