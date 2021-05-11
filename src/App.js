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
import Influencers_List from "./Components/Influencers_List/Influencers_List";
import CreateInfluencer from "./Components/Create_Influencer/CreateInfluencer";
import EditInfluencer from "./Components/Edit_Influencer/EditInfluencer";
import InfluencerDetails from "./Components/InfluencerDetails/InfluencerDetails"

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route path={'/'} exact{...props} component={Login}/>
                <Route path={'/users'} exact{...props} component={UsersList}/>
                <Route path={'/users/create'} exact {...props} component={CreateInternalUser}/>
                <Route path={'/users/:userId/edit'} exact {...props} component={EditInternalUser}/>
                <Route path={'/forgotPassword/emailForm'} exact {...props} component={ForgotPassEmailForm}/>
                <Route path={'/forgotPassword/changePassword'} exact {...props} component={ForgotPassForm}/>
                <Route path={'/influencers/create'}  exact {...props}  component={CreateInfluencer}/>
                <Route path={'/influencers'} exact {...props} component={Influencers_List}/>
                <Route path={'/influencers/:influencerId/edit'} exact {...props} component={EditInfluencer}/>
                <Route path={'/influencers/:influencerId'} exact {...props} component={InfluencerDetails}/>
            </Switch>
        </Router>
    );
}
