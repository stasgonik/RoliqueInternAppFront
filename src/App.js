import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import CreateInfluencer from "./Components/Create_Influencer/CreateInfluencer";
import CreateInternalUser from "./Components/Create_Internal_User/CreateInternalUser";
import EditInfluencer from "./Components/Edit_Influencer/EditInfluencer";
import EditInternalUser from "./Components/Edit_Internal_User/EditInternalUser";
import ForgotPassEmailForm from "./Components/ForgotPassword_emailForm/ForgotPassEmailForm";
import ForgotPassForm from "./Components/ForgotPassword_changePassword/ForgotPassForm";
import InfluencerDetails from "./Components/InfluencerDetails/InfluencerDetails"
import Influencers_List from "./Components/Influencers_List/Influencers_List";
import Login from "./Components/Login_Component/Login";
import routes from "./Constants/routes.enum"
import UsersList from "./Components/UsersList/UsersList";

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route path={'/'} exact{...props} component={Login}/>
                <Route path={`/${routes.USERS}`} exact{...props} component={UsersList}/>
                <Route path={`/${routes.USERS}/${routes.CREATE}`} exact {...props} component={CreateInternalUser}/>
                <Route path={`/${routes.USERS}/:${routes.USER_ID}/${routes.EDIT}`} exact {...props} component={EditInternalUser}/>
                <Route path={`/${routes.FORGOT_PASSWORD}/${routes.EMAIL_FORM}`} exact {...props} component={ForgotPassEmailForm}/>
                <Route path={`/${routes.FORGOT_PASSWORD}/${routes.CHANGE_PASSWORD}`} exact {...props} component={ForgotPassForm}/>
                <Route path={`/${routes.INFLUENCERS}`} exact {...props} component={Influencers_List}/>
                <Route path={`/${routes.INFLUENCERS}/${routes.CREATE}`} exact {...props}  component={CreateInfluencer}/>
                <Route path={`/${routes.INFLUENCERS}/:${routes.INFLUENCER_ID}`} {...props} component={InfluencerDetails}/>
                <Route path={`/${routes.INFLUENCERS}/:${routes.INFLUENCER_ID}/${routes.EDIT}`} exact {...props} component={EditInfluencer}/>
            </Switch>
        </Router>
    );
}
