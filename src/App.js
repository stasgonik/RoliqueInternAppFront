import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory
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
import Campaigns_List from "./Components/Campaigns_List/Campaigns_List";
import Create_Campaigns from "./Components/Create_Campaign/Create_Campaigns";
import Campaign_Planning from "./Components/Campaign_Planning/Campaign_Planning";
import { EditCampaign } from "./Components/Edit_Campaign";
import AuthService from "./Services/auth.service";



export default function App(props) {

    const h = useHistory();

    useEffect(() => {
        async function tryToken() {
            if (AuthService.getAccessToken() && AuthService.getRefreshToken()) {
                const result = await AuthService.refresh()
                if (result.status === 200) {
                    h.push(`/${routes.USERS}`)
                } else {
                    h.push(`/${routes.LOGIN}`)
                    localStorage.clear()
                }
            }
        }

        tryToken();
    }, [])

    return (
        <Router>
            <Switch>
                <Route path={`/${routes.LOGIN}`} exact{...props} component={Login}/>
                <Route path={`/${routes.USERS}`} exact{...props} component={UsersList}/>
                <Route path={`/${routes.USERS}/${routes.CREATE}`} exact {...props} component={CreateInternalUser}/>
                <Route path={`/${routes.USERS}/:${routes.USER_ID}/${routes.EDIT}`} exact {...props}
                       component={EditInternalUser}/>
                <Route path={`/${routes.FORGOT_PASSWORD}/${routes.EMAIL_FORM}`} exact {...props}
                       component={ForgotPassEmailForm}/>
                <Route path={`/${routes.FORGOT_PASSWORD}/${routes.CHANGE_PASSWORD}`} exact {...props}
                       component={ForgotPassForm}/>
                <Route path={`/${routes.INFLUENCERS}`} exact {...props} component={Influencers_List}/>
                <Route path={`/${routes.INFLUENCERS}/${routes.CREATE}`} exact {...props} component={CreateInfluencer}/>
                <Route path={`/${routes.INFLUENCERS}/:${routes.INFLUENCER_ID}`} exact {...props}
                       component={InfluencerDetails}/>
                <Route path={`/${routes.INFLUENCERS}/:${routes.INFLUENCER_ID}/${routes.EDIT}`} exact {...props}
                       component={EditInfluencer}/>
                <Route path={`/${routes.CAMPAIGNS}`} exact {...props} component={Campaigns_List}/>
                <Route path={`/${routes.CAMPAIGNS}/${routes.CREATE}`} exact {...props} component={Create_Campaigns}/>
                <Route path={`/${routes.CAMPAIGNS}/:${routes.CAMPAIGN_ID}/${routes.PLANNING}`} exact {...props}
                       component={Campaign_Planning}/>
                <Route path={`/${routes.CAMPAIGNS}/:${routes.CAMPAIGN_ID}/${routes.EDIT}`} exact {...props}
                       component={EditCampaign}/>
            </Switch>
        </Router>
    );
}
