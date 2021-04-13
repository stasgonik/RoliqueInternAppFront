import React, {Component} from 'react';
import './mainPage.css'
import {NavLink} from "react-router-dom";

class MainPage extends Component {
    render() {
        return (
            <div className={'main-flex'}>
                <NavLink to={'/registration'}>
                <button className={'button-main-flex'}>registration</button>
                </NavLink>
                <NavLink to={'/login'}>
                    <button className={'button-main-flex'}>Log iN</button>
                </NavLink>
            </div>
        );
    }
}

export default MainPage;
