import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Main_Page from "./Components/Main_Page_Components/Main_Page";
import Login from "./Components/Login_Component/Login";
import Test from "./Components/testAccesToken/test";

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route path={'/'} exact{...props} component={Main_Page}/>
                <Route path={'/login'} exact{...props} component={Login}/>
                <Route path={'/test'} exact{...props} component={Test}/>

            </Switch>
        </Router>
    );
}
