import React from 'react';
import {
    NavLink,
    useLocation
} from "react-router-dom";

import arrow from '../Icons/arrow-logout.svg'
import at from '../Icons/at.svg';
import AuthService from "../../../Services/auth.service";
import classes from './Sidebar.module.css';
import logo from '../Icons/vector.svg';
import routes from "../../../Constants/routes.enum";
import users from '../Icons/users.svg';
import volume from '../Icons/volume.svg';

const logout = async () => {
    await AuthService.logout()
}

const Sidebar = () => {
    let loc = useLocation();
    let urlArray = loc.pathname.split('/')

    return (
        <div className={classes.Sidebar}>
            <div className={`${classes.SidebarImgLogo}`}>
                <img src={logo} alt="logo"/>
            </div>
            <NavLink to={`/${routes.USERS}`} className={`${classes.SidebarImg} ${classes.SidebarImgBtn}`} activeClassName={classes.colorChange}>
                <img src={users} alt="users"/>
            </NavLink>

            <NavLink to={`/${routes.CAMPAIGNS}`} className={`${classes.SidebarImg} ${classes.SidebarImgBtn}`} activeClassName={classes.colorChange}>
                <img src={volume} alt="volume"/>
            </NavLink>

            <NavLink to={`/${routes.INFLUENCERS}`} className={`${classes.SidebarImg} ${classes.SidebarImgBtn}`} activeClassName={classes.colorChange}>

                <img src={at} alt="at"/>
            </NavLink>

            <div title="Logout" className={`${classes.SidebarImg} ${classes.SidebarImgBtn} ${classes.SidebarLogout}`}
                 onClick={() => logout()}>
                <img src={arrow} alt="logoutArrow"/>
            </div>

        </div>
    )

}
export default Sidebar;
